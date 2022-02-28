
const fs = require('fs');

var verbose = 1, rescan = 0;
var path = './cache/result.json';
var template = [ "https://archeage.ru/promo/", "/index.html"];

const cfg = {
	"secrets": {
		"PHPSESSID": '0',
	},
	"options": {
		"verbose": 0,
		"rescan": 0,
	},
	"paths": {
		"data": './cache/data.json',
	},
	"urls": {
		"aa": {
			"full": 'https://archeage.ru/',
			"short": 'http://aa.mail.ru/',
		},
	},
	"patterns": {
		"promo": [
			"aa*",
		],
		"no promo": [],
		"exceptions": {
			"promo": [
				"advent",
				"playaa",
			],
			"no promo": [
				"subscribe",
			]
		}
	}
}

function writeCache(path, data) {
	let _flag;
	if (!fs.existsSync(path)) {
		console.log('File not found! Rewriting...');
		_flag = 'w';
	} else {
		_flag = 'wx'; // 'wx' for "EEXIST"
	}
	if (!data[0].hasOwnProperty('time')) {
		data.unshift(JSON.parse('{"time":"' + new Date().toISOString() + '"}'));
	}
	/* let dataToWrite = [];
	for (var i = 1; i < data.length; i++) {
		dataToWrite.push(JSON.stringify(data.id, data.state));
		console.log("dataToWrite:", dataToWrite[0]);
		break;
	} */
	// https://stackoverflow.com/a/31777314/8175291
	fs.writeFileSync(path, JSON.stringify(data, null, 4), { flag: _flag }, function(error) {
		if (error) {
			console.log('Error occured while data saving: ', err);
		} else {
			console.log('Data saved.');
		}
	});
}
