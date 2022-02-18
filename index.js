
const request = require('request');
const fs = require('fs');

var out = [], RedirectCodes = [];
var path = './cache/result.json';
var template = [ "https://archeage.ru/promo/", "/index.html"];

function indexOfArray2D(array, target) {
	for (var i = 0; i < array.length; i++) {
		if (array[i][1] == target) {
			return i;
		}
	}
	return false;
}

// populate
function generateArray() {
	let alph1, alph2, alph3, alph4;
	/*
		Possible templates:
		With possible cycle rules:
		https://archeage.ru/promo/ff99/index.html - https://archeage.ru/promo/ff99/index.html - (???) https://archeage.ru/promo/zz99/index.html
		(???) http://aa.mail.ru/promo/playaa/ - http://aa.mail.ru/promo/playff/ - http://aa.mail.ru/promo/playzz/
		* (???) - To explore or unknown data mark.
		Exceptions:
		http://aa.mail.ru/subscribe, http://aa.mail.ru/promo/advent/.
		//
	*/
	for(i1 = 9; ++i1 < 16;) {
		alph1 = i1.toString(36).toLowerCase(); // a-z
		for(i2 = 9; ++i2 < 16;) {
			alph2 = i2.toString(36).toLowerCase(); // a-z
			for(i3 = -1; ++i3 < 10;) {
				alph3 = i3.toString(36); // 0-9
				for(i4 = -1; ++i4 < 10;) {
					alph4 = i4.toString(36); // 0-9
					//id++; // '0001' - '3600'
					//out.push([String(id).padStart(4, '0'), alph1 + alph2 + alph3 + alph4, "?"]); // aa00 - ff99
					out.push([alph1 + alph2 + alph3 + alph4, "?"]); // aa00 - ff99
				}
			}
		}
	}
	out.unshift(new Date().toISOString());
	for (var i = 300; i <= 399; i++) {
		RedirectCodes.push(i);
	}
	//console.log("RedirectCodes:", RedirectCodes[0], '-', RedirectCodes[RedirectCodes.length-1]);
}

function writeCache(path, data) {
	if (!fs.existsSync(path)) {
		console.log('File not found! Rewriting...');
	}
	if (Array.isArray(data[0])) {
		data.unshift(new Date().toISOString());
	}
	// https://stackoverflow.com/a/31777314/8175291
	fs.writeFileSync(path, JSON.stringify(data, null, 4), { flag: 'w' }, function(error) { // 'wx' for "EEXIST"
		if (error) {
			console.log('Error occured while data saving: ', err);
		} else {
			console.log('Data saved.');
		}
	});
}

function doRequest(targetIndex) {
	return new Promise((resolve, reject) => {
		// request('https://bitskins.com/api/v1/get_account_balance/?api_key='+api+'&code='+code, function (error, response, body) {
		request(req_options, function (error, response, body) {
			// in addition to parsing the value, deal with possible errors
			if (response.statusCode == 200) {
				process.stdout.write('200 OK — ');
				out[targetIndex][1] = '~';
			}
			if (response.statusCode in RedirectCodes) { // Array.from(Array(300, 399).keys())
				//console.log('Redirect (status code):', response.statusCode);
				out[targetIndex][1] = '-';
				resolve('redirect (status code):', response.statusCode); // https://stackoverflow.com/a/48839845/8175291
			} else if (response.request.uri.href == "https://archeage.ru/" || response.request.uri.href != req_options.uri ) { // https://stackoverflow.com/a/17362976/8175291
				//console.log('Redirect (request href) — there is no promo');
				out[targetIndex][1] = '-';
				resolve("redirect (request href), there is no promo"); // https://stackoverflow.com/a/48839845/8175291
			} else if (response.statusCode != 200) {
				console.log('Error:', response.statusCode);
			}
			if (error)
				return reject(error);
		});
	});
}

async function mainLoop() {
	console.clear();
	generateArray();
	/* if (!fs.existsSync(path)) { // ALWAYS REWRITES FILE, OK
		console.log('File not found! Writing generated one...');
		writeCache(path, {out}, true);
	} */
	try {
		out = JSON.parse(fs.readFileSync(path, 'utf8'));
	} catch (error) {
		console.error("Error on read cache file:\n", error);
	}
	var out_length = out.length - 3595;
	console.log("Cache file loaded, last update time:", out[0]);
	out.shift();
	//console.log("out:", out[0]);
	console.log("Template URL:", template[0] + "__DATA__" + template[1] + ", Data: [aa00-ff99]");
	console.log("Total promo to check:", out_length);
	for (var i = 1; i < out_length; i++) {
		let targetIndex = indexOfArray2D(out, out[i][1]);
		let state = out[targetIndex][1];
		req_options.uri = template[0] + out[i][1] + template[1];
		//console.log('Data receiving in progress...', req_options.uri);
		process.stdout.write('Target [' + ('000' + (i)).slice(-out_length)  + '\\' + out_length + ']: ' + out[i][0] + ' — ');
		if (state == "?") { //in ["?", "~"]
			await doRequest(targetIndex).then(function(val) {
				console.log(val);
			}).catch(function(err) {
				console.error(err);
			});
		} else {
			console.log("skipping due to already resolved: \"" + state + "\"");
		}
		writeCache(path, out, true);
	}
}


/* random_item = out[Math.floor(Math.random() * out.length)][0]; */
/* var uri = "http://aa.mail.ru/promo/" + random_item + "/"; */
/* uri_ok = "aa81"; //"https://www.google.ru/";
uri_fail = "aa00";
if (0) random_item=uri_ok; if (1) random_item=uri_fail;
uri = "https://archeage.ru/promo/" + random_item + "/index.html";

console.log([out[0]], ",");
console.log(out.slice(1, 4), "...");
console.log(out.slice(-3, out.length));
console.log("Random target URL:", uri); */


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

mainLoop();
