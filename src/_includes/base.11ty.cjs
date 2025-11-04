const { header } = require('./utils/header.cjs');
const { footer } = require('./utils/footer.cjs');

module.exports = ({ page, title, content }) => {
	let active = page.filePathStem.split('/')?.[1] || 'home';
	active = active === 'index' ? 'home' : active;

	return `<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<meta name="description" content="A simple blog built with Eleventy and LitElement" />
		<meta name="author" content="Liam Fiddler" />
		<link rel="stylesheet" href="/style/main.css" />
		<title>${title}</title>
		<script> document.documentElement.classList.add('js-enabled'); </script>
	</head>
	<body>
		${header(active)}
		${content}
		${footer()}
		<script type="module" src="/node_modules/@lit-labs/ssr-client/lit-element-hydrate-support.js"></script>
	</body>
</html>
`;
};
