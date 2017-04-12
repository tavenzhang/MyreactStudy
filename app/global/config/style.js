/**
 * Created by zhangxinhua on 16/12/10.
 */
import {Dimensions, Platform, StyleSheet} from 'react-native';

export const WINDOW = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
};


//样式配置
export const GlobelTheme = {
    primary: '#f464a2',
    second: '#448AFF',
    gray: '#999',
    black: '#222',
    selectColor: '#ad9423',
    fontSizeNormal: 14,
    fontSizeSmall: 12,
    fontSizeLarge: 18,
    swipHeaderHeight: 50,//切换title的高度
    screenWidth: WINDOW.width,
    screenHeight: WINDOW.height,
    NavigatorHeadH: 64,
    TabBarH: 50,
    StatusBarH:Platform.OS === 'ios' ? 20 : 0,
}

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
});
global.GlobeStyle=GlobeStyle;


const EnumFontIco={
    list_arrow_desc:"sort-desc",
    list_arrow_up:"sort-up",
    plus:"plus",
    angleRight:"angle-right",
}

global.EnumFontNames=EnumFontIco;

