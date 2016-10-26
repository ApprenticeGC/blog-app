import path from 'path';
import validate from 'webpack-validator';
import CleanWebpackPlugin from 'clean-webpack-plugin';

const outputPath = path.resolve(path.join(process.env.PWD, 'dist'));

export default validate({

  context: path.resolve(process.env.PWD),

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader?cacheDirectory'],
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },

  output: {
    path: outputPath,
    filename: '[name].[hash].js'
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  },

  plugins: [
    new CleanWebpackPlugin([outputPath], {
      root: process.env.PWD
    })
  ]

});
