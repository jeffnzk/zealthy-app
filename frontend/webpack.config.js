const path = require('path');
const webpack = require('webpack');
require('dotenv').config();

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        REACT_APP_TICKETS_API_ENDPOINT: JSON.stringify(process.env.REACT_APP_TICKETS_API_ENDPOINT),
      }
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx'] // Automatically resolve these extensions
  },
  devServer: {
    port: 3000,
    static : {
      directory: path.join(__dirname, 'dist'),
    },
    proxy: [
      {
        context: ['/api'],
        target: 'http://localhost:8080',
      },
    ],
  }
};