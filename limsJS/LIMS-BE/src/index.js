const myIp = require('./config/ip');

const bodyParser = require('body-parser');
const concatFiles = require('concat-files');
const express = require('express');
const fs = require('fs');
const moment = require('moment-timezone');
const morgan = require('morgan');
const path = require('path');
const util = require('util');

// Initializations
const app = express();
// const log_file = fs.createWriteStream(path.join(__dirname, './logs/server.log'), {
// 	flags: 'w'
// });
// const log_stdout = process.stdout;

// console.log = function(d) {
// 	log_file.write(`===== ${new Date(Date.now()).toISOString().slice(0, 19).replace('T', ' ')} ===== `);
// 	log_file.write(util.format(d) + '\n');
// 	log_stdout.write(util.format(d) + '\n');

// 	concatFiles([
// 		path.join(__dirname, './logs/server.log'),
// 		path.join(__dirname, './logs/main.log')
// 	], path.join(__dirname, './logs/main.log'), err => {
// 		if (err) throw err;
// 	});
// };

// Settings
app.set('port', process.env.PORT || 4000);

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({
	extended: false
}));
app.use(bodyParser.json());
app.use(require('./middlewares/cors'));
app.use(function(error, req, res, next) {
	console.error(error.stack);
	res.status(500).send({
		message: 'Something is wrong'
	})
});

// Routes
app.use('/api', require('./routes'));

// Public
app.use(express.static(path.join(__dirname, 'public')));

// Starting Server
app.listen(app.get('port'), _ => {
	console.log(myIp)
	console.log(`Server started on port ${app.get('port')}`);
});
