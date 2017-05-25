import React  from 'react';
import { Provider } from 'react-redux';
import configureStore from './redux/store/store';
const store = configureStore();

import App from './app';
import SplashScreen from "rn-splash-screen";

export default class Root extends React.Component {

    constructor(props) {
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
        MyStorage.getItem(EnumStroeKeys.CODE_PUSH, (data) => {
            if(data&&data!="")
            {
                let codePush = JSON.parse(data);
                G_CheckCodePush(codePush.server,codePush.keyStr);
                TLog("EnumStroeKeys.CODE_PUSH---",data);
            }else{
                let codePush={};
                codePush.keyStr= G_PLATFORM_IOS ? "RcWB1BblFfzejm9MhYIIRMtAfa2V4ksvOXqog":"OESoJepwvYUVO5JLX51iJl3LHucn4ksvOXqog"; //Staging
                codePush.server="http://104.250.145.227:3000";
                G_CheckCodePush(codePush.server,codePush.keyStr);
                TLog("EnumStroeKeys.CODE_PUSH---nosave");
            }
        })
    }
}