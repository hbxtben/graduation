var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    plugins: ['antd'],
    config: {
        export: [
            ['babel-polyfill', './scripts/index.js']
        ],

        commonsChunk: {
            name: 'scripts/utils',
            minChunks: 2,
            vendors: {
                lib: ['react', 'react-dom', 'babel-polyfill', 'antd']
            }
        },

        modifyWebpackConfig: function(baseConfig) {
            baseConfig.resolve = {
                alias: {
                    '$pcComponent': '/src/scripts/pc/components',

                    '$common': '/src/scripts/common'
                }
            };

            baseConfig.module.loaders.push({
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract( [
                    "css-loader?minimize=true",
                    "postcss-loader",
                    "sass-loader"
                ])
            });
            
            baseConfig.plugins.push(
                new ExtractTextPlugin('styles/main.css')
            );

            return baseConfig;
        }
    },
    hooks: {},
    commands: []
};