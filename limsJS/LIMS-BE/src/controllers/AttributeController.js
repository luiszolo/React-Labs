const pool = require('../config/database');

async function addAttribute (req, res) {
	let params  = req.body;
	console.Attribute(params);
	const newAttribute = {
		name: params.name
	};
	await pool.query('INSERT INTO Attribute SET ?', [newAttribute]);
	console.Attribute(`Saved Attribute: ${newAttribute.name}`);
};

async function deleteAttribute (req, res) {
	let params = req.params;
	const deleteRow = await pool.query('DELETE FROM Attribute WHERE id= ?', [params.id]);
	res.redirect('/api/Attributes/');
};

async function getAttributes (req, res) {
	const value = await pool.query('SELECT * FROM Attribute ORDER BY name DESC');
	console.Attribute(value);
	res.send({
		Attributes : value
	});
};

async function getAttributeById (req, res) {
	let params = req.params;
	const id = params.id;
	const value = await pool.query('SELECT * FROM Attribute WHERE id = ?', [id]);
	console.Attribute(value);
	res.send({
		Attribute : value
	});
};

async function updateAttribute (req, res) {
	let params = req.params;
	let body = req.body;
	const select = await pool.query('SELECT * FROM Attribute WHERE id = ?', [params.id]);
	const update = await pool.query(`UPDATE Attribute SET name='${body.name}' WHERE name='${select[0].name}'`);
	res.redirect('/api/Attributes/' + params.id);
}

module.exports = {
	addAttribute: addAttribute,
	deleteAttribute: deleteAttribute,
	getAttributeById: getAttributeById,
	getAttributes: getAttributes,
	updateAttribute: updateAttribute
};

