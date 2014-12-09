var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/expensetestdb');

var expenseRouter = require('./app/routes/expenses');
app.use('/api', expenseRouter);

app.listen(port);
console.log('Express server is listening on port ' + port);

process.on("SIGINT", function() {
    mongoose.connection.close(function () {
        console.log("Mongoose disconnected on app termination");
        process.exit(0);
    });
});