

/* B. Iterate with a for loop from 10 to 35 and convert it to string using 36 as radix
	https://ourcodeworld.com/articles/read/1458/how-to-print-the-alphabet-with-javascript
The JavaScript toString method returns a string representing the specified Number object.
It receives as the first argument an integer in the range 2 through 36 specifying the base
to use for representing numeric values. In this case, iterating from 10 to 35, converting
every number to a string using 36 as the base will return the alphabet's character that
we'll concatenate into a string: */

let alphabet1 = '0', alphabet2 = '0', out = [];

for(i = -1; ++i < 16;) {
	alphabet1 = i.toString(36).toLowerCase();
	for(ii = -1; ++ii < 16;) {
		alphabet2 = ii.toString(36).toLowerCase();
		out.push(alphabet1 + alphabet2);
	}
}

// https://stackoverflow.com/a/5915122/8175291
var random_item = out[Math.floor(Math.random()*out.length)];

console.log(out.slice(0, 6), "...");
console.log(out.slice(-6, out.length));
console.log("Random URL: http://aa.mail.ru/promo/" + random_item + "/");
