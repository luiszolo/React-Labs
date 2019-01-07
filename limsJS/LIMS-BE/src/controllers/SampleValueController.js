const pool = require('../config/database');

async function addSampleValue (req, res) { 
	let params  = req.body;
	console.log(params);
	const newSampleValue = {
		name: params.name
	};
	await pool.query('INSERT INTO SampleValue SET ?', [newSampleValue]);
	console.log(`Saved SampleValue: ${newSampleValue.name}`);
};

async function deleteSampleValue (req, res) {
	let params = req.params;
	const deleteRow = await pool.query(`DELETE FROM SampleValue WHERE id= ?`, [params.id]);
	res.redirect('/api/SampleValues/');
};

async function getSampleValues (req, res) {
	const value = await pool.query('SELECT * FROM SampleValue ORDER BY name DESC');
	console.log(value);
	res.send({
		SampleValues : value
	});
};

async function getSampleValueById (req, res) {
	let params = req.params;
	const id = params.id;
	const value = await pool.query('SELECT * FROM SampleValue WHERE id = ?', [id]);
	console.log(value);
	res.send({
		SampleValue : value
	});
};

async function updateSampleValue (req, res) {
	let params = req.params;
	let body = req.body;
	const select = await pool.query('SELECT * FROM SampleValue WHERE id = ?', [params.id]);
	const update = await pool.query(`UPDATE SampleValue SET name='${body.name}' WHERE name='${select[0].name}'`);
	res.redirect('/api/SampleValues/' + params.id);
}

module.exports = {
	addSampleValue: addSampleValue,
	deleteSampleValue: deleteSampleValue,
	getSampleValueById: getSampleValueById,
	getSampleValues: getSampleValues,
	updateSampleValue: updateSampleValue
};
