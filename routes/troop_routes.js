var express = require('express');
var router = express.Router();
var troop_model = require("../models/troop_model");
            
router.get('/', async function(req, res, next) {
    let result = await troop_model.get_all_troops();
    res.status(result.status).send(result.result);
});


router.get('/:id', async function(req, res, next) {
    let id = req.params.id;
    console.log('SSSSSSSSSSSSSSSSSSSSSSSSSSSS')
    console.log(req.params.id)
    console.log("Get troop with id "+id)
    let result = await troop_model.get_troops_id(id);
    res.status(result.status).send(result.result);
  });

    router.post('/update/:id/:user_trp_id/:x/:y`', async function(req, res, next) {
     let id = req.params.id;
     let user_trp_id = req.params.user_trp_id;
     let x = req.params.x;
     let y = req.params.y;
     console.log("Get troop with id "+id)
     let result = await troop_model.update_troops(id,user_trp_id,x,y);
     res.status(result.status).send(result.result);
   });
      
      
module.exports = router;