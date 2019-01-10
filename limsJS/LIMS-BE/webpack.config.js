const path = require('path');

module.exports = {
	entry: './src/app/index.js',
	output: {
		path: path.join(__dirname, './src/public/js'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				use: 'babel-loader',
				test: /\.js$/,
				exclude: /node_modules/
			}
		]
	}
};
