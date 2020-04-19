import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import rootReducer from '../reducer'
class SingleObject {
}
// 访问方法
SingleObject.getInstance = (function () {
    let store = null;
    return function(preloadedState) {
        if(!store) {
            let middle = applyMiddleware(
                thunkMiddleware
            )
            if(process.env.NODE_ENV === 'development') {
                middle = composeWithDevTools(applyMiddleware(
                    thunkMiddleware
                ))
            }
            store = createStore(
                combineReducers({num: rootReducer}),
                preloadedState,
                middle
            )
        }
        return store
    }
})()

export default SingleObject
