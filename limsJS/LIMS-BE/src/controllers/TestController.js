const pool = require('../config/database');
const regex = require('./../middlewares/regex');

async function addTest (req, res) {
	const params  = req.body;
	const newTest = {
		name: params.name,
		samplesLength: params.sampleLength,
		attributes: params.attributes
	};
	const validateTest = await pool.query(`SELECT * FROM Test WHERE name='${newTest.name}'`);
	if (validateTest.length == 1) {
		res.send({
			message: 'This test already exists!'
		});
		return;
	}
	if (!regex.notNumber(newTest.name)) {
		res.send({
			message: 'Cannot add test with numbers'
		});
		return;
	}
	await pool.query(`INSERT INTO Test SET name='${newTest.name.toUpperCase()}', samplesLength=${newTest.samplesLength}, status=true`);
	if (newTest.attributes != null) {
		params.attributes.forEach(async function(element) {
			const auxAttribute = await pool.query('SELECT * FROM Attribute WHERE name = ?', [element]);
			if(auxAttribute != null || auxAttribute != [{  }]) {
				await pool.query(`INSERT INTO TestAttributes SET ?`, [params.id, auxAttribute.id]);
			}
			console.log(`Saved Test: ${newTest}`);
		});
	}
	res.redirect('/api/tests');
};

async function deleteTest (req, res) {
	const params = req.params;
	await pool.query(`UPDATE Test SET status=false WHERE id=?`, [params.id]);
	res.redirect('/api/tests/');
};

async function getTests (req, res) {
	let value;
	if (req.params == null)
	const value = await pool.query('SELECT * FROM Test ORDER BY name DESC');
	console.log(value);
	res.send({
		Tests : value
	});
};

async function getTestById (req, res) {
	let params = req.params;
	const id = params.id;
	const value = await pool.query('SELECT * FROM Test WHERE id = ?', [id]);
	res.send({
		Test : value
	});
};

async function updateTest (req, res) {
	let params = req.params;
	let body = req.body;
	const newTest = {
		name: body.name,
		attributes: body.attributes
	};
	if (validateTest.length == 1) {
		res.send({
			message: 'This test already exists!'
		});
		return;
	}
	if (!regex.notNumber(newTest.name)) {
		res.send({
			message: 'Cannot add test with numbers'
		});
		return;
	}
	await pool.query(`UPDATE Test SET name='${body.name}' WHERE id='${params.id}'`);
	if (newTest.attributes != null) {
		params.attributes.forEach(async function(element) {
			const auxAttribute = await pool.query('SELECT * FROM Attribute WHERE name = ?', [element]);
			if(auxAttribute != null || auxAttribute != [{ }]){
				await pool.query(`UPDATE TestAttribute SET test_Id='${params.id}', attribute_Id='${auxAttribute.id}'`, [params.id, auxAttribute.id]);
				console.log(`Test updated!: ${newTest}`);
			}
		});
	}
	res.redirect('/api/tests/' + params.id);
}

module.exports = {
	addTest: addTest,
	deleteTest: deleteTest,
	getTestById: getTestById,
	getTests: getTests,
	updateTest: updateTest
};

