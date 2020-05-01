const axios = require('axios');

function Axios(url, options, interceptors) {
    let instance = axios.create({
        withCredentials: true,
        timeout: 20000,
        url,
    });
    interceptors && interceptors(instance)
    return instance.request(options).then((response) => {
        if (response && (response.status >= 200 && response.status < 300 || response.status === 304)) {
            const data = response.data || {}
            console.log(response)
            if (data.code === 40003) {
                return {
                    code: 40003,
                    message: '未登录',
                }
            } else {
                return data
            }
        } else {
            throw new Error('当前服务不可用，请稍后再试')
        }
    }).catch(() => {
        throw new Error('当前服务不可用，请稍后再试')
    })

}


export function post(url, params, options = {}) {
    return Axios(url, {
        method: 'post',
        data: params || {},
        headers: { 'content-type': 'application/json' },
        ...options,
    })
}


export function get(url, params, options = {}) {
    return Axios(url, {
        params: params || {},
        ...options,
    })
}

export const CancelToken = axios.CancelToken;
