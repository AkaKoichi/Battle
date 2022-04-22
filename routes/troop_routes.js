var express = require('express');
var router = express.Router();
var troop_model = require("../models/troop_model");
            





router.put('/update/:id', async function(req, res, next) {
  let id = req.params.id;
  let user_trp_id = req.body.user_trp_id;
  let x = req.body.x;
  let y = req.body.y;
  console.log("Get troop with id "+id)
  console.log(id, user_trp_id,x,y)
  let result = await troop_model.update_troop(id,user_trp_id,x,y);
  res.status(result.status).send(result.result);
});

router.get('/:id', async function(req, res, next) {
  let id = req.params.id;
  console.log("Get troop with idd "+id)
  let result = await troop_model.get_troops_id(id);
  res.status(result.status).send(result.result);
});

router.get('/', async function(req, res, next) {
  let result = await troop_model.get_all_troops();
  res.status(result.status).send(result.result);
});
      
      
module.exports = router;