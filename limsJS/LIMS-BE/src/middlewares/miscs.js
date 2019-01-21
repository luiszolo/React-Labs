async function asyncForEach(arr, callback) {
	for (let index = 0; index < arr.length; index++)
		await callback(arr[index], index, arr);
}

const capitalizeWord = (s) => s.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
const removeDuplications = (arr) => arr.filter((v, i) => arr.indexOf(v) === i);

module.exports = {
	asyncForEach: asyncForEach,
	capitalizeWord: capitalizeWord,
	removeDuplications: removeDuplications
};
