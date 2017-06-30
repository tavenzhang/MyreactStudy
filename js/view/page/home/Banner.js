
import React from 'react';
import {
    View,
    StyleSheet,
    WebView
} from 'react-native';

import {connect} from 'react-redux';

//import TLoading from "../../../componet/TLoading";
import BaseView from "../../../componet/TView";


export default class Banner extends React.PureComponent {

    constructor(props)
    {
        super(props);
        this.bannerList = [{
            url: `${G_SERVERADDR}/i/home/home_activity_banne1r3.jpg`,
            name: "活动1",
            data: "http://www.baidu.com"
        }, {
            url: `${G_SERVERADDR}/i/home/home_activity_banner12.jpg`,
            name: "活动2",
            data: "http://www.baidu.com"
        }, {
            url: `${G_SERVERADDR}/i/home/home_activity_banne1r2.jpg`,
            name: "活动3",
            data: "http://www.google.com"
        }]
    }



    render() {
        let params= this.props.navigation.state.params;
        return (
            <View style={G_Style.appContentView}>
                <View style={{flex:1}}>
                    <WebView style={styles.webview_style}
                             source={{uri:params.data}}
                             startInLoadingState={true}
                             domStorageEnabled={true}
                             javaScriptEnabled={true}
                             onLoadStart={()=>ActDispatch.AppAct.showLoading()}
                             onLoad={ActDispatch.AppAct.hideLoading}
                             onError={ActDispatch.AppAct.hideLoading}
                    >
                    </WebView>
                </View>
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
        color: G_Theme.gray,
    },
    selectedTextStyle: {
        color: G_Theme.primary,
    },
    iconPress: {
        color: G_Theme.primary,
        fontSize: 25
    },
    iconNormal: {
        color: G_Theme.gray,
        fontSize: 25
    },
    webview_style: {
        //backgroundColor:'#00ff00',
    }

});