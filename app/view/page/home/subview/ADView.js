/**
 * Created by zhangxinhua on 16/12/11.
 */
import React from 'react';
import {
    View,
    StyleSheet,
    WebView
} from 'react-native';

import {connect} from 'react-redux';

import Loading from "../../../componet/Loading";
import BaseView from "../../../componet/BaseView";

const mapStateToProps = state => {
    return {
        isLoading: state.fetchState.requesting || state.appState.requesting,
    }
}



@connect(mapStateToProps)
export default class ADView extends BaseView {

    getNavigationBarProps(){
        return {title:this.props.passProps.name}
    }

    renderBody() {
        const {passProps, isLoading} = this.props;
        return (
            <View style={GlobeStyle.appContentView}>
                <View style={{flex:1}}>
                    <WebView style={styles.webview_style}
                             source={{uri:passProps.data}}
                             //startInLoadingState={true}
                             domStorageEnabled={true}
                             javaScriptEnabled={true}
                             onLoadStart={ActDispatch.AppAct.showLoading}
                             onLoad={ActDispatch.AppAct.hideLoading}
                             onError={ActDispatch.AppAct.hideLoading}
                    >
                    </WebView>
                </View>
                { isLoading ? <Loading /> : null}
            </View>
        );
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }
}

const styles = StyleSheet.create({
    textStyle: {
        color: GlobelTheme.gray,
    },
    selectedTextStyle: {
        color: GlobelTheme.primary,
    },
    iconPress: {
        color: GlobelTheme.primary,
        fontSize: 25
    },
    iconNormal: {
        color: GlobelTheme.gray,
        fontSize: 25
    },
    webview_style: {
        //backgroundColor:'#00ff00',
    }

});