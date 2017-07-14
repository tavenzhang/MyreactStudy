import RecordAwardView from "../view/page/me/operatView/RecordAwardView";
import RecordBetView from "../view/page/me/operatView/RecordBetView";
import RecordChaseView from "../view/page/me/operatView/RecordChaseView";
import MoneyDetailView from "../view/page/me/operatView/MoneyDetailView";
import MoneyInView from "../view/page/me/operatView/MoneyInView";
import MoneyOuterView from "../view/page/me/operatView/MoneyOuterView";
import MoneyCardView from "../view/page/me/operatView/MoneyCardView";
import PersonPwdView from "../view/page/me/operatView/PersonPwdView";
import PersonMailView from "../view/page/me/operatView/PersonMailView";
import LoginView from "../view/page/me/subView/LoginView";
import SSC_History from "../view/page/award/SSC_History";
import TWebView from "../view/page/home/subview/TWebView";
import AddCardView from "../view/page/me/operatView/cardManage/AddCardView";
import BetDetailView from "../view/page/me/operatView/betRecord/BetDetailView";
import ChaseDeatilView from "../view/page/me/operatView/betRecord/ChaseDeatilView";
import MessageDetail from "../view/page/me/operatView/message/MessageDetail";
import NoticeDeailView from "../view/page/notice/noticeDetail/NoticeDeailView";
import LotteryOrders from "../view/page/home/subview/games/LotteryOrders";
import DelCardView from "../view/page/me/operatView/cardManage/DelCardView";
import EditCardView from "../view/page/me/operatView/cardManage/EditCardView";
import AddValidView from "../view/page/me/operatView/cardManage/AddValidView";
import EditCardAddView from "../view/page/me/operatView/cardManage/EditCardAddView";
import MoneyTransferView from "../view/page/me/operatView/MoneyTransferView";
import L115View from "../view/page/home/subview/games/L115/L115View";
import SSCView from "../view/page/home/subview/games/SSC/SSCView";
import D3View from "../view/page/home/subview/games/D3/D3View";
import KL10View from "../view/page/home/subview/games/KL10/KL10View";
import PK10View from "../view/page/home/subview/games/PK10/PK10View";
import KENOView from "../view/page/home/subview/games/KENO/KENOView";
import K3View from "../view/page/home/subview/games/K3/K3View";
import LUCKYView from "../view/page/home/subview/games/LUCKY/LUCKYView";
import TrendView from "../view/page/home/subview/trend/TrendView";
import AgentProfitView from "../view/page/me/operatView/AgentProfitView";
import ProfitView from "../view/page/me/operatView/ProfitView";
import AgentCreateUserView from "../view/page/me/operatView/AgentCreateUserView";
import AgentTeamView from "../view/page/me/operatView/AgentTeamView";
import AgentInfoView from "../view/page/me/operatView/AgentInfoView";
import AgentAssignMoneyView from "../view/page/me/operatView/AgentAssignMoneyView";
import ARankView from "../view/page/me/operatView/agentinfo/ARankView";
import AssignDetilView from "../view/page/me/operatView/agentAssign/AssignDetilView";
import LinkListView from "../view/page/me/operatView/agentCreatUser/LinkListView";
import LinkDetailView from "../view/page/me/operatView/agentCreatUser/LinkDetailView";
import AssignChangeView from "../view/page/me/operatView/agentAssign/AssignChangeView";
import SystemView from "../view/page/me/operatView/SystemView";
import MoneyAssginBack from "../view/page/me/operatView/MoneyAssginBack";
import MoneyApply from "../view/page/me/operatView/MoneyApply";
import {TabNavigator} from 'react-navigation';
import Home from "../view/page/Home";
import Award from "../view/page/Award";
import MyView from "../view/page/MyView";
import Notice from "../view/page/Notice";
import BaseGameView from "../view/page/home/subview/games/BaseGameView";




let tabMyNavigator = TabNavigator({
        Home: {
            screen: Home,
        },
        Award: {
            screen: Award,
        },
        Notice: {
            screen: Notice,
        },
        MyView: {
            screen: MyView,
        }
    },
    {
        initialRouteName: 'Home',
        animationEnabled: true, // 切换页面时显示动画
        tabBarPosition: 'bottom', // 显示在底端，android 默认是显示在页面顶端的
        swipeEnabled: false, // 禁止左右滑动
        backBehavior: 'home', // 按 back 键是否跳转到第一个 Tab， none 为不跳转
        lazy:G_PLATFORM_IOS ? true:true,
        tabBarOptions: {
            activeTintColor: G_Theme.selectColor, // 文字和图片选中颜色
            inactiveTintColor: '#999', // 文字和图片默认颜色
            showIcon: true, // android 默认不显示 icon, 需要设置为 true 才会显示
            indicatorStyle: {height: 0}, // android 中TabBar下面会显示一条线，高度设为 0 后就不显示线了， 不知道还有没有其它方法隐藏？？？
            style: {
                backgroundColor: '#171719', // TabBar 背景色n
            },
            labelStyle: {
                fontSize: 12, // 文字大小
            },
        },
    });

