const pool = require('./../config/database')



async function isExists(query) {
	const obj = await pool.query(query);
	if(obj == undefined) return false;
	return {
		result: obj,
		pass: true
	}
}

module.exports = {
	isExists: isExists
}
