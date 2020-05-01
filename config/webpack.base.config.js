const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const RawSource = require('webpack-sources').ConcatSource
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge')
const ManifestPlugin = require('webpack-manifest-plugin');
const argv = require('yargs-parser')(process.argv.slice(2));
const mode = argv.mode || 'development';
const mergeConfig = require(`./webpack.${mode}.js`);
const LoadablePlugin = require('@loadable/webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin')
const dirname = process.cwd();
module.exports = function getConfig(state){
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
            new HtmlWebpackCustomPlugin(state),
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
    function HtmlWebpackCustomPlugin(options) {
        // Configure your plugin with options...
        this.state =  options
    }

    HtmlWebpackCustomPlugin.prototype.apply = function(compiler) {
        const that = this
        compiler.hooks.emit.tapAsync('insertWindowState', (compilation, cb) => {
            // 做一些异步的事情……
            Object.keys(compilation.assets).forEach((data) => {
                if(data === 'index.html') {
                    let res = compilation.assets[data].source().replace('<body>', `<body><script>window._INIT_STATE_ = ${JSON.stringify(that.state)}</script>`)
                    compilation.assets[data] = new RawSource(res)
                }
                // if(data.indexOf('hot-update')  > -1) {
                //     console.log(compilation.assets[data].source())
                // }
            });
            cb()
        });
    };
    return merge(commonConfig, mergeConfig)
}

