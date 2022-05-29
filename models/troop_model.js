var pool = require('./connection.js')
let { update_resources } = require('./resources_model')
let { check_current_playing_by_game_id } = require('./user_model')
let { delete_building } = require('./buildings_model')
let { update_building } = require('./buildings_model')



module.exports.get_all_troops = async function () {
  try {
    let sql = "Select * from troops ";
    let result = await pool.query(sql);
    let troops = result.rows;
    return { status: 200, result: troops };
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
}

module.exports.get_troops_id = async function (game_id) {
  try {
    let sql = `
    Select game.game_id,user_id,user_trp_id,trp_id,troop_id, troop_x,troop_y,trp_name,trp_health,trp_movement,trp_attack,trp_range,trp_max_amount,troop_current_health,troop_current_movement,trp_normal_url,trp_hurt_url 
    from user_troops,troops,player_game,game  
    where troops.trp_id = user_troops.troop_id and (user_troops.user_id = user_player) and player_game.game_id = game.game_id and game.game_id = $1 ; `;
    let result = await pool.query(sql, [game_id]);
    let troops = result.rows;
    return { status: 200, result: troops };
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
}

module.exports.update_troop_id = async function (user_id, user_trp_id, x, y, health, current_movement) {
  try {

    let sql = `UPDATE user_troops SET troop_x = $3, troop_y = $4 , troop_current_health = $5, troop_current_movement =$6 WHERE user_id =$1 and user_trp_id =$2; `;
    let result = await pool.query(sql, [user_id, user_trp_id, x, y, health, current_movement]);
    let troops = result.rows;
    return { status: 200, result: troops };
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };

  }
}

module.exports.train = async function (user_id, troop_id, bld_id, game_id) {

  let troop_iron_cost;
  let troop_food_cost;
  let user_iron;
  let user_food;
  let turn_id;
  let your_turn;
  try {
    let sql = `select rsc_amount from resources_troops where trp_id = $1`
    let result = await pool.query(sql, [troop_id]);
    troop_iron_cost = result.rows[0].rsc_amount
    troop_food_cost = result.rows[1].rsc_amount

    sql = `select rsc_amount from user_resources where user_id = $1`
    result = await pool.query(sql, [user_id]);

    user_iron = result.rows[0].rsc_amount
    user_food = result.rows[1].rsc_amount

    turn_id = await check_current_playing_by_game_id(game_id)
    turn_id = turn_id.result[0].current_user_playing;
    your_turn = (turn_id == user_id);

  } catch (err) {
    console.log(err)
    return { status: 500, result: err };
  }
  if (
    (user_iron - troop_iron_cost >= 0) &&
    (user_food - troop_food_cost >= 0) &&
    (your_turn)) {
    try {
      let sql = `select trp_movement,trp_health from troops where trp_id = $1`
      let result = await pool.query(sql, [troop_id]);
      let troop_current_health = result.rows[0].trp_health;
      let troop_movement = result.rows[0].trp_movement;

      sql = `select bld_x,bld_y from user_buildings where user_bld_id = $1`
      let result_b = await pool.query(sql, [bld_id]);
      let x = result_b.rows[0].bld_x;
      let y = result_b.rows[0].bld_y;

      sql = `Insert into user_troops (user_id,troop_id,troop_x,troop_y,troop_current_health,troop_current_movement)values ($1,$2,$3,$4,$5,$6) `;
      result = await pool.query(sql, [user_id, troop_id, x, y, troop_current_health, troop_movement]);
      let troops = result.rows;
      await update_resources(user_id, user_iron - troop_iron_cost, 1)
      await update_resources(user_id, user_food - troop_food_cost, 2)
      return { status: 200, result: troops };

    } catch (err) {
      console.log(err);
      return { status: 500, result: err };

    }
  } else return { status: 400, result: 'wrong user turn ' };
}


module.exports.delete_troop = async function (id) {
  try {
    let sql = `DELETE FROM user_troops WHERE user_trp_id = $1; `;
    let result = await pool.query(sql, [id]);
    let troops = result.rows;
    return { status: 200, result: troops };
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };

  }
}

