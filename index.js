
const request = require('request');
const fs = require('fs');

let obj, alph1, alph2, alph3, alph4, out = [];

for(i1 = 9; ++i1 < 16;) {
	alph1 = i1.toString(36).toLowerCase(); // a-z
	for(i2 = 9; ++i2 < 16;) {
		alph2 = i2.toString(36).toLowerCase(); // a-z
		for(i3 = -1; ++i3 < 10;) {
			alph3 = i3.toString(36); // 0-9
			for(i4 = -1; ++i4 < 10;) {
				alph4 = i4.toString(36); // 0-9
				out.push([alph1 + alph2 + alph3 + alph4, "?"]); // aa00 - ff99
			}
		}
	}
}

out.unshift(new Date().toISOString());

if (fs.existsSync('./cache/result.json')) {
	obj = JSON.parse(fs.readFileSync('./cache/result.json', 'utf8'));
	console.log("obj: ", obj);
} else {
	console.log('File not found! Creating generated one...');
	// https://stackoverflow.com/a/31777314/8175291
	fs.writeFileSync('./cache/result.json', JSON.stringify({out}, null, 4), { flag: 'w' }, function(err, result) { // 'wx' for "EEXIST"
		if (error) {
			console.log('Error occured while data saving: ', err);
		} else {
			console.log('Data saved.');
		}
	});
}

/* try {
} catch (error) {
	if (error.code === 'ENOENT') {
		console.log('File not found! Creating generated...');
	} else {
		throw error;
	}
} */


var random_item = out[Math.floor(Math.random() * out.length)][0];
/* var uri = "http://aa.mail.ru/promo/" + random_item + "/"; */
var uri = "https://archeage.ru/promo/" + random_item + "/index.html";
uri_ok = "https://archeage.ru/promo/aa81/index.html"; //"https://www.google.ru/";
uri_fail = "https://archeage.ru/promo/ff99/index.html"; //"https://www.google.ru/";
if (0) uri=uri_ok; if (0) uri=uri_fail;

console.clear();
console.log([out[0]], ", ...");
console.log(out.slice(1, 4), "...");
console.log(out.slice(-3, out.length));
console.log("Random target URL:", uri);
if (1) return;

//lastGameachePath = path.basename('./output/' + parameters["appid"] + '.json');
//const get_request_args = querystring.stringify(parameters);

const req_options = {
	uri: uri,
	port: 80,
	method: 'GET',
	headers: {
		'Accept': 'text/html',
		'Accept-Charset': 'utf-8',
		'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' // AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.82 Safari/537.36
	}
};

console.log('Data receiving in progress...');
request(req_options, function(error, response, body) {
	if (!error) {
		if (response.statusCode == 200) {
			console.log('200 OK — website and connection is up');
		}
		if (response.statusCode in Array.from(Array(300, 399).keys())) {
			console.log('Redirect (status code):', response.statusCode);
		} else if (response.request.uri.href == "https://archeage.ru/" || response.request.uri.href != uri ) { // https://stackoverflow.com/a/17362976/8175291
			console.log('Redirect (website) — there is no promo');
		} else if (response.statusCode != 200) {
			console.log('Error:', response.statusCode);
		}
	} else {
		console.error('Error occured while data receiving:', error);
		console.log('Non-OK HTTP status code received:', response && response.statusCode);
	}
});
