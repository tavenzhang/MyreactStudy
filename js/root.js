import  ActionType   from "./redux/action/ActionType";
import  action   from "./global/action";
import  stringEnum   from "./global/stringEnum";
import  style from "./global/config/style";
import  server from "./global/config/server";
import  storage from "./global/utils/storage";
import  alertUtil from "./global/utils/alertUtil";
import  uitls from "./global/utils/util";
import  AnimationHelp from "./global/animationHelp";
import  native   from "./global/nativeExtent";
import  route   from "./global/route";

import React  from 'react';
import {Provider} from 'react-redux';
import configureStore from './redux/store/store';
import App from './app';
import SplashScreen from 'react-native-smart-splash-screen';
const store = configureStore();

export default class Root extends React.Component {

    constructor(props) {
        super(props)
        SplashScreen.close({
            animationType: SplashScreen.animationType.scale,
            duration: 850,
            delay: 800,
        })

    }

    render() {
        return (
            <Provider store={store} >
                <App />
            </Provider>
        );
    }


    componentDidMount() {
        G_MyStorage.getItem(G_EnumStroeKeys.CODE_PUSH, (data) => {
            if(data&&data!="") {
                TLog("data--",JSON.parse(data))
                let codePush = JSON.parse(data);
                T_CheckCodePush(codePush.server,codePush.keyStr);
            }else{

                let codePush={}; //FFqqKq9Mo6ta1zwnRbZa45nDEbyG4ksvOXqog
                codePush.keyStr= G_PLATFORM_IOS ? "FFqqKq9Mo6ta1zwnRbZa45nDEbyG4ksvOXqog":"XimWKsXFwnW9i0cy4k4NtgVfdXu24ksvOXqog"; //Staging
                codePush.server="http://104.250.145.227:3000";
                T_CheckCodePush(codePush.server,codePush.keyStr);
            }
        })
    }
}