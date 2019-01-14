const dbInteract = require('./../middlewares/db-interact');

async function insertData(req, res) {
	let body = req.body;
	const operator = await dbInteract.isExists(`SELECT * FROM Operator WHERE id=${body.operator}`);
	if(operator == false) {
		res.send({
			message: 'The operator doesn\'t exists'
		});
		return;
	}
	const test = await dbInteract.isExists(`SELECT * FROM Test WHERE name='${body.test.toUpperCase()}'`);
	if (test == false) {
		res.send({
			message: 'The test doesn\'t exists'
		});
		return;
	}
	let sampleError;
	for await (const element of samples) {
		let sample = await dbInteract.isExists(`SELECT * FROM Sample WHERE name='${body.element.toUpperCase()}'`)
	}
}
