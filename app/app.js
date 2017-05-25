import React from 'react';
import {
    Navigator,
    View,
    StatusBar,
    Platform,
    BackAndroid,
    UIManager,
    ToastAndroid
} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Loading from "./view/componet/Loading";
import ToastBox from "./view/componet/InfoBox/ToastBox";
import GuidView from "./view/page/GuidView";


//定义全局Dispatch 方便使用
const mapDispatchToProps = (dispatch) => {
    if(!G_InitRegistApp)
    {   ActDispatch.AppAct=bindActionCreators(ActDispatch.AppAct,dispatch);
        ActDispatch.FetchAct=bindActionCreators(ActDispatch.FetchAct,dispatch);
        ActDispatch.HomeAct=bindActionCreators(ActDispatch.HomeAct,dispatch);
        ActDispatch.NoticeAct=bindActionCreators(ActDispatch.NoticeAct,dispatch);
        ActDispatch.GameAct=bindActionCreators(ActDispatch.GameAct,dispatch);
        G_InitRegistApp  = true;
    }
    return {}
}

const mapStateToProps = state => {
    return {
        isLoading: state.get("fetchState").get("requesting"),
        infoBox: state.get("appState").get("infoBox").toJS()
    }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class App extends React.Component {

    //节点渲染以后
    componentWillMount() {
        if (Platform.OS === 'android') {
            BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
        }
        //andorid setLayoutAnimatio 必须加入
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }

    render() {
        const {isLoading, infoBox} = this.props;
        return (
            <View style={{flex: 1}}>
                <StatusBar
                    barStyle='light-content'
                    //  style={{color: "#f00",height:64,background:'F00',flex:1}}
                    backgroundColor='transparent'
                    translucent={true}
                    hidden={Platform.OS === 'ios' ? false : true}
                />
                <Navigator
                    initialRoute={{component: GuidView}}
                    configureScene={this.configureScene}
                    style={{backgroundColor:'#fff'}}
                    renderScene={this.renderScene}
                />
                { isLoading ? <Loading/> : null}
                {infoBox.show ? <ToastBox
                msg={infoBox.msg}
                style={infoBox.style}
                onClose={() =>ActDispatch.AppAct.hideBox()}
                />
                : null}
            </View>
        )
    }
    //设置出场动画
    configureScene = (route) => {
        let sceneAnimation = route.sceneAnimation;
        if (sceneAnimation) {
            return sceneAnimation;
        }
        //默认
        return Navigator.SceneConfigs.FloatFromLeft;
    }

    renderScene = (route, navigator) => {
        this.navigator = navigator;
        global.Navgator = navigator;
        let Component = route.component;
        return (
            <Component navigator={navigator} route={route} passProps={route.passProps}/>
        )
    }

    onBackAndroid = () => {
        const routers = this.navigator.getCurrentRoutes();
        if (routers.length > 1) {
            this.navigator.pop();
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
