const pool = require('./../config/database');
const dbInteract = require('./../middlewares/db-interact');

// Testing
async function addLog (req, res) {
	let body  = req.body;
	console.log(body)
	const operator = await dbInteract.isExists(`SELECT * FROM Operator WHERE id='${body.operator}'`);
	if(operator == false) {
		res.send({
			message: 'The operator doesn\'t exists'
		});
		return;
	}

	const sample = await dbInteract.isExists(`SELECT * FROM Sample WHERE name='${body.sample.toUpperCase()}'`);
	if (sample == false) {
		res.send({
			message: 'The sample doesn\'t exists'
		});
		return;
	}

	const test = await dbInteract.isExists(`SELECT * FROM Test WHERE name='${body.test.toUpperCase()}'`);
	if (test == false) {
		res.send({
			message: 'The test doesn\'t exists'
		});
		return;
	}
	
	const status = await dbInteract.isExists(`SELECT * FROM Status WHERE name='${body.status.toUpperCase()}'`);
	if (status == false) {
		res.send({
			message: 'The status doesn\'t exists'
		});
		return;
	}
console.log(new Date(Date.now()).toISOString().slice(0, 19).replace('T', ' '));
	await pool.query(`INSERT INTO Log SET 
		operator_Id = ${operator.result.id}, sample_Id = ${sample.result.id},
		test_Id = ${test.result.id}, status_Id = ${status.result.id}, onCreated="${new Date(Date.now()).toISOString().slice(0, 19).replace('T', ' ').toString()}"
	`);

	res.send({
		message: 'Insertion successfull'
	});
};

// Unnecessary
async function deleteLog (req, res) {
	let params = req.params;
	await pool.query(`DELETE FROM Log WHERE id= ?`, [params.id]);
};

// Finish
async function getLogs (req, res) {
	const value = await pool.query('SELECT * FROM Log ORDER BY onCreated DESC');
	if (value == undefined) {
		res.send({
			message: "No logs founds"
		});
		return;
	}
	res.send({
		Logs : value
	});
};

// Finish
async function getLogBySample (req, res) {
	let params = req.params;
	const sample = await dbInteract.isExists(`SELECT * FROM Sample WHERE name='${params.sample.toUpperCase()}'`);
	if (sample == false) {
		res.send({
			message: 'The sample doesn\'t exists'
		});
		return;
	}

	const value = await pool.query('SELECT * FROM Log WHERE sample_Id = ?', [sample.result.id]);
	res.send({
		Logs : value
	});
};

// Unnecessary
async function updateLog (req, res) {
	let params = req.params;
	let body = req.body;
	const select = await pool.query('SELECT * FROM Log WHERE id = ?', [params.id]);
	const update = await pool.query(`UPDATE Log SET name='${body.name}' WHERE name='${select[0].name}'`);
}

module.exports = {
	addLog: addLog,
	deleteLog: deleteLog,
	getLogBySample: getLogBySample,
	getLogs: getLogs,
	updateLog: updateLog
};

