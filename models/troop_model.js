var pool = require('./connection.js')

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
    Select game.game_id,user_id,user_trp_id,trp_id,troop_id, troop_x,troop_y,trp_name,trp_health,trp_movement,trp_attack,trp_range,trp_max_amount,troop_current_health,troop_current_movement 
    from user_troops,troops,player_game,game  
    where trp_id = troop_id and player_game.game_id = game.game_id and game.game_id = $1 ; `;
    let result = await pool.query(sql, [game_id]);
    let troops = result.rows;
    return { status: 200, result: troops };
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
}

module.exports.update_troop = async function (user_id, user_trp_id, x, y, health,current_movement) {
  try {
    console.log({ user_id, user_trp_id, x, y })
    let sql = `UPDATE user_troops SET troop_x = $3, troop_y = $4 , troop_current_health = $5, troop_current_movement =$6 WHERE user_id =$1 and user_trp_id =$2; `;
    let result = await pool.query(sql, [user_id, user_trp_id, x, y, health,current_movement]);
    let troops = result.rows;
    return { status: 200, result: troops };
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };

  }
}

module.exports.train = async function (user_id, troop_id, troop_x, troop_y, troop_current_health,troop_movement) {

  try {
    let sql = `Insert into user_troops (user_id,troop_id,troop_x,troop_y,troop_current_health,troop_current_movement)values ($1,$2,$3,$4,$5,$6) `;
    let result = await pool.query(sql, [user_id, troop_id, troop_x, troop_y, troop_current_health,troop_movement]);
    let troops = result.rows;
    return { status: 200, result: troops };
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
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






