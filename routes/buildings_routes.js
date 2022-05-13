var express = require('express');
var router = express.Router();
var building_model = require("../models/buildings_model");





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
  let bld_x = req.body.bld_x;
  let bld_y = req.body.bld_y;
  let bld_current_health = req.body.bld_current_health;
  console.log("Get troop with id " + id)
  let result = await building_model.build_building(id, bld_id, bld_x, bld_y, bld_current_health);
  res.status(result.status).send(result.result);
});

module.exports = router;