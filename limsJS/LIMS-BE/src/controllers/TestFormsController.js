const dbInteract = require('./../middlewares/db-interact');
const ip = require('./../config/ip');
const pool = require('./../config/database');
const request = require('request');

// Testing
async function insertData(req, res) {
	let body = req.body;
	console.log(body);
	const operator = await dbInteract.isExists(`SELECT * FROM Operator WHERE id=${body.operator}`);
	if(operator == false) {
		res.send({
			message: 'The operator doesn\'t exists'
		});
		return;
	}
	const test = await dbInteract.isExists(`SELECT * FROM Test WHERE name='${body.test.toUpperCase()}'`);
	console.log(test)
	if (test == false) {
		res.send({
			message: 'The test doesn\'t exists'
		});
		return;
	}
	let sampleError;
	for await (const element of body.samples) {
		let sample = await dbInteract.isExists(`SELECT * FROM Sample WHERE name='${element.toUpperCase()}'`);
		console.log(sample)
		if (sample == false) { 
			sampleError = true;
			break;
		}
	}
	let attributeError;
	for await (const element of body.attributes) {
		let attribute = await dbInteract.isExists(`SELECT * FROM Attribute WHERE name='${element.name.toUpperCase()}'`);
		console.log(attribute);
		if (attribute == false) { 
			attributeError = true;
			break;
		}
		let validateRelationship = await dbInteract.isExists(`SELECT * FROM TestAttributes WHERE attribute_Id=${attribute.result.id} AND test_Id=${test.result.id}`);
		if (validateRelationship == false) {
			attributeError = true;
			break;
		}
	}

	if (sampleError || attributeError) {
		res.send({
			message: 'Samples or Attributes are wrong'
		});
		return;
	}

	console.log('Validation passed')
	for await (const reqSample of body.samples) {
		let sample = await pool.query(`SELECT * FROM Sample WHERE name='${reqSample.toUpperCase()}'`);
		for await (const reqAttribute of body.attributes) {
			let attribute = await pool.query(`SELECT * FROM Attribute WHERE name='${reqAttribute.name.toUpperCase()}'`);
			await pool.query(`INSERT INTO SampleValue SET sample_Id=${sample[0].id}, test_Id=${test.result.id}, attribute_Id=${attribute.result.id}, value=${reqAttribute.value}`);
		}
	}

	const prevStatus = await pool.query(`SELECT prev_State FROM TestStatus WHERE test_Id=${test.result.id}`);
	const postStatus = await pool.query(`SELECT post_State FROM TestStatus WHERE test_Id=${test.result.id}`);
	

	for await (const reqSample of body.samples) {
		for await (const reqPost of postStatus) {
			for await (const reqPrev of prevStatus) {
				request.post(`https://${ip}:4000/api/logs/add`, { 
					body: {
						operator: body.operator,
						sample: reqSample.name,
						test: body.test,
						status: reqPrev.name
					}
				});
				request.post(`https://${ip}:4000/api/logs/add`, { 
					body: {
						operator: body.operator,
						sample: reqSample.name,
						test: body.test,
						status: reqPost.name
					}
				});
			}
		}
	}
}

module.exports = {
	insertData: insertData
};
