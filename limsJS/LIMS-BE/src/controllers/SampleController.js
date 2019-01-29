const pool = require('./../config/database');
const regex = require('./../middlewares/regex');
const dbInteract = require('./../middlewares/db-interact');
const ValidateController = require('./ValidateController');

// Finish
async function addSample (req, res) {
	let body  = req.body;

	console.log(body)
	if(!regex.validateSampleName(body.name.toUpperCase())) {
		return;
	}
	if(await dbInteract.isExists(`SELECT * FROM Sample WHERE name='${body.name.toUpperCase()}'`)) {
		return;
	}
	const newSample = {
		name: body.name.toUpperCase()
	};
	
	await pool.query('INSERT INTO Sample SET ?', [newSample]);
};

// Finish
async function deleteSample (req, res) {
	let params = req.params;
	await pool.query('DELETE FROM Sample WHERE name= ?', [params.name]);
};

// Finis
async function getSamples (req, res) {
	const value = await pool.query('SELECT * FROM Sample ORDER BY name ASC');
	res.send({
		Samples : value
	});
};

// Finish
async function getSampleByName (req, res) {
	let params = req.params;
	const sample = await dbInteract.isExists(`SELECT * FROM Sample WHERE name='${params.name}'`);
	const test = await dbInteract.isExists(`SELECT * FROM Test WHERE name='${params.test}'`);
	const result = await ValidateController.SampleValidators(sample.result, test.result);
	if(result != true) {
		res.send({
			message: result.message
		});
		return;
	}
	res.send({
		Sample: sample.result
	});
};

// Finish
async function updateSample (req, res) {
	let params = req.params;
	let body = req.body;
	if(!regex.validateSampleName(body.name.toUpperCase())) return;
	if(await getSampleByName(req, res)) {
		res.send({
			message: "The sample already exists"
		});
		return;
	}
	await pool.query(`UPDATE Sample SET name='${body.name.toUpperCase()}' WHERE name=${params.name}`);
}

module.exports = {
	addSample: addSample,
	deleteSample: deleteSample,
	getSampleByName: getSampleByName,
	getSamples: getSamples,
	updateSample: updateSample
};
