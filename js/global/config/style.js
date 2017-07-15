/**
 * Created by zhangxinhua on 16/12/10.
 */
import {Dimensions, Platform, StyleSheet} from 'react-native';

export const WINDOW = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
};

global.G_ENV_DEBUG = process.env.NODE_ENV == 'development'
global.G_PLATFORM_IOS = Platform.OS === 'ios'

global.CUSTOMER = G_PLATFORM_IOS ? '8f1ad78957965153dbce5d96ff37617a' : '4fcd4781a7bddee9abdc6f0361fa8caa';

//样式配置
global.G_Theme = {
    primary: '#f24336',
    second: '#448afe',
    gray: '#ddd',
    grayDeep: '#888',
    black: '#333',
    selectColor: '#ad9423',
    fontGray: '#666',
    bannerHeight: 100,
    fontSizeNormal: 14,
    fontSizeSmall: 12,
    fontSizeLarge: 18,
    swipHeaderHeight: 50,//切换title的高度
    windowWidth: WINDOW.width,
    windowHeight: WINDOW.height,
    navigatorHeadH: G_PLATFORM_IOS ? 64 : 56,
    TabBarH: 64,
    StatusBarH: G_PLATFORM_IOS ? 20 : 0,
    gameOperatePanelHeight: 50,
    textInpuntH: G_PLATFORM_IOS ? 30 : 40,
    halfGrayAlpha: 'rgba(52, 52, 52, 0.5)',
    bgPbg: "rgb(208,199,160)",
    homeGameBg:'rgba(244,241,228,1)',
    triangle: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 4,
        borderRightWidth: 4,
        borderBottomWidth: 8,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'rgba(255,0,0,0.6)'
    }
};


global.G_Style = StyleSheet.create({

    appView: {
        width: WINDOW.width,
        height: WINDOW.height,
        backgroundColor: 'white'
    },
    appContentView: {
        flex:1,
      //  backgroundColor: "#f1f1f1"   ,
        //backgroundColor:"white"
    },
    appContentCenterView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});





