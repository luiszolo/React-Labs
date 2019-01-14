const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const path = require('path');
const util = require('util');

// Initializations
const app = express();
const log_file = fs.createWriteStream(path.join(__dirname, './logs/server.log'));
const log_stdout = process.stdout;

console.log = function(d) {
	log_file.write(util.format(d) + '\n');
	log_stdout.write(util.format(d) + '\n');
};

// Settings
app.set('port', process.env.PORT || 4000);

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({
	extended: false
}));
app.use(bodyParser.json());
app.use(require('./middlewares/cors'));


// Routes
app.use('/api', require('./routes'));

// Public
app.use(express.static(path.join(__dirname, 'public')));

// Starting Server
app.listen(app.get('port'), _ => {
	console.log(`Server started on port ${app.get('port')}`);
});
