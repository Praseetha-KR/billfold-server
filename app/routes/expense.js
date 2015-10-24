'use strict';

var express = require('express');
var router = express.Router();
var Expense = require('../models/expense');

router.use(function(req, res, next) {
    console.log('Request recieved');
    next();
});

router.get('/', function(req, res) {
    res.json({ message: 'Welcome to expense api!'});
});

router.route('/expenses')
    .post(function(req, res) {
        var expense = new Expense();
        expense.created_at = new Date();
        expense.date = req.body.date;
        expense.amount = req.body.amount;
        expense.category = req.body.category;
        expense.remarks = req.body.remarks;

        expense.save(function(err) {
            if (err) {
                res.send(err);
            }
            res.json(expense);
        });
    })
    .get(function(req, res) {
        Expense.find(function(err, expenses) {
            if (err) {
                res.send(err);
            }
            res.json(expenses);
        });
    });

router.route('/expenses/:expense_id')
    .get(function(req, res) {
        Expense.findById(req.params.expense_id, function(err, expense) {
            if (err) {
                res.send(err);
            }
            res.json(expense);
        });
    })
    .put(function(req, res) {
        Expense.findById(req.params.expense_id, function(err, expense) {
            if (err) {
                res.send(err);
            }
            expense.date = req.body.date;
            expense.amount = req.body.amount;
            expense.category = req.body.category;
            expense.remarks = req.body.remarks;

            expense.save(function(err) {
                if(err) {
                    res.send(err);
                }
                res.json(expense);
            });
        });
    })
    .patch(function(req, res) {
        Expense.findById(req.params.expense_id, function(err, expense) {
            if (err) {
                res.send(err);
            }
            if (req.body.date) {
                expense.date = req.body.date;
            }
            if (req.body.amount) {
                expense.amount = req.body.amount;
            }
            if (req.body.category) {
                expense.category = req.body.category;
            }
            if (req.body.remarks) {
                expense.remarks = req.body.remarks;
            }
            expense.update(expense, function(err) {
                if(err) {
                    res.send(err);
                }
                res.json(expense);
            });
        });
    })
    .delete(function(req, res) {
        Expense.remove({
            _id: req.params.expense_id
        }, function(err, expense) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Expense deleted', expense: expense });
        });
    });

module.exports = router;
