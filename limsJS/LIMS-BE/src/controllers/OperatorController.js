const pool = require('../config/database');

async function addOperator (req, res) {
	if (await pool.query('SELECT MAX(id) FROM Operator') == 99999) {
		res.send({
			message: 'The operator id exceeds the limit'
		})
		return;
	}
	let params  = req.body;
	console.log(params);
	const newOperator = {
		name: params.name.toUpperCase()
	};
	await pool.query('INSERT INTO Operator SET ?', [newOperator]);
	console.log(`Saved Operator: ${newOperator.name}`);
};

async function deleteOperator (req, res) {
	let params = req.params;
	const deleteRow = await pool.query('DELETE FROM Operator WHERE id= ?', [params.id]);
	res.redirect('/api/perators/');
};

async function getOperators (req, res) {
	const value = await pool.query('SELECT * FROM Operator ORDER BY id ASC');
	console.log(value);
	res.send({
		Operators : value
	});
};

async function getOperatorById (req, res) {
	let params = req.params;
	const id = params.id;
	const value = await pool.query('SELECT * FROM Operator WHERE id = ?', [id])[0];
	console.log(value);
	if (value == undefined) res.send({ message: "Operator doesn't exists" });
	res.send({
		Operator : value
	});
};

async function updateOperator (req, res) {
	let params = req.params;
	let body = req.body;
	const select = await pool.query('SELECT * FROM Operator WHERE id = ?', [params.id]);
	const update = await pool.query(`UPDATE Operator SET name='${body.name}' WHERE name='${select[0].name}'`);
	res.redirect('/api/operators/' + params.id);
}

module.exports = {
	addOperator: addOperator,
	deleteOperator: deleteOperator,
	getOperatorById: getOperatorById,
	getOperators: getOperators,
	updateOperator: updateOperator
};

