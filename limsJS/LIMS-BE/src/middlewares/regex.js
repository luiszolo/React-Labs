const validateSampleName = name => {
	const regex = /SA-[0-9][0-9]-[0-9][0-9][0-9][0-9][0-9]/;
	return regex.test(String(name).toUpperCase());
};

const notNumber = text => {
	const regex = /^([^0-9]*)$/;
	return regex.test(String(text).toUpperCase());
};

module.exports = {
	notNumber: notNumber,
	validateSampleName: validateSampleName
}
