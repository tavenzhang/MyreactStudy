
import { Platform } from 'react-native';

import { createStore, applyMiddleware, compose } from 'redux';

import fetchMiddleware from '../middleware/fetchMidware';
//import devTools from 'remote-redux-devtools';

import {
    combineReducers
} from 'redux-immutable';

import fetchState from '../reducer/FetchReducer';
import homeState from  '../reducer/HomeReducer';
import appState from  '../reducer/AppReducer';
import noticState from  '../reducer/NoticeReducer';

import {Map}  from "immutable";

/**
 * 所有中间件
 */
middleware = applyMiddleware(fetchMiddleware);

/**
 * 所有reducer
 */
let rootReducer = combineReducers({
    fetchState,
    homeState,
    appState,
    noticState,
});

const initialState = Map({});

//debug
//if (module.hot) {
//    const devToolsExtension = window.devToolsExtension;
//
//    if (typeof devToolsExtension === 'function') {
//        middleware = compose(middleware, devToolsExtension())
//    }
//}

export default function configureStore(preloadedState = initialState) {
    const enhancer = compose(
        middleware,
        // devTools({
        //     name: Platform.OS,
        //     hostname: '192.16.137.3',
        //     port: 5678
        // })
    );

    const store = createStore(
        rootReducer,
        preloadedState,
        enhancer
    );

    return store
}
