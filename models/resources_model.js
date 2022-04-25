var pool = require('./connection.js')

module.exports.get_all_resources = async function() {
  try {
    let sql = "Select * from resources ";
    let result = await pool.query(sql);
    let resources = result.rows;
    return { status: 200, result: resources};
  } catch (err) {
    console.log(err);
    return { status: 500, result: err};
  }
}  

module.exports.get_resources_id = async function(game_id,user_id) {
  try {
    let sql = `Select game.game_id,users.user_id,user_resources.rsc_id,rsc_type,rsc_amount 
    from user_resources,resources,player_game,game,users
    where users.user_id=user_resources.user_id 
    and user_resources.rsc_id = resources.rsc_id 
    and player_game.game_id = game.game_id 
    and game.game_id = $1 
    and users.user_id = $2 `;
    let result = await pool.query(sql,[game_id,user_id]);
    let resources = result.rows;
    return { status: 200, result: resources};
  } catch (err) {
    console.log(err); 
    return { status: 500, result: err};
  }
}  

module.exports.update_resources = async function (user_id, rsc_amount,rsc_id) {
  try {
    let sql = `UPDATE user_resources SET rsc_amount = $2 WHERE user_id = $1 and rsc_id= $3 ; `;
    let result = await pool.query(sql, [user_id, rsc_amount,rsc_id]);
    let resources = result.rows;
    return { status: 200, result: resources };
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
}

