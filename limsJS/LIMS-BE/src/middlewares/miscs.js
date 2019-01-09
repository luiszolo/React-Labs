async function asyncForEach(arr, callback) {
	for (let index = 0; index < arr.length; index++)
		await callback(arr[index], index, arr);
}

const capitalizeWord = (s) => s.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');

module.exports = {
	asyncForEach: asyncForEach,
	capitalizeWord: capitalizeWord
};
