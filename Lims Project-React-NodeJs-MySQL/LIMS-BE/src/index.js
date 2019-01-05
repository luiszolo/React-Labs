const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const path = require('path');


const { database, Ip } = require('./config/keys');

// Initializations
const app = express();

// Settings
app.set('port', process.env.PORT || 4000);

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({
	extended: false
}));
app.use(bodyParser.json());
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
});

// Routes
app.use('/api', require('./routes'));

// Public
app.use(express.static(path.join(__dirname, 'public')));

// Starting Server

app.listen(app.get('port'), _ => {
	console.log(`Server started on port ${app.get('port')}`);
	console.log(`My Ip is: ${Ip}`);
});
