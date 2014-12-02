exports.findAll = function(req, res) {
	res.send([{name: 'expense1'}, {name:'expense2'}, {name: 'expense3'}]);
};

exports.findById = function(req, res) {
	res.send({id: req.params.id, name: "The Expense", category: "sample_category", amount: "100"});
};

