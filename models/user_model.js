var pool = require('./connection.js')
let { update_resources } = require('./resources_model')

module.exports.login_check = async function (name, password) {
  try {
    let sql = `Select user_id from users where username = $1 and password = $2`;
    let result = await pool.query(sql, [name, password]);
    if (result.rows.length == 0) {
      return { status: 401, result: { msg: "Wrong password or username." } }
    }
    let user_id = result.rows[0].user_id;
    return { status: 200, result: { msg: "Login correct", userId: user_id } };
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
}

module.exports.get_logged_user_info = async function (userId) {
  try {
    let sql = `Select user_id , username, user_trophies
      from users 
      where user_id = $1`;
    let result = await pool.query(sql, [userId]);
    if (result.rows.length > 0) {
      let user = result.rows[0];
      return { status: 200, result: user };
    } else {
      return { status: 404, result: { msg: "No user with that id" } };
    }
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
}

module.exports.get_logged_user_info_game = async function (userId) {
  try {
    let sql = `Select user_id , username, user_trophies,player_fac_id,player_actions
    from users ,player_game
    where player_game.user_player=$1 and user_id = $1`;
    let result = await pool.query(sql, [userId]);
    if (result.rows.length > 0) {
      let user = result.rows[0];
      return { status: 200, result: user };
    } else {
      return { status: 404, result: { msg: "No user with that id" } };
    }
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
}

module.exports.register_user = async function (user) {
  try {
    let sql = "Insert into users (username,password,user_trophies) values ($1,$2,0)";
    let result = await pool.query(sql, [user.name, user.password]);
    return { status: 200, result: result }
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
}

module.exports.players_leader_board = async function () {
  try {
    let sql = `SELECT username, user_trophies FROM users ORDER BY user_trophies DESC LIMIT 7`;
    let result = await pool.query(sql);
    return { status: 200, result: result.rows }
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
}

module.exports.get_players_by_game_id = async function (game_id) {
  console.log('a')
  try {
    let sql = `Select user_id 
       from users,player_game,game 
       where game.game_id=player_game.game_id and game.game_id = $1`;
    let result = await pool.query(sql, [game_id]);
    if (result.rows.length > 0) {
      let user = result.rows;
      return { status: 200, result: user };
    } else {
      return { status: 404, result: { msg: "No user with that id" } };
    }
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
}

module.exports.check_current_playing_by_game_id = async function (game_id) {
  try {
    let sql = `
      Select current_user_playing
      From game,player_game
      Where game.game_id = player_game.game_id and game.game_id = $1`;
    let result = await pool.query(sql, [game_id]);
    if (result.rows.length > 0) {
      let user = result.rows;
      return { status: 200, result: user };
    } else {
      return { status: 404, result: { msg: "No user with that id" } };
    }
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
}

module.exports.update_current_playing_by_game_id = async function (user_id, game_id) {
  console.log('aa')
  try {
    let sql = `UPDATE player_game SET current_user_playing = $1 WHERE game_id = $2;`;
    let result = await pool.query(sql, [user_id, game_id]);
    let users = result.rows;
    return { status: 200, result: users };
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };

  }
}

module.exports.get_opponent_id_by_game = async function (id, game_id) {
  try {
    let sql = `
      select user_player
      from player_game
      where user_player != $1 and game_id = $2`;
    let result = await pool.query(sql, [id, game_id]);
    if (result.rows.length > 0) {
      let user = result.rows[0];
      return { status: 200, result: user };
    } else {
      return { status: 404, result: { msg: "game not found" } };
    }
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
}

module.exports.get_game_id_by_user = async function (id) {
  try {
    let sql = `
    select game_id
    from player_game
    where user_player = $1`;
    let result = await pool.query(sql, [id]);
    if (result.rows.length > 0) {
      let user = result.rows[0];
      return { status: 200, result: user };
    } else {
      return { status: 404, result: { msg: "game not found" } };
    }
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
}

module.exports.end_turn = async function (user_id, game_id, pile, oponent_id) {
  try {
    let sql = `
    select user_trp_id,trp_movement
    from user_troops,troops
    where user_id = $1 and trp_id = troop_id`;
    let result = await pool.query(sql, [user_id]);
    console.log('AQUI')
    for (let i = 0; i < result.rowCount; i++) {
      let troop_info = result.rows[i]
      let sql = `
      update user_troops 
      set troop_current_movement = $1 ,
      can_attack = true 
      where user_trp_id = $2`;
      let res = await pool.query(sql, [troop_info.trp_movement, troop_info.user_trp_id]);


    }
    sql = `select count(*)
    from user_buildings
    where (user_buildings.bld_id = 4 or user_buildings.bld_id = 9)  and user_id = $1`
    result_iron = await pool.query(sql, [user_id]);

    sql = `select count(*)
    from user_buildings
    where (user_buildings.bld_id = 5 or user_buildings.bld_id = 10)  and user_id = $1`
    result_food = await pool.query(sql, [user_id]);

    sql = `select rsc_amount
    from user_resources
    where user_id = $1`
    res = await pool.query(sql, [user_id]);



    sql = `select bld_rsc_given 
    from buildings
    where bld_id = 4 or bld_id = 5`
    let resources = await pool.query(sql);

    let iron_resource_given = resources.rows[0].bld_rsc_given
    let food_resource_given = resources.rows[1].bld_rsc_given

    let resource_iron = res.rows[1].rsc_amount + (result_iron.rows[0].count * iron_resource_given)
    let resource_food = res.rows[0].rsc_amount + (result_food.rows[0].count * food_resource_given)

    await update_resources(user_id, resource_food, 1)//MUDAR O HARDCODE
    await update_resources(user_id, resource_iron, 2)
    res = await this.get_opponent_id_by_game(user_id, game_id)
    console.log(res.result.user_player)
    await this.update_current_playing_by_game_id(res.result.user_player, game_id)

    sql = `UPDATE player_game SET player_actions  = 5  WHERE user_player  = $1 `
    await pool.query(sql, [user_id]);

    let your_troops = false;
    for (let i = 0; i < pile.length; i++) {
      let sql = `select * from user_troops where troop_x = $1 and troop_y=$2 and user_id = $3`
      let res = await pool.query(sql, [pile[i].x, pile[i].y, user_id]);
      if (res.rows[0] != undefined) {
        your_troops = true
      }
    }
    console.log(oponent_id)
    let oponent_troops = false;
    for (let i = 0; i < pile.length; i++) {
      let sql = `select * from user_troops where troop_x = $1 and troop_y=$2 and user_id = $3`
      let res = await pool.query(sql, [pile[i].x, pile[i].y, oponent_id]);
      if (res.rows[0] != undefined) {
        oponent_troops = true
      }
    }

    if (oponent_troops == true && your_troops == true) {
      console.log('ninguem recebe')

    } else if (your_troops == true) {
      sql = `select rsc_amount
      from user_resources
      where user_id = $1`
      res = await pool.query(sql, [user_id]);
      let resource_amount = res.rows[0].rsc_amount
      await update_resources(user_id, resource_amount + 3, 1)//MUDAR O HARDCODE
      await update_resources(user_id, resource_amount + 3, 2)
    }


    return { status: 200, result: { msg: 'updated' } };
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
}

//-----------------------------------------------------------------------------------------
module.exports.create_game = async function (game_name, user_id) {
  console.log(user_id)
  try {
    let res = await this.get_player_active_games(user_id);
    if (res.result.length > 0) {
      return {
        status: 200,
        result: { msg: "You can only have one active match." }
      }
    } else {
      let sql = `insert into game (game_name,state,game_started) 
                  values ($1,false,false) returning *`;
      res = await pool.query(sql, [game_name]);
      let game_id = res.rows[0].game_id;
      sql = `insert into player_game (user_player, game_id,current_user_playing, player_actions,player_fac_id, can_move_troop, can_attack_troop) 
             values ($1,$2,$1,5,1,false,false) returning *`;
      res = await pool.query(sql, [user_id, game_id,]);
      let player_game_id = res.rows[0].player_game_id;

      return {
        status: 200, result:
          { msg: "Match successfully created.", game_id: game_id, player_game_id: player_game_id }
      };
    }
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
}

module.exports.get_player_active_games = async function (user_id) {
  try {
    let sql = ` Select * from player_game, game 
                  where player_game.game_id = game.game_id
                  and state = false and user_player = $1`;
    let result = await pool.query(sql, [user_id]);
    return { status: 200, result: result.rows };
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
}


module.exports.join_game = async function (user_id, game_id) {
  try {
    let res = await this.get_player_active_games(user_id);
    if (res.result.length > 0) {
      console.log('one match only')
      return {
        status: 200,
        result: { msg: "You can only have one active match." }
      }
    }

    let sql = `select * from player_game where game_id = $1`;
    console.log(game_id)
    res = await pool.query(sql, [game_id]);
    // since the match always has a player, no player means no match
    console.log(res.rows)
    if (res.rows.length == 0) {
      console.log('no match with id')
      return {
        status: 400,
        result: { msg: "There is no match with that id" }
      }
    } else if (res.rows.length > 1) {
      console.log('full')
      return {

        status: 200,
        result: { msg: "That match is full" }
      }
    }
    let opponent_id = res.rows[0].user_player
    sql = `insert into player_game (user_player, game_id,current_user_playing, player_actions,player_fac_id, can_move_troop, can_attack_troop) 
      values ($1,$2,$3,5,2,false,false) returning *`;
    res = await pool.query(sql, [user_id, game_id, opponent_id]);
    return {
      status: 200, result: {
        msg: "You successfully joined the match"
      }
    };
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
}

module.exports.get_players_and_games_waiting = async function (user_id) {
  try {
    let sql = `select game.game_id, player_game_id, username from player_game, game, users
                 where player_game.game_id = game.game_id and state = false and
                 user_id = user_player and
                 (select count(*) from player_game where player_game.game_id = game.game_id) = 1`
    let res = await pool.query(sql);
    return { status: 200, result: res.rows };
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }

}


module.exports.delete_all_from = async function (user_id, game_id,oponent_id) {
  console.log(game_id)
  try {
    let sql = `delete from user_troops where user_id = $1 or user_id = $2`
    await pool.query(sql, [user_id,oponent_id]);
    console.log('1')
    sql = `delete from user_buildings where user_id = $1 or user_id = $2`
    await pool.query(sql, [user_id,oponent_id]);
    console.log('2')
    sql = `delete from user_resources where user_id = $1 or user_id = $2`
    await pool.query(sql, [user_id,oponent_id]);
    console.log('3')
    sql = `delete from player_game where game_id = $1`
    await pool.query(sql, [game_id]);
    console.log('4')
    sql = `delete from random_rsc where game_id = $1`
    await pool.query(sql, [game_id]);
    console.log('5')
    sql = `delete from game where game_id = $1`
    await pool.query(sql, [game_id]);
    console.log('6')
    return { status: 200 };
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }

}

module.exports.check_if_game_started = async function (user_id) {
  try {
    let sql = `select game_started from game, player_game where player_game.game_id= game.game_id  and user_player = $1`;
    let result = await pool.query(sql, [user_id]);
    if (result.rows.length > 0) {
      let user = result.rows[0].game_started;
      return { status: 200, result: user };
    } else {
      return { status: 404, result: { msg: "No user with that id" } };
    }
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
}

module.exports.update_dice_number = async function (user_id) {
  let dice_number = Math.floor(Math.random() * (20 - 1 + 1) + 1);
  try {
    let sql = `UPDATE player_game SET dice_number  = $1  WHERE user_player  = $2`;
    let result = await pool.query(sql, [dice_number, user_id]);
    return { status: 200, result: { msg: dice_number } };
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
}


module.exports.check_if_dice_rolled = async function (game_id) {
  try {
    let sql = `select dice_number from player_game where game_id = $1 and dice_number > 0`;
    let result = await pool.query(sql, [game_id]);
    if (result.rows.length > 1) {
      let sql = `select user_player from player_game where game_id =$1  order by dice_number desc;`
      let result = await pool.query(sql, [game_id]);
      result = result.rows[0].user_player

      return { status: 200, result: { msg: result } };
    } else {
      return { status: 200, result: { msg: 'not rolled' } };
    }
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
}



module.exports.insert_initial_state = async function (user_id, game_id, fac_id, opponent_id) {
  console.log('Aquiiiiiiiiiiiiiiiiiiiiiiiiiiiii')
  if (fac_id == 1) {
    try {

      let sql = `UPDATE game SET game_started  = true  WHERE game_id  = $1`;
      await pool.query(sql, [game_id]);

      sql = `UPDATE player_game SET current_user_playing  = $1  WHERE game_id  = $2`;
      await pool.query(sql, [user_id,game_id]);

      sql = `UPDATE player_game SET player_fac_id  = $1  WHERE user_player  = $2`;
      await pool.query(sql, [1,user_id]);

      sql = `UPDATE player_game SET player_fac_id  = $1  WHERE user_player  = $2`;
      await pool.query(sql, [2,opponent_id]);

      sql = `insert into user_resources (user_id,rsc_id,rsc_amount)
      values($1,$2,$3);`;
      await pool.query(sql, [user_id, 1, 16]);
      await pool.query(sql, [user_id, 2, 16]);
      await pool.query(sql, [opponent_id, 1, 16]);
      await pool.query(sql, [opponent_id, 2, 16]);
      sql = `insert into user_buildings (user_id,bld_id,bld_x,bld_y,bld_current_health)
      values($1,$2,$3,$4,$5);`

      await pool.query(sql, [user_id, 1, 0, 7, 12]);
      await pool.query(sql, [user_id, 2, 0, 8, 12]);
      await pool.query(sql, [opponent_id, 6, 15, 7, 12]);
      await pool.query(sql, [opponent_id, 7, 15, 8, 12]);

      sql = `insert into user_troops(user_id,troop_id,troop_x,troop_y,troop_current_health,troop_current_movement,can_attack)
      values($1,$2,$3,$4,$5,$6,$7);`;

      await pool.query(sql, [user_id, 1, 0, 7, 4, 2, true]);
      await pool.query(sql, [opponent_id, 7, 15, 7, 4, 2, true]);

      sql = `insert into random_rsc (rsc,rsc_x,rsc_y,game_id)
      values($1,$2,$3,$4)`;

      await pool.query(sql, ['iron', Math.floor(Math.random() * (6 - 1 + 1) + 1), Math.floor(Math.random() * (15 - 1 + 1) + 1), game_id]);
      await pool.query(sql, ['food', Math.floor(Math.random() * (6 - 1 + 1) + 1), Math.floor(Math.random() * (15 - 1 + 1) + 1), game_id]);
      await pool.query(sql, ['iron', Math.floor(Math.random() * (14 - 9 + 1) + 9), Math.floor(Math.random() * (15 - 1 + 1) + 1), game_id]);
      await pool.query(sql, ['food', Math.floor(Math.random() * (14 - 9 + 1) + 9), Math.floor(Math.random() * (15 - 1 + 1) + 1), game_id]);

      return { status: 200, result: { msg: 'initial state inserted' } };

    } catch (err) {
      console.log(err);
      return { status: 500, result: err };
    }
  } else if (fac_id == 2) {
    try {
      let sql = `UPDATE game SET game_started  = true  WHERE game_id  = $1`;
      await pool.query(sql, [game_id]);

      sql = `UPDATE player_game SET current_user_playing  = $1  WHERE game_id  = $2`;
      await pool.query(sql, [user_id,game_id]);

      sql = `UPDATE player_game SET player_fac_id  = $1  WHERE user_player  = $2`;
      await pool.query(sql, [2,user_id]);

      sql = `UPDATE player_game SET player_fac_id  = $1  WHERE user_player  = $2`;
      await pool.query(sql, [1,opponent_id]);

  
      sql = `insert into user_resources (user_id,rsc_id,rsc_amount)
      values($1,$2,$3);`;
      await pool.query(sql, [opponent_id, 1, 16]);
      await pool.query(sql, [opponent_id, 2, 16]);
      await pool.query(sql, [user_id, 1, 16]);
      await pool.query(sql, [user_id, 2, 16]);
      sql = `insert into user_buildings (user_id,bld_id,bld_x,bld_y,bld_current_health)
      values($1,$2,$3,$4,$5);`

      await pool.query(sql, [opponent_id, 1, 0, 7, 12]);
      await pool.query(sql, [opponent_id, 2, 0, 8, 12]);
      await pool.query(sql, [user_id, 6, 15, 7, 12]);
      await pool.query(sql, [user_id, 7, 15, 8, 12]);

      sql = `insert into user_troops(user_id,troop_id,troop_x,troop_y,troop_current_health,troop_current_movement,can_attack)
      values($1,$2,$3,$4,$5,$6,$7);`;

      await pool.query(sql, [opponent_id, 1, 0, 7, 4, 2, true]);
      await pool.query(sql, [user_id, 7, 15, 7, 4, 2, true]);

      sql = `insert into random_rsc (rsc,rsc_x,rsc_y,game_id)
      values($1,$2,$3,$4) `;

      await pool.query(sql, ['iron', Math.floor(Math.random() * (6 - 1 + 1) + 1), Math.floor(Math.random() * (15 - 1 + 1) + 1), game_id]);
      await pool.query(sql, ['food', Math.floor(Math.random() * (6 - 1 + 1) + 1), Math.floor(Math.random() * (15 - 1 + 1) + 1), game_id]);
      await pool.query(sql, ['iron', Math.floor(Math.random() * (14 - 9 + 1) + 9), Math.floor(Math.random() * (15 - 1 + 1) + 1), game_id]);
      await pool.query(sql, ['food', Math.floor(Math.random() * (14 - 9 + 1) + 9), Math.floor(Math.random() * (15 - 1 + 1) + 1), game_id]);



      return { status: 200, result: { msg: 'initial state inserted' } };

    } catch (err) {
      console.log(err);
      return { status: 500, result: err };
    }
  }


}




