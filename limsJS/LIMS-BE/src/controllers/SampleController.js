const pool = require('./../config/database');
const regex = require('./../middlewares/regex');

// CRUD
async function addSample (req, res) {
	let params  = req.body;
	console.log(params);
	if(!regex.validateSampleName(params.name)) return;
	if(await getSampleByName(req, res)) {
		res.send({
			message: "The sample already exists"
		});
		return;
	}
	const newSample = {
		name: params.name.toUpperCase()
	};
	await pool.query('INSERT INTO Sample SET ?', [newSample]);
	console.log(`Saved Sample: ${newSample.name}`);
	res.redirect('/api/Samples/');
};

async function deleteSample (req, res) {
	let params = req.params;
	const deleteRow = await pool.query('DELETE FROM Sample WHERE id= ?', [params.id]);
	res.redirect('/api/Samples/');
};

async function getSamples (req, res) {
	const value = await pool.query('SELECT * FROM Sample ORDER BY name DESC');
	console.log(value);
	res.send({
		Samples : value
	});
};

async function getSampleByName (req, res) {
	let params = req.body;
	const name = params.name;
	const value = await pool.query('SELECT * FROM Sample WHERE name = ?', [name]);

	if(value.length == 1) return true;
	
	res.send({
		Sample : value[0]
	});
	return false;
};

async function updateSample (req, res) {
	let params = req.params;
	let body = req.body;
	const select = await pool.query('SELECT * FROM Sample WHERE id = ?', [params.id]);
	const update = await pool.query(`UPDATE Sample SET name='${body.name}' WHERE name='${select[0].name}'`);
	res.redirect('/api/Samples/' + params.id);
}

module.exports = {
	addSample: addSample,
	deleteSample: deleteSample,
	getSampleByName: getSampleByName,
	getSamples: getSamples,
	updateSample: updateSample
};
