
const puppeteer = require('puppeteer');

global.killCookie = async (url, cookies_in) => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	await page.setViewport({
		width: 300, //640,
		height: 250, //480,
		deviceScaleFactor: 1,
	});

	await page.setExtraHTTPHeaders({
		'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64)',
		'X-Requested-With': 'XMLHttpRequest',
		//'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
	})

	process.stdout.write("goto (1)... ");
	await page.goto(url).then(() => {
		console.log("Ok");
	}).catch((e) => {
		console.error("Error:\n", e);
		browser.close();
		process.exit(1);
	});;

	process.stdout.write("setCookie... ");
	await page.setCookie(...cookies_in).then(() => {
		console.log("Ok");
	}).catch((e) => {
		console.error("Error:\n", e);
		browser.close();
		process.exit(1);
	});;
}
