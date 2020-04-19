const Router = require('koa-router');
const path = require('path')
const staticServer = require('koa-static')
const Koa = require('koa')
const render = require('./render.js').default
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');

function initApp() {
    const app = new Koa()
    return app
}

function initStore() {
    // 获取到的 state
    return { num: 2 }
}

function initAppMiddleware(app) {
    const router = new Router();
    app.use(bodyParser());//解析Json或者form
    app.use(cors({credentials: true}));//跨域
    app.use(router.routes()).use(router.allowedMethods());
    app.use(staticServer(path.resolve(__dirname, '../dist')));
    router.get('/', render);
    app.use(render);
}

// 热更新前端文件
async function initHMR(app, state) {
    let HMRInitialized = false;
    console.info('文件热更新中');
    const koaWebpack = require('koa-webpack');
    const historyApiFallback = require('koa-history-api-fallback');
    const webpack = require('webpack');
    const webpackConfig = require('../config/webpack.base.config');
    const compiler = webpack(
        Object.assign({}, webpackConfig(state), {
            stats: {
                modules: false,
                colors: true,
            },
        })
    );
    return new Promise((resolve, reject) => {
        koaWebpack({
            compiler,
            hotClient: {
                port: 0,
                logLevel: 'error',
                hmr: true,
                reload: true,
            },
            devMiddleware: {
                index: 'index.html',
                publicPath: '/',
                watchOptions: {
                    aggregateTimeout: 0,
                },
                writeToDisk: false,
                stats: {
                    modules: false,
                    colors: true,
                    children: false,
                },
            },
        }).then(middleware => {
            if (!HMRInitialized) {
                HMRInitialized = true;
                app.use(historyApiFallback());
                app.use(middleware);
                middleware.devMiddleware.waitUntilValid(resolve);
            }
        })
            .catch(err => {
                console.error('[koa-webpack]:', err);
                reject();
            });
    });
}

async function run() {
    const app = initApp();
    if(process.env.RUN_HOT) {
        await initHMR(app, initStore());
    }
    initAppMiddleware(app);
    return Promise.resolve(app);
}
// 打开服务器起的端口
function listen(app, port = 9035) {
    const server = app.listen(port, '0.0.0.0');
    console.log(`Koa listening on port ${port}`);
    return server;
}

module.exports = {
    listen,
    create: run
};

