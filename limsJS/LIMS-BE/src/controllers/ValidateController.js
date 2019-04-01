const dbInteract = require('./../middlewares/db-interact');
const asyncForEach = require('./../middlewares/miscs').asyncForEach;
const capitalizeWord = require('./../middlewares/miscs').capitalizeWord;
const getDuplication = require('./../middlewares/miscs').getDuplications;
const removeDuplication = require('./../middlewares/miscs').removeDuplications;
const notNumberField = require('./../middlewares/regex').notNumber;
const validateSampleName = require('./../middlewares/regex').validateSampleName;

async function SampleValidators (sample, testName) {

    const test = await require('./TestController').getTest({
        params : {
            value: testName
        }
    });

    if (test === undefined | null) {
        return false;
    }

    const firstValidation = await dbInteract.isExists(`
        SELECT * FROM Sample, Log WHERE Sample.id=${sample} AND Sample.id = Log.sample_Id AND Log.test_Id=${test.id}
    `);

    if (firstValidation !== false) {
        return {
            message: `This sample already passed ${capitalizeWord(test.name)}`
        }
    }

    const secondValidation = await dbInteract(`
        SELECT * FROM Sample, Status, TestStatus, Test WHERE Sample.state = Status.id
        AND Status.id = TestStatus.result_State AND TestStatus.test_Id = Test.id
    `);
    console.log(secondValidation)

	// for await (const status of prevStatus) {
	// 	let statusSequence = await GeneralValidator.isExists(`
	// 		SELECT * FROM Status 
	// 		JOIN StatusSequence ON Status.id = StatusSequence.status_Id WHERE Status.id=${status.prev_State}
	// 	`);
	// 	if(statusSequence.pass == true) {
	// 		if(await GeneralValidator.isExists(`
	// 			SELECT * FROM Log WHERE status_Id=${statusSequence.result.status_Required} AND sample_Id=${sample.id}
	// 		`) == false && test.id != id[0].id) {
	// 			return {
	// 				message: `This sample doesn't have the status of this test`
	// 			};
	// 		}
	// 	}
	// }

	return true;
}

module.exports = {
	SampleValidators: SampleValidators
};
