

/* B. Iterate with a for loop from 10 to 35 and convert it to string using 36 as radix
	https://ourcodeworld.com/articles/read/1458/how-to-print-the-alphabet-with-javascript
The JavaScript toString method returns a string representing the specified Number object.
It receives as the first argument an integer in the range 2 through 36 specifying the base
to use for representing numeric values. In this case, iterating from 10 to 35, converting
every number to a string using 36 as the base will return the alphabet's character that
we'll concatenate into a string: */

//let alphabet1 = '0', alphabet2 = '0', out = [];
let alph1, alph2, alph3, alph4, out = [];

/* for(i = -1; ++i < 16;) {
	alphabet1 = i.toString(36).toLowerCase(); // a-f
	for(ii = -1; ++ii < 16;) {
		alphabet2 = ii.toString(36).toLowerCase(); // a-f
		out.push(alphabet1 + alphabet2); // '00' - 'ff'
	}
} */
for (i1 = 9; ++i1 < 36;) { // a-z
	alph1 = i1.toString(36).toLowerCase();
	for(i2 = 9; ++i2 < 36;) { // a-z
		alph2 = i2.toString(36).toLowerCase();
		for(i3 = -1; ++i3 < 10;) { // 0-9
			alph3 = i3.toString(36);
			for(i4 = -1; ++i4 < 10;) { // 0-9
				alph4 = i4.toString(36);
				//id++; // '0001' - '3600'
				//out.push([String(id).padStart(4, '0'), alph1 + alph2 + alph3 + alph4, "?"]); // aa00 - ff99
				//out.push([alph1 + alph2 + alph3 + alph4, "?"]); // aa00 - ff99
				out.push(JSON.parse('{"id":"' + alph1 + alph2 + alph3 + alph4 + '","data":"?"}'));
			}
		}
	}
}

out.unshift(JSON.parse('{"time":"' + new Date().toISOString() + '"}'));
// https://stackoverflow.com/a/5915122/8175291
var random_item = out[Math.floor(Math.random()*out.length)];

console.clear();
console.log(out.slice(0, 4), "...");
console.log(out.slice(-3, out.length));
console.log("Random URL: http://aa.mail.ru/promo/" + random_item.id + "/");
