/**
 * Created by zhangxinhua on 16/12/10.
 */
import {Dimensions, Platform, StyleSheet} from 'react-native';

export const WINDOW = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
};
global.G_PLATFORM_IOS= Platform.OS === 'ios'

global.CUSTOMER = G_PLATFORM_IOS ? '8f1ad78957965153dbce5d96ff37617a' : '4fcd4781a7bddee9abdc6f0361fa8caa';
global.Window=WINDOW;



//样式配置
export const GlobelTheme = {
    primary: '#f4212b',
    second: '#448AFF',
    gray: '#ddd',
    grayDeep: '#888',
    black: '#333',
    selectColor: '#ad9423',
    fontGray: '#666',
    bannerHeight:100,
    fontSizeNormal: 14,
    fontSizeSmall: 12,
    fontSizeLarge: 18,
    swipHeaderHeight: 50,//切换title的高度
    screenWidth: WINDOW.width,
    screenHeight: WINDOW.height,
    NavigatorHeadH:Platform.OS === 'ios'? 64:56,
    TabBarH:64,
    StatusBarH:Platform.OS === 'ios' ? 20:0,
    gameOperatePanelHeight: 50,
    halfGrayAlpha:'rgba(52, 52, 52, 0.5)',
};
global.GlobelTheme=GlobelTheme;

export const GlobeStyle = StyleSheet.create({

    appView: {
        width: WINDOW.width,
        height: WINDOW.height,
        backgroundColor: 'white'
    },
    appContentView: {
        flex:1,
        backgroundColor: "#F1E0F6"
    },
    appContentCenterView:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }
});
global.GlobeStyle=GlobeStyle;


const EnumFontNames={
    list_arrow_desc:"sort-desc",
    list_arrow_up:"sort-up",
    plus:"plus",
    angleRight:"angle-right",
    infoCircle:"info-circle",
    bars:'bars'
}

global.G_EnumFontNames=EnumFontNames;

