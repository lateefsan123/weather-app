const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/script.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },plugins: [
    new HtmlWebpackPlugin({
      template: './src/template.html',
    }),
  ], module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },{
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
        type: 'asset/resource',
      },
    ],
  },devtool: 'eval-source-map',
  devServer: {
    watchFiles: ['src/**/*'],
    static: path.resolve(__dirname, 'dist'), // Serve files from the 'dist' folder
    open: true,  // Automatically open the browser when dev server starts
    hot: true,   // Enable Hot Module Replacement (HMR)
  },
};

