var pool = require('./connection.js')
    
module.exports.loginCheck = async function (name,password) {
    try {
      let sql = `Select usr_id from users where usr_name = $1 and usr_password = $2`;
      let result = await pool.query(sql,[name,password]);
      if (result.rows.length == 0) {
          return { status: 401, result: {msg: "Wrong password or username."}}
      }
      let usr_id = result.rows[0].usr_id;
      return { status: 200, result: {msg: "Login correct", userId : usr_id} };
    } catch (err) {
      console.log(err);
      return { status: 500, result: err };
    }
  }

  module.exports.getLoggedUserInfo = async function (userId) {
    try {
        let sql = `Select usr_name from users where usr_id = $1`;
        let result = await pool.query(sql, [userId]);
        if (result.rows.length > 0) {
            let user = result.rows[0];
            return { status: 200, result: user };
        } else {
            return { status: 404, result: { msg: "No user with that id" } };
        }
    } catch (err) {
      console.log(err);
      return { status: 500, result: err };
    }
  }

module.exports.registerUser = async function(user) {
    try  {
      let sql = "Insert into users (usr_name,usr_password) values ($1,$2)";
      let result = await pool.query(sql,[user.name, user.password]); 
      return { status: 200, result:result }
    } catch (err){
      console.log(err);
      return { status: 500, result: err };
    }
}

