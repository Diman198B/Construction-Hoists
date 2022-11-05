const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

let mode = 'development'
if (process.env.NODE_ENV === 'production') {
    mode = 'production'
}
console.log(mode + ' mode')

module.exports = {
  mode: mode,
  entry: {
           bundle: path.resolve(__dirname, './index.js'),  
         //bundle: './index.js',  
       },   
  output: {
    path: path.join(__dirname, '/dist'),  //path.resolve
  //publicPath: '/dist',   
    filename: '[name].js',   //[name].[contenthash].js
       assetModuleFilename: "assets/[name][ext][query]", 
        clean: true,
  },
      devtool: (mode === 'development') ? 'source-map' : false, 
      
      optimization: {
        minimize: true,
       /*   splitChunks: {
            chunks: 'all',
        },  */
      },

      devServer: {
          open: true,
          static: {
              directory: './dist/pages',
              watch: true,               
                }
       },
plugins: [
        new MiniCssExtractPlugin({
        filename: '[name].css',     //[contenthash]
       }),
       ...['index', 'pod1', 'pod2', 'cost', 'contacts'].map((file) => {
                    return new HtmlWebpackPlugin({
                        template: './src/pages/' + file + '.html',
                        filename: './pages/' + file + '.html',
                   })
                }
            ),
],
       module: { 
       rules: [
        {
          test: /\.html$/i,
          loader: "html-loader",
        },
        {
          test: /\.(sa|sc|c)ss$/i,   //test: /\.css$/i,
            //exclude: /node_modules/,
            use: [
            (mode === 'development') ? "style-loader" : MiniCssExtractPlugin.loader,
                "css-loader",
           ],     
           //sideEffects: true, 
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
          //exclude: /node_modules/,
          generator: {
                     filename: 'img/[name].[hash][ext]' //'img/[name][ext]'
                  },
        }, 
        {
          test: /\.m?js$/,
          //type: 'asset/resource',
          exclude: /(node_modules|bower_components)/,
          use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
        } }
        }
       ]
    },
}        