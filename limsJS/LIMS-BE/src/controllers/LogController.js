const pool = require('./../config/database');
const dbInteract = require('./../middlewares/db-interact');

async function addLog (req, res) {
	let body  = req.body;
	
	if (dbInteract.isExists(`SELECT * FROM Sample WHERE name='${body.sample.toUpperCase()}'`)) {
		res.send({
			message: 'The sample doesn\'t exists'
		});
		return;
	}
	if (dbInteract.isExists(`SELECT * FROM Operator WHERE id=${body.operator}`)) {
		res.send({
			message: 'The operator doesn\'t exists'
		});
		return;
	}
	if(dbInteract.isExists(`SELECT * FROM Test WHERE name='${body.test.toUpperCase()}'`)) { 
		res.send({
			message: 'The test doesn\'t exists'
		});
		return;
	}
	if(dbInteract.isExists(`SELECT * FROM Status WHERE name='${body.status.toUpperCase()}'`)) {
		res.send({
			message: 'The status doesn\'t exists'
		});
		return;
	}
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

