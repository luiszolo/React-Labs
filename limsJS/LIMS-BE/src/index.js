const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const path = require('path');


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

// Routes
app.use('/api', require('./routes'));

// Public
app.use(express.static(path.join(__dirname, 'public')));

// Starting Server

app.listen(app.get('port'), _ => {
	console.log(`Server started on port ${app.get('port')}`);
	console.log(`My Ip is: ${Ip}`);
});
