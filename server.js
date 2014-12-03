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

		expense.save(function(err, expense) {
			if (err) {
				return console.error(err);
			}
			console.log(expense);
			res.json({ message: 'Expense added!'});
		});
	})
	.get(function(req, res) {
		Expense.find(function(err, expenses) {
			if (err)
				res.send(err);
			res.json(expenses);
		});
	});

router.route('/expenses/:expense_id')
	.get(function(req, res) {
		Expense.findById(req.params.expense_id, function(err, expense) {
			if (err)
				res.send(err);
			res.json(expense);
		});
	})
	.put(function(req, res) {
		Expense.findById(req.params.expense_id, function(err, expense) {
			if (err)
				res.send(err);

			expense.category = req.body.category;
			expense.amount = req.body.amount;
			expense.date = req.body.date;
			expense.remark = req.body.remark;

			expense.save(function(err) {
				if (err)
					res.send(err);
				res.json({ message: 'Expense updated!' });
			});
		});
	})
	.delete(function(req, res) {
		Expense.remove({
			_id: req.params.expense_id
		}, function(err, expense) {
			if (err)
				res.send(err);
			res.json({ message: 'Successfully deleted!' });
		});
	});

app.use('/api', router);

app.listen(port);
console.log('Express server is listening on port ' + port);

process.on("SIGINT", function() {
    mongoose.connection.close(function () {
        console.log("Mongoose disconnected on app termination");
        process.exit(0);
    });
});