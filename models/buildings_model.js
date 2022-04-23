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

module.exports.get_buildings_id = async function(game_id) {
  try {
    let sql = `Select game.game_id,user_id,user_bld_id,user_buildings.bld_id,buildings.bld_id,bld_x,bld_y,bld_name,bld_health
    from user_buildings,buildings,player_game,game  
    where buildings.bld_id = user_buildings.bld_id and player_game.game_id = game.game_id and game.game_id = $1 `;
    let result = await pool.query(sql,[game_id]);
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
   
