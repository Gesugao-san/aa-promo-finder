
// https://stackoverflow.com/a/41412836/8175291
const request = require('request');

var req_options = {
	uri: '',
	port: 80,
	method: 'GET',
	headers: {
		'Accept': 'text/html',
		'Accept-Charset': 'utf-8',
		'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' // AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.82 Safari/537.36
	}
};

function parse() {
	return new Promise((resolve, reject) => {
		// request('https://bitskins.com/api/v1/get_account_balance/?api_key='+api+'&code='+code, function (error, response, body) {
		request(req_options, function (error, response, body) {
			// in addition to parsing the value, deal with possible errors
			console.log('Target:', req_options.uri);
			if (error)
				return reject(error);
			else
				if (response.statusCode == 200) {
				console.log('200 OK — website and connection is up');
				//out[targetIndex][2] = '~';
			}
			if (response.statusCode in Array.from(Array(300, 399).keys())) {
				//console.log('Redirect (status code):', response.statusCode);
				//out[targetIndex][2] = '-';
				resolve('Redirect (status code):', response.statusCode); // https://stackoverflow.com/a/48839845/8175291
			} else if (response.request.uri.href == "https://archeage.ru/" || response.request.uri.href != uri ) { // https://stackoverflow.com/a/17362976/8175291
				//console.log('Redirect (request href) — there is no promo');
				//out[targetIndex][2] = '-';
				resolve("Redirect (request href) — there is no promo"); // https://stackoverflow.com/a/48839845/8175291
			} else if (response.statusCode != 200) {
				console.log('Error:', response.statusCode);
			}
		});
	});
}

req_options.uri = "https://archeage.ru/promo/aa00/index.html";
parse().then(function(val) {
	console.log(val);
}).catch(function(err) {
	console.error(err);
});
req_options.uri = "https://archeage.ru/promo/aa01/index.html";
parse().then((val) => {
	console.log(val);
}).catch((err) => {
	console.error(err);
});
