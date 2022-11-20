// eslint-disable-next-line unicorn/prefer-module
module.exports = {
	title: whiteSpace('ReactTS — Starter'),
	description: whiteSpace(
		'Start a React TypeScript App, SPA, landing page or website using Webpack, Babel, Core-JS, SASS / SCSS, Tailwind CSS and much more, in just 30 seconds.'
	),
	keywords: whiteSpace(
		'typescript, ts, react-typescript, react-ts, react, template, boilerplate, webpack, babel, tailwind, tailwindcss, sass, scss, css, github'
	),
	author: {
		name: whiteSpace('Doinel Atanasiu'),
		email: 'mailto:doinel1atanasiu@gmail.com',
		url: 'https://business-link.d1a.app'
	},
	gSV: '43hCqye5FYTS4SnBMPKNFP-wBhfLHwRBykWJF1WJawo',
	appUrl: 'https://react-ts-starter.d1a.app',
	ogImageUrl: 'https://react-ts-starter.d1a.app',
	ogImageAlt: whiteSpace(
		'Description of what is in the image (not a caption)'
	)
};

function whiteSpace(text) {
	return text.replaceAll(' ', '&nbsp;');
}
