var express = require('express');
var router = express.Router();
var building_model = require("../models/tile_model");


router.get('/', async function(req, res, next) {
  let result = await building_model.get_all_buildings();
  res.status(result.status).send(result.result);
});

router.get('/:id', async function(req, res, next) {
  let id = req.params.id;
  console.log("Get Tile with id "+id)
  let result = await building_model.get_resources_id(id);
  res.status(result.status).send(result.result);
});

module.exports = router;