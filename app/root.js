import React  from 'react';
import CodePush from 'react-native-code-push';
import {Platform} from 'react-native';
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
        let keyStr= Platform.OS === 'ios' ? "RcWB1BblFfzejm9MhYIIRMtAfa2V4ksvOXqog":"OESoJepwvYUVO5JLX51iJl3LHucn4ksvOXqog"; //Staging
        if(__DEV__){
            console.log("__DEV__----------keyStr",keyStr);
            // debug模式
        }else{
            console.log("__DEV__ release模式----------");
            // release模式
             CodePush.sync({
                 deploymentKey: keyStr,
                 updateDialog: {
                     optionalIgnoreButtonLabel: '稍后',
                     optionalInstallButtonLabel: '马上更新',
                     optionalUpdateMessage: '有新版本了，是否更新？',
                     title: '更新提示'
                },
                 installMode: CodePush.InstallMode.IMMEDIATE
             })
        }

    }
}