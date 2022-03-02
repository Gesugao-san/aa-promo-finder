
const request = require('request');
const fs = require('fs');

var verbose = 1, rescan = 0;
var path = './cache/result.json';
var template = [ "https://archeage.ru/promo/", "/index.html"];

var out = [], RedirectCodes = [];

function doRequest() {
	return new Promise((resolve, reject) => {
		process.stdout.write("Calling for " + req_options.uri + "... ");
		request(req_options, function (error, res, body) {
			// in addition to parsing the value, deal with possible errors
			if (res.statusCode === 200) {
				console.log("200 OK\n", JSON.parse(body));
				//resolve("200 OK");
			}
			if (res.statusCode !== 200) {
				console.log('Error:', res.statusCode);
			}
			if (error)
				return reject(error);
		});
	});
}

async function mainLoop() {
	console.clear();
	console.log("Hi");
	console.log("headers.cookie: " + req_options.headers.Cookie);
	await doRequest().then(function(val) {
		console.log(val);
	}).catch(function(err) {
		console.error(err);
	});
	console.log("Bye");
}

var req_options = {
	uri: 'https://archeage.ru/dynamic/auth/?a=checkuser',
	port: 80,
	method: 'GET',
	headers: {
		'Accept': 'text/html',
		'Accept-Charset': 'utf-8',
		'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', // AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.82 Safari/537.36
		'Cookie': JSON.stringify(
			{"PHPSESSID": "secret", "var2": "value2"} // "secret"
			).replace(":","=").replace(/\{|\}|\"/g,"").replace(",",";") + ";", // https://youtu.be/hK20d1hWnqE IT'S WORKS, JSON TO COOKIE
	}
};

mainLoop();
