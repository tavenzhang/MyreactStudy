import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import {TabNavigator} from 'react-navigation';
import createFragment from 'react-addons-create-fragment'

import TabbarView from "../view/page/TabbarView";
import AwardRecord from "../view/page/me/subView/AwardRecordView";
import BetRecord from "../view/page/me/subView/BetRecordView";
import ChaseRecord from "../view/page/me/subView/ChaseRecordView";
import MyMoneyView from "../view/page/me/subView/MyMoneyView";
import InMoneyView from "../view/page/me/subView/InMoneyView";
import OuterMoneyView from "../view/page/me/subView/OuterMoneyView";
import ChangePwd from "../view/page/me/subView/ChangePwd";
import CardManageView from "../view/page/me/subView/CardManageView";
import MsgView from "../view/page/me/subView/MailView";
import LoginView from "../view/page/me/subView/LoginView";
import SSC_History from "../view/page/award/subView/SSC_History";
import ADView from "../view/page/home/subview/ADView";
import AddCardView from "../view/page/me/subView/cardManage/AddCardView";
import BetDetailView from "../view/page/me/subView/betRecord/BetDetailView";
import ChaseDeatilView from "../view/page/me/subView/betRecord/ChaseDeatilView";
import MessageDetail from "../view/page/me/subView/message/MessageDetail";
import NoticeDeailView from "../view/page/notice/noticeDetail/NoticeDeailView";
import LotteryOrders from "../view/page/home/subview/games/LotteryOrders";
import DelCardView from "../view/page/me/subView/cardManage/DelCardView";
import EditCardView from "../view/page/me/subView/cardManage/EditCardView";
import AddValidView from "../view/page/me/subView/cardManage/AddValidView";
import EditCardAddView from "../view/page/me/subView/cardManage/EditCardAddView";
import MoneyTransferView from "../view/page/me/subView/MoneyTransferView";
import L115View from "../view/page/home/subview/games/L115/L115View";
import SSCView from "../view/page/home/subview/games/SSC/SSCView";
import D3View from "../view/page/home/subview/games/D3/D3View";
import K3View from "../view/page/home/subview/games/K3/K3View";
import G_11_5_History from "../view/page/award/subView/G_11_5_History";
import TrendView from "../view/page/home/subview/trend/TrendView";

import Home from "../view/page/home/Home";
import GameResultList from "../view/page/award/GameResultList";
import MyView from "../view/page/me/MyView";
import Notice from "../view/page/notice/Notice";
import React  from 'react';
import AIcon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
    textStyle: {
        color: G_Theme.gray,
    },
    selectedTextStyle: {
        color: G_Theme.selectColor,
    },
    iconPress: {
        color: G_Theme.selectColor,
        fontSize: 25
    },
    iconNormal: {
        color: G_Theme.gray,
        fontSize: 25
    },
});

let tabMyNavigator = TabNavigator({
        Home: {
            screen: Home,
            navigationOptions: {
                title:"大厅",
                tabBarLabel: '大厅',
                // Note: By default the icon is only shown on iOS. Search the showIcon option below.
                tabBarIcon: ({tintColor,focused}) => {
                    return    <AIcon name={"home"} style={focused ? styles.iconPress:styles.iconNormal}/>}
                ,
            }
        },
        GameResultList: {
            screen: GameResultList,
            navigationOptions: {
                title:"开奖",
                tabBarLabel: '开奖',
                // Note: By default the icon is only shown on iOS. Search the showIcon option below.
                tabBarIcon: ({tintColor,focused}) => {
                    return    <AIcon name={"gift"} style={focused ? styles.iconPress:styles.iconNormal}/>}
                ,
            }
        },
        Notice: {
            screen: Notice,
            navigationOptions: {
                title:"通知",
                tabBarLabel: '通知',
                // Note: By default the icon is only shown on iOS. Search the showIcon option below.
                tabBarIcon: ({tintColor,focused}) => {
                    return    <AIcon name={"reorder"} style={focused ? styles.iconPress:styles.iconNormal}/>}
                ,
            }
        },
        MyView: {
            screen: MyView,
            navigationOptions: {
                title:"我的",
                tabBarLabel: '我的',
                // Note: By default the icon is only shown on iOS. Search the showIcon option below.
                tabBarIcon: ({focused}) => {
                    return    <AIcon name={"user"} style={focused ? styles.iconPress:styles.iconNormal}/>}
                ,
            }
        }
    },
    {
        initialRouteName: 'Home',
        animationEnabled: true, // 切换页面时不显示动画
        tabBarPosition: 'bottom', // 显示在底端，android 默认是显示在页面顶端的
        swipeEnabled: false, // 禁止左右滑动
        backBehavior: 'home', // 按 back 键是否跳转到第一个 Tab， none 为不跳转
        tabBarOptions: {
            activeTintColor: 'red', // 文字和图片选中颜色
            inactiveTintColor: '#999', // 文字和图片默认颜色
            showIcon: true, // android 默认不显示 icon, 需要设置为 true 才会显示
            indicatorStyle: {height: 0}, // android 中TabBar下面会显示一条线，高度设为 0 后就不显示线了， 不知道还有没有其它方法隐藏？？？
            style: {
                backgroundColor: '#fff', // TabBar 背景色n
            },
            labelStyle: {
                fontSize: 12, // 文字大小
            },
        },
    });


