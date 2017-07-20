import React from 'react';
import {
    View,
    StatusBar,
    Platform,
    BackHandler,
    UIManager,
    ToastAndroid,
} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Loading from "./view/componet/Loading";

import SplashScreen from 'react-native-smart-splash-screen'
import ToastBoxView from "./view/componet/InfoBox/ToastBox";

import {addNavigationHelpers} from "react-navigation";
import {AppStackNavigator} from "./redux/reducer/NavReducer";

//定义全局Dispatch 方便使用
const mapDispatchToProps = (dispatch) => {
    if(!G_InitRegistApp) {   ActDispatch.AppAct=bindActionCreators(ActDispatch.AppAct,dispatch);
        ActDispatch.FetchAct=bindActionCreators(ActDispatch.FetchAct,dispatch);
        ActDispatch.HomeAct=bindActionCreators(ActDispatch.HomeAct,dispatch);
        ActDispatch.NoticeAct=bindActionCreators(ActDispatch.NoticeAct,dispatch);
        ActDispatch.GameAct=bindActionCreators(ActDispatch.GameAct,dispatch);
        G_InitRegistApp  = true;
    }
    return {dispatch: dispatch}
}

const mapStateToProps = state => {
    return {
        isLoading: state.get("fetchState").get("requesting"),
        isModal:state.get("fetchState").get("isModal"),
        infoBox: state.get("appState").get("infoBox").toJS(),
        nav: state.get("navState").toJS(),
        userData: state.get("appState").get("userData").toJS(),
        routState:state.get("appState").get("routState").toJS(),
    }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class App extends React.Component {

    //节点渲染以后
    componentWillMount() {
        if (!G_PLATFORM_IOS) {
            BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
        }
        //andorid setLayoutAnimatio 必须加入
        if (!G_PLATFORM_IOS) {
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    componentWillUnmount() {
        if (!G_PLATFORM_IOS) {
            BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }

    componentDidMount() {
        SplashScreen.close({
            animationType: SplashScreen.animationType.scale,
            duration: 850,
            delay: 500,
        })
        if(!__DEV__) {
            G_MyStorage.getItem(G_EnumStroeKeys.CODE_PUSH, (data) => {
                if(data&&data!="") {
                    let codePush = JSON.parse(data);
                    T_CheckCodePush(codePush.server,codePush.keyStr,T_TryCodePushConfig,true);
                }else{
                    T_TryCodePushConfig()
                }
            })
        }
    }

    render() {
        const {isLoading, infoBox,isModal} = this.props;
        G_NavState = this.props.nav;
        G_NavRouteState =this.props.routState;
        return (
            <View style={{flex: 1}}>
                <StatusBar
                    barStyle='light-content'
                    //  style={{color: "#f00",height:64,background:'F00',flex:1}}
                    backgroundColor='transparent'
                    translucent={true}
                    hidden={Platform.OS === 'ios' ? false : true}
                />
                <AppStackNavigator navigation={addNavigationHelpers({
                    dispatch: this.props.dispatch,
                    state: this.props.nav,
                })} screenProps={{userData:this.props.userData}}/>
                <Loading visible={isLoading} isModal={isModal} />
                {infoBox.show ? <ToastBoxView isError={infoBox.isError}
                                              visible={infoBox.show}
                                              msg={infoBox.msg}
                                              style={infoBox.style}/>:null}
            </View>
        )
    }

    onBackAndroid = () => {
        const routers = this.props.nav.routes;
        if (routers.length > 1) {
            G_NavUtil.pop()
            return true;
        }
        let now = new Date().getTime();
        if (now - this.lastClickTime < 2500) {//2.5秒内点击后退键两次推出应用程序
            ActDispatch.AppAct.app_data_reset();
            return false;//控制权交给原生
        }
        this.lastClickTime = now;
        ToastAndroid.show("再按一次退出",ToastAndroid.SHORT);
        return true;
    }
}


