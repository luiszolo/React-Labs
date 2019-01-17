const pool = require('./../config/database')



async function isExists(query) {
	const obj = await pool.query(query);
	if(obj[0] == undefined) return false;
	return {
		result: obj[0],
		pass: true
	}
}

module.exports = {
	isExists: isExists
}
