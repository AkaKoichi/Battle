var express = require('express');
var router = express.Router();
var building_model = require("../models/buildings_model");

router.put('/update/:id', async function (req, res, next) {

  let id = req.body.id;
  console.log(id)
  let user_bld_id = req.params.id;
  console.log(user_bld_id)
  let health = req.body.health;
  console.log(health)
  let result = await building_model.update_building(id,user_bld_id, health);
  res.status(result.status).send(result.result);
});

router.delete('/delete/:id', async function (req, res, next) {
  console.log('aaa')
  let id = req.params.id;
  console.log(id)
  console.log("Get troop with id " + id)
  let result = await building_model.delete_building(id);
  res.status(result.status).send(result.result);
});

router.get('/', async function (req, res, next) {
  let result = await building_model.get_all_buildings();
  res.status(result.status).send(result.result);
});

router.get('/:id', async function (req, res, next) {
  let id = req.params.id;
  console.log("Get building with id " + id)
  let result = await building_model.get_buildings_id(id);
  res.status(result.status).send(result.result);
});

router.post('/build/:id', async function (req, res, next) {
  let id = req.params.id;
  let bld_id = req.body.bld_id;
  let troop_id = req.body.troop_id;
  let game_id = req.body.game_id;
  let result = await building_model.build_building(id, troop_id,bld_id,game_id);
  res.status(result.status).send(result.result);
});


module.exports = router;