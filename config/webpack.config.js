const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge')
const ManifestPlugin = require('webpack-manifest-plugin');
const argv = require('yargs-parser')(process.argv.slice(2));
const mode = argv.mode || 'development';
const mergeConfig = require(`./webpack.${mode}.js`);
const LoadablePlugin = require('@loadable/webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin')
const dirname = process.cwd();
const commonConfig = {
    // resolveLoader: {
    //     modules: [path.resolve(__dirname, '../loaders'), 'node_modules']
    // },
    entry: [path.resolve(dirname, 'src/index.js')],
    output: {
        path: path.resolve(dirname, 'dist'),
        filename: '[name].bundle.[hash:8].js',
        publicPath: '/'
    },
    resolve: {
        alias: {
            '@ant-design/icons/lib/dist$': path.resolve(__dirname, '../alias/antd/icon/lib/dist.js'),
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(dirname, 'public/index.html')
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        }),
        new SpriteLoaderPlugin({ plainSprite: true }),
        new LoadablePlugin({
            filename: 'loadable-stats.json',
            writeToDisk: {
                filename: path.join(__dirname, '..', 'dist'),
            },
        }),
        new ManifestPlugin({
            publicPath: '',
        }),
    ],
    resolve: {
        extensions: ['.js', ".ts", ".tsx", '.jsx']
    },
    module: {
        rules: [
            // {
            //     enforce: "pre",
            //     test: /\.jsx?$/,
            //     exclude: /node_modules/,
            //     loader: 'eslint-loader'
            // },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [ {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                    },
                }],
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'ts-loader',
                }],
            },
            {
                test: /\.css/,
                use: [{ loader: MiniCssExtractPlugin.loader}, 'css-loader', 'postcss-loader'],
                // exclude: /node_modules/,
                // include: path.resolve(dirname, 'src')
            },
            {
                test: /\.less/,
                use: [{ loader: MiniCssExtractPlugin.loader }, 'css-loader', 'postcss-loader', 'less-loader'],
                // exclude: /node_modules/,
                // include: path.resolve(dirname, 'src')
            },
            {
                test: /\.svg$/,//(png|jpg|gif|svg)
                loader: 'svg-sprite-loader',
                options: {
                    symbolId: '[name]',
                    name: '[name]'
                },
                include: [path.resolve(__dirname, '../src/svg')]
            },
            // {
            //     test: /\.(gif|jpg|png|bmp|eot|woff|woff2|ttf|svg)/,
            //     use: [
            //         {
            //             loader: 'file-loader',
            //             options: {
            //                 name: 'images/[name]-[hash:5].min.[ext]'
            //             },
            //         }
            //     ],
            //     exclude: [path.resolve(__dirname, '../src/svg')]
            // },
            {
                test: /\.(gif|jpg|png|bmp|eot|woff|woff2|ttf|svg)/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 7500,
                            name: 'images/[name]-[hash:5].min.[ext]'
                        },
                    }
                ],
                exclude: [path.resolve(__dirname, '../src/svg')]
            }
        ]
    }
}

module.exports = merge(commonConfig, mergeConfig)
