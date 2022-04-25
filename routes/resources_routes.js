var express = require('express');
var router = express.Router();
var resources_model = require("../models/resources_model");


router.get('/', async function(req, res, next) {
  let result = await building_model.get_all_buildings();
  res.status(result.status).send(result.result);
});

router.get('/:id/:user_id', async function(req, res, next) {
  let id = req.params.id;
  let user_id = req.params.user_id;
  console.log("Get Resource with id "+id)
  let result = await resources_model.get_resources_id(id,user_id);
  res.status(result.status).send(result.result);
});

module.exports = router;