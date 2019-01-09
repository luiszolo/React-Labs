const pool = require('./../config/database');
const regex = require('./../middlewares/regex');

// Finish
async function addSample (req, res) {
	let body  = req.body;
	if(!regex.validateSampleName(body.name.toUpperCase())) return;
	if(await getSampleByName(req, res)) {
		res.send({
			message: "The sample already exists"
		});
		return;
	}
	const newSample = {
		name: body.name.toUpperCase()
	};
	await pool.query('INSERT INTO Sample SET ?', [newSample]);
	res.send({
		message: 'Insertion successfull'
	});
};

// Finish
async function deleteSample (req, res) {
	let params = req.params;
	await pool.query('DELETE FROM Sample WHERE name= ?', [params.name]);
	res.send({
		message: 'Delete successfull'
	});
};

// Finis
async function getSamples (req, res) {
	const value = await pool.query('SELECT * FROM Sample ORDER BY name ASC');
	console.log(value);
	res.send({
		Samples : value
	});
};

// Finish
async function getSampleByName (req, res) {
	let params = req.body;
	const name = params.name;
	const value = await pool.query('SELECT * FROM Sample WHERE name = ?', [name]);
	
	res.send({
		Sample : value[0]
	});

	if(value.length == 1) return true;
	return false;
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
	res.send({
		message: 'Update successfull'
	});
}

module.exports = {
	addSample: addSample,
	deleteSample: deleteSample,
	getSampleByName: getSampleByName,
	getSamples: getSamples,
	updateSample: updateSample
};
