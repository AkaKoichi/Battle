var express = require('express');
var router = express.Router();
var troop_model = require("../models/troop_model");



router.put('/update_troop/:id', async function (req, res, next) {
  let user_id = req.params.id;
  let bit = req.body.bit;
 
  let result = await troop_model.update_troop(user_id,bit);
  res.status(result.status).send(result.result);
});

router.put('/attack/:id', async function (req, res, next) {
  let user_id = req.params.id;
  let attacker = req.body.attacker
  let defender = req.body.defender;
  let bit = req.body.bit;
  let game_id = req.body.game_id;
  let result = await troop_model.attack_troop(user_id, attacker, defender, bit,game_id);
  res.status(result.status).send(result.result);
});

router.put('/move/:id', async function (req, res, next) {
  let troop_id = req.params.id;
  let user_id = req.body.user_id
  let tile_x = req.body.tile_x;
  let tile_y = req.body.tile_y;
  let game_id = req.body.game_id;
  let result = await troop_model.move_troop(user_id, troop_id, tile_x, tile_y, game_id);
  res.status(result.status).send(result.result);
});

router.get('/resources/:id', async function (req, res, next) {
  let id = req.params.id;
  let result = await troop_model.get_all_troops_resources(id);
  res.status(result.status).send(result.result);
});


router.post('/train/:id', async function (req, res, next) {
  console.log('----')
  let troop_id = req.params.id;
  console.log(troop_id)
  let id = req.body.user_id;
  console.log(id)
  let bld_id = req.body.bld_id;
  let game_id= req.body.game_id;
  console.log(bld_id)
  console.log("Get troop with id " + troop_id);
  let result = await troop_model.train(id, troop_id, bld_id,game_id);
  res.status(result.status).send(result.result);
});

router.delete('/delete/:id', async function (req, res, next) {
  let id = req.params.id;
  console.log(id)
  console.log("Get troop with id " + id)
  let result = await troop_model.delete_troop(id);
  res.status(result.status).send(result.result);
});

router.put('/update/:id', async function (req, res, next) {
  let id = req.params.id;
  let user_trp_id = req.body.user_trp_id;
  let x = req.body.x;
  let y = req.body.y;
  let health = req.body.health;
  let movement = req.body.movement;
  console.log("Get troop with id " + id)
  console.log(id, user_trp_id, x, y)
  let result = await troop_model.update_troop_id(id, user_trp_id, x, y, health, movement);
  res.status(result.status).send(result.result);
});

router.get('/:id', async function (req, res, next) {
  let id = req.params.id;
  console.log("Get troop with id " + id)
  let result = await troop_model.get_troops_id(id);
  res.status(result.status).send(result.result);
});

router.get('/', async function (req, res, next) {
  let result = await troop_model.get_all_troops();
  res.status(result.status).send(result.result);
});


module.exports = router;