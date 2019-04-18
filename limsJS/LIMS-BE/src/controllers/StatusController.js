const miscs = require('./../middlewares/miscs');
const pool = require('./../config/database');
const regex = require('./../middlewares/regex');

// Finish
async function addStatus (req, res) { 
	let params  = req.body;
	console.log(params);
	const newStatus = {
		name: params.name.toUpperCase()
	};
	const validateStatus = await pool.query(`SELECT * FROM Status WHERE name='${newStatus.name}'`);
	if (validateStatus.length == 1) {
		res.send({
			message: 'This status already exists!'
		});
		return;
	}
	if (!regex.notNumber(newStatus.name)) {
		res.send({
			message: 'Cannot add status with numbers'
		})
		return;
	}
	await pool.query('INSERT INTO Status SET ?', [newStatus]);
	console.log(`Saved Status: ${newStatus.name}`);
};

// Finish
async function deleteStatus (req, res) {
	let params = req.params;
	await pool.query('DELETE FROM Status WHERE id= ?', [params.id]);
};

// Finish
async function getStatus (req, res) {
	const value = await pool.query('SELECT * FROM Status ORDER BY name ASC');
	for await (const element of value) { 
		element.name = miscs.capitalizeWord(element.name);
	}
	res.send({
		Statuss : value
	});
};

// Finish
async function getStatusById (req, res) {
	let params = req.params;
	const value = await pool.query(`SELECT * FROM Status WHERE id=${params.id}`);
	if (value == undefined) res.send({ message: "Status doesn't exists" });
	value[0].name = miscs.capitalizeWord(value[0].name);
	res.send({
		Status : value
	});
};

// Finish
async function updateStatus (req, res) {
	let params = req.params;
	let body = req.body;
	const validateStatus = await pool.query(`SELECT * FROM Status WHERE name='${body.name.toUpperCase()}'`);
	if (validateStatus.length == 1) {
		res.send({
			message: 'This status already exists!'
		});
		return;
	}
	if (!regex.notNumber(body.name.toUpperCase())) {
		res.send({
			message: 'Cannot add status with numbers'
		})
		return;
	}
	await pool.query(`UPDATE Status SET name='${body.name.toUpperCase()}' WHERE id='${params.id}'`);
}

module.exports = {
	addStatus: addStatus,
	deleteStatus: deleteStatus,
	getStatusById: getStatusById,
	getStatus: getStatus,
	updateStatus: updateStatus
};
