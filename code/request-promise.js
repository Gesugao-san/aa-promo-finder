
// https://stackoverflow.com/a/41412836/8175291
const request = require('request');

var req_options = {
	uri: '',
	port: 80,
	method: 'GET',
	//followRedirect: false,
	headers: {
		'Accept': 'text/html',
		'Accept-Charset': 'utf-8',
		'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' // AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.82 Safari/537.36
	}
};
var targetArray = ["aa00", "aa65"];
// https://stackoverflow.com/a/8069367/8175291
for (var RedirectCodes = [], i = 300; i <= 399; i++) {
	RedirectCodes.push(i);
}
//console.log("RedirectCodes:", RedirectCodes[0], '-', RedirectCodes[RedirectCodes.length-1]);

function doRequest() {
	return new Promise((resolve, reject) => {
		// request('https://bitskins.com/api/v1/get_account_balance/?api_key='+api+'&code='+code, function (error, response, body) {
		request(req_options, function (error, response, body) {
			// in addition to parsing the value, deal with possible errors
			if (response.statusCode == 200) {
				process.stdout.write('200 OK — ');
				//out[targetIndex][2] = '~';
			}
			if (response.statusCode in RedirectCodes) { // Array.from(Array(300, 399).keys())
				//console.log('Redirect (status code):', response.statusCode);
				//out[targetIndex][2] = '-';
				resolve('Redirect (status code):', response.statusCode); // https://stackoverflow.com/a/48839845/8175291
			} else if (response.request.uri.href == "https://archeage.ru/" || response.request.uri.href != req_options.uri ) { // https://stackoverflow.com/a/17362976/8175291
				//console.log('Redirect (request href) — there is no promo');
				//out[targetIndex][2] = '-';
				resolve("Redirect (request href), there is no promo"); // https://stackoverflow.com/a/48839845/8175291
			} else if (response.statusCode != 200) {
				console.log('Error:', response.statusCode);
			}
			if (error)
				return reject(error);
		});
	});
}

async function mainLoop() {
	for (let i = 0; i < targetArray.length; i++) {
		req_options.uri = "https://archeage.ru/promo/" + targetArray[i] + "/index.html";
		process.stdout.write('Target [' + (i + 1) + '\\' + targetArray.length + ']: ' + targetArray[i] + ' — ');
		await doRequest().then(function(val) {
			console.log(val);
		}).catch(function(err) {
			console.error(err);
		});
	}
}

mainLoop();
