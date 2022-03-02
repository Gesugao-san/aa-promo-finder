
const request = require('request');
const puppeteer = require('puppeteer');

// https://stackoverflow.com/a/61722618/8175291
async function mainLoop() {
	console.clear();
	console.log("Hi");
	const browser = await puppeteer.launch({});
	const page = await browser.newPage();
	await page.goto('https://archeage.ru/promo/aa81/index.html', {waitUntil : 'networkidle0' });
	// networkidle2, domcontentloaded, load are the options for wai until
	// Here we can get all of the cookies
	var content = await page._client.send('Network.getAllCookies');
	content = content.cookies;
	for (var i in content) {
		if (content[i].name == "PHPSESSID") {
			//console.log(key + " -> " + p[key]);
			console.log(content[i]);
		}
		//console.log(JSON.stringify(content, null, 4));
	}
	//console.log(JSON.stringify(content, null, 4));

	await page.goto('https://archeage.ru/dynamic/auth/?a=checkuser', {waitUntil : 'networkidle0' });
	let bodyHTML = await page.evaluate(() => document.body.innerHTML);
	console.log(JSON.parse(bodyHTML));

	console.log("Bye");
	await browser.close();
	process.exit(0);
}

mainLoop();
