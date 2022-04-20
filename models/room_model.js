var pool = require('./connection.js')

module.exports.get_all_rooms = async function() {
  try {
    let sql = "Select * from room";
    let result = await pool.query(sql);
    let rooms = result.rows;
    return { status: 200, result: rooms};
  } catch (err) {
    console.log(err);
    return { status: 500, result: err};
  }
}  


module.exports.get_room_by_id = async function (id) {
    try {
      let sql = "Select * from room where room_id = $1";
      let result = await pool.query(sql, [id]);
      console.log(result)
      if (result.rows.length > 0) {
        let room = result.rows[0];
        return { status: 200, result: room };
      } else {
        return { status: 404, result: { msg: "No room with that id" } };
      }
    } catch (err) {
      console.log(err);
      return { status: 500, result: err };
    }
  }

  module.exports.user_to_room = async function(user) {
    try  {
      let sql = "Insert into user_to_room (usr_id,room_id) values ($1,$2)";
      let result = await pool.query(sql,[user.id, user.room]); 
      return { status: 200, result:result }
    } catch (err){
      console.log(err);
      return { status: 500, result: err };
    }
}

module.exports.get_search_room = async function () {
 
  try {
    let sql = "Select room_id from room where room_is_full = false";
    let result = await pool.query(sql);
    let rooms = result.rows;
    return { status: 200, result: rooms};
  } catch (err) {
    console.log(err);
    return { status: 500, result: err};
  }
}
