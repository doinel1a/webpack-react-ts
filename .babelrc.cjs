const plugins = ['@babel/plugin-proposal-class-properties'];

const isProduction = process.env.NODE_ENV === 'production';

if (!isProduction) {
  plugins.push('react-refresh/babel');
}

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        debug: isProduction,
        useBuiltIns: 'usage',
        corejs: 3.3
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
