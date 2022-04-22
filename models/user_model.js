var pool = require('./connection.js')
    
module.exports.login_check = async function (name,password) {
    try {
      let sql = `Select user_id from users where username = $1 and password = $2`;
      let result = await pool.query(sql,[name,password]);
      if (result.rows.length == 0) {
          return { status: 401, result: {msg: "Wrong password or username."}}
      }
      let user_id = result.rows[0].user_id;
      return { status: 200, result: {msg: "Login correct", userId : user_id} };
    } catch (err) {
      console.log(err);
      return { status: 500, result: err };
    }
  }

  module.exports.get_logged_user_info = async function (userId) {
    console.log('AAA')
    try {
        let sql = `Select user_id ,username
         from users 
         where user_id = $1`;
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

module.exports.register_user = async function(user) {
    try  {
      let sql = "Insert into users (username,password) values ($1,$2)";
      let result = await pool.query(sql,[user.name, user.password]); 
      return { status: 200, result:result }
    } catch (err){
      console.log(err);
      return { status: 500, result: err };
    }
}

