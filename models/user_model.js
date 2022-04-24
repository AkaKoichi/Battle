var pool = require('./connection.js')
    
module.exports.login_check = async function (name,password) {
    try {
      let sql = `Select user_id from users where username = $1 and password = $2`;
      let result = await pool.query(sql,[name,password]);
      if (result.rows.length == 0) {
          return { status: 401, result: {msg: "Wrong password or username."}}
      }
      let user_id = result.rows[0].user_id;
      return { status: 200, result: {msg: "Login correct", userId : user_id} };
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

module.exports.register_user = async function(user) {
    try  {
      let sql = "Insert into users (username,password) values ($1,$2)";
      let result = await pool.query(sql,[user.name, user.password]); 
      return { status: 200, result:result }
    } catch (err){
      console.log(err);
      return { status: 500, result: err };
    }
}

module.exports.players_leader_board = async function() {
  try  {
    let sql = `SELECT username, user_trophies FROM users ORDER BY user_trophies DESC LIMIT 7`;
    let result = await pool.query(sql); 
    return { status: 200, result:result.rows }
  } catch (err){
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
  console.log('a')
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

module.exports.update_current_playing_by_game_id = async function (user_id,game_id) {
  try {
    let sql = `UPDATE player_game SET current_user_playing = $1 WHERE game_id = $2;`;
    let result = await pool.query(sql, [user_id,game_id]);
    let users = result.rows;
    return { status: 200, result: users };
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };

  }
}





