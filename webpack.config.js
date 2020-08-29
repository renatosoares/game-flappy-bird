var path = require('path');
var pathToPhaser = path.join(__dirname, '/node_modules/phaser/');
var phaser = path.join(pathToPhaser, 'dist/phaser.js');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        game: './src/game.ts',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './dist/'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Flappy Bird',
            template: 'public/index.html',
            inject: 'head',
        }),
        new CopyPlugin({
            patterns: [{ from: 'public/assets', to: 'assets' }],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: '/node_modules/',
            },
        ],
    },
    devServer: {
        contentBase: path.resolve(__dirname, './dist/'),
        publicPath: '/',
        host: '127.0.0.1',
        port: 8081,
    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            phaser: phaser,
        },
    },
};
