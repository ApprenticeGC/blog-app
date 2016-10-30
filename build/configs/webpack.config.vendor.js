import path from 'path';
import webpack from 'webpack';
import validate from 'webpack-validator';
import CleanWebpackPlugin from 'clean-webpack-plugin';

// const outputPath = path.resolve(path.join(__dirname, 'dlls'));
const outputPath = path.resolve(path.join(process.env.PWD, 'build', 'dlls'));

export default validate({

  context: path.resolve(process.env.PWD),

  devtool: 'source-map',

  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },

  entry: {
    viewRelated: [
      'react',
      'react-dom',

      'material-ui',

      'radium',
      'radium-grid',

      'mobx-react',

      'react-moment',

      'react-router',

      'react-syntax-highlighter',

      'react-tap-event-plugin',

      'remark-react'
    ],

    coreRelated: [
      // 'dagre',

      'lowlight',

      'lunr',

      'mobx',

      'moment',

      'oboe',

      'remark',
      'rxjs'

      //
      // 'whatwg-fetch'
    ]
  },

  output: {
    path: outputPath,
    filename: '[name].dll.js',
    library: '[name]'
  },

  plugins: [
    new CleanWebpackPlugin([outputPath], {
      root: process.env.PWD
    }),
    new webpack.DllPlugin({
      name: '[name]',
      path: path.join(outputPath, '[name].json')
    })
  ]
});
