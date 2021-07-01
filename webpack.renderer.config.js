const rules = require('./webpack.rules');
const plugins = require('./webpack.plugins');

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

module.exports = {
  // Put your normal webpack config below here
  target: 'electron-renderer',
  module: {
    rules,
  },
  // output: {
  //   filename: '.webpack/renderer/[name].js',
  //   path: `${__dirname}/dist`,
  //   publicPath: '',
  // },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.html'],
  },
  plugins: plugins,
};
