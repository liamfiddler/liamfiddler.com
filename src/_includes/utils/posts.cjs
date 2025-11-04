const { DateTime } = require('luxon');

module.exports = {
	dateDisplayFilter: (dateObj, format = 'LLL d, y') =>
		DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat(format),
	readingTimeFilter: (text) => {
		const wordsPerMinute = 250;
		const numberOfWords = text.split(/\s/g).length;
		return Math.ceil(numberOfWords / wordsPerMinute);
	},
};
