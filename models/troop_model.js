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