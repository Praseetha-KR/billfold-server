'use strict';

var express = require('express');
var cors = require('cors');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var config =  require('./config/default');
var router =  require('./app/routes/expense');

var mongoose = require('mongoose');
mongoose.connect(config.mongouri);

var port = process.env.PORT || config.port;

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));
app.use(cors());
app.use('/api', router);

app.listen(port);
console.log('Listening on port ' + port);
