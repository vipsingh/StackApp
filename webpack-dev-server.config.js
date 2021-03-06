const webpack = require('webpack');
const path = require('path');
const buildPath = path.resolve(__dirname, 'build');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const TransferWebpackPlugin = require('transfer-webpack-plugin');

const config = {
  // Entry points to the project
  entry: [
    'react-hot-loader/patch',
    'webpack/hot/only-dev-server',
    path.join(__dirname, '/src/app/app.js'),
  ],
  // Server Configuration options
  devServer: {
    contentBase: 'src/www', // Relative directory for base of server
    //devtool: 'eval',
    hot: true, // Live-reload
    inline: true,
    port: 3000, // Port Number
    host: 'localhost' // Change to '0.0.0.0' for external facing server
  },
  devtool: 'eval',
  output: {
    path: buildPath, // Path of output file
    filename: 'app.js'
  },
  resolve:{
    alias: {
      stack_app: path.resolve(__dirname, 'stack_app/'),
      app_content: path.resolve(__dirname, 'app_content/')
    }
  },
  plugins: [
    // Enables Hot Modules Replacement
    new webpack.HotModuleReplacementPlugin(),
    // Allows error warnings but does not stop compiling.
    new webpack.NoErrorsPlugin(),
    // Moves files
    new TransferWebpackPlugin([
      {from: 'www'},
    ], path.resolve(__dirname, 'src'))
  ],
  module: {
    rules: [
      {
        test: /\.js$/, // All .js files
        use: ['babel-loader'],
        exclude: [nodeModulesPath]
      },
      {
        test: /\.jsx$/,
        use: ['babel-loader'],
        exclude: [nodeModulesPath]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};

module.exports = config;
