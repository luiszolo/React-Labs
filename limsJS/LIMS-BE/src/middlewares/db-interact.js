const pool = require('./../config/database')



async function isExists(query) {
	const obj = pool.query(query);
	if(obj[0] == undefined) return false;
	return true;
}

module.exports = {
	isExists: isExists
}
