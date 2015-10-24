var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ExpenseSchema = new Schema({
    created_at: { type: Date, default: Date.now },
    date: { type: Date, default: Date.now },
    amount: Number,
    category: String,
    remarks: String
});

module.exports = mongoose.model('Expense', ExpenseSchema);
