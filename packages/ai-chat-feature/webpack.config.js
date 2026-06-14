// ./packages/ai-chat-feature/webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const deps = require('./package.json').dependencies;

module.exports = {
  entry: './src/index.js',
  devServer: { port: 3001, historyApiFallback: true, headers: { "Access-Control-Allow-Origin": "*" } },
  module: {
    rules: [
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/, options: { presets: ['@babel/preset-env', '@babel/preset-react'] } }
    ]
  },
  resolve: { extensions: ['.js', '.jsx'] },
  plugins: [
    new ModuleFederationPlugin({
      name: 'ai_chat_mfe',
      filename: 'remoteEntry.js',
      exposes: { './ChatWindow': './src/components/ChatWindow.jsx' },
      shared: { react: { singleton: true, requiredVersion: deps.react }, 'react-dom': { singleton: true, requiredVersion: deps['react-dom'] } }
    }),
    new HtmlWebpackPlugin({ template: './public/index.html' })
  ]
};