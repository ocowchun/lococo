/* eslint max-len: 0 */
import webpack from 'webpack';
import baseConfig from './webpack.config.base';

import ExtractTextPlugin from 'extract-text-webpack-plugin';

const config = {
  ...baseConfig,

  debug: true,

  devtool: 'cheap-module-eval-source-map',

  entry: [
    'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr',
    './app/index'
  ],

  output: {
    ...baseConfig.output,
    publicPath: 'http://localhost:3000/dist/'
  },

  module: {
    ...baseConfig.module,
    loaders: [
      ...baseConfig.module.loaders,

      {
        test: /\.global\.css$/,
        loaders: [
          'style-loader',
          'css-loader?sourceMap'
        ]
      },

      {
        test: /^((?!\.global).)*\.css$/,
        loaders: [
          'style-loader',
          'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
        ]
      },

      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass-loader')
      }
    ]
  },

  plugins: [
    ...baseConfig.plugins,
    new ExtractTextPlugin('style.scss', { allChunks: true }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],

  target: 'electron-renderer'
};

export default config;
