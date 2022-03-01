
// node ".\code\puppeteer.js"

// https://github.com/bertrandom/chrome-cookies-secure
// const chrome = require('chrome-cookies-secure'); - req. VS 2015
const puppeteer = require('puppeteer');


console.clear();
(async () => {
	const cookies_in = [{
		'name': 'PHPSESSID',
		'value': 'secret', // 'secret' from https://aa.mail.ru/dynamic/auth/
		/* 'domain': '.mail.ru',
		'path1': '/',
		'expires': -1, // '2023-01-01T00:00:01.123Z'
		'session': true,
		'size': 107,
		'httpOnly': true,
		'secure': true,
		'sameSite': 'None',
		'sameParty': false,
		'priority': 'High',
		'sourceScheme': 'Secure',
		'sourcePort': 443 */
	}];
	const browser = await puppeteer.launch();
	const path1 = 'https://aa.mail.ru/dynamic/auth/'; // 'https://www.example.com/path1/'
	const path2 = 'https://aa.mail.ru/dynamic/auth/?a=checkuser';
	const page = await browser.newPage();
	await page.setViewport({
		width: 300, //640,
		height: 250, //480,
		deviceScaleFactor: 1,
	});

	console.log("Hi!");

	process.stdout.write("goto (1)... ");
	await page.goto(path1).then(() => {
		console.log("Ok");
	}).catch((e) => {
		console.error("Error:\n", e);
		browser.close();
		process.exit(1);
	});;

	process.stdout.write("setCookie... ");
	await page.setCookie(...cookies_in).then(() => {
		console.log("Ok\n");
	}).catch((e) => {
		console.error("Error:\n", e);
		browser.close();
		process.exit(1);
	});;
	//console.log("page: " + page.json());

	page.on('response', async (response) => {
		//if (response.url() == "https://capuk.org/ajax_search/capmoneycourses"){
		console.log('XHR response received');
		console.log(await response.json());
		//}
	});

	process.stdout.write("goto (2)... ");
	await page.goto(path1).then(() => {
		console.log("Ok");
	}).catch((e) => {
		console.error("Error:\n", e);
		browser.close();
		process.exit(1);
	});;

	process.stdout.write("screenshot (1)... ");
	await page.screenshot({ path: './cache/aa_auth_result_1.png' }).then(() => {
		console.log("Ok");
	}).catch((e) => {
		console.error("Error:\n", e);
		browser.close();
		process.exit(1); // reject
	});

	process.stdout.write("goto (3)... ");
	await page.goto(path2).then(() => {
		console.log("Ok");
	}).catch((e) => {
		console.error("Error:\n", e);
		browser.close();
		process.exit(1);
	});;

	process.stdout.write("screenshot (2)... ");
	await page.screenshot({ path: './cache/aa_auth_result_2.png' }).then(() => {
		console.log("Ok");
	}).catch((e) => {
		console.error("Error:\n", e);
		browser.close();
		process.exit(1); // reject
	});
	process.stdout.write("goto (4)... ");
	await page.goto('https://archeage.ru/').then(() => {
		console.log("Ok");
	}).catch((e) => {
		console.error("Error:\n", e);
		browser.close();
		process.exit(1);
	});;

	process.stdout.write("title... ");
	var title = await page.title().then(() => {
		console.log("Ok");
	}).catch((e) => {
		console.error("Error:\n", e);
		browser.close();
		process.exit(1); // reject
	});
	console.log("title:", toString(title));

	console.log("Bye!");
	await browser.close();
	process.exit(0);
})();
