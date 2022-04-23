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
    let sql = `Select bld_x,bld_y 
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

module.exports.build_building = async function(user_id,bld_id,bld_x,bld_y,bld_current_health){
  try {
    let sql = `Insert into user_buildings (user_id,bld_id,bld_x,bld_y,bld_current_health)values ($1,$2,$3,$4,$5) `;
    let result = await pool.query(sql,[user_id,bld_id,bld_x,bld_y,bld_current_health]);
    let buildings = result.rows;
    return { status: 200, result: buildings};
   }catch (err) {
    console.log(err); 
    return { status: 500, result: err};
  }
} 
   
