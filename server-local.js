const express = require('express');
const compression = require('compression');
const cookie = require('cookie');
const request = require('request');
const path = require('path');
const serveStatic = require('serve-static');

app = express();

app.use((req, res, next) => {
    const access_token = cookie.parse(req.headers.cookie || '').access_token;
    if (req.path.endsWith('css') || req.path.endsWith('map') || req.path.endsWith('js')) {
    	console.log('Gotcha! No access token for you! - ', req.path);
    	next();
    	return;
    }
    request.get({
        url: 'https://gamma.pratilipi.com/user/accesstoken?accessToken=' + access_token,
        json: true
    }, function(errorInResponse, response, data) {
        res.setHeader('set-cookie', 'access_token=' + data.accessToken);
        res.cookie('access_token', data.accessToken, {
			domain: process.env.DOMAIN || 'localhost',
			path: '/',
			httpOnly: false,
			maxAge: 60 * 60 * 1000,
	    });
        next();
    });

})

app.use(compression({ level: 9 }));
app.use(serveStatic(__dirname + `/dist/${process.env.LANGUAGE}/`));

app.use((req, res) => {
	res.sendFile(__dirname + `/dist/${process.env.LANGUAGE}/index.html`)
});

const port = process.env.PORT || 5000;

app.listen(port);
console.log('server started ' + port);