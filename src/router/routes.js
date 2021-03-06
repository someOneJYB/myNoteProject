import React from 'react'
import loadable from '@loadable/component';
const Loading = () => <h3>加载中</h3>
export default [
    {
        path: '/',
        component: loadable(() => import('../page/All'), {fallback: Loading,}),
        exact: true,
    },
    {
        path: '/home',
        component: loadable(() => import('../page/Home'), {fallback: Loading,}),
        exact: true,
    },
    {
        path: '/blogDetail/:count',
        component: loadable(() => import('../page/NoteDetail'), {fallback: Loading,}),
        exact: true,
    },
    {
        path: '/detail',
        component: loadable(() => import('../page/Detail'), {fallback: Loading,}),
        exact: true,
    },
    {
        path: '/x',
        component: loadable(() => import('../page/X'), {fallback: Loading,}),
        exact: true,
    },
    {
        path: '/y',
        component: loadable(() => import('../page/Y'), {fallback: Loading,}),
        exact: true,
    },
    {
        path: '/z',
        component: loadable(() => import('../page/Z'), {fallback: Loading,}),
        exact: true,
    },
    {
        path: '/hook',
        component: loadable(() => import('../page/hook'), {fallback: Loading,}),
        exact: true,
    },
]
