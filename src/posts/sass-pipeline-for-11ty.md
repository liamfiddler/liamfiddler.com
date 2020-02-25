---
title: SASS pipeline for 11ty
date: 2019-07-01
tags: ['post', '11ty', 'javascript', 'css', 'sass']
thumb: /resources/post-assets/creating-a-web-component-with-polymer.png
---

11ty can transform many input formats; Nunjucks, Liquid, Pug, just to name a few. But it's missing a few key ones I use regularly — like SASS.

Most examples run Gulp or Parcel in another process to generate CSS from SASS, then bundle it into 11ty afterwards. But what if we could perform the task without this extra dependency?

Fortunately 11ty also supports another interesting input format; Javascript. This is a super powerful template format that allows use of Nodejs packages to parse and format the SASS files directly without relying on other processes!

## The SASS pipeline

The code below assumes you've got your SASS code in a file at **_includes/main.scss** and want to output the resulting CSS to *style.css*. If you want to save them somewhere else change the `inputFile` and `outputFile` variables.

<p class="note">
  <strong>Tip:</strong> Store your .scss file somewhere that is watched by the 11ty CLI to get hot reloading. I recommend the _includes directory because it isn't included in the built output.
</p>

Save the following code as *style.11ty.js* and install the dependencies listed in the comments.

```js
// SASS dependencies: `npm i -D sass`
const util = require('util');
const sass = require('sass');
const renderSass = util.promisify(sass.render);

// File paths
// Tip: Keep .scss in _includes so changes are picked up when serving from 11ty CLI
const inputFile = '_includes/style.scss';
const outputFile = 'style.css';

module.exports = class {
  data() {
    return {
      permalink: outputFile,
      eleventyExcludeFromCollections: true,
    };
  }
  async render() {
    const result = await renderSass({
      file: inputFile,
    });

    return result.css;
  }
};
```

## Adding Autoprefixer

Autoprefixer is a plugin for PostCSS that will automatically add vendor prefixes to your styles to ensure great backwards browser compatibility.

To do this we add PostCSS and Autoprefixer to our pipeline.

Save the following code as *style.11ty.js* and install the dependencies listed in the comments.

```js
// SASS dependencies: `npm i -D sass`
const util = require('util');
const sass = require('sass');
const renderSass = util.promisify(sass.render);

// PostCSS dependencies: `npm i -D postcss precss autoprefixer`
const postcss = require('postcss');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const postcssProcessor = postcss([precss, autoprefixer]);

// File paths
// Tip: Keep .scss in _includes so changes are picked up when serving from 11ty CLI
const inputFile = '_includes/main.scss';
const outputFile = 'style.css';

module.exports = class {
  data() {
    return {
      permalink: outputFile,
      eleventyExcludeFromCollections: true,
    };
  }
  async render() {
    const { css } = await renderSass({
      file: inputFile,
    });

    return await postcssProcessor.process(css, {
      from: inputFile,
      to: outputFile,
    });
  }
};
```

## Usage in the wild

I [posted this technique to Twitter](https://twitter.com/liamfiddler/status/1154741302870720514) and it's been well received by the community:

>💪 JS templates + permalinks are so powerful in [@eleven_ty](https://twitter.com/eleven_ty)
>
>SCSS is not a supported format in 11ty (yet), but with a &lt;20 line JS template you can have a simple pipeline running.
>
> _[@liamfiddler](https://twitter.com/liamfiddler) (July 26, 2019)_

There's also some great comments in a thread detailing [this approach as a Gist](https://gist.github.com/liamfiddler/07e2878755a0a631a584b6420866424e), and the approach has been [used in a GitHub template](https://github.com/trey/blank2).

If you're using this in one of your projects please let me know — I'd love to mention your project here!
