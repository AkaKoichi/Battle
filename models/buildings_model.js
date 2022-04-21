var pool = require('./connection.js')



module.exports.get_all_buildings = async function() {
  try {
    let sql = "Select * from buildings ";
    let result = await pool.query(sql);
    let buildings = result.rows;
    return { status: 200, result: buildings};
  } catch (err) {
    console.log(err);
    return { status: 500, result: err};
  }
}  

module.exports.get_buildings_id = async function(userId) {
  try {
    let sql = `Select build_x,build_y 
    from user_buildings
    where user_id = $1 `;
    let result = await pool.query(sql,[userId]);
    let buildings = result.rows;
    return { status: 200, result: buildings};
  } catch (err) {
    console.log(err); 
    return { status: 500, result: err};
  }
}  
   
