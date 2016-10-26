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

      'radium',
      'radium-grid',

      'react-tap-event-plugin'
    ],

    coreRelated: [
      // 'dagre',

      'lowlight',

      'mobx',
      'mobx-react',

      'react-router',

      'react-syntax-highlighter',

      'remark',
      'remark-react',

      'rxjs',

      'whatwg-fetch'
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
