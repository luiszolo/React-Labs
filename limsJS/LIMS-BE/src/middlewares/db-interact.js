const pool = require('./../config/database')

async function isExists(query) {
	const obj = await pool.query(query);
	if(obj[0] == undefined) return false;
	return {
		result: obj[0],
		pass: true
	}
}

async function findBy(fields, table, conditions=undefined) {
	let auxFields = '*';
	if (fields !== undefined) {
		auxFields = '';
		fields.forEach(field => {
			auxFields.concat(field, ' ');
		});
	}
	let query = `SELECT ${auxFields} FROM ${table}`;
	let auxWhere = '';
	if (conditions !== undefined) {
		auxWhere = 'WHERE';
		conditions.forEach(condition => {
			auxWhere.concat(' ', `${condition.param}`)
			if (typeof(condition.param) ==='string'){
				auxWhere.concat(' ', `'${condition.value}'`);
				continue;
			} else {
				auxWhere.concat(' ', `${condition.value}`);
				continue;
			}
		});
	}
	return { 
		result: await pool.query(query)
	};
}

module.exports = {
	findBy: findBy,
	isExists: isExists
};
