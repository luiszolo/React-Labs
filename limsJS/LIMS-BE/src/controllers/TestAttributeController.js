// Unnecessary Controller

const pool = require('../config/database');

async function addTestAttribute (req, res) {
	let params  = req.body;
	console.log(params);
	const newTestAttribute = {
		name: params.name
	};
	await pool.query('INSERT INTO TestAttribute SET ?', [newTestAttribute]);
	console.log(`Saved TestAttribute: ${newTestAttribute.name}`);
};

async function deleteTestAttribute (req, res) {
	let params = req.params;
	const deleteRow = await pool.query(`DELETE FROM TestAttribute WHERE id= ?`, [params.id]);
	res.redirect('/api/TestAttributes/');
};

async function getTestAttributes (req, res) {
	const value = await pool.query('SELECT * FROM TestAttribute ORDER BY name DESC');
	console.log(value);
	res.send({
		TestAttributes : value
	});
};

async function getTestAttributeById (req, res) {
	let params = req.params;
	const id = params.id;
	const value = await pool.query('SELECT * FROM TestAttribute WHERE id = ?', [id]);
	console.log(value);
	res.send({
		TestAttribute : value
	});
};

async function updateTestAttribute (req, res) {
	let params = req.params;
	let body = req.body;
	const select = await pool.query('SELECT * FROM TestAttribute WHERE id = ?', [params.id]);
	const update = await pool.query(`UPDATE TestAttribute SET name='${body.name}' WHERE name='${select[0].name}'`);
	res.redirect('/api/TestAttributes/' + params.id);
}

module.exports = {
	addTestAttribute: addTestAttribute,
	deleteTestAttribute: deleteTestAttribute,
	getTestAttributeById: getTestAttributeById,
	getTestAttributes: getTestAttributes,
	updateTestAttribute: updateTestAttribute
};

