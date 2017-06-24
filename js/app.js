import React from 'react';
import {
    View,
    StatusBar,
    Text,
    Platform,
    BackAndroid,
    UIManager,
    ToastAndroid
} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Loading from "./view/componet/Loading";
import ToastBox from "./view/componet/InfoBox/ToastBox";
import TabbarView from "./view/page/TabbarView";

import {addNavigationHelpers} from 'react-navigation';
import {AppStackNavigator} from "./redux/reducer/NavReducer";

//定义全局Dispatch 方便使用
const mapDispatchToProps = (dispatch) => {
    if(!G_InitRegistApp)
    {
        ActDispatch.AppAct=bindActionCreators(ActDispatch.AppAct,dispatch);
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
        infoBox: state.get("appState").get("infoBox").toJS(),
        nav: state.get("navState").toJS()
    }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class App extends React.Component {

    // //节点渲染以后
    // componentWillMount() {
    //     if (!G_PLATFORM_IOS) {
    //         BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
    //     }
    //     //andorid setLayoutAnimatio 必须加入
    //     if (Platform.OS === 'android') {
    //         UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    //     }
    // }

    // componentWillUnmount() {
    //     if (Platform.OS === 'android') {
    //         BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
    //     }
    //  }

    render() {
        let {isLoading,isModal,infoBox} =this.props
        return (
        <View style={{width:G_Theme.windowWidth,height:G_Theme.windowHeight}}>
            <AppStackNavigator navigation={addNavigationHelpers({
                dispatch: this.props.dispatch,
                state: this.props.nav,
            })}/>
            {isLoading ? <Loading />:null }
        </View>
        );
    }


    // onBackAndroid = () => {
    //     const routers = this.navigator.getCurrentRoutes();
    //     if (routers.length > 1) {
    //         this.navigator.pop();
    //         return true;
    //     }
    //     let now = new Date().getTime();
    //     if (now - this.lastClickTime < 2500) {//2.5秒内点击后退键两次推出应用程序
    //         ActDispatch.AppAct.app_data_reset();
    //         return false;//控制权交给原生
    //     }
    //     this.lastClickTime = now;
    //     ToastAndroid.show("再按一次退出",ToastAndroid.SHORT);
    //     return true;
    // }
}


