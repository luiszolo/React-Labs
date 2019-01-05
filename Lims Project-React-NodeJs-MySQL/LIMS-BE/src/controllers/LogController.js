const pool = require('../config/database');

async function addLog (req, res) {
	let params  = req.body;
	console.log(params);
	const newLog = {
		name: params.name
	};
	await pool.query('INSERT INTO Log SET ?', [newLog]);
	console.log(`Saved Log: ${newLog.name}`);
};

async function deleteLog (req, res) {
	let params = req.params;
	const deleteRow = await pool.query(`DELETE FROM Log WHERE id= ?`, [params.id]);
	res.redirect('/api/Logs/');
};

async function getLogs (req, res) {
	const value = await pool.query('SELECT * FROM Log ORDER BY name DESC');
	console.log(value);
	res.send({
		Logs : value
	});
};

async function getLogById (req, res) {
	let params = req.params;
	const id = params.id;
	const value = await pool.query('SELECT * FROM Log WHERE id = ?', [id]);
	console.log(value);
	res.send({
		Log : value
	});
};

async function updateLog (req, res) {
	let params = req.params;
	let body = req.body;
	const select = await pool.query('SELECT * FROM Log WHERE id = ?', [params.id]);
	const update = await pool.query(`UPDATE Log SET name='${body.name}' WHERE name='${select[0].name}'`);
	res.redirect('/api/Logs/' + params.id);
}

module.exports = {
	addLog: addLog,
	deleteLog: deleteLog,
	getLogById: getLogById,
	getLogs: getLogs,
	updateLog: updateLog
};

