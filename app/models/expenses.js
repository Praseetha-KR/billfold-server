var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ExpenseSchema = new Schema({
	category: String,
	amount: Number,
	date: { type: Date, default: Date.now },
	remark: String
});

module.exports = mongoose.model('Expense', ExpenseSchema);