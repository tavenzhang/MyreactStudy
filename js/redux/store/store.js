
import { createStore, applyMiddleware, compose } from 'redux';

import fetchMiddleware from '../middleware/fetchMidware';
//import devTools from 'remote-redux-devtools';

import {
    combineReducers
} from 'redux-immutable';

import appState from  '../reducer/AppReducer';
import noticState from  '../reducer/NoticeReducer';
import gameState from  '../reducer/GameReducer';
import fetchState from '../reducer/FetchReducer';
import navState from '../reducer/NavReducer';
import {Map}  from "immutable";

/**
 * 所有中间件
 */
middleware = applyMiddleware(fetchMiddleware);

/**
 * 所有reducer
 */
let rootReducer = combineReducers({
    navState,
    fetchState,
    appState,
    gameState,
    noticState,
});

const initialState = Map({});

export default function configureStore(preloadedState = initialState) {
    const enhancer = compose(
        middleware
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
