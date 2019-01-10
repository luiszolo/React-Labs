const path = require('path');
const winston = require('winston');

let options = {
	file: {
		level: 'info',
		filename: path.join(__dirname, 'logger/server.log'),
		handleExceptions: true,
		json: true,
		maxsize: 52427880,
		maxFiles: 20,
		colorize: false
	},
	console: {
		level: 'debug',
		handleExceptions: true,
		json: false,
		colorize: true
	}
}
