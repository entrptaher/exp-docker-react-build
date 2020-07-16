const proxy = require('http-proxy-middleware');
const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const isDocker = require('is-docker');
const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const webpackHotReload = require('webpack-hot-middleware');
const history = require('connect-history-api-fallback');

const webpackConfig = require('../webpack.config');

const app = express();

const isDev = process.env.NODE_ENV === 'development';
// otherwise nginx handles the proxies

const port = 1234;

const url = `http://localhost:${port}`;

if (isDev) {
	const compiler = webpack(webpackConfig);
	app.use(webpackHotReload(compiler));
	app.use(history());
	app.use(middleware(compiler));
	app.listen(port, () => {
		console.log(`Client server running at ${url}`);
	});
} else {
	const httpsOptions = {};

	const server = https.createServer(httpsOptions, app);

	app.use(express.static(`${__dirname}/../dist`));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(`${__dirname}/../dist/index.html`));
	});

	server.listen(port, () => {
		console.log(`Client server running at ${url}`);
	});
}
