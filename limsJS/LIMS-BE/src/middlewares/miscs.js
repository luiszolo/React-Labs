async function asyncForEach(arr, callback) {
	for (let index = 0; index < arr.length; index++)
		await callback(arr[index], index, arr);
}

module.exports = {
	asyncForEach: asyncForEach
}
