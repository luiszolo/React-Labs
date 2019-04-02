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
	console.log(bodyForm)
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
	
	let attributeArray = [];
	if (test.attributes !== undefined) {
		if (bodyForm.attributes.length === test.attributes.length) {
			for await (const attr of bodyForm.attributes) {
				const attrDetail = await require('./AttributeController').getAttribute({
					params: {
						value: attr.name
				}});
				if (attrDetail !== false) {
					for await (const testAttribute of test.attributes) {
						if (testAttribute.name === attr.name) {
							console.log(attr.name, testAttribute.name)
							attributeArray = attributeArray.concat([], [{
								attrId: testAttribute.id,
								value:  attr.value
							}]);
							continue;
						};
					}
				} else {
					res.status(404).send({
						message: 'The attribute doesn\'t exists'
					});
					return;
				}
			}
		} else {
			res.status(403).send({
				message: "This test doesn't have attributes"
			});
			return;
		}
	}



	let samplesValidationArray = [];
	for await (const sample of bodyForm.samples) {
		if (sample === '') continue;
		const sampleDetail = await require('./SampleController').getSample({
			params: {
				value: sample
			}
		});

		if (sampleDetail === false) {
			res.status(404).send({
				message: `The sample ${sample} doesn't exists`
			});
			return;
		}
		samplesValidationArray = samplesValidationArray.concat(
			samplesValidationArray, [sampleDetail.id]
		);
	}
	console.log(test.id, attributeArray, samplesValidationArray)
	// await addSampleValues(test.id, attributeArray, samplesValidationArray)

	

	res.status(200).send({
        message: "Insertion completed"
    });
}

async function addSampleValues(test, attributes=null, samples) {
	if (attributes === undefined | null | []) return;
	for await (const attr of attributes) {
		for await (const sample of samples) {
			const insert = await dbInteract.manipulateData(`
				INSERT INTO SampleValue SET
				sample_Id = ${sample},
				test_Id = ${test},
				attribute_Id = ${attr.id},
				value='${attr.value}'
			`);
			if (insert === false) {
				res.status(403).send({
					message: "Something is wrong in POST method"
				});
			}
		}
	}
}

module.exports = {
	insertData: insertData
};
