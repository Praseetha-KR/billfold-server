'use strict';

var express = require('express');
var morgan = require('morgan');
var app = express();
var bodyParser = require('body-parser');

var config =  require('./config/default');
var router =  require('./app/routes/expense');

var mongoose = require('mongoose');
mongoose.connect(config.mongouri);

var port = process.env.PORT || config.port;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan('dev'));
app.use('/api', router);

app.listen(port);
console.log('Listening on port ' + port);
