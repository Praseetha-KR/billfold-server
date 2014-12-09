var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Expense = require('../models/expenses');


router.use(function(req, res, next) {
	console.log('Middleware to use all the requests.');
	res.header("Access-Control-Allow-Origin", "*");
 	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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

module.exports = router;