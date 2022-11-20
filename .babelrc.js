const plugins = ['@babel/plugin-proposal-class-properties'];

if (process.env.NODE_ENV !== 'production') {
	plugins.push('react-refresh/babel');
}

module.exports = {
	presets: [
		[
			'@babel/preset-env',
			{
				debug: true,
				useBuiltIns: 'usage',
				corejs: 3.26
			}
		],
		[
			'@babel/preset-react',
			{
				runtime: 'automatic'
			}
		],
		'@babel/preset-typescript'
	],
	plugins
};