let myNavigationOptions=({navigation})=> {
   // TLog("myNavigationOptions-------",navigation);
    let {passProps} =navigation.state.params;
    let title =navigation.state.routeName
    if(passProps)
     title =  passProps.title || passProps.name;
    return {title}
}

const createNavScreen=(screen)=>({
    screen,
    navigationOptions:myNavigationOptions
})

global.G_NavAppRoutConfig = {
    Main:{screen:tabMyNavigator},
    LoginView:createNavScreen(LoginView),
    AwardRecord:createNavScreen(AwardRecord),
    BetRecord:createNavScreen (BetRecord),
    MyMoneyView:createNavScreen (MyMoneyView),
    NoticeDeailView:createNavScreen (NoticeDeailView),
}

global.G_NavAppOptionsConfig = {
    navigationOptions:{
           // headerBackTitle:null,
            headerTintColor:"white",
            showIcon:true,
            swipeEnabled:false,
            animationEnabled:true,
            headerTitleStyle:{ backgroundColor: 'red'},
            headerStyle:{ backgroundColor: 'red'},

    },
    mode:'card',
}


global.G_Navigation = null;

//  sceneAnimation: Navigator.SceneConfigs.FloatFromBottom
//跳转页面集中控制 方便管理 和自定义动画

global.G_NavViews = {
    ADView: (data) => ({"component": ADView, "passProps": data}),
    //tab页面
    TabbarView: () => ({"component": TabbarView}),
    //登陆
    LoginView: (data = {}) => ({"component": "LoginView", "passProps": data}),
    //ssc 游戏详情
    SSC_History: (data) => ({"component": SSC_History, "passProps": data}),
    //11-5 游戏详情
    G_11_5_History: (data) => ({"component": G_11_5_History, "passProps": data}),
    //个人中心页面
    AwardRecord: (data) => ({"component":"AwardRecord", "passProps": data}),
    BetRecord: (data) => ({ "component": "BetRecord", "passProps": data}),
    ChaseRecord: (data) => ({"component": "ChaseRecord", "passProps": data}),
    MyMoneyView: (data) => ({"component": "MyMoneyView", "passProps": data}),
    InMoneyView: (data) => ({"component": "InMoneyView", "passProps": data}),
    OuterMoneyView: (data) => ({ "component": "OuterMoneyView", "passProps": data}),
    ChangePwd: (data) => ({ "component": "ChangePwd", "passProps": data}),
    CardManageView: (data) => ({"component": "CardManageView", "passProps": data}),
    MsgView: (data) => ({"component": "MsgView", "passProps": data}),
    //游戏11选5玩法
    L115View: (data) => ({"component": L115View, "passProps": data}),
    //福彩3d玩法
    D3View: (data) => ({"component": D3View, "passProps": data}),
    //快3玩法
    K3View: (data) => ({"component": K3View, "passProps": data}),
    //游戏重启时时彩玩法
    SSCView: (data) => ({"component": SSCView, "passProps": data}),
    //号码篮
    LotteryOrders: (data) => ({"component": LotteryOrders, "passProps": data}),
    //添加银行卡
    AddCardView: (data) => ({"component": AddCardView, "passProps": data}),
    //add step one
    AddValidView: (data) => ({"component": AddValidView, "passProps": data}),
    EditCardAddView: (data) => ({"component": EditCardAddView, "passProps": data}),
    //del银行卡
    DelCardView: (data) => ({"component": DelCardView, "passProps": data}),
    //edit
    EditCardView: (data) => ({"component": EditCardView, "passProps": data}),
    BetDetailView: (data) => ({"component": BetDetailView, "passProps": data}),
    ChaseDeatilView: (data) => ({"component": ChaseDeatilView, "passProps": data}),
    MessageDetail: (data) => ({"component": MessageDetail, "passProps": data}),
    NoticeDeailView: (data) => ({"component": "NoticeDeailView", "passProps": data}),

    MoneyTransferView: (data) => ({"component": MoneyTransferView, "passProps": data}),
    TrendView: (data) => ({"component": TrendView, "passProps": data}),
}


global.G_NavUtil = {
    pushToView: (data) => {
        TLog("G_Navigation--pushToView",data)
        G_Navigation.navigate(data.component,data);
        // InteractionManager.runAfterInteractions(() => {
        //     G_Navigation.push(data);
        // });
    },
    replace: (data) => {
        G_Navigation.replace(data);
        // InteractionManager.runAfterInteractions(() => {
        //
        // });
    },
    resetToView: (data) => {
        G_Navigation.resetTo(data);
        // InteractionManager.runAfterInteractions(() => {
        //
        // });
    },
    pop: () => {
       // TLog("G_Navigation--",G_Navigation.goBack)
      //  console.log("G_Navigation-----",G_Navigation);
        G_Navigation.goBack();
        // InteractionManager.runAfterInteractions(() => {
        //     G_Navigation.pop()
        // });

    },
    popN: (n = 1) => {
        G_Navigation.popN(n)
    },
    popToRoute: (data) => {
        G_Navigation.popToRoute(data);
    }
}
global.G_InitRegistApp = false;