module.exports.get_all_troops_resources = async function (id) {
  try {
    let sql = `
    select troops.trp_id,trp_name,rsc_type,rsc_amount 
    from resources_troops,player_game,troops,resources
    where resources_troops.rsc_id = resources.rsc_id 
    and resources_troops.trp_id = troops.trp_id 
    and player_game.player_fac_id = troops.trp_fac_id
    and player_game.player_fac_id = $1 
    and player_game.user_player = $1
    ;`;
    let result = await pool.query(sql, [id]);
    let troops = result.rows;
    return { status: 200, result: troops };
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
}

module.exports.move_troop = async function (user_id, troop_id, tile_x, tile_y, game_id) {
  console.log('ENTROU')
  let sql = `
    select *
    from user_troops,troops
    where user_trp_id = $1 and user_troops.troop_id = troops.trp_id;`
  let result = await pool.query(sql, [troop_id]);
  let troop_info = result.rows[0]

  let troop_coordinates = { x: troop_info.troop_x, y: troop_info.troop_y }

  let tile_coordinates = { x: tile_x, y: tile_y }

  let can_move = get_dist_move(troop_coordinates, tile_coordinates, troop_info.troop_current_movement)
  console.log(can_move)

  sql = `select can_move_troop
    from player_game
    where user_player = $1`
  result = await pool.query(sql, [user_id]);
  let can_move_troop = result.rows[0].can_move_troop

  let turn_id = await check_current_playing_by_game_id(game_id)
  turn_id = turn_id.result[0].current_user_playing
  let your_turn = (turn_id == user_id)
  if (can_move_troop && your_turn & can_move.can_move && troop_info.user_id == user_id) {
    try {
      let sql = `select * from user_troops where troop_x =$1 and troop_y = $2;`;
      let result = await pool.query(sql, [tile_coordinates.x, tile_coordinates.y]);
      console.log(result.rows[0])
      if (result.rows[0] == undefined) {
        let sql = `UPDATE user_troops SET troop_x = $3, troop_y = $4 , troop_current_movement =$5 WHERE user_id =$1 and user_trp_id =$2; `;
        let result = await pool.query(sql, [user_id, troop_info.user_trp_id, tile_coordinates.x, tile_coordinates.y, troop_info.troop_current_movement - can_move.x - can_move.y]);

        sql = `UPDATE player_game SET can_move_troop = false  WHERE user_player  = $1;`
        result = await pool.query(sql, [user_id]);

        return { status: 200, result: { msg: 'troop moved succesfuly' } };
      } else {
        sql = `UPDATE player_game SET can_move_troop = false  WHERE user_player  = $1;`
        result = await pool.query(sql, [user_id]);
        return { status: 200, result: { msg: 'cannot move troop here , tile already has a troop' } };
      }
    } catch (err) {
      console.log(err);
      return { status: 500, result: err };
    }
  } else {
    sql = `UPDATE player_game SET can_move_troop = false  WHERE user_player  = $1;`
    result = await pool.query(sql, [user_id]);
    return { status: 200, result: { msg: 'you cannot' } }
  }
}

module.exports.attack_troop = async function (user_id, attacker, defender, bit, game_id) {
  let your_turn;
  let turn_id;
  let can_attack = false;
  let dice_dmg_multiplier = null;


  sql = `select can_attack_troop
    from player_game
    where user_player = $1`
  result = await pool.query(sql, [user_id]);
  let can_attack_troop = result.rows[0].can_attack_troop
  turn_id = await check_current_playing_by_game_id(game_id)
  turn_id = turn_id.result[0].current_user_playing
  your_turn = (turn_id == user_id)
  if (bit == 0) {
    let sql = `
    select troop_x,troop_y 
    from user_troops
    where user_trp_id = $1`
    let result = await pool.query(sql, [attacker]);
    let attacker_coordinates = result.rows[0]
    sql = `
    select troop_x,troop_y 
    from user_troops
    where user_trp_id = $1`
    result = await pool.query(sql, [defender]);
    let defender_coordinates = result.rows[0]

    sql = `
    select  troop_id
    from user_troops
    where user_trp_id = $1`
    result = await pool.query(sql, [attacker]);
    let attacker_troop_id = result.rows[0].troop_id

    sql = `
    select  troop_id
    from user_troops
    where user_trp_id = $1`
    result = await pool.query(sql, [defender]);
    let defender_troop_id = result.rows[0].troop_id

    sql = `
    select  trp_range
    from troops
    where trp_id = $1`
    result = await pool.query(sql, [attacker_troop_id]);
    let range = result.rows[0].trp_range
    can_attack = get_dist_attack(attacker_coordinates, defender_coordinates, range, bit)
    sql = `
    select dics_roll
    from rolls_to_deal_damage
    where trp_id1 = $1 and trp_id2 = $2;`
    result = await pool.query(sql, [attacker_troop_id, defender_troop_id]);
    result = result.rows[0].dics_roll
    dice_dmg_multiplier = roll_dice(result, 6)

    sql = `
    select *
    from user_troops,troops
    where user_trp_id = $1 and user_troops.troop_id = troops.trp_id;`
    result = await pool.query(sql, [attacker]);
    let attacker_info = result.rows[0]

    sql = `
    select *
    from user_troops,troops
    where user_trp_id = $1 and user_troops.troop_id = troops.trp_id;`
    result = await pool.query(sql, [defender]);
    let defender_info = result.rows[0]

    try {
      if (can_attack && dice_dmg_multiplier >= 1 && can_attack_troop && your_turn) {

        defender_info.troop_current_health -= attacker_info.trp_attack * dice_dmg_multiplier;

        if (defender_info.troop_current_health <= 0) {
          await this.delete_troop(defender)
        }
        await this.update_troop_id(defender_info.user_id, defender_info.user_trp_id, defender_info.troop_x, defender_info.troop_y, defender_info.troop_current_health, defender_info.troop_current_movement);

        let sql = `UPDATE player_game SET can_attack_troop = false  WHERE user_player  = $1;`
        let result = await pool.query(sql, [user_id]);

        return { status: 200, result: { msg: "success attack" } };
      } else {
        let sql = `UPDATE player_game SET can_attack_troop = false  WHERE user_player  = $1;`
        let result = await pool.query(sql, [user_id]);
        return { status: 200, result: { msg: "success missed" } };
      }
    } catch (err) {
      console.log(err);
      return { status: 500, result: err };

    }
  } else if (bit == 1) {
    let sql = `
    select troop_x,troop_y 
    from user_troops
    where user_trp_id = $1`
    let result = await pool.query(sql, [attacker]);
    let attacker_coordinates = result.rows[0]

    sql = `
    select bld_x,bld_y 
    from user_buildings
    where user_bld_id = $1`
    result = await pool.query(sql, [defender]);
    let defender_coordinates = result.rows[0]

    sql = `
    select  troop_id
    from user_troops
    where user_trp_id = $1`
    result = await pool.query(sql, [attacker]);
    let attacker_troop_id = result.rows[0].troop_id

    sql = `
    select  trp_range
    from troops
    where trp_id = $1`
    result = await pool.query(sql, [attacker_troop_id]);
    let range = result.rows[0].trp_range

    can_attack = get_dist_attack(attacker_coordinates, defender_coordinates, range, bit)

    sql = `
    select *
    from user_troops,troops
    where user_trp_id = $1 and user_troops.troop_id = troops.trp_id;`
    result = await pool.query(sql, [attacker]);
    let attacker_info = result.rows[0]

    sql = `
    select *
    from user_buildings,buildings
    where user_bld_id = $1 and user_buildings.bld_id = buildings.bld_id;`
    result = await pool.query(sql, [defender]);
    let defender_info = result.rows[0]

    try {
      if (can_attack && can_attack_troop && your_turn) {
        defender_info.bld_current_health -= attacker_info.trp_attack;
        if (defender_info.bld_current_health <= 0) {
          await delete_building(defender)
          if (defender_info.bld_name == 'tc1' || defender_info.bld_name == 'tc2' || defender_info.bld_name == 'tc3' || defender_info.bld_name == 'tc4') {
            return { status: 200, result: { msg: "you won" } };
          }
        }
        await update_building(defender_info.user_id, defender_info.user_bld_id, defender_info.bld_current_health);
        let sql = `UPDATE player_game SET can_attack_troop = false  WHERE user_player  = $1;`
        let result = await pool.query(sql, [user_id]);
        return { status: 200, result: { msg: "success attack" } };
      } else {
        let sql = `UPDATE player_game SET can_attack_troop = false  WHERE user_player  = $1;`
        let result = await pool.query(sql, [user_id]);
        return { status: 200, result: { msg: "success missed" } };
      }
    } catch (err) {
      console.log(err);
      return { status: 500, result: err };

    }
  }

};
function roll_dice(min, sides) {
  dice_number = dice(1, sides);
  if (dice_number == sides) {
    return 2
  } else if (dice_number >= min) {
    return 1
  }
  return 0
}
function dice(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function get_dist_attack(attacker, defender, range, bit) {
  if (bit == 0) {
    distX = Math.abs(attacker.troop_x - defender.troop_x)
    distY = Math.abs(attacker.troop_y - defender.troop_y)
    return distX <= range && distY <= range;

  } else if (bit == 1) {
    distX = Math.abs(attacker.troop_x - defender.bld_x)
    distY = Math.abs(attacker.troop_y - defender.bld_y)
    return distX <= range && distY <= range;
  }

}

function get_dist_move(troop, tile, movement) {
  distX = Math.abs(troop.x - tile.x)
  distY = Math.abs(troop.y - tile.y)
  return {
    can_move: (movement - distX - distY >= 0),
    x: distX,
    y: distY
  };
}

module.exports.update_troop = async function (user_id, bit) {
  console.log('ENTROU')
  console.log(user_id)
  console.log(bit)
  if (bit == 0) {
    try {
      let sql = `UPDATE player_game SET can_move_troop = true  WHERE user_player  = $1;`
      let result = await pool.query(sql, [user_id]);

      sql = `UPDATE player_game SET can_attack_troop = false  WHERE user_player  = $1;`
      result = await pool.query(sql, [user_id]);
      return { status: 200, result: { msg: 'success' } };
    } catch (err) {
      console.log(err);
      return { status: 500, result: err };
    }
  } else if (bit == 1) {
    try {
      let sql = `UPDATE player_game SET can_attack_troop = true  WHERE user_player  = $1;`
      let result = await pool.query(sql, [user_id]);
      sql = `UPDATE player_game SET can_move_troop = false  WHERE user_player  = $1;`
      result = await pool.query(sql, [user_id]);
      return { status: 200, result: { msg: 'success' } };
    } catch (err) {
      console.log(err);
      return { status: 500, result: err };
    }
  }


}

module.exports.get_troops_rolls_id = async function () {
  try {
    let sql = `select  trp_name
    from troops,rolls_to_deal_damage
    where trp_id= trp_id1  and trp_fac_id = $1 `;
    let result = await pool.query(sql);
    console.log(result.rolls)
    let troops = result.rows;
    return { status: 200, result: troops };
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
}













