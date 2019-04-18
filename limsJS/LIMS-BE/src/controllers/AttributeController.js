const miscs = require('./../middlewares/miscs');
const pool = require('./../config/database');
const regex = require('./../middlewares/regex');

// Finish
async function addAttribute (req, res) {
	let params  = req.body;
	console.log(params);
	const newAttribute = {
		name: params.name.toUpperCase(),
		unit: params.unit.toUpperCase()
	};
	const validateAttribute = await pool.query(`SELECT * FROM Attribute WHERE name='${newAttribute.name}' AND unit='${newAttribute.unit}'`);
	if (validateAttribute.length == 1) {
		res.send({
			message: 'This attribute already exists!'
		});
		return;
	}
	if (!regex.notNumber(newAttribute.name)) {
		res.send({
			message: 'Cannot add attribute with numbers'
		})
		return;
	}
	await pool.query('INSERT INTO Attribute SET ?', [newAttribute]);
	res.send({
		message: 'Insertion successful'
	});
};

// Finish
async function deleteAttribute (req, res) {
	let params = req.params;
	await pool.query('DELETE FROM Attribute WHERE id= ?', [params.id]);
	res.send({
		message: 'Delete successful'
	});
};

// Finish
async function getAttributes (req, res) {
	const value = await pool.query('SELECT * FROM Attribute ORDER BY name ASC');
	for await (const element of value) { 
		element.name = miscs.capitalizeWord(element.name);
		element.unit = element.unit.toLowerCase();
	}
	res.send({
		Attributes : value
	});
};

// Finish
async function getAttributeById (req, res) {
	let params = req.params;
	const value = await pool.query(`SELECT * FROM Attribute WHERE id=${params.id}`);
	if (value == undefined) res.send({ message: "Attribute doesn't exists" });
	value[0].name = miscs.capitalizeWord(value[0].name);
	res.send({
		Attribute : value[0]
	});
};

// Finish
async function updateAttribute (req, res) {
	let params = req.params;
	let body = req.body;
	const validateAttribute = await pool.query(`SELECT * FROM Attribute WHERE name='${body.name.toUpperCase()}' AND unit='${newAttribute.unit.toUpperCase()}'`);
	if (validateAttribute.length == 1) {
		res.send({
			message: 'This attribute already exists!'
		});
		return;
	}
	if (!regex.notNumber(body.name.toUpperCase())) {
		res.send({
			message: 'Cannot add attribute with numbers'
		})
		return;
	}
	await pool.query(`UPDATE Attribute SET name='${body.name.toUpperCase()}', unit='${body.unit.toUpperCase()}' WHERE id='${params.id}'`);
	res.send({
		message: 'Update successful'
	});
}

module.exports = {
	addAttribute: addAttribute,
	deleteAttribute: deleteAttribute,
	getAttributeById: getAttributeById,
	getAttributes: getAttributes,
	updateAttribute: updateAttribute
};

