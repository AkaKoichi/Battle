var pool = require('./connection.js')

module.exports.get_all_tile = async function() {
  try {
    let sql = "Select * from tiles ";
    let result = await pool.query(sql);
    let tile = result.rows;
    return { status: 200, result: tile};
  } catch (err) {
    console.log(err);
    return { status: 500, result: err};
  }
}  

module.exports.get_tile_id = async function(user_id) {
  try {
    let sql = `Select troop_x,troop_y 
    from user_troop 
    where user_id = $1 `;
    let result = await pool.query(sql,[user_id]);
    let tile = result.rows;
    return { status: 200, result: tile};
  } catch (err) {
    console.log(err); 
    return { status: 500, result: err};
  }
}  

