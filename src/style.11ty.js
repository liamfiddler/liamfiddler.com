const readFile = require('fs').readFile;
const readFileAsync = require('util').promisify(readFile);
const postcss = require('postcss');

const postcssProcessor = postcss([
  require('precss'),
  require('autoprefixer'),
]);

const inputFile = 'src/_includes/main.postcss';
const outputFile = 'style.css';

module.exports = class {
  data() {
    return {
      permalink: outputFile,
      eleventyExcludeFromCollections: true,
    };
  }
  async render() {
    const postcssContent = await readFileAsync(inputFile);

    return await postcssProcessor.process(postcssContent, {
      from: inputFile,
      to: outputFile,
    });
  }
};