let myNavigationOptions = ({navigation}) => {
    // TLog("myNavigationOptions-------",navigation);
    let passProps = navigation.state.params;
    let title = navigation.state.routeName
    if (passProps)
        title = passProps.title || passProps.name;
    return {title}
}

const createNavScreen = (screen,name) => ({
    screen,
    navigationOptions: myNavigationOptions,
    name:name
})



global.G_RoutConfig = {
    Main: {screen: tabMyNavigator,name:"Main"},
    LoginView: createNavScreen(LoginView,"LoginView"),
    BaseGameView:createNavScreen(BaseGameView,"BaseGameView"),
    RecordAwardView: createNavScreen(RecordAwardView,"RecordAwardView"),
    RecordBetView: createNavScreen(RecordBetView,"RecordBetView"),
    RecordChaseView: createNavScreen(RecordChaseView,"RecordChaseView"),
    MoneyDetailView: createNavScreen(MoneyDetailView,"MoneyDetailView"),
    MoneyInView: createNavScreen(MoneyInView,"MoneyInView"),
    MoneyOuterView: createNavScreen(MoneyOuterView,"MoneyOuterView"),
    MoneyCardView: createNavScreen(MoneyCardView,"MoneyCardView"),
    PersonPwdView: createNavScreen(PersonPwdView,"PersonPwdView"),
    PersonMailView: createNavScreen(PersonMailView,"PersonMailView"),
    SSC_History: createNavScreen(SSC_History,"SSC_History"),
    TWebView: createNavScreen(TWebView,"TWebView"),
    AddCardView: createNavScreen(AddCardView,"AddCardView"),
    BetDetailView: createNavScreen(BetDetailView,"BetDetailView"),
    ChaseDeatilView: createNavScreen(ChaseDeatilView,"ChaseDeatilView"),
    MessageDetail: createNavScreen(MessageDetail,"MessageDetail"),
    NoticeDeailView: createNavScreen(NoticeDeailView,"NoticeDeailView"),
    LotteryOrders: createNavScreen(LotteryOrders,"LotteryOrders"),
    DelCardView: createNavScreen(DelCardView,"DelCardView"),
    AddValidView: createNavScreen(AddValidView,"AddValidView"),
    EditCardView:createNavScreen(EditCardView,"EditCardView"),
    EditCardAddView: createNavScreen(EditCardAddView,"EditCardAddView"),
    MoneyTransferView: createNavScreen(MoneyTransferView,"MoneyTransferView"),
    L115View: createNavScreen(L115View,"L115View"),
    SSCView: createNavScreen(SSCView,"SSCView"),
    D3View: createNavScreen(D3View,"D3View"),
    KL10View: createNavScreen(KL10View,"KL10View"),
    PK10View: createNavScreen(PK10View,"PK10View"),
    KENOView: createNavScreen(KENOView,"KENOView"),
    K3View: createNavScreen(K3View,"K3View"),
    LUCKYView: createNavScreen(LUCKYView,"LUCKYView"),
    TrendView: createNavScreen(TrendView,'TrendView'),
    AgentProfitView: createNavScreen(AgentProfitView,"AgentProfitView"),
    ProfitView: createNavScreen(ProfitView,"ProfitView"),
    AgentCreateUserView: createNavScreen(AgentCreateUserView,"AgentCreateUserView"),
    AgentTeamView: createNavScreen(AgentTeamView,"AgentTeamView"),
    AgentInfoView: createNavScreen(AgentInfoView,"AgentInfoView"),
    AgentAssignMoneyView: createNavScreen(AgentAssignMoneyView,"AgentAssignMoneyView"),
    ARankView: createNavScreen(ARankView,"ARankView"),
    AssignDetilView: createNavScreen(AssignDetilView,"AssignDetilView"),
    LinkListView: createNavScreen(LinkListView,"LinkListView"),
    LinkDetailView: createNavScreen(LinkDetailView,"LinkDetailView"),
    AssignChangeView: createNavScreen(AssignChangeView,"AssignChangeView"),
    SystemView:createNavScreen(SystemView,"SystemView"),
    MoneyAssginBack:createNavScreen(MoneyAssginBack,"MoneyAssginBack"),
    MoneyApply:createNavScreen(MoneyApply,"MoneyApply"),

}

global.G_NavAppOptionsConfig = {
    navigationOptions: {
        // headerBackTitle:null,
        headerTintColor: "white",
        showIcon: true,
        swipeEnabled: false,
        animationEnabled: true,
        headerTitleStyle:{alignSelf: "center"},
        headerStyle: {backgroundColor: '#d7213c'},
    },
    mode: 'card',
}


