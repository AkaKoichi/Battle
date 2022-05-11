let pg = require('pg');
let util = require('util');


let pool = new pg.Pool({
    host: 'ec2-52-18-116-67.eu-west-1.compute.amazonaws.com',
    user: 'egcinjnbmoptwo',
    password: 'aa895cbb2c97d53e06ba520023b2009797fdfb7599a81ebe2f275eacf5f1c9e6',
    database: 'd92tcj91fmvebo'
})

pool.query = util.promisify(pool.query);

process.once('SIGTERM', end);
function end() {
  server.close((err) => {
    if (err) throw err;
    pool.end((e) => {
      if (e) throw e;
      process.exit();
    });
  });

}

module.exports = (app)=>{
    app.get('/api/rooms/:id', async function(req, res, next) {
        let sql ='Select * from room where room_id = $1';
        pool.query(sql,[req.params.id],(e,r)=>{
            if (e) return res.status(500).send(e);
            res.status(200).send(r)
        })
    })
}