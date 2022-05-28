var pool = require('./connection.js')
let { update_resources } = require('./resources_model')
let { check_current_playing_by_game_id } = require('./user_model')



module.exports.get_all_buildings = async function () {
  try {
    let sql = "Select * from buildings ";
    let result = await pool.query(sql);
    let buildings = result.rows;
    return { status: 200, result: buildings };
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
}

module.exports.get_buildings_id = async function (game_id) {

  try {
    let sql = `Select game.game_id,user_id,user_bld_id,user_buildings.bld_id,buildings.bld_id,bld_x,bld_y,bld_name,bld_health
    from user_buildings,buildings,player_game,game  
    where buildings.bld_id = user_buildings.bld_id and(user_buildings.user_id = user_player) and player_game.game_id = game.game_id and game.game_id = $1 `;

    let result = await pool.query(sql, [game_id]);
    let buildings = result.rows;
    return { status: 200, result: buildings };
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
}


module.exports.build_building = async function (user_id, troop_id, bit, game_id,fac_id) {

  let build_iron_cost;
  let build_food_cost;
  let user_iron;
  let user_food;
  let your_turn;
  let turn_id;
  let bld_name;
  if (bit == 1){
    bld_name ='Mine'
  }else if (bit == 2){
    bld_name ='Field'
  }else if (bit == 3){
    bld_name ='Training Camp'
  }
  let sql=`select bld_id 
  from buildings
  where bld_name like $1 and bld_fac_id = $2`
  let result = await pool.query(sql, [bld_name,fac_id]);
  result=result.rows[0].bld_id
  let bld_id = result;

  try {
    let sql = `select rsc_amount from resources_buildings where bld_id = $1`
    let result = await pool.query(sql, [bld_id]);
    build_iron_cost = result.rows[0].rsc_amount
    build_food_cost = result.rows[1].rsc_amount
    sql = `select rsc_amount from user_resources where user_id = $1`
    result = await pool.query(sql, [user_id]);
    user_iron = result.rows[0].rsc_amount
    user_food = result.rows[1].rsc_amount

    turn_id = await check_current_playing_by_game_id(game_id)
    turn_id = turn_id.result[0].current_user_playing
    your_turn = (turn_id == user_id)
  } catch (err) {
    return { status: 500, result: err };
  }
  if (
    (user_iron - build_iron_cost >= 0) &&
    (user_food - build_food_cost >= 0) &&
    (your_turn)) {
    try {
      let sql = `select bld_health from buildings where bld_id = $1`
      let result = await pool.query(sql, [bld_id]);
      let bld_current_health = result.rows[0].bld_health;

      sql = `select troop_x,troop_y from user_troops where user_trp_id = $1`
      let result_b = await pool.query(sql, [troop_id]);
      let x = result_b.rows[0].troop_x;
      let y = result_b.rows[0].troop_y;

      sql = `select user_bld_id
      from user_buildings
      where bld_x = $1 and bld_y = $2`
      result = await pool.query(sql, [x,y]);
      if (result.rows[0] != undefined) {
        return { status: 200, result: {msg:'building exists here'} };
      }

      sql = `Insert into user_buildings (user_id,bld_id,bld_x,bld_y,bld_current_health)values ($1,$2,$3,$4,$5) `;
      result = await pool.query(sql, [user_id, bld_id, x, y, bld_current_health]);
      let buildings = result.rows;
      console.log('mau mau')
      await update_resources(user_id, user_iron - build_iron_cost, 1)
      await update_resources(user_id, user_food - build_food_cost, 2)
      return { status: 200, result: buildings };
    } catch (err) {
      console.log(err);
      return { status: 500, result: err };
    }
  } else return { status: 400, result: 'wrong user turn ' };
}

module.exports.delete_building = async function (id) {
  try {
    let sql = `DELETE FROM user_buildings WHERE user_bld_id = $1; `;
    let result = await pool.query(sql, [id]);
    let troops = result.rows;
    return { status: 200, result: troops };
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };

  }
}

module.exports.update_building = async function (user_id, user_bld_id,health) {
  try {

    let sql = `UPDATE user_buildings  SET bld_current_health =$3 WHERE user_id =$1 and user_bld_id =$2; `;
    let result = await pool.query(sql, [user_id, user_bld_id,health]);
    let troops = result.rows;
    return { status: 200, result: troops };
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };

  }
}


