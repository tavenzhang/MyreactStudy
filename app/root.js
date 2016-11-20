
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './store';
const store = configureStore();

import App from './app';

export default class Root extends Component {
    render() {
        return (
            <Provider store = {store} >
                <App />
            </Provider>
        )
    }
}