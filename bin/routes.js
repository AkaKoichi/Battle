let pg = require('pg');


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