/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable unicorn/prefer-module */
const path = require('node:path');

const html = require('html-webpack-plugin');
const css = require('mini-css-extract-plugin');
const fileManager = require('filemanager-webpack-plugin');
const refresh = require('@pmmmwh/react-refresh-webpack-plugin');

const meta = require('./_config');

let isProduction = process.env.NODE_ENV === 'production';

const plugins = [
	new html({
		title: meta.title,
		description: meta.description,
		keywords: meta.keywords,
		authorName: meta.author.name,
		authorEmail: meta.author.email,
		authorUrl: meta.author.url,
		gSV: meta.gSV,
		appUrl: meta.appUrl,
		ogImageUrl: meta.ogImageUrl,
		ogImageAlt: meta.ogImageAlt,
		template: getDirectory('src/index.html'),
		partytownSrc: isProduction
			? 'partytown/partytown.js'
			: 'vendor/~partytown/partytown.js',
		minify: {
			collapseWhitespace: true,
			keepClosingSlash: false,
			removeComments: true,
			removeRedundantAttributes: true,
			removeScriptTypeAttributes: true,
			removeStyleLinkTypeAttributes: true,
			useShortDoctype: true
		}
	}),
	new css({
		filename: isProduction ? '[name].[fullhash].css' : '[name].css'
	}),
	new fileManager({
		events: {
			onEnd: [
				{
					copy: [
						{
							source: getDirectory('public/**/**'),
							destination: 'dist'
						}
					]
				},
				{
					copy: [
						{
							source: getDirectory('src/vendor/~partytown/*'),
							destination: 'dist/partytown'
						}
					]
				}
			]
		}
	})
];

if (!isProduction) plugins.push(new refresh());

module.exports = {
	target: 'browserslist',
	entry: {
		index: getDirectory('src/index.tsx')
	},
	output: {
		path: getDirectory('dist'),
		filename: isProduction ? '[name].[fullhash].js' : '[name].js',
		clean: true
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx']
	},
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							cacheDirectory: true
						}
					},
					'ts-loader'
				]
			},
			{
				test: /\.(sass|scss|css)$/i,
				use: [
					{
						loader: css.loader
					},
					'css-loader',
					'sass-loader',
					'postcss-loader'
				]
			},
			{
				test: /\.(png|jpg|jpeg|gif|svg)$/i,
				loader: 'file-loader',
				options: {
					outputPath: 'assets'
				}
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'fonts/[name][ext][query]'
				}
			}
		]
	},
	plugins,
	optimization: {
		minimize: isProduction
	},
	devServer: {
		static: {
			directory: isProduction ? getDirectory('dist') : getDirectory('src')
		},
		hot: true,
		server: 'https',
		historyApiFallback: true
	},
	devtool: isProduction ? false : 'source-map'
};

function getDirectory(directory) {
	return path.resolve(__dirname, directory);
}
