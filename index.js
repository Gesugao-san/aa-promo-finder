
const fs = require('fs');
var populateData = require('./module/populateData');
const cfg = require('./config.json');
require('./module/writeDataFile');
require('./module/killCookie');


console.clear();
(async () => {
	console.log("Hi!");


	if ((!fs.existsSync(cfg.paths.data)) || (cfg.options.recreate_data_file)) {
		process.stdout.write('Data file not found or forced to recrate, redeploying... ');
	} else {
		process.stdout.write('Data file found... ');
	}
	try {
		writeDataFile(cfg.paths.data, populateData(), cfg.options.recreate_data_file ? 'w' : 'wx');
	} catch (e) {
		if ((e.code !== 'EEXIST') && (!cfg.options.recreate_data_file)) throw e;
	}
	console.log('Ok');
	const data = require(cfg.paths.data);

	if ((cfg.options.kill_cookie_on_exit) && (cfg.secrets.value != "secret")) cfg.secrets[0].value = "secret";
	writeDataFile(cfg.paths.config, cfg, 'w'); // cfg.options.recreate_data_file ? 'w' : 'wx');

	data.data.auto.push("test");
	console.log("2:\n", data);

	//killCookie("https://archeage.ru/dynamic/auth/?plogout=1", [cfg.secrets]);

	console.log("Bye!");
})();
