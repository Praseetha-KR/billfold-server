'use strict';

var express = require('express');
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
app.use('/', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    next();
});

app.use('/api', router);


app.listen(port);
console.log('Listening on port ' + port);
