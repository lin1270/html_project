const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'index.js'
  },

  module: {
    rules: [
        // {
        //     test: /\.css$/,
        //     use: ExtractTextPlugin.extract({
        //         use: ['css-loader?minimize', 'postcss-loader'],
        //         fallback: 'style-loader'
        //     })
        // },
        {
            test: /\.(html|tpl)$/,
            loader: 'html-loader',
        },
    ]
  },

  plugins: [
    new cleanWebpackPlugin(['dist/*'], {
        root: path.resolve(__dirname, '../')
    }),

    // new HappyPack({
    //     id: 'happybabel',
    //     loaders: ['babel-loader'],
    //     threadPool: happyThreadPool,
    //     verbose: true
    // }),
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"production"'
        }
    }),

    new CopyWebpackPlugin([
        {
            from: 'src/assets',
            to: 'assets'
        }
    ], {
        ignore: []
    }),
    
    new HtmlWebpackPlugin({
        disableScript: true,
        title: 'title',
        filename: 'index.html',
        template: path.resolve(__dirname, '../src/index.html'),
        inject: 'body'
    }),
    
  ],

  devServer: {
	  before(app, server, compiler) {
       const watchFiles = ['.html', '.pug'];

       compiler.hooks.done.tap('done', () => {
          const changedFiles = Object.keys(compiler.watchFileSystem.watcher.mtimes);

          if (
             this.hot &&
             changedFiles.some(filePath => watchFiles.includes(path.parse(filePath).ext))
          ) {
             server.sockWrite(server.sockets, 'content-changed');
          }
       });
    }
  }
};