const pool = require('./../config/database');
const miscs = require('./../middlewares/miscs');

let GeneralValidator = {

	findBy: async function (table, fields='*', conditions=null) {
		let result = { };
		if (fields != '*') {
			fields.forEach(field => auxFields.concat(field, ' '));
		}

		if (table == undefined || table == null) {
			return {
				message: 'The table can\'t be null'
			};
		}

		let query = `SELECT ${auxFields} FROM ${table}`;
		if (conditions != null || conditions != undefined) {
			conditions.joins.forEach(join => {
				
			});
		}

	},
	isExists: async function (query) {
		const obj = await pool.query(query);
		if(obj[0] == undefined) return false;
		return {
			result: obj[0],
			pass: true
		}
	}
}

async function SampleValidators (sample, test) {
	console.log(test, sample)
	if (test.id == 31 && sample === undefined) return true;
	if (sample === undefined) return { message: 'This sample doesn\'t exist' };
	const prevStatus = await pool.query(`SELECT prev_State FROM TestStatus WHERE test_Id=${test.id}`);

	if (test == false) {
		return { 
			message: 'The test didn\'t exist!'
		}
	}
	const aux = await GeneralValidator.isExists(`SELECT * FROM Log WHERE sample_Id=${sample.id} AND test_Id=${test.id}`)
	if (aux.pass == true){
		return {
			message: `This sample already passed ${miscs.capitalizeWord(test.name)}`
		}
	}
	for await (const status of prevStatus) {
		let statusSequence = await GeneralValidator.isExists(`
			SELECT * FROM Status 
			JOIN StatusSequence ON Status.id = StatusSequence.status_Id WHERE Status.id=${status.prev_State}
		`);
		if(statusSequence.pass == true) {
			if(await GeneralValidator.isExists(`
				SELECT * FROM Log WHERE status_Id=${statusSequence.result.status_Required} AND sample_Id=${sample.id}
			`) == false && test.id != 1) {
				return {
					message: `This sample doesn't have the status of this test`
				};
			}
		}
	}

	return true;
}

module.exports = {
	SampleValidators: SampleValidators
};
