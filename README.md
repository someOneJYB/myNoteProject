### 服务端支持前端热更新的需要使用保证 store 的 state 一致，因此使用传递 state 到参数 webpack 中的修改 html 的 plugin 。中改变在内存中的 html 添加在 window 下的 state 从而达到前端更新，store 数据一致。在前端热更新时，服务端相当于起了一个前端的打包资源服务器，因此可以达到更新的效果
### 执行服务端渲染的时候通过环境变量判断如果是 production 则表示是 hydrate 否则使用的是 ReactDom 的 render 方法
### store 使用单例模式保证同一个 store。
### 新版本服务端渲染不执行 getDerivedStateFromProps 旧版本执行到 willmount。
### 使用 nodemon 监听 server 文件夹下的变化

