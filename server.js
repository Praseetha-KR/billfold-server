var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/expensetestdb');

var Expense = require('./app/models/expenses');

var router = express.Router();

router.use(function(req, res, next) {
	console.log('Middleware to use all the requests.');
	next();
});

router.get('/', function(req, res) {
	res.json({ message: 'Welcome to ExpenseApp!'});
});

router.route('/expenses')
	.post(function(req, res) {
		var expense = new Expense();
		expense.category = req.body.category;
		expense.amount = req.body.amount;
		expense.date = req.body.date;
		expense.remark = req.body.remark;

		expense.save(function(err) {
			if (err)
				res.send(err)
			res.json({ message: 'Expense added!'});
		});
	});

app.use('/expenses', router);

app.listen(port);
console.log('Express server is listening on port ' + port);