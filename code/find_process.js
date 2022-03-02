
const find = require('find-process');
var name = 'chrome.exe', process_running = false, process_debug = false;

async function mainLoop() {
	console.clear();
	console.log("Hi");
	await find('name', name, true)
		.then((list) => {
			//console.log('there are %s', list.length, '"' + name + '" process(es)' + (list.length != 0 ? ":\n" + list : '.'));
			console.log('There are %s nginx process(es)', list.length); //, "\n", list);
			if (list.length != 0) process_running = true;
			for (var i in list) {
				if (list[i].cmd.includes("--remote-debugging-port=")) {
					//console.log(list[i]);
					process_debug = true;
					break;
				}
			}
		});
	console.log("Is Chrome running?", process_running);
	console.log("Is Chrome under debug mode?", process_debug);
	console.log("Bye");
}

mainLoop();
