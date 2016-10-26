import path from 'path';
import webpack from 'webpack';
import validate from 'webpack-validator';
import merge from 'webpack-merge';
import baseConfig from './webpack.config.base';

import HtmlWebpackPlugin from 'html-webpack-plugin';
// import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import AddAssetHtmlPlugin from 'add-asset-html-webpack-plugin';

const outputPath = path.resolve(path.join(process.env.PWD, 'build', 'dlls'));

// const outputPath = path.resolve(path.join(__dirname, 'dlls'));

export default validate(merge(baseConfig, {

  debug: true,

  devtool: 'source-map',

  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: [
          'style-loader?sourceMap',
          'css-loader?modules&importLoaders=1&localIdentName=[path]_[name]_[local]_[hash:base64:5]'
        ],
        exclude: /node_modules/
      }
    ]
  },

  output: {
    publicPath: "http://localhost:3000/dist/"
  },

  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr',
    // 'webpack-hot-middleware/client',
    './app/index'
  ],

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new webpack.DllReferencePlugin({
      context: path.resolve(process.env.PWD),
      manifest: require(path.join(outputPath, 'coreRelated'))
    }),
    new webpack.DllReferencePlugin({
      context: path.resolve(process.env.PWD),
      manifest: require(path.join(outputPath, 'viewRelated'))
    }),
    new HtmlWebpackPlugin({
      title: 'React Blog',
      template: './app/templates/index.ejs',
      inject: 'body'
    }),
    new AddAssetHtmlPlugin([
      {
        filepath: require.resolve(path.join(outputPath, 'coreRelated.dll.js')),
        includeSourcemap: true
      },
      {
        filepath: require.resolve(path.join(outputPath, 'viewRelated.dll.js')),
        includeSourcemap: true
      }
    ])
    // new FaviconsWebpackPlugin({
    //
    // })
  ]
}));
