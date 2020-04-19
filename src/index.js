import React from 'react'
import { hydrate, render } from 'react-dom'
import Loadable from 'react-loadable';
import {Provider} from 'react-redux';
import './index.less';
import Root from './App'
import create from './store'

const elRoot = document.getElementById('app');
const renderDOM = process.env.NODE_ENV == 'production' ? hydrate : render;
const renderD = (Component) => {
    renderDOM(<Provider store={create.getInstance(window._INIT_STATE_)}>
            <Component/>
        </Provider>, elRoot
    )
};

if(process.env.NODE_ENV === 'development'){
    //热加载配置
    if(module.hot) {
        renderD(require('./App').default);
    }
}
//为了确保loadable加载完成
Loadable.preloadReady().then(() => {
    renderD(Root)
});
