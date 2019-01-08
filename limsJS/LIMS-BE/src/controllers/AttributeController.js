const pool = require('../config/database');
const regex = require('./../middlewares/regex');

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
	console.log(`Saved Attribute: ${newAttribute.name}`);
	res.redirect('/api/attributes/')
};

async function deleteAttribute (req, res) {
	let params = req.params;
	const deleteRow = await pool.query('DELETE FROM Attribute WHERE id= ?', [params.id]);
	res.redirect('/api/attributes/');
};

async function getAttributes (req, res) {
	const value = await pool.query('SELECT * FROM Attribute ORDER BY name DESC');
	console.log(value);
	res.send({
		Attributes : value
	});
};

async function getAttributeById (req, res) {
	let params = req.params;
	const id = params.id;
	const value = await pool.query('SELECT * FROM Attribute WHERE id = ?', [id]);
	console.log(value);
	res.send({
		Attribute : value
	});
};

async function updateAttribute (req, res) {
	let params = req.params;
	let body = req.body;
	const update = await pool.query(`UPDATE Attribute SET name='${body.name}', unit='${body.unit}' WHERE name='${params.id}'`);
	res.redirect('/api/attributes/' + params.id);
}

module.exports = {
	addAttribute: addAttribute,
	deleteAttribute: deleteAttribute,
	getAttributeById: getAttributeById,
	getAttributes: getAttributes,
	updateAttribute: updateAttribute
};

