var express = require('express');
var router = express.Router();
var rModel = require("../models/room_model");
            
router.get('/', async function(req, res, next) {
    let result = await rModel.getAllRooms();
    res.status(result.status).send(result.result);
});

router.get('/:id', async function(req, res, next) {
    let id = req.params.id;
    console.log("Get room with id "+id)
    let result = await rModel.getRoomById(id);
    res.status(result.status).send(result.result);
  });
            
module.exports = router;
