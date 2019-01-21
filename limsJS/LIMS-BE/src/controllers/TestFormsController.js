const dbInteract = require('./../middlewares/db-interact');
const ip = require('./../config/ip');
const pool = require('./../config/database');
const axios = require('axios');
const request = require('request');

// Testing
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

	const bothStatus = await dbInteract.isExists(`SELECT * FROM TestStatus WHERE test_Id=${test.result.id}`);
	if (bothStatus == false) {
		res.send({
			message: 'The test doesn\'t have status' 
		});
		return;
	} 

	const postStatus = await pool.query(`SELECT post_State FROM TestStatus WHERE test_Id=${test.result.id}`);
	const prevStatus = await pool.query(`SELECT prev_State FROM TestStatus WHERE test_Id=${test.result.id}`);

	let sampleError;
	let sampleErrorList = {
		notExists: [],
		Exists: [],
		notRepeatTest: [],
		notPrev: [],
		repeatFormData: [],
	};


	if(test.result.id == 1) {
		let reqCopy = req;
		for await (const sample of  body.samples) {
			reqCopy.body = {
				name: sample
			};
			if (await dbInteract.isExists(`SELECT * FROM Sample WHERE name='${sample}'`) == false){
				sampleErrorList.Exists.push(sample.toUpperCase());
				continue;
			} else await require('./SampleController').addSample(reqCopy, res);
		}
	}

	for await (const element of body.samples) {
		let sample = await dbInteract.isExists(`SELECT * FROM Sample WHERE name='${element.toUpperCase()}'`);
		if (sample == false) { 
			sampleError = true;
			sampleErrorList.notExists.push(element.toUpperCase());
			continue;
		} 

		let logValidation = await dbInteract.isExists(`SELECT * FROM Log WHERE sample_Id=${sample.result.id} AND test_Id=${test.result.id}`);
		if (logValidation.pass == true) {
			sampleError = true;
			sampleErrorList.notRepeatTest.push(element.toUpperCase());
			continue;
		}

		for await (const statusElement of prevStatus) {
			let logValidation2 = await dbInteract.isExists(`
				SELECT * FROM Status 
				JOIN StatusSequence ON Status.id = StatusSequence.status_Id WHERE Status.id=${statusElement.prev_State}
			`);
			if (logValidation2.pass == true) {
				let logValidation3 = await dbInteract.isExists(`
					SELECT * FROM Log WHERE status_Id=${logValidation2.result.status_Required}
				`);
				if (logValidation3 == false) {
					console.log('Not passed!');
					sampleError = true;
					sampleErrorList.notPrev.push(element.toUpperCase());
					break;
				}
				continue;
			} else {
				if(test.result.id == 1) continue;
				sampleError = true;
				sampleErrorList.notPrev.push(element.toUpperCase());
				continue;
			}
		}
	}
	
	let attributeError = false;
	if (body.attributes) {
		for await (const element of body.attributes) {
			let attribute = await dbInteract.isExists(`SELECT * FROM Attribute WHERE name='${element.name.toUpperCase()}'`);
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
	} 

	if ((sampleError || attributeError)) {
		res.send({
			message: 'Samples are wrong',
			sampleErrorList: sampleErrorList
		});
		return;
	}


	for await (const reqSample of body.samples) {
		let sample = await pool.query(`SELECT * FROM Sample WHERE name='${reqSample.toUpperCase()}'`);
		if (body.attributes) {
			for await (const reqAttribute of body.attributes) {
				let attribute = await pool.query(`SELECT * FROM Attribute WHERE name='${reqAttribute.name.toUpperCase()}'`);
				// console.log({
				// 	sample: sample[0].id,
				// 	test: test.result.id,
				// 	attribute: attribute[0].id,
				// 	value: reqAttribute.value
				// })
				await pool.query(`INSERT INTO SampleValue SET sample_Id=${sample[0].id}, test_Id=${test.result.id}, attribute_Id=${attribute[0].id}, value='${reqAttribute.value}'`);
			}
		}
		else break;
	}

	for await (const reqSample of body.samples) {
		for await (const reqPost of postStatus) {
			for await  (const reqPrev of prevStatus) {
				let status = await dbInteract.isExists(`SELECT * FROM Status WHERE id=${reqPrev.prev_State}`);
				req.body = {
					operator: body.operator,
					sample: reqSample,
					test: body.test,
					status: status.result.name
				}
				await require('./LogController').addLog(req, res);
				status = await dbInteract.isExists(`SELECT * FROM Status WHERE id=${reqPost.post_State}`);
				req.body = {
					operator: body.operator,
					sample: reqSample,
					test: body.test,
					status: status.result.name
				}
				await require('./LogController').addLog(req, res);
			}
		}
	}
	res.send({
		message: 'Insertion completed'
	})
}

module.exports = {
	insertData: insertData
};
