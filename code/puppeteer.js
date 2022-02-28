
// https://github.com/bertrandom/chrome-cookies-secure
// const chrome = require('chrome-cookies-secure'); - req. VS 2015
const path = 'https://archeage.ru/'; // 'https://www.example.com/path/'
const puppeteer = require('puppeteer');

console.clear();
(async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(path);
	const cookies = await page.cookies(path);
	//await page.screenshot({ path: 'example.png' });
	console.log("length:", cookies.length);
	if (cookies) {
		for (let i = 0; i < cookies.length; i++) {
			if (cookies[i].name == "Mpop") {
				console.log("-------->", cookies[i]);
				break;
			} else {
				console.log(cookies[i].name);
				continue;
			}
			/* console.log("Not logged in? Error.");
			await browser.close();
			return 1; */
		}
	} else {
		console.log("No cookies.");
		await browser.close();
		return 1;
	}

	await browser.close();
})();
