const whiteList = ['http://localhost:3000', 'http://10.2.1.70:3000/'];

const myIp = require('./ip');

module.exports = {
	database: {
		connectionLimit: 5,
		host: 'localhost',
		user: 'root',
		database: 'lims',
		timezone: 'utc'
	},
	Ip: myIp
};
