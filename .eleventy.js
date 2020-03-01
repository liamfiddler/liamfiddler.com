const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const { DateTime } = require('luxon');
const { removeStopwords } = require('stopword');
const htmlToPlaintext = require('html2plaintext');
const lazyImagesPlugin = require('eleventy-plugin-lazyimages');

const dateDisplayFilter = (dateObj, format = 'LLL d, y') =>
  DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat(format);

const uniqueWordsFilter = (text) => {
  const words = htmlToPlaintext(text)
    .toLowerCase()
    .split(' ');
  const uniqueWords = removeStopwords([...new Set(words)]).join(' ');
  return uniqueWords.replace(/\.|\,|\?|-|—|\n/g, '').replace(/[ ]{2,}/g, ' ');
};

const readingTimeFilter = (text) => {
  const wordsPerMinute = 200;
  const numberOfWords = text.split(/\s/g).length;
  return Math.ceil(numberOfWords / wordsPerMinute);
};

module.exports = (config) => {
  config.addPassthroughCopy({
    'src/resources': 'resources',
    'node_modules/swup/dist/swup.min.js': 'resources/libs/swup.min.js',
    'node_modules/@swup/preload-plugin/dist/SwupPreloadPlugin.min.js': 'resources/libs/SwupPreloadPlugin.min.js',
    'node_modules/fuse.js/dist/fuse.js': 'resources/libs/fuse.js',
  });

  config.addFilter('dateDisplay', dateDisplayFilter);
  config.addFilter('uniqueWords', uniqueWordsFilter);
  config.addFilter('readingTime', readingTimeFilter);
  config.addPlugin(syntaxHighlight);

  config.addPlugin(lazyImagesPlugin, {
    imgSelector: '#main-content img', // custom image selector
    cacheFile: '', // don't cache results to a file
    transformImgPath: (src) => {
      if (src.startsWith('/') && !src.startsWith('//')) {
        return `./src${src}`;
      }

      return src;
    },
  });

  return {
    dir: {
      input: 'src',
      output: 'dist',
    },
  };
};
