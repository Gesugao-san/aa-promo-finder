
const puppeteer = require('puppeteer');

// https://stackoverflow.com/a/61722618/8175291
async function mainLoop() {
	console.clear();
	console.log("Hi");

	//const browser = await puppeteer.launch();
	const browserURL = 'http://127.0.0.1:21222';
	try {
		var browser = await puppeteer.connect({browserURL}); // https://stackoverflow.com/a/55100293/8175291
	} catch (e) {
		if (e.code === "ECONNREFUSED") {
			console.error(`FetchError: Failed to fetch browser.\nTo use Chrome Devtools Protocol you need to start it with debugging on, so try something this first in CMD please:\nSTART "" "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" --remote-debugging-port=21222`);
			process.exit(1);
		} else {
			throw e;
		}
	}
	var page = await browser.newPage();

	await page.goto('https://archeage.ru/promo/aa81/index.html', {waitUntil : 'networkidle0' });
	const client = await page.target().createCDPSession(); // https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-getAllCookies
	const all_browser_cookies = (await client.send('Network.getCookies')).cookies;
	const current_url_cookies = await page.cookies();
	const third_party_cookies = all_browser_cookies.filter(cookie => cookie.domain !== current_url_cookies[0].domain);

	//https://stackoverflow.com/a/60663733/8175291
	//console.log("all_browser_cookies:", all_browser_cookies); // All Browser Cookies // and ... 2946 more items
	console.log("current_url_cookies:", current_url_cookies); // Current URL Cookies
	console.log("third_party_cookies:", third_party_cookies); // Third-Party Cookies

	console.log("Bye");
	await page.close();
	//await browser.close();
	process.exit(0);
}

mainLoop();
