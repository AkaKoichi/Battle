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

module.exports.get_buildings_id = async function(user_id) {
    try {
      let sql = `Select building_x,building_y 
      from buildings
      where build_id = $1 `;
      let result = await pool.query(sql,[user_id]);
      let buildings = result.rows;
      return { status: 200, result: buildings};
    } catch (err) {
      console.log(err); 
      return { status: 500, result: err};
    }
  }  
   
