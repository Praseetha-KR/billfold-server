var mongoose = require('mongoose');

var ExpenseSchema = new mongoose.Schema({
	category: String,
	amount: Number,
	date: { type: Date, default: Date.now },
	remark: String
});

module.exports = mongoose.model('Expense', ExpenseSchema);