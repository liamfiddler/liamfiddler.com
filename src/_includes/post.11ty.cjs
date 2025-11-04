const {
	dateDisplayFilter,
	readingTimeFilter,
} = require('./utils/posts.cjs');

const themeColors = {
	orange: 'oklch(0.828 0.189 84.429)',
	yellow: 'oklch(0.905 0.182 98.111)',
	green: 'oklch(0.841 0.238 128.85)',
	blue: 'oklch(0.789 0.154 211.53)',
	purple: 'oklch(0.702 0.183 293.541)',
	pink: 'oklch(0.823 0.12 346.018)',
	rose: 'oklch(71.2% .194 13.428)',
};

module.exports = {
	data: {
		layout: 'base.11ty.cjs',
		title: 'A Rad Blog Post',
	},
	render({ title, pubdate, content, theme, tags, variant }) {
		const hasTheme = !!theme;
		const themeColor = themeColors[theme] || theme;
		const datetime = dateDisplayFilter(pubdate, 'y-MM-dd');
		const publishedDate = dateDisplayFilter(pubdate, 'LLL d, y');
		const readingTime = readingTimeFilter(content);
		const variantName = `${variant}`.replace('undefined', 'default');
		const variantMarkup = variantName in variants ? variants[variantName] : '';

		return `
			<article>
				<header class="full-width variant-${variantName}" style="${hasTheme ? `--article-theme:${themeColor};` : ''}">
					<h1 class="headline grunge"><split-text>${title}</split-text></h1>
					<div class="byline vcard">
						<address class="author">By <a rel="author" class="url fn n" href="/">Liam Fiddler</a></address> 
						on <time pubdate datetime="${datetime}">${publishedDate}</time>
					</div>
					<p class="overview">
						Reading time: approx. ${readingTime} minute${readingTime > 1 ? 's' : ''}<br />
					</p>
					${variantMarkup}
				</header>
				<div class="article-content">${content}</div>
			</article>
		`;
	}
};

const variants = {
	horse: `
		<script type="importmap">
			{
				"imports": {
					"three": "https://cdn.jsdelivr.net/npm/three@^0.163.0/build/three.module.min.js"
				}
			}
		</script>
		<script async src="https://ga.jspm.io/npm:es-module-shims@1.7.1/dist/es-module-shims.js"></script>
		<script type="module" src="https://cdn.jsdelivr.net/npm/@google/model-viewer/dist/model-viewer-module.min.js"></script>
		<script type="module" src="https://cdn.jsdelivr.net/npm/@google/model-viewer-effects/dist/model-viewer-effects.min.js"></script>
		<model-viewer autoplay auto-rotate src="/public/Horse.glb" scale="0.01 0.01 0.01" alt="A 3D model of a horse galloping.">
			<effect-composer>
				<color-grade-effect brightness="-0.15" contrast="0.85" saturation="-1" opacity="1" blend-mode="default"></color-grade-effect>
				<chromatic-aberration></chromatic-aberration>
				<pixelate-effect granularity="5"></pixelate-effect>
				<glitch-effect></glitch-effect>
			</effect-composer>
		</model-viewer>
	`,
};
