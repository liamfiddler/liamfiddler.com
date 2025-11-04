const {
	dateDisplayFilter,
	readingTimeFilter,
} = require('./_includes/utils/posts.cjs');

module.exports = {
	data: {
		eleventyExcludeFromCollections: true,
		layout: 'base.11ty.cjs',
		title: 'Liam Fiddler',
	},
	render({ collections }) {
		const posts = collections.postsByPubDate
			.slice(0, 3)
			.map(({ data, content }) => ({
				url: data.page.url,
				title: data.title,
				tags: data.tags.filter((tag) => tag !== 'post'),
				description: data.description,
				datetime: dateDisplayFilter(data.pubdate, 'y-MM-dd'),
				pubdate: dateDisplayFilter(data.pubdate, 'LLL d, y'),
				reading: readingTimeFilter(content),
			}));

		return `
			<section class="hero full-width">
				<h1 class="headline grunge"><split-text>Liam makes websites & mobile apps</split-text></h1>

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
			</section>
			<section class="bio">
				<div>
					<h2><split-text>About Liam</split-text></h2>
				</div>
				<div>
					<p>Liam leads EY Future Friendly’s Product Engineering practice. Working with teams to drive the culture, tools and process required to deliver new products and services from 0-1. Guiding and shaping new ideas into the first release of a live product in market.</p>
					<p>He brings extensive expertise planning and delivering large-scale digital projects; providing support while managing technical risks and opportunities. He champions open web standards, accessibility, and modular development patterns.</p>
					<p>With 20 years of experience he has most recently been building + releasing digital products with government agencies & start-ups, and helping a big-4 banking group achieve their cloud transformation strategy targets.​</p>
					<p>Liam is passionate about user privacy, improving access to well-being services, and making space for front-end development flourishes that turn a functional product into <em>an experience</em>.</p>
				</div>
			</section>
			<section>
				<h2><split-text>Recent-ish posts</split-text></h2>
				<ol class="posts" role="list">
					${posts.map((post) => `
						<li data-tags="${post.tags.join(' ')}">
							<a href="${post.url}">
								${post.title}
							</a> 
							<span class="metadata">
								<time datetime="${post.datetime}">
									${post.pubdate}
								</time> &mdash;
								${post.reading} minute read
							</span>
						</li>
					`).join('')}
				</ol>
				<a href="/posts">Show all posts &rarr;</a>
			</section>
		`;
	},
};
