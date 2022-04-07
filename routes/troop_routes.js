var express = require('express');
var router = express.Router();
var troop_model = require("../models/troop_model");
            
router.get('/', async function(req, res, next) {
    let result = await troop_model.get_all_troops();
    res.status(result.status).send(result.result);
});
      
module.exports = router;