//  sceneAnimation: Navigator.SceneConfigs.FloatFromBottom
//跳转页面集中控制 方便管理 和自定义动画
let pushView = (component, passProps = null,title=null) => {
    if(title)
    {
        passProps.title=title
    }
    return {component, passProps}
}

global.G_NavViews = {
    TWebView: (data) => pushView("TWebView", data,data.title),
    //登陆
    LoginView: (data = {}) => pushView("LoginView", data,"登陆"),
    //ssc 游戏详情
    SSC_History: (data) => pushView("SSC_History", data,data.lottery_name),
    //个人中心页面
    RecordAwardView: (data = {}) => pushView("RecordAwardView", data),
    RecordBetView: (data = {}) => pushView("RecordBetView", data),
    RecordChaseView: (data = {}) => pushView("RecordChaseView", data),
    MoneyDetailView: (data = {}) => pushView("MoneyDetailView", data,"资金明细"),
    MoneyInView: (data = {}) => pushView("MoneyInView", data, "账户充值"),
    MoneyOuterView: (data = {}) => pushView("MoneyOuterView", data, "账户提现"),
    MoneyTransferView: (data) => pushView("MoneyTransferView", data, "账户转账"),
    MoneyAssginBack:(data) => pushView("MoneyAssginBack", data, "返点分红"),
    MoneyApply:(data) => pushView("MoneyApply", data),

    PersonPwdView: (data = {}) => pushView("PersonPwdView", data),
    MoneyCardView: (data = {}) => pushView("MoneyCardView", data),
    PersonMailView: (data = {}) => pushView("PersonMailView", data),
    AgentTeamView: (data = {}) => pushView("AgentTeamView", data,"团队管理"),
    AgentProfitView: (data = {}) => pushView("AgentProfitView",data, "盈亏报表"),
    ProfitView: (data = {}) => pushView("ProfitView", data),
    AgentInfoView: (data = {}) => pushView("AgentInfoView", data),
    AgentCreateUserView: (data = {}) => pushView("AgentCreateUserView", data, "账号开户"),
    AgentAssignMoney: (data = {}) => pushView("AgentAssignMoneyView",data, "高点配额"),

    L115View: (data) => pushView("L115View", data),
    //福彩3d玩法
    D3View: (data) => pushView("D3View", data),
    //快3玩法
    K3View: (data) => pushView("K3View", data),
    KL10View: (data) => pushView("KL10View", data),

    PK10View: (data) => pushView("PK10View", data),
//KENOWANFA
    KENOView: (data) => pushView("KENOView", data),
    LUCKYView: (data) => pushView("LUCKYView", data),
    //游戏重启时时彩玩法
    SSCView: (data) => pushView("SSCView", data),
    //号码篮
    LotteryOrders: (data) => pushView("LotteryOrders", data,"购彩篮"),
    AddCardView: (data) => pushView("AddCardView", data),
    //add step one
    AddValidView: (data) => pushView("AddValidView", data),
    EditCardAddView: (data) => pushView("EditCardAddView", data),
    //del银行卡
    DelCardView: (data) => pushView("DelCardView", data),
    //edit
    EditCardView: (data) => pushView("EditCardView", data),
    BetDetailView: (data) => pushView("BetDetailView", data),
    ChaseDeatilView: (data) => pushView("ChaseDeatilView", data),
    MessageDetail: (data) => pushView("MessageDetail", data),
    NoticeDeailView: (data) => pushView("NoticeDeailView", data),
    TrendView: (data) => pushView("TrendView", data),
    ARankView: (data = {}) => pushView("ARankView", data,"本月排名"),
    AssignDetilView: (data = {}) => pushView("AssignDetilView", data, "配额详情"),
    LinkListView: (data = {}) => pushView("LinkListView", data,  "开户链接"),
    LinkDetailView: (data = {}) => pushView("LinkDetailView", data, "链接详情"),
    AssignChangeView: (data = {}) => pushView("AssignChangeView", data,  "修改配额"),
    SystemView: (data = {}) => pushView("SystemView", data),

}


global.G_InitRegistApp = false;
global.G_Navigation = null;
global.G_NavState = null;
global.G_NavRouteState=null

// let goBack=()=>{
//     G_Navigation.goBack();
//     G_Navigation.setParams({isFlush:true})
// }
global.G_NavUtil = {
    pushToView: (data) => {
       TLog("G_Navigation--pushToView==="+data.component,G_Navigation)
        if(G_NavState.routes[G_NavState.routes.length-1].routeName != data.component) {
            G_Navigation.navigate(data.component, {...data.passProps});
       }
    },
    pop: (data={}) => {
        //避免goback 引起的多次didMound
        ActDispatch.AppAct.app_route_state(true,data);
        setTimeout(G_Navigation.goBack,200);
    },
    // popN: (n = 1) => {
    //     G_Navigation.popN(n)
    // },
    // popToRoute: (data) => {
    //     G_Navigation.popToRoute(data);
    // }
}









