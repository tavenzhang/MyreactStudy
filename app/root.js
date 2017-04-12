import React  from 'react';
import CodePush from 'react-native-code-push';

import { Provider } from 'react-redux';
import configureStore from './redux/store/store';
const store = configureStore();

import App from './app';
import SplashScreen from "rn-splash-screen";

export default class Root extends React.Component {

    constructor(props)
    {
        super(props)
        SplashScreen.hide();
    }

    render() {
        return (
            <Provider store = {store} >
                <App />
            </Provider>
        )
    }

    componentDidMount() {
        let keyStr="4m7mIg893Bs5ayH-BPT_w9WhvYdrNJvdXVfbf"; //Staging
        if(__DEV__){
            console.log("__DEV__----------");
            // debug模式
        }else{
            console.log("__DEV__ release模式----------");
            // release模式
             CodePush.sync({
                 deploymentKey: keyStr,
                 updateDialog: {
                     optionalIgnoreButtonLabel: '稍后',
                     optionalInstallButtonLabel: '后台更新',
                     optionalUpdateMessage: '有新版本了，是否更新？',
                     title: '更新提示'
                },
                 installMode: CodePush.InstallMode.IMMEDIATE
             })
        }

    }
}