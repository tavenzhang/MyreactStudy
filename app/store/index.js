
import { Platform } from 'react-native';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
//import { routerReducer, routerMiddleware } from 'react-router-redux';
//import thunk from 'redux-thunk';
import fetchMiddleware from '../middleware/fetch';
import webSocketMiddleware from '../middleware/socket';
import devTools from 'remote-redux-devtools';


//import appState from './app';
import appState from '../reducers/app';
//import msgState from '../reducers/msg';
import fetchState from '../reducers/fetch';
import wsState from '../reducers/socket';

/**
 * 所有中间件
 */
let middleware = applyMiddleware(fetchMiddleware,webSocketMiddleware);

/**
 * 所有reducer
 */
let rootReducer = combineReducers({
    appState,
    //msgState,
    fetchState,
    wsState,
    //routing: routerReducer
});

//debug
//if (module.hot) {
//    const devToolsExtension = window.devToolsExtension;
//
//    if (typeof devToolsExtension === 'function') {
//        middleware = compose(middleware, devToolsExtension())
//    }
//}

//const store = createStore(
//    rootReducer,
//    middleware
//);

export default function configureStore(preloadedState = {}) {
    const enhancer = compose(
        middleware,
        devTools({
            name: Platform.OS,
            hostname: 'localhost',
            port: 5678
        })
    );

    const store = createStore(
        rootReducer,
        preloadedState,
        enhancer
    );

    return store
}
