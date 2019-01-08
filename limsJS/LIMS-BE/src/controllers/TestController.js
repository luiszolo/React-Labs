const pool = require('../config/database');
const regex = require('./../middlewares/regex');

// Finish
async function addTest (req, res) {
	const body  = req.body;
	const newTest = {
		name: body.name,
		samplesLength: body.samplesLength,
		attributes: body.attributes
	};
	const validateTest = await pool.query(`SELECT * FROM Test WHERE name='${newTest.name.toUpperCase()}'`);
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
		for await (const element of newTest.attributes) {
			const auxAttribute = await pool.query(`SELECT * FROM Attribute WHERE name='${element.toUpperCase()}'`);
			if(auxAttribute != null || auxAttribute != [{  }]) {
				const id = await pool.query(`SELECT id FROM Test WHERE name='${newTest.name.toUpperCase()}'`);
				await pool.query(`INSERT INTO TestAttributes SET test_Id=${id[0].id}, attribute_Id=${auxAttribute[0].id}`);
			}
		}
	}
	res.redirect('/api/tests');
};

// Finish
async function deleteTest (req, res) {
	const params = req.params;
	await pool.query(`UPDATE Test SET status=false WHERE id=?`, [params.id]);
	res.redirect('/api/tests/');
};

// Finish
async function getTests (req, res) {
	// let value;
	// if (req.params == null)
	let Tests = [];
	const value = await pool.query('SELECT * FROM Test ORDER BY id ASC');
	for await ( const element of value ) {
		let attributes = await pool.query(`SELECT Attribute.name FROM Attribute, 
			TestAttributes WHERE TestAttributes.test_Id=${element.id} AND 
			TestAttributes.attribute_Id=Attribute.id`);
		element['attributes'] = attributes;
		Tests.push(element);
	}
	res.send({
		Tests : Tests
	});
};

// Finish
async function getTestById (req, res) {
	let params = req.params;
	const id = params.id;
	const value = await pool.query('SELECT * FROM Test WHERE id = ?', [id]);
	let attributes = await pool.query(`SELECT Attribute.name FROM Attribute,
		TestAttributes WHERE TestAttributes.test_Id=${id} AND 
		TestAttributes.attribute_Id=Attribute.id`);
	value[0]['attributes'] = attributes;
	res.send({
		Test : value[0]
	});
};

async function updateTest (req, res) {
	let params = req.params;
	let body = req.body;
	const newTest = {
		name: body.name,
		samplesLength: body.samplesLength,
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
	await pool.query(`UPDATE Test SET name='${body.name}', samplesLength=${body.samplesLength} WHERE id='${params.id}'`);
	if (newTest.attributes != null) {
		for await (const element of params.attributes) {
			const auxAttribute = await pool.query('SELECT * FROM Attribute WHERE name = ?', [element]);
			if(auxAttribute != null || auxAttribute != [{ }]){
				await pool.query(`UPDATE TestAttributes SET test_Id='${params.id}', attribute_Id='${auxAttribute.id}'`, [params.id, auxAttribute[0].id]);
				console.log(`Test updated!: ${newTest}`);
			}
		};
	} else await pool.query(`DELETE * FROM TestAttributes`)
	res.redirect('/api/tests/' + params.id);
}

module.exports = {
	addTest: addTest,
	deleteTest: deleteTest,
	getTestById: getTestById,
	getTests: getTests,
	updateTest: updateTest
};

