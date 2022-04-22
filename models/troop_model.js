var pool = require('./connection.js')

module.exports.get_all_troops = async function() {
  try {
    let sql = "Select * from troops ";
    let result = await pool.query(sql);
    let troops = result.rows;
    return { status: 200, result: troops};
  } catch (err) {
    console.log(err);
    return { status: 500, result: err};
  }
}  

module.exports.get_troops_id = async function(userId) {
  try {
    let sql = `Select  user_trp_id,trp_id,troop_id, troop_x,troop_y,trp_name,trp_health,trp_movement,trp_atack,trp_range,trp_max_amount 
    from user_troops,troops 
    where trp_id = troop_id and user_id = $1 `;
    let result = await pool.query(sql,[userId]);
    let troops = result.rows;
    return { status: 200, result: troops};
  } catch (err) {
    console.log(err); 
    return { status: 500, result: err};
  }
} 

  module.exports.update_troop = async function(user_id, user_trp_id,x,y){
   try {
     console.log({user_id, user_trp_id,x,y})
     let sql = `UPDATE user_troops SET troop_x = $3, troop_y = $4 WHERE user_id =$1 and user_trp_id =$2; `;
     let result = await pool.query(sql,[user_id,user_trp_id,x,y]);
     let troops = result.rows;
     return { status: 200, result: troops};
    }catch (err) {
     console.log(err); 
     return { status: 500, result: err};
   
 }
} 



