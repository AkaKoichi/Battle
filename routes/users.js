var express = require('express');
var router = express.Router();
var uModel = require("../models/user_model");
var auth = require("../models/authentication")

router.get('/game/:id', async function (req, res, next) {
    let id = req.params.id;
    console.log("Get game with id " + id)
    let result = await uModel.get_game_id_by_user(id);
    res.status(result.status).send(result.result);
});


router.get('/oponent/:id/:game_id', async function (req, res, next) {
    let id = req.params.id;
    let game_id = req.params.game_id
    console.log("Get game with id " + id)
    let result = await uModel.get_opponent_id_by_game(id,game_id);
    res.status(result.status).send(result.result);
});

router.put('/update_current/:id', async function (req, res, next) {
    console.log('entrou route')
    let id = req.params.id;
    let user_id = req.body.user_id;
    console.log("Get game with iddbb "+ id)
    let result = await uModel.update_current_playing_by_game_id(user_id,id);
    res.status(result.status).send(result.result);
});

router.get('/current/:id', async function (req, res, next) {
    let id = req.params.id;
    console.log("Get game with id " + id)
    let result = await uModel.check_current_playing_by_game_id(id);
    res.status(result.status).send(result.result);
});

router.get('/leader_board/', async function (req, res, next) {
    let result = await uModel.players_leader_board();
    res.status(result.status).send(result.result);
});


router.get('/game/:id', async function (req, res, next) {
    let id = req.params.id;
    console.log("Get game with idd " + id)
    let result = await uModel.get_players_by_game_id(id);
    res.status(result.status).send(result.result);
});

router.post('/login', async function (req, res, next) {
    console.log("Login")
    let name = req.body.name;
    let password = req.body.password;
    let result = await uModel.login_check(name, password);
    if (result.status == 200) {
        auth.save_user_id(res, result.result.userId);
        res.status(result.status).send({ msg: "User logged in" });
    } else res.status(result.status).send(result.result);
});

router.post('/logout', auth.check_authentication, async function (req, res, next) {
    console.log("Logout")
    auth.logout(res);
    res.status(200).send({ msg: "User logged out" });
});

router.get('/profile', auth.check_authentication, async function (req, res, next) {
    console.log("Get profile of logged user ");
    let result = await uModel.get_logged_user_info(req.userId);

    res.status(result.status).send(result.result);
});

router.post('/register', async function (req, res, next) {
    console.log("Register")
    let user = req.body;
    let result = await uModel.register_user(user);
    res.status(result.status).send(result.result);
});


module.exports = router;