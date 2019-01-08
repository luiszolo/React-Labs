const pool = require('../config/database');

async function addStatus (req, res) { 
	let params  = req.body;
	console.log(params);
	const newStatus = {
		name: params.name.toUpperCase()
	};
	await pool.query('INSERT INTO Status SET ?', [newStatus]);
	console.log(`Saved Status: ${newStatus.name}`);
};

async function deleteStatus (req, res) {
	let params = req.params;
	const deleteRow = await pool.query('DELETE FROM Status WHERE id= ?', [params.id]);
	res.redirect('/api/Statuss/');
};

async function getStatuss (req, res) {
	const value = await pool.query('SELECT * FROM Status ORDER BY name DESC');
	console.log(value);
	res.send({
		Statuss : value
	});
};

async function getStatusById (req, res) {
	let params = req.params;
	const id = params.id;
	const value = await pool.query('SELECT * FROM Status WHERE id = ?', [id]);
	console.log(value);
	res.send({
		Status : value
	});
};

async function updateStatus (req, res) {
	let params = req.params;
	let body = req.body;
	const select = await pool.query('SELECT * FROM Status WHERE id = ?', [params.id]);
	const update = await pool.query(`UPDATE Status SET name='${body.name}' WHERE name='${select[0].name}'`);
	res.redirect('/api/Statuss/' + params.id);
}

module.exports = {
	addStatus: addStatus,
	deleteStatus: deleteStatus,
	getStatusById: getStatusById,
	getStatuss: getStatuss,
	updateStatus: updateStatus
};
