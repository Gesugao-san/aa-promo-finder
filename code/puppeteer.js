
// https://github.com/bertrandom/chrome-cookies-secure
// const chrome = require('chrome-cookies-secure'); - req. VS 2015
const puppeteer = require('puppeteer');


console.clear();
(async () => {
	const cookies_in = [{
		'name': 'PHPSESSID',
		'value': 'ffdli8biuagb4mth27egei7p76', // 'secret' from https://aa.mail.ru/dynamic/auth/
		/* 'domain': '.mail.ru',
		'path': '/',
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
	const path = 'https://aa.mail.ru/dynamic/auth/'; // a=checkuser // 'https://www.example.com/path/'
	const page = await browser.newPage();
	await page.setViewport({
		width: 300, //640,
		height: 250, //480,
		deviceScaleFactor: 1,
	});

	console.log("Hi!");

	process.stdout.write("goto (1)... ");
	await page.goto(path).then(() => {
		console.log("Ok");
	}).catch((e) => {
		console.error("Error:\n", e);
		await browser.close();
		process.exit(1);
	});;

	process.stdout.write("setCookie... ");
	await page.setCookie(...cookies_in).then(() => {
		console.log("Ok");
	}).catch((e) => {
		console.error("Error:\n", e);
		await browser.close();
		process.exit(1);
	});;

	process.stdout.write("goto (2)... ");
	await page.goto(path).then(() => {
		console.log("Ok");
	}).catch((e) => {
		console.error("Error:\n", e);
		await browser.close();
		process.exit(1);
	});;

	process.stdout.write("screenshot... ");
	await page.screenshot({ path: './cache/aa_auth_result.png' }).then(() => {
		console.log("Ok");
	}).catch((e) => {
		console.error("Error:\n", e);
		await browser.close();
		process.exit(1); // reject
	});

	console.log("Bye!");
	await browser.close();
	process.exit(0);
})();
