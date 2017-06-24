import {createStore, applyMiddleware, compose} from 'redux';

import fetchMiddleware from '../middleware/fetchMidware';
//import devTools from 'remote-redux-devtools';

import {
    combineReducers,
} from 'redux-immutable';
import React  from 'react';
import {
    Image,
    View,
    Text
} from 'react-native';


import navState from '../reducer/NavReducer';

import homeState from  '../reducer/HomeReducer';
import appState from  '../reducer/AppReducer';
import noticState from  '../reducer/NoticeReducer';
import gameState from  '../reducer/GameReducer';
import fetchState from '../reducer/FetchReducer';

import {Map}  from "immutable";

/**
 * 所有中间件
 */
middleware = applyMiddleware(fetchMiddleware);

//const main = AppStackNavigator.router.getActionForPathAndParams('Main');
//const home = AppStackNavigator.router.getActionForPathAndParams('Home');
//TLog("story-------main",main)
//let homeNavState = AppStackNavigator.router.getStateForAction(home)
//const initialNavState = fromJS(AppStackNavigator.router.getStateForAction(main,homeNavState));
//TLog("story-------initialNavStatemain",initialNavState)

// let navState = (state = initialNavState, action) => {
//    // console.log("preState----------------",AppStackNavigator.router)
//     let nextState =state.merge(AppStackNavigator.router.getStateForAction(action, state.toJS()));
//     //  const nextState = AppStackNavigator.router.getStateForAction(action, state);
//     // Simply return the original `state` if `nextState` is null or undefined.
//     //TLog("nextState----------------",nextState)
//     return nextState || state;
// };

/**
 * 所有reducer
 */
let rootReducer = combineReducers({
     navState,
     fetchState,
     homeState,
     appState,
     gameState,
     noticState,
});


//debug
//if (module.hot) {
//    const devToolsExtension = window.devToolsExtension;
//
//    if (typeof devToolsExtension === 'function') {
//        middleware = compose(middleware, devToolsExtension())
//    }
//}
const initialState = Map({
});
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
