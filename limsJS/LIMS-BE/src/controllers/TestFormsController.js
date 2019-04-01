const dbInteract = require('./../middlewares/db-interact');
const asyncForEach = require('./../middlewares/miscs').asyncForEach;
const capitalizeWord = require('./../middlewares/miscs').capitalizeWord;
const getDuplication = require('./../middlewares/miscs').getDuplications;
const removeDuplication = require('./../middlewares/miscs').removeDuplications;
const notNumberField = require('./../middlewares/regex').notNumber;
const validateSampleName = require('./../middlewares/regex').validateSampleName;


// Testing
async function insertData(req, res) {
	const bodyForm = req.body.form;
	const operator = await require('./OperatorController')
        .getOperator({
			params: {
				value: bodyForm.operator
			}
		}, res);
	if (operator === false) {
		res.status(404).send({
			message: 'The operator doesn\'t exists'
		});
		return;
	}

	const test = await require('./TestController')
		.getTest({
			params: {
				value: bodyForm.test
			}
		}, res);
	if (test === false) {
		res.status(404).send({
			message: 'The test doesn\'t exists'
		});
		return;
	}

	if (bodyForm.attributes) {
		for await (const attr of bodyForm.attributes) {
			const attrDetail = await require('./AttributeController').getAttribute({
				params: {
					value: attr.name
			}});
			if (attrDetail !== false) {
				if (test.attributes) {
					for await (const attrTest of test.attributes) {
						console.log(attrTest)

						

					}
				} else {
					res.status(400).send({
						message: "This test doesn't have attributes"
					});
					return;
				}
			}
		}
	}

	res.status(200).send({
        message: "Insertion completed"
    });
	

	// if (result_State.status === undefined) {
	// 	res.status(404).send({
	// 		message: 'The test result state doesn\'t exists'
	// 	});
	// 	return;
	// }

	// const bothStatus = await dbInteract.isExists(`SELECT * FROM TestStatus WHERE test_Id=${test.result.id}`);
	// if (bothStatus == false) {
	// 	res.send({
	// 		message: 'The test doesn\'t have a status' 
	// 	});
	// 	return;
	// } 

	// const postStatus = await pool.query(`SELECT post_State FROM TestStatus WHERE test_Id=${test.result.id}`);
	// const prevStatus = await pool.query(`SELECT prev_State FROM TestStatus WHERE test_Id=${test.result.id}`);

	// let sampleError;
	// let sampleErrorList = {
	// 	NotExists: [],
	// 	Exists: [],
	// 	RepeatTest: [],
	// 	NotPrev: [],
	// 	RepeatSample: [],
	// };

	// sampleErrorList.RepeatSample = miscs.getDuplications(body.samples).filter(e => e != null && e != "");
	// if (sampleErrorList.RepeatSample.length > 0) {
	// 	sampleError = true;
	// }
	
	// if(test.result.id == 1) {
	// 	let reqCopy = req;
	// 	for await (const sample of  body.samples) {
	// 		reqCopy.body = {
	// 			name: sample
	// 		};
	// 		if (sample === '') continue;
	// 		if (await dbInteract.isExists(`SELECT * FROM Sample WHERE name='${sample}'`) == true){
	// 			sampleErrorList.Exists.push(sample.toUpperCase());
	// 			continue;
	// 		} else await require('./SampleController').addSample(reqCopy, res);
	// 	}
	// }

	// for await (const element of body.samples) {
	// 	if (element === '') continue;
	// 	let sample = await dbInteract.isExists(`SELECT * FROM Sample WHERE name='${element.toUpperCase()}'`);
	// 	if (sample == false) { 
	// 		sampleError = true;
	// 		sampleErrorList.NotExists.push(element.toUpperCase());
	// 		continue;
	// 	} 

	// 	let logValidation = await dbInteract.isExists(`SELECT * FROM Log WHERE sample_Id=${sample.result.id} AND test_Id=${test.result.id}`);
	// 	if (logValidation.pass == true) {
	// 		sampleError = true;
	// 		sampleErrorList.RepeatTest.push(element.toUpperCase());
	// 		continue;
	// 	}

	// 	for await (const statusElement of prevStatus) {
	// 		let logValidation2 = await dbInteract.isExists(`
	// 			SELECT * FROM Status 
	// 			JOIN StatusSequence ON Status.id = StatusSequence.status_Id WHERE Status.id=${statusElement.prev_State}
	// 		`);
	// 		if (logValidation2.pass == true) {
	// 			let logValidation3 = await dbInteract.isExists(`
	// 				SELECT * FROM Log WHERE status_Id=${logValidation2.result.status_Required} AND sample_Id=${sample.result.id}
	// 			`);
	// 			if (logValidation3 == false && test.result.id != 1) {
	// 				sampleError = true;
	// 				sampleErrorList.NotPrev.push(element.toUpperCase());
	// 				break;
	// 			}
	// 			continue;
	// 		} else {
	// 			if(test.result.id == 1) continue;
	// 			sampleError = true;
	// 			sampleErrorList.NotPrev.push(element.toUpperCase());
	// 			continue;
	// 		}
	// 	}
	// }
	
	// let attributeError = false;
	// if (body.attributes) {
	// 	for await (const element of body.attributes) {
	// 		let attribute = await dbInteract.isExists(`SELECT * FROM Attribute WHERE name='${element.name.toUpperCase()}'`);
	// 		if (attribute == false) { 
	// 			attributeError = true;
	// 			break;
	// 		}
	// 		let validateRelationship = await dbInteract.isExists(`SELECT * FROM TestAttributes WHERE attribute_Id=${attribute.result.id} AND test_Id=${test.result.id}`);
	// 		if (validateRelationship == false) {
	// 			attributeError = true;
	// 			break;
	// 		}
	// 	}
	// } 

	// if ((sampleError)) {

	// 	sampleErrorList.NotExists = miscs.getDuplications(sampleErrorList.NotExists).filter(e => e != null && e != "");
	// 	sampleErrorList.NotPrev = miscs.getDuplications(sampleErrorList.NotPrev).filter(e => e != null && e != "");
	// 	sampleErrorList.RepeatSample = miscs.getDuplications(body.samples).filter(e => e != null && e != "");
	// 	sampleErrorList.RepeatTest = miscs.getDuplications(sampleErrorList.RepeatTest).filter(e => e != null && e != "");

	// 	res.send({
	// 		message: 'Samples are wrong',
	// 		test: test.result.name,
	// 		sampleErrorList: sampleErrorList
	// 	});
	// 	return;
	// }

	// if(attributeError) {
	// 	res.send({
	// 		message: 'The attributes are different!'
	// 	});
	// 	return;
	// }


	// for await (const reqSample of body.samples) {
	// 	if (reqSample === '') continue;
	// 	let sample = await pool.query(`SELECT * FROM Sample WHERE name='${reqSample.toUpperCase()}'`);
	// 	if (body.attributes) {
	// 		for await (const reqAttribute of body.attributes) {
	// 			let attribute = await pool.query(`SELECT * FROM Attribute WHERE name='${reqAttribute.name.toUpperCase()}'`);
	// 			// console.log({
	// 			// 	sample: sample[0].id,
	// 			// 	test: test.result.id,
	// 			// 	attribute: attribute[0].id,
	// 			// 	value: reqAttribute.value
	// 			// })
	// 			await pool.query(`INSERT INTO SampleValue SET sample_Id=${sample[0].id}, test_Id=${test.result.id}, attribute_Id=${attribute[0].id}, value='${reqAttribute.value}'`);
	// 		}
	// 	}
	// 	else break;
	// }

	// let logInserted;
	// for await (const reqSample of body.samples) {
	// 	if (reqSample === '') continue;
	// 	for await (const reqPost of postStatus) {
	// 		for await  (const reqPrev of prevStatus) {
	// 			let status = await dbInteract.isExists(`SELECT * FROM Status WHERE id=${reqPrev.prev_State}`);
	// 			//req.body = {
	// 				operator: body.operator,
	// 				sample: reqSample,
	// 				test: body.test,
	// 				status: status.result.name
	// 			}
	// 			await require('./LogController').addLog(req, res);
	// 			status = await dbInteract.isExists(`SELECT * FROM Status WHERE id=${reqPost.post_State}`);
	// 			req.body = {
	// 				operator: body.operator,
	// 				sample: reqSample,
	// 				test: body.test,
	// 				status: status.result.name
	// 			}
	// 			logInserted = await require('./LogController').addLog(req, res);
	// 		}
	// 	}
	// }
	// if (logInserted.message) {
	// 	res.send({
	// 		message: logInserted.message,
	// 		pass: false
	// 	});
	// } else {
	// 	res.send({
	// 		message: 'Insertion completed',
	// 		pass: true
	// 	});
	// }
}

module.exports = {
	insertData: insertData
};
