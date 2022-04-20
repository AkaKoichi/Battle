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

module.exports.get_troops_id = async function(user_id) {
  try {
    let sql = `Select  trp_id,troop_id, troop_x,troop_y,trp_name,trp_health,trp_movement,trp_atack,trp_range,trp_max_amount 
    from user_troops,troops 
    where trp_id = troop_id and user_id = $1 `;
    let result = await pool.query(sql,[user_id]);
    let troops = result.rows;
    return { status: 200, result: troops};
  } catch (err) {
    console.log(err); 
    return { status: 500, result: err};
  }
} 

//  module-exports.update_troop = async function(user_id, user_troop_id,x,y){
//   try {
//     let sql = `UPDATE user_troop
//     SET column1 = value1, column2 = value2, ...
//     WHERE condition; `;
//     let result = await pool.query(sql,[user_id]);
//     let troops = result.rows;
//     return { status: 200, result: troops};
//   } catch (err) {
//     console.log(err); 
//     return { status: 500, result: err};
   
// } 


