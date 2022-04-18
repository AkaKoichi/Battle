require('dotenv').config()

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var roomsRouter = require('./routes/room_routes');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var troopsRouter = require('./routes/troop_routes');
var buildingsRouter = require('./routes/buildings_routes');
var resourcesRouter = require('./routes/resources_routes');
var tileRouter = require('./routes/tile_routes');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("secret"));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/rooms', roomsRouter);
app.use('/api/users', usersRouter);
app.use('/api/troops', troopsRouter);
app.use('/api/buildings', buildingsRouter);
app.use('/api/resources', resourcesRouter);
app.use('/api/tile', tileRouter);

module.exports = app;
