
const request = require('request');
const fs = require('fs');

//lastGameachePath = path.basename('./output/' + parameters["appid"] + '.json');
//const get_request_args = querystring.stringify(parameters);

const req_options = {
	uri: 'http://store.steampowered.com/api/appdetails/?appids=' + parameters["appid"] + '&l=en&format=json',
	port: 80,
	method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8'
    }
};

console.log('Target info:');
console.log('Steam AppID:', parameters["appid"]);
console.log('Steam page URL: https://store.steampowered.com/app/' + parameters["appid"] + '/');
console.log('Steam Web API URL:', req_options.uri);

console.log('Data receiving in progress...');
request(req_options, function(error, response, body) {
	if (!error && response.statusCode == 200) {
		body_parsed = JSON.parse(body);
		console.log('Data received:\n', body_parsed);
		console.log('Data saving in progress...');
		fs.writeFile('./cache/' + parameters["appid"] + '.json', JSON.stringify(body_parsed, null, 4), function(err, result) {
			if (err)
				console.log('Error occured while data saving: ', err);
			else
				console.log('Data saved.');
			const used = process.memoryUsage().heapUsed / 1024 / 1024; // https://geshan.com.np/blog/2021/10/nodejs-read-file-line-by-line/
			console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
		});
		console.log('Is request was success (according to Steam Web API):', body_parsed[parameters["appid"]].success);
		console.log('');
		console.log('{{auto-generated}}');
		console.log('{{stub}}');
		console.log('{{Infobox game');
	} else {
		console.error('Error occured while data receiving:', error);
		console.log('Non-OK HTTP status code received:', response && response.statusCode);
	}
});
