var express = require('express');
var router = express.Router();
var troop_model = require("../models/troop_model");
            



router.delete('/delete/:id', async function(req, res, next) {
  let id = req.params.id;
  console.log(id)
  console.log("Get troop with id "+id)
  let result = await troop_model.delete_troop(id);
  res.status(result.status).send(result.result);
});

router.put('/update/:id', async function(req, res, next) {
  let id = req.params.id;
  let user_trp_id = req.body.user_trp_id;
  let x = req.body.x;
  let y = req.body.y;
  let health = req.body.health;
  let movement = req.body.movement;
  console.log("Get troop with id "+id)
  console.log(id, user_trp_id,x,y)
  let result = await troop_model.update_troop(id,user_trp_id,x,y,health,movement);
  res.status(result.status).send(result.result);
});


router.get('/:id', async function(req, res, next) {
  let id = req.params.id;
  console.log("Get troop with id "+id)
  let result = await troop_model.get_troops_id(id);
  res.status(result.status).send(result.result);
});

router.get('/', async function(req, res, next) {
  let result = await troop_model.get_all_troops();
  res.status(result.status).send(result.result);
});

router.post('/train/:id', async function(req, res, next) {
  let id = req.params.id;
  let troop_id = req.body.troop_id;
  let troop_x = req.body.troop_x;
  let troop_y = req.body.troop_y;
  let troop_current_health = req.body.troop_current_health;
  let troop_movement = req.body.movement
  console.log("Get troop with id "+id)
  let result = await troop_model.train(id,troop_id,troop_x,troop_y,troop_current_health,troop_movement);
  res.status(result.status).send(result.result);
});
      
module.exports = router;