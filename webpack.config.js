const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const config = {
   entry: './src/scss/main.scss',
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'theme.js',
   },
   module: {
      rules: [
         {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader'],
         },
         {
            test: /\.scss$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
         },
         {
            test: /\.png$/,
            use: [
               {
                  loader: 'url-loader',
                  options: {
                     mimetype: 'image/png',
                  },
               },
            ],
         },
         {
            test: /\.svg$/,
            use: 'file-loader',
         },
      ],
   },
   plugins: [
      new MiniCssExtractPlugin({
         filename: 'theme.css',
      }),
   ],
   optimization: {
      minimize: isProduction,
      minimizer: [`...`, ...(isProduction ? [new CssMinimizerPlugin()] : [])],
   },
   mode: isProduction ? 'production' : 'development',
};

module.exports = config;
