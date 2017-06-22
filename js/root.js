import  ActionType   from "./redux/action/ActionType";
import  action   from "./global/action";
import  style from "./global/config/style";
import  server from "./global/config/server";
import  storage from "./global/utils/storage";
import  alertUtil from "./global/utils/alertUtil";
import  uitls from "./global/utils/util";
import  AnimationHelp from "./global/animationHelp";
import  route   from "./global/route";
import  native   from "./global/nativeExtent";
import React  from 'react';
import { Provider } from 'react-redux';
import configureStore from './redux/store/store';

import App from './app';


const store = configureStore();
export default class Root extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Provider store = {store} >
                <App />
            </Provider>
        )
    }

    componentDidMount() {
        G_MyStorage.getItem(G_EnumStroeKeys.CODE_PUSH, (data) => {
            if(data&&data!="") {
                let codePush = JSON.parse(data);
                T_CheckCodePush(codePush.server,codePush.keyStr);
            }else{
                let codePush={};
                codePush.keyStr= G_PLATFORM_IOS ? "RcWB1BblFfzejm9MhYIIRMtAfa2V4ksvOXqog":"OESoJepwvYUVO5JLX51iJl3LHucn4ksvOXqog"; //Staging
                codePush.server="http://104.250.145.227:3000";
                T_CheckCodePush(codePush.server,codePush.keyStr);
            }
        })
    }
}