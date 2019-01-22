const pool = require('./../config/database');
const dbInteract = require('./../middlewares/db-interact');

// Finish
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
	await pool.query(`INSERT INTO Log SET 
		operator_Id = ${operator.result.id}, sample_Id = ${sample.result.id},
		test_Id = ${test.result.id}, status_Id = ${status.result.id}, onCreated="${new Date(Date.now()).toISOString().slice(0, 19).replace('T', ' ')}"
	`);
};

// Unnecessary
async function deleteLog (req, res) {
	let params = req.params;
	await pool.query(`DELETE FROM Log WHERE id= ?`, [params.id]);
};

// Finish
async function getLogs (req, res) {
	const value = await pool.query(`
		SELECT Operator.id AS 'UserID', Sample.name AS 'Sample', Status.name AS 'State', Test.name AS 'Test', Log.onCreated AS 'On Created' FROM Log
		JOIN Status ON Status.id = Log.status_Id 
		JOIN Test ON Test.id = Log.test_Id
		JOIN Operator ON Operator.id = Log.operator_Id
		JOIN Sample ON Sample.id = Log.sample_Id
	`);
	if (value == undefined) {
		res.send({
			message: "No logs founds"
		});
		return;
	}

	for await (const result of value) {
		result["On Created"] = result['On Created'].toISOString().slice(0, 19).replace('T', ' ');
	}
	res.send({
		Logs : value
	});
};

// Finish
async function getLogBySample (req, res) {
	let params = req.params;
	console.log(params);
	const sample = await dbInteract.isExists(`SELECT * FROM Sample WHERE name='${params.name}'`); // no me esta filtrando por id siempre sale que no existe la sample 
	if (sample == false) {
		res.send({
			message: 'The sample doesn\'t exists'
		});
		return;
	}

	const value = await pool.query(`
		SELECT Operator.id AS 'UserID',Sample.name AS 'Sample', Status.name AS 'State', Test.name AS 'Test', Log.onCreated AS 'On Created' FROM Log
		JOIN Status ON Status.id = Log.status_Id 
		JOIN Test ON Test.id = Log.test_Id
		JOIN Operator ON Operator.id = Log.operator_Id 
		JOIN Sample ON Sample.id = Log.sample_Id WHERE Log.sample_Id=${sample.result.id}
	`);
	
	if (value[0] == undefined) {
		res.send({
			message : "This sample doesn\'t have any log registry"
		});
		return;
	}

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

