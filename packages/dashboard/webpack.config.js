const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const { REACT_APP_TEST, NODE_ENV } = process.env;

const environmentVariables = {
	'process.env': {
		REACT_APP_TEST: JSON.stringify(REACT_APP_TEST),
		NODE_ENV: JSON.stringify(NODE_ENV),
	},
};

const index =
	NODE_ENV === 'development'
		? ['webpack-hot-middleware/client?reload=true', './src/index.js']
		: ['./src/index.js'];

const plugins = [
	new HtmlWebPackPlugin({
		template: './src/index.html',
		filename: './index.html',
	}),
	new webpack.DefinePlugin(environmentVariables),
	new webpack.optimize.LimitChunkCountPlugin({
		// NOTE: disables code splitting, it increases http requests and the customers with HIGH speed feels the app is slow
		maxChunks: 1,
	}),
];
if (NODE_ENV === 'development') {
	plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = {
	mode: NODE_ENV,
	entry: {
		index,
	},
	output: {
		path: `${__dirname}/dist`,
		publicPath: '/',
		filename: '[name].js',
		library: '[name]',
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: 'html-loader',
					},
				],
			},
		],
	},
	resolve: {
		extensions: ['*', '.js', '.jsx'],
	},
	plugins,
};
