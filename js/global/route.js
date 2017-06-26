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
import SSC_History from "../view/page/award/subView/SSC_History";
import ADView from "../view/page/home/subview/ADView";
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
import G_11_5_History from "../view/page/award/subView/G_11_5_History";
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


global.Navgator = null;

import {TabNavigator} from 'react-navigation';
import Home from "../view/page/home/Home";
import Award from "../view/page/award/Award";
import MyView from "../view/page/me/MyView";
import Notice from "../view/page/notice/Notice";
import StackNavigator from "react-navigation/lib-rn/navigators/StackNavigator";
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
        animationEnabled: true, // 切换页面时不显示动画
        tabBarPosition: 'bottom', // 显示在底端，android 默认是显示在页面顶端的
        swipeEnabled: false, // 禁止左右滑动
        backBehavior: 'home', // 按 back 键是否跳转到第一个 Tab， none 为不跳转
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

const createNavScreen = (screen) => ({
    screen,
    navigationOptions: myNavigationOptions,
})


global.G_NavAppRoutConfig = {
    Main: {screen: tabMyNavigator},
    LoginView: createNavScreen(LoginView),
    BaseGameView:createNavScreen(BaseGameView),
    RecordAwardView: createNavScreen(RecordAwardView),
    RecordBetView: createNavScreen(RecordBetView),
    RecordChaseView: createNavScreen(RecordChaseView),
    MoneyDetailView: createNavScreen(MoneyDetailView),
    MoneyInView: createNavScreen(MoneyInView),
    MoneyOuterView: createNavScreen(MoneyOuterView),
    MoneyCardView: createNavScreen(MoneyCardView),
    PersonPwdView: createNavScreen(PersonPwdView),
    PersonMailView: createNavScreen(PersonMailView),
    SSC_History: createNavScreen(SSC_History),
    ADView: createNavScreen(ADView),
    AddCardView: createNavScreen(AddCardView),
    BetDetailView: createNavScreen(BetDetailView),
    ChaseDeatilView: createNavScreen(ChaseDeatilView),
    MessageDetail: createNavScreen(MessageDetail),
    NoticeDeailView: createNavScreen(NoticeDeailView),
    LotteryOrders: createNavScreen(LotteryOrders),
    DelCardView: createNavScreen(DelCardView),
    AddValidView: createNavScreen(AddValidView),
    EditCardView:createNavScreen(EditCardView),
    EditCardAddView: createNavScreen(EditCardAddView),
    MoneyTransferView: createNavScreen(MoneyTransferView),
    L115View: createNavScreen(L115View),
    SSCView: createNavScreen(SSCView),
    D3View: createNavScreen(D3View),
    KL10View: createNavScreen(KL10View),
    PK10View: createNavScreen(PK10View),
    KENOView: createNavScreen(KENOView),
    K3View: createNavScreen(K3View),
    LUCKYView: createNavScreen(LUCKYView),
    G_11_5_History: createNavScreen(G_11_5_History),
    TrendView: createNavScreen(TrendView),
    AgentProfitView: createNavScreen(AgentProfitView),
    ProfitView: createNavScreen(ProfitView),
    AgentCreateUserView: createNavScreen(AgentCreateUserView),
    AgentTeamView: createNavScreen(AgentTeamView),
    AgentInfoView: createNavScreen(AgentInfoView),
    AgentAssignMoneyView: createNavScreen(AgentAssignMoneyView),
    ARankView: createNavScreen(ARankView),
    AssignDetilView: createNavScreen(AssignDetilView),
    LinkListView: createNavScreen(LinkListView),
    LinkDetailView: createNavScreen(LinkDetailView),
    AssignChangeView: createNavScreen(AssignChangeView),
    LotteryOrders:createNavScreen(LotteryOrders),
}

global.G_NavAppOptionsConfig = {
    navigationOptions: {
        // headerBackTitle:null,
        headerTintColor: "white",
        showIcon: true,
        swipeEnabled: false,
        animationEnabled: true,
        //headerTitleStyle:{ backgroundColor: 'red'},
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
    ADView: (data) => pushView("ADView", data),
    //登陆
    LoginView: (data = {}) => pushView("LoginView", data),
    //ssc 游戏详情
    SSC_History: (data) => pushView("SSC_History", data,data.lottery_name),
    //11-5 游戏详情
    G_11_5_History: (data) => pushView("G_11_5_History",data,data.lottery_name),

    //个人中心页面
    RecordAwardView: (data = {}) => pushView("RecordAwardView", data),
    RecordBetView: (data = {}) => pushView("RecordBetView", data),
    RecordChaseView: (data = {}) => pushView("RecordChaseView", data),
    MoneyDetailView: (data = {}) => pushView("MoneyDetailView", data,"资金明细"),
    MoneyInView: (data = {}) => pushView("MoneyInView", data, "账户充值"),
    MoneyOuterView: (data = {}) => pushView("MoneyOuterView", data, "账户提现"),
    MoneyTransferView: (data) => pushView("MoneyTransferView", data, "账户转账"),
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
    LotteryOrders: (data) => pushView("LotteryOrders", data),
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
}


global.G_InitRegistApp = false;
global.G_Navigation = null;
global.G_NavState = null;

global.G_NavUtil = {
    pushToView: (data) => {
       TLog("G_Navigation--pushToView==="+data.component,G_Navigation)
        if(G_NavState.routes[G_NavState.routes.length-1].routeName != data.component) {
            G_Navigation.navigate(data.component, {...data.passProps});
       }
    },
    replace: (data) => {
        G_Navigation.replace(data);
    },
    resetToView: (data) => {
        G_Navigation.resetTo(data);
    },
    pop: () => {
        lastView=null
        G_Navigation.goBack();
    },
    popN: (n = 1) => {
        G_Navigation.popN(n)
    },
    popToRoute: (data) => {
        G_Navigation.popToRoute(data);
    }
}









