const dbInteract = require('./../middlewares/db-interact');
const asyncForEach = require('./../middlewares/miscs').asyncForEach;
const capitalizeWord = require('./../middlewares/miscs').capitalizeWord;
const getDuplication = require('./../middlewares/miscs').getDuplications;
const removeDuplication = require('./../middlewares/miscs').removeDuplications;
const notNumberField = require('./../middlewares/regex').notNumber;
const validateSampleName = require('./../middlewares/regex').validateSampleName;

async function SampleValidators (sample, test) {
    const sample = sample;

    const test = await require('./TestController').getTest({
        params : {
            value: test
        }
    });

    if (test === undefined | null) {
        return false;
    }
    console.log(test)

	// const id = await dbInteract.isExists(`SELECT id FROM Test WHERE name='ELECTRICITY TEST'`);
	// if (test.id == id[0].id && sample === undefined) return true;
	// if (sample === undefined) return { message: 'This sample doesn\'t exist' };
    // const prevStatus = await pool.query(`SELECT prev_State FROM TestStatus WHERE test_Id=${test.id}`);
    


	// if (test == false) {
	// 	return { 
	// 		message: 'The test didn\'t exist!'
	// 	}
	// }
	// const aux = await GeneralValidator.isExists(`SELECT * FROM Log WHERE sample_Id=${sample.id} AND test_Id=${test.id}`)
	// if (aux.pass == true){
	// 	return {
	// 		message: `This sample already passed ${miscs.capitalizeWord(test.name)}`
	// 	}
	// }
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
