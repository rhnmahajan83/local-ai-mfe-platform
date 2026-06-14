// ./packages/host-app/webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const deps = require('./package.json').dependencies;

module.exports = {
  entry: './src/index.js',
  devServer: { port: 3000, historyApiFallback: true },
  module: {
    rules: [
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/, options: { presets: ['@babel/preset-env', '@babel/preset-react'] } }
    ]
  },
  resolve: { extensions: ['.js', '.jsx'] },
  plugins: [
    new ModuleFederationPlugin({
      name: 'host_shell',
      remotes: { ai_chat_mfe: 'ai_chat_mfe@http://localhost:3001/remoteEntry.js' },
      shared: { react: { singleton: true, requiredVersion: deps.react }, 'react-dom': { singleton: true, requiredVersion: deps['react-dom'] } }
    }),
    new HtmlWebpackPlugin({ template: './public/index.html' })
  ]
};