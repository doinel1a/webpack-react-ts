/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('node:path');

const html = require('html-webpack-plugin');
const css = require('mini-css-extract-plugin');
const fileManager = require('filemanager-webpack-plugin');
const refresh = require('@pmmmwh/react-refresh-webpack-plugin');
const partytown = require('@builder.io/partytown/utils');

const meta = require('./_config');

const isProduction = process.env.NODE_ENV === 'production';

const plugins = [
  new html({
    meta: {
      title: meta.title,
      'application-name': meta.title,
      description: meta.description,
      keywords: meta.keywords,
      'apple-mobile-web-app-title': meta.title
    },
    title: meta.title,
    icon192: isProduction
      ? '/favicon/favicon-192.png'
      : '/assets/favicon/favicon-192.png',
    icon512: isProduction
      ? '/favicon/favicon-512.png'
      : '/assets/favicon/favicon-512.png',
    manifest: isProduction ? '/app.webmanifest' : '/assets/app.webmanifest',
    sitemap: isProduction ? '/sitemap.xml' : '/assets/sitemap.xml',
    template: getDirectory('src/index.html'),
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
              source: getDirectory('src/assets/favicon/**'),
              destination: 'dist/favicon'
            }
          ]
        },
        {
          copy: [
            {
              source: getDirectory('src/assets/app.webmanifest'),
              destination: 'dist/'
            }
          ]
        },
        {
          copy: [
            {
              source: getDirectory('src/assets/sitemap.xml'),
              destination: 'dist/'
            }
          ]
        },
        {
          copy: [
            {
              source: partytown.libDirPath(),
              destination: 'dist/~partytown'
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
    server: 'http',
    historyApiFallback: true
  },
  devtool: isProduction ? false : 'source-map'
};

function getDirectory(directory) {
  return path.resolve(__dirname, directory);
}
