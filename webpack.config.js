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
       bundle: path.resolve(__dirname, './src/js/index.js'),

    },
    output: {
        path: path.resolve(__dirname, './dist'),
        assetModuleFilename: "assets/[name][ext]",
        clean: true,
    },

    devtool: (mode === 'development') ? 'source-map' : false,

    optimization: {
        minimize: true,
        splitChunks: {
            chunks: 'all',
        },
    },
    devServer: {
        open: true,
        static: {
            directory: './dist/pages',
            watch: true,
        }
    },
    plugins: [
              ...['index', 'pod1', 'pod2', 'cost', 'contacts'].map((file) => {
                    return new HtmlWebpackPlugin({
                        template: './src/pages/' + file + '.html',
                        filename: './pages/' + file + '.html',
                        // inject: true,
                        // chunks: ['index', 'main'],
                   })
                }
            ),
            new MiniCssExtractPlugin(), 
    ],
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.css$/i,
                exclude: /node_modules/,
                use: [
                    (mode === 'development')?"style-loader":MiniCssExtractPlugin.loader,
                    "css-loader",              
                     ],
                sideEffects: true, 
             }, 
            {  
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                exclude: /node_modules/,
                generator: {
                    filename: 'img/[name][ext]'
                },
            },
            {   
                test: /\.m?js$/,
                type: 'asset/resource',
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
}        
