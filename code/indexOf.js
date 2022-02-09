
// https://stackoverflow.com/a/24943461/8175291

var arr = [[2,3],[5,8],[1,1],[0,9],[5,7]];
var coor1 = [0, 9];
var coor2 = [1, 2];

function isItemInArray(array, item) {
	for (var i = 0; i < array.length; i++) {
		// This if statement depends on the format of your array
		if (array[i][0] == item[0] && array[i][1] == item[1]) {
			return true;   // Found it
		}
	}
	return false;   // Not found
}

// Test coor1
console.log("Is it in there? [0, 9]", isItemInArray(arr, coor1));   // True

// Test coor2
console.log("Is it in there? [1, 2]", isItemInArray(arr, coor2));   // False

// Then
/* if (!isItemInArray(arr, [x, y])) {
	arr.push([x, y]);
} */
