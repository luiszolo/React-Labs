const bodyParser = require('body-parser');
const express = require('express');
const expWinston = require('express-winston');
const fs = require('fs');
const morgan = require('morgan');
const path = require('path');
const winston = require('winston');

const { database, Ip } = require('./config/keys');

// Initializations
const app = express();


// Settings
app.set('port', process.env.PORT || 4000);

// Middlewares
app.use(morgan('combined'));
app.use(express.urlencoded({
	extended: false
}));
app.use(bodyParser.json());
app.use(require('./middlewares/cors'));
app.use(expWinston.logger({
	transports: [
		new winston.transports.Console()
	],
	format: winston.format.combine(
		winston.format.colorize(),
		winston.format.json()
	),
	meta: true,
	msg: 'HTTP {{req.method}} {{req.url}}',
	expressFormat: true,
	colorize: false,
	ignoreRoute: (req, res) => false
}));

// Routes
app.use('/api', require('./routes'));

// Error handler (Logs only)
app.use(expWinston.errorLogger({
	transports: [
		new winston.transports.Console()
	],
	format: winston.format.combine(
		winston.format.colorize(),
		winston.format.json()
	)
}));

// Public
app.use(express.static(path.join(__dirname, 'public')));

// Starting Server

app.listen(app.get('port'), _ => {
	console.log(`Server started on port ${app.get('port')}`);
	console.log(`My Ip is: ${Ip}`);
});
