const pool = require('./../config/database');

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
	const prevStatus = await pool.query(`SELECT prev_State FROM TestStatus WHERE test_Id=${test.id}`);

	if(sample == false) {
		return {
			message: 'This sample does\'nt exists'
		};
	}

	if (test == false) {
		return { 
			message: 'Test not exists!'
		}
	}

	if (GeneralValidator.isExists(`SELECT * FROM Log WHERE sample_Id=${sample.id} AND test_Id=${test.id}`) == true){
		return {
			message: `This sample already passed ${test.name}`
		}
	}

	for await (const status of prevStatus) {
		let statusSequence = GeneralValidator.isExists(`
			SELECT * FROM Status 
			JOIN StatusSequence ON Status.id = StatusSequence.status_Id WHERE Status.id=${status.prev_State}
		`);
		if(statusSequence.pass == true) {
			if(GeneralValidator.isExists(`
				SELECT * FROM Log WHERE status_Id=${statusSequence.result.status_Required} AND sample_Id=${sample.id}
			`) == false && test.id != 1) {
				return {
					message: `This sample need the previous test`
				}
			}
		} else {
			if(test.id == 1) return true;
		}
	}
}

module.exports = {
	SampleValidators: SampleValidators
};