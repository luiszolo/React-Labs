const pool = require('../config/database');

async function addTest (req, res) {
	let params  = req.body;
	console.log(params);
	const newTest = {
		name: params.name
	};
	await pool.query('INSERT INTO Test SET ?', [newTest]);
	console.log(`Saved Test: ${newTest.name}`);
};

async function deleteTest (req, res) {
	let params = req.params;
	const deleteRow = await pool.query(`DELETE FROM Test WHERE id= ?`, [params.id]);
	res.redirect('/api/tests/');
};

async function getTests (req, res) {
	const value = await pool.query('SELECT * FROM Test ORDER BY name DESC');
	console.log(value);
	res.send({
		Tests : value
	});
};

async function getTestById (req, res) {
	let params = req.params;
	const id = params.id;
	const value = await pool.query('SELECT * FROM Test WHERE id = ?', [id]);
	console.log(value);
	res.send({
		Test : value
	});
};

async function updateTest (req, res) {
	let params = req.params;
	let body = req.body;
	const select = await pool.query('SELECT * FROM Test WHERE id = ?', [params.id]);
	const update = await pool.query(`UPDATE Test SET name='${body.name}' WHERE name='${select[0].name}'`);
	res.redirect('/api/tests/' + params.id);
}

module.exports = {
	addTest: addTest,
	deleteTest: deleteTest,
	getTestById: getTestById,
	getTests: getTests,
	updateTest: updateTest
};

