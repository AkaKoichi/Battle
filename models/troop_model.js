var pool = require('./connection.js')
let { update_resources } = require('./resources_model')


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

module.exports.update_troop = async function (user_id, user_trp_id, x, y, health, current_movement) {
  try {
    console.log({ user_id, user_trp_id, x, y })
    let sql = `UPDATE user_troops SET troop_x = $3, troop_y = $4 , troop_current_health = $5, troop_current_movement =$6 WHERE user_id =$1 and user_trp_id =$2; `;
    let result = await pool.query(sql, [user_id, user_trp_id, x, y, health, current_movement]);
    let troops = result.rows;
    return { status: 200, result: troops };
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };

  }
}

module.exports.train = async function (user_id, troop_id, bld_id) {
  let troop_iron_cost;
  let troop_food_cost;
  let user_iron;
  let user_food;
  try {
    let sql = `select rsc_amount from resources_troops where trp_id = $1`
    let result = await pool.query(sql, [troop_id]);
    troop_iron_cost = result.rows[0].rsc_amount
    troop_food_cost = result.rows[1].rsc_amount

    sql = `select rsc_amount from user_resources where user_id = $1`
    result = await pool.query(sql, [user_id]);
    console.log(result)
    user_iron = result.rows[0].rsc_amount
    user_food = result.rows[1].rsc_amount

  } catch (err) {
    return { status: 500, result: err };
  }
  if (
    (user_iron - troop_iron_cost >= 0) &&
    (user_food - troop_food_cost >= 0)) {
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
      console.log(result)
      let troops = result.rows;
      await update_resources(user_id, user_iron - troop_iron_cost, 1)
      await update_resources(user_id, user_food - troop_food_cost, 2)
      return { status: 200, result: troops };

    } catch (err) {
      console.log(err);
      return { status: 500, result: err };

    }
  }
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
    let result = await pool.query(sql,[id]);
    console.log(result)
    let troops = result.rows;
    console.log(troops)
    return { status: 200, result: troops };
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
}

module.exports.move_troop = async function (user_id, troop_id, direction, movement) {
  if (movement > 0) {
    try {

      let sql = `select troop_x,troop_y from user_troops where user_trp_id = $1 `;
      let result = await pool.query(sql, [troop_id]);
      console.log('SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS' + result.rows[0].troop_x);

      sql = `select * from user_troops where troop_x =$1 and troop_y = $2;`;
      result1 = await pool.query(sql, [result.rows[0].troop_x, result.rows[0].troop_y + 1]);

      if (result1.rows == 0) {

        sql = `UPDATE user_troops SET troop_x = $3, troop_y = $4 , troop_current_movement =$5 WHERE user_id =$1 and user_trp_id =$2; `;
        let result2 = await pool.query(sql, [user_id, troop_id, result.rows[0].troop_x, result.rows[0].troop_y + 1, movement - 1]);
        let troops = result2.rows;
        return { status: 200, result: troops };

      } else return { status: 200 };


    } catch (err) {
      console.log(err);
      return { status: 500, result: err };

    }
  } else return { status: 200 };
  /* troop_array[i].y += 1;
  troop_array[i].movement -= 1
  await update_troops_id(user_id, troop_array[i].user_trp_id, troop_array[i].x, troop_array[i].y, troop_array[i].health, troop_array[i].movement); */


}






