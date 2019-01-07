const pool = require('../config/database');

async function addTest (req, res) {
	let params  = req.body;
	console.log(params);
	const newTest = {
		name: params.name,
		attributes: params.attributes
	};
	await pool.query('INSERT INTO Test SET ?', [newTest.name]);
	if (newTest.attributes != null) {
		params.attributes.forEach(async function(element) {
			const auxAttribute = await pool.query('SELECT * FROM Attribute WHERE name = ?', [element]);
			if(auxAttribute != null || auxAttribute != [{  }]) {
				await pool.query(`INSERT INTO TestAttributes SET ?`, [params.id, auxAttribute.id]);
			}
		});
	}
	console.log(`Saved Test: ${newTest.name}`);
	res.redirect('/api/tests');
};

async function deleteTest (req, res) {
	let params = req.params;
	await pool.query(`DELETE FROM TestAttribute WHERE test_Id=${params.id}`);
	await pool.query(`DELETE FROM Test WHERE id= ?`, [params.id]);
	res.redirect('/api/tests/');
};

async function getTests (req, res) {
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
	console.log(value);
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

