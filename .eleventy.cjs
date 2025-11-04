const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const {
	dateDisplayFilter,
	readingTimeFilter,
} = require('./src/_includes/utils/posts.cjs');
const markdownItCsc = require('./src/_includes/plugins/markdown-it-custom-short-codes.cjs');
const markdownItAdmon = require('markdown-it-admon');
const markdownItFootnote = require('markdown-it-footnote');
const litPlugin = require('@lit-labs/eleventy-plugin-lit');
const { build: esbuild } = require('esbuild');

// If the component filename starts with an underscore, it will not be visible in the CMS editor.

const COMPONENT_DIR = 'src/components';
const COMPONENT_FILES = require('fs').readdirSync(COMPONENT_DIR);
const COMPONENT_FILEPATHS = COMPONENT_FILES.map(
	(file) => `${COMPONENT_DIR}/${file}`
);
const COMPONENT_TAGS_CMS = COMPONENT_FILES.map(
	(file) => file.split('.', 1)[0]
).filter((tag) => tag[0] !== '_');
const COMPONENT_TAGS = COMPONENT_FILES.map((file) =>
	file.split('.', 1)[0].replace(/^_/, '')
);
const COMPONENT_OUTPUT_DIR = '/components';

const esbuildConfig = {
	format: 'esm',
	bundle: true,
	splitting: true,
	sourcemap: false,
	minify: true,
	allowOverwrite: true,
};

module.exports = function (eleventyConfig) {
	eleventyConfig.setTemplateFormats(['html', 'md', 'njk', '11ty.js']);
	eleventyConfig.addWatchTarget(COMPONENT_DIR);
	eleventyConfig.addWatchTarget('src/style');
	eleventyConfig.addPassthroughCopy('src/public');

	eleventyConfig.addCollection('postsByPubDate', function (collection) {
		return collection
			.getFilteredByTags('post')
			.sort((a, b) => new Date(b.data.pubdate) - new Date(a.data.pubdate));
	});

	eleventyConfig.addCollection('projectsByPubDate', function (collection) {
		return collection
			.getFilteredByTags('project')
			.sort((a, b) => new Date(b.data.pubdate) - new Date(a.data.pubdate));
	});

	eleventyConfig.addShortcode('COMPONENT_TAGS', () => COMPONENT_TAGS.join(','));
	eleventyConfig.addShortcode('COMPONENT_TAGS_CMS', () =>
		COMPONENT_TAGS_CMS.join(',')
	);
	eleventyConfig.addShortcode(
		'COMPONENT_OUTPUT_DIR',
		() => COMPONENT_OUTPUT_DIR
	);

	eleventyConfig.addFilter('dateDisplay', dateDisplayFilter);
	eleventyConfig.addFilter('readingTime', readingTimeFilter);

	eleventyConfig.amendLibrary('md', (md) => {
		md.use(markdownItCsc);
		md.use(markdownItAdmon);
		md.use(markdownItFootnote);

		const defaultTokenRenderer = function render(
			tokens,
			index,
			options,
			_env,
			self
		) {
			return self.renderToken(tokens, index, options);
		};

		// Render custom short codes (like [component])
		const defaultCscBodyRender = md.renderer.rules.csc || defaultTokenRenderer;
		md.renderer.rules.csc = (tokens, index) => {
			const tag = tokens[index].tag;

			if (COMPONENT_TAGS.includes(tag)) {
				tokens[index].content = `<${tag}></${tag}>`;
			}

			return defaultCscBodyRender(tokens, index);
		};

		// Wrap mermaid diagrams with the mermaid-diagram component
		const defaultFenceBodyRender =
			md.renderer.rules.fence || defaultTokenRenderer;
		md.renderer.rules.fence = function (tokens, idx, options) {
			if (tokens[idx].info === 'mermaid') {
				return `<mermaid-diagram>${defaultFenceBodyRender(
					tokens,
					idx,
					options
				)}</mermaid-diagram>`;
			}

			return defaultFenceBodyRender(tokens, idx, options);
		};
	});

	eleventyConfig.addPlugin(litPlugin, {
		mode: 'worker',
		componentModules: COMPONENT_FILEPATHS.filter((filePath) => {
			// don't server render the split-text component (it's not a lit component)
			if (filePath.endsWith('_split-text.js')) {
				return false;
			}

			// don't server render the search-form component (it only works with the client)
			if (filePath.endsWith('_search-form.js')) {
				return false;
			}

			return true;
		}),
	});

	eleventyConfig.addPlugin(syntaxHighlight);

	// Append only the components that are used in the page to the body
	eleventyConfig.addTransform(
		'append-components',
		async function (content, _path) {
			let newContent = content;

			for (const index in COMPONENT_FILEPATHS) {
				if (
					content.includes(`</${COMPONENT_TAGS[index]}>`) ||
					COMPONENT_TAGS[index] === 'split-text'
				) {
					newContent = newContent.replace(
						`</body>`,
						`<script type="module" src="${COMPONENT_FILEPATHS[index].replace(
							COMPONENT_DIR,
							COMPONENT_OUTPUT_DIR
						)}"></script>\n</body>`
					);
				}
			}

			return newContent;
		}
	);

	eleventyConfig.on('afterBuild', async function () {
		const buildDir = eleventyConfig.directories.output.replace(/\/+$/, '');

		esbuild({
			entryPoints: COMPONENT_FILEPATHS,
			outdir: `${buildDir}${COMPONENT_OUTPUT_DIR}`,
			...esbuildConfig,
		});

		esbuild({
			entryPoints: [
				'node_modules/@lit-labs/ssr-client/lit-element-hydrate-support.js',
			],
			outdir: `${buildDir}/node_modules/@lit-labs/ssr-client/`,
			...esbuildConfig,
		});

		esbuild({
			entryPoints: ['src/style/main.css'],
			outdir: `${buildDir}/style/`,
			loader: {
				'.png': 'file',
				'.jpg': 'file',
				'.webp': 'file',
				'.woff': 'file',
				'.woff2': 'file',
			},
			...esbuildConfig,
		});
	});
};
