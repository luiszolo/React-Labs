const miscs = require('./../middlewares/miscs');
const pool = require('./../config/database');
const regex = require('./../middlewares/regex');

// Finish
async function addOperator (req, res) {
	let body  = req.body;
	if (body.id > 99999) {
		res.send({
			message: 'The operator id exceeds the limit'
		})
		return;
	}
	const newOperator = {
		id: body.id,
		name: body.name.toUpperCase()
	};
	const validateOperator = await pool.query(`SELECT * FROM Operator WHERE id='${newOperator.id}'`);
	if (validateOperator.length == 1) {
		res.send({
			message: 'This operator already exists!'
		});
		return;
	}
	if (!regex.notNumber(newOperator.name)) {
		res.send({
			message: 'Cannot add operator with numbers'
		})
		return;
	}
	await pool.query('INSERT INTO Operator SET ?', [newOperator]);
	res.send({
		message: 'Insertion successful'
	});
};

// Finish
async function deleteOperator (req, res) {
	let params = req.params;
	await pool.query('DELETE FROM Operator WHERE id= ?', [params.id]);
	res.send({
		message: 'Delete successful'
	});
};

// Finish
async function getOperators (req, res) {
	const value = await pool.query('SELECT * FROM Operator ORDER BY id ASC');
	for await (const element of value) { 
		element.name = miscs.capitalizeWord(element.name);
	}
	res.send({
		Operators : value
	});
};

// Finish
async function getOperatorById (req, res) {
	let params = req.params;
	const value = await pool.query(`SELECT * FROM Operator WHERE id = ${params.id}`);
	if (value.length == 0) { 
		res.send({ message: "The operator doesn't exist" }); 
		return;
	}
	value[0].name = miscs.capitalizeWord(value[0].name);
	res.send({
		Operator : value[0]
	});
};

// Finish
async function updateOperator (req, res) {
	let params = req.params;
	let body = req.body;
	if (body.id > 99999) {
		res.send({
			message: 'The operator id exceeds the limit'
		})
		return;
	}
	const validateOperator = await pool.query(`SELECT * FROM Operator WHERE id='${body.id}'`);
	if (validateOperator.length == 1) {
		res.send({
			message: 'This operator already exists!'
		});
		return;
	}
	if (!regex.notNumber(body.name.toUpperCase())) {
		res.send({
			message: 'Cannot add operator with numbers'
		})
		return;
	}
	await pool.query(`UPDATE Operator SET id=${body.id}, name='${body.name.toUpperCase()}' WHERE id=${params.id}`);
	res.send({
		message: 'Update successful'
	})
}

module.exports = {
	addOperator: addOperator,
	deleteOperator: deleteOperator,
	getOperatorById: getOperatorById,
	getOperators: getOperators,
	updateOperator: updateOperator
};

