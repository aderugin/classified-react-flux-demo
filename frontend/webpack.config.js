const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');

const extractLESS = new ExtractTextPlugin('bundle.css');

module.exports = [
    {
        target: 'web',
        entry: {
            app: './src/entry.jsx',
            vendor: [
                'classnames', 'history', 'prop-types', 'react',
                'react-router-dom', 'axios', 'react-dom'
            ]
        },
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: 'bundle.js',
            publicPath: '/build/'
        },
        resolve: {
            modules: [
                path.resolve(__dirname, 'node_modules'),
                path.resolve(__dirname, 'src'),
                path.resolve(__dirname, 'styles')
            ],
            extensions: ['.jsx', '.js', '.less']
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    loader: 'babel-loader',
                    exclude: path.resolve(__dirname, 'node_modules'),
                    options: {
                        presets: ['react', 'es2017', 'stage-2']
                    }
                },
                {
                    test: /\.less?$/,
                    use: extractLESS.extract([
                        { loader: 'css-loader' },
                        { loader: 'less-loader' }
                    ])
                }
            ]
        },
        plugins: [
          extractLESS,
          new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                filename: 'vendor.js'
            }),
            new webpack.DefinePlugin({
                BROWSER: JSON.stringify(true)
            })
        ],
        context: __dirname,
        devtool: 'source-map'
    },
    {
        target: 'node',
        entry: './server/render.js',
        output: {
            path: path.resolve(__dirname, 'server'),
            filename: 'render.bundle.js',
            libraryTarget: 'commonjs2'
        },
        resolve: {
            modules: [
                'node_modules',
                path.resolve(__dirname, 'src'),
                path.resolve(__dirname, 'styles')
            ],
            extensions: ['.jsx', '.js', '.less']
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    loader: 'babel-loader',
                    exclude: path.resolve(__dirname, 'node_modules'),
                    options: {
                        presets: ['react', 'es2017', 'stage-2']
                    }
                },
              {
                  test: /\.less?$/,
                  use: extractLESS.extract([
                      { loader: 'css-loader' },
                      { loader: 'less-loader' }
                  ])
              }
            ]
        },
        externals: [nodeExternals()],
        plugins: [
            extractLESS,
            new webpack.DefinePlugin({
                BROWSER: JSON.stringify(false)
            })
        ],
        context: __dirname,
        devtool: 'source-map'
    }
];
