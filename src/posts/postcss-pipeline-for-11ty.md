---
title: PostCSS pipeline for 11ty
date: 2019-09-05
tags: ['post', '11ty', 'javascript', 'css', 'postcss']
thumb: /resources/post-assets/creating-a-web-component-with-polymer.png
---

I really enjoy using SASS, but on some projects I really just want some modern CSS and a few vendor prefixes.

In these situations I reach for Postscript. It feels like a nice middle-ground between the features and functionality of SASS and plain CSS.

Unfortunately Postcss is another one of those formats that 11ty doesn't yet support natively.

Following on from [my last post on the topic](/posts/sass-pipeline-for-11ty/), let's create a Postcss pipeline for 11ty!

## A PostCSS pipeline

Save the following code as *style.11ty.js* and install the dependencies listed in the comments.

```js
// PostCSS dependencies: `npm i -D postcss precss autoprefixer`
const readFile = require('fs').readFile;
const readFileAsync = require('util').promisify(readFile);
const postcss = require('postcss');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const postcssProcessor = postcss([precss, autoprefixer]);

// File paths
// If you keep the PostCSS file in _includes so changes are picked up when using `npx @11ty/eleventy --serve`
const inputFile = '_includes/main.postcss';
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
```
