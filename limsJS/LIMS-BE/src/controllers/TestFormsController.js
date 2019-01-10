const dbInteract = require('./../middlewares/db-interact');

async function insertData(req, res) {
	let body = req.body;
	const operator = await dbInteract.isExists(`SELECT * FROM Operator WHERE id='${body.operator}'`);
	if(operator == false) {
		res.send({
			message: 'The operator doesn\'t exists'
		});
		return;
	}

	const attributes;
}
