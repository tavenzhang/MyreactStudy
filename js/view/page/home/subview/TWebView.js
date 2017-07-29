import React from 'react';
import {
    View,
    StyleSheet,
    WebView, ScrollView
} from 'react-native';

import BaseView from "../../../componet/BaseView";

export default class TWebView extends BaseView {

    renderBody() {
        let {webData, data} = this.props.navigation.state.params;
        TLog("webData====",webData);
        TLog("data====",data)
        return (<View style={G_Style.appContentView}>
                {/*<ScrollView style={{flex: 1}}/>*/}
                    {
                        webData ? <WebView style={{backgroundColor: "white"}}
                                           source={{html: webData}}
                                           automaticallyAdjustContentInsets={false}/> :
                            <WebView style={styles.webview_style}
                                     source={{uri: data}}
                                     startInLoadingState={true}
                                     domStorageEnabled={true}
                                     javaScriptEnabled={true}
                                     onLoadStart={() => ActDispatch.AppAct.showLoading()}
                                     onLoad={ActDispatch.AppAct.hideLoading}
                                     onError={ActDispatch.AppAct.hideLoading}
                           />

                    }
                {/*</ScrollView>*/}
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
        flex: 1
        //backgroundColor:'#00ff00',
    }

});