
const fs = require('fs');
const cfg = require('./../config.json');

global.writeDataFile = (path, data, flag) => {
	/* if ((!fs.existsSync(path)) || (cfg.options.recreate_data_file)) {
		process.stdout.write('Data file not found, redeploying... ');
	} else {
		process.stdout.write('Data file found... ');
	} */
	fs.writeFileSync(path, JSON.stringify(data, null, '\t') + '\n', { flag: flag });
	// https://stackoverflow.com/a/31777314/8175291 // 'wx' for "EEXIST"
	/* fs.writeFileSync(path, JSON.stringify(data, null, 4), { flag: 'w' }, function(error) {
		if (error) {
			console.log('Error occured while data saving: ', err);
		} else {
			console.log('Data saved.');
		}
	}); */
}
