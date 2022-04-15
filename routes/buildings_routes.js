var express = require('express');
var router = express.Router();
var building_model = require("../models/buildings_model");


router.get('/', async function(req, res, next) {
  let result = await building_model.get_all_buildings();
  res.status(result.status).send(result.result);
});

router.get('/:id', async function(req, res, next) {
  let id = req.params.id;
  console.log("Get building with id "+id)
  let result = await building_model.get_buildings_id(id);
  res.status(result.status).send(result.result);
});

module.exports = router;