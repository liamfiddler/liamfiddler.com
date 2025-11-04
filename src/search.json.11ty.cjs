const { removeStopwords } = require('stopword');
const htmlToPlaintext = require('html2plaintext');

const ADDITIONAL_STOPWORDS = [
	'i',
	'an',
	'the',
	'end',
	'it',
	'if',
	'for',
	'let',
	'var',
	'const',
	'null',
	'undefined',
	'true',
	'false',
	'NaN',
	'function',
	'but',
	'the',
	'when',
	'does',
	'not',
	'else',
	'tip',
	'use',
	'also',
	'just',
	'you',
	'↩︎',
	'/*',
	'*/',
	'//',
	'&&',
	'||',
	'==',
	'!=',
	'===',
	'!==',
	'<=',
	'>=',
	'lorem',
	'ipsum',
	'dolor',
	'sit',
	'amet',
	'consectetur',
	'adipiscing',
	'elit',
	'sed',
];

const uniqueWordsFilter = (text) => {
	const words = htmlToPlaintext(text)
		.toLowerCase()
		.replace(/[\(\)\!\?\`\:\;\,\"\'\’]/gim, ' ')
		.replace(/\s+/gm, ' ')
		.replace(/\[\d*\]/gm, '')
		.split(' ')
		.filter(
			(word) =>
				word.length >= 3 &&
				!ADDITIONAL_STOPWORDS.includes(word)
		);

	const uniqueWords = removeStopwords([...new Set(words)]).join(' ');

	return uniqueWords
		.replace(/\.|\,|\?|-|—|\n/gim, '')
		.replace(/[ ]{2,}/gim, ' ');
};

module.exports = {
	data: {
		eleventyExcludeFromCollections: true,
		permalink: 'search.json',
	},
	render({ collections }) {
		const posts = collections.postsByPubDate.map(({ data, content }) => ({
			url: data.page.url,
			title: data.title,
			index: uniqueWordsFilter(content),
			tags: data.tags,
			description: data.description,
		}));

		const projects = collections.projectsByPubDate.map(({ data, content }) => ({
			url: data.page.url,
			title: data.title,
			index: uniqueWordsFilter(content),
			tags: data.tags,
			description: data.description,
		}));

		return JSON.stringify([...posts, ...projects]);
	},
};
