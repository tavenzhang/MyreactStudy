import {
    InteractionManager,
    Navigator
} from 'react-native';
import RecordAwardView from "../view/page/me/operatView/RecordAwardView";
import RecordBetView from "../view/page/me/operatView/RecordBetView";
import RecordChaseView from "../view/page/me/operatView/RecordChaseView";
import MoneyDetailView from "../view/page/me/operatView/MoneyDetailView";
import MoneyInView from "../view/page/me/operatView/MoneyInView";
import MoneyOuterView from "../view/page/me/operatView/MoneyOuterView";
import MoneyCardView from "../view/page/me/operatView/MoneyCardView";
import PersonPwdView from "../view/page/me/operatView/PersonPwdView";
import PersonMailView from "../view/page/me/operatView/PersonMailView";
import TabbarView from "../view/page/TabbarView";
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
import K3View from "../view/page/home/subview/games/K3/K3View";
import G_11_5_History from "../view/page/award/subView/G_11_5_History";
import TrendView from "../view/page/home/subview/trend/TrendView";
import AgentProfitView from "../view/page/me/operatView/AgentProfitView";
import AgentCreateUserView from "../view/page/me/operatView/AgentCreateUserView";
import AgentTeamView from "../view/page/me/operatView/AgentTeamView";
import AgentInfoView from "../view/page/me/operatView/AgentInfoView";
import AgentAssignMoney from "../view/page/me/operatView/AgentAssignMoney";
import ARankView from "../view/page/me/operatView/agentinfo/ARankView";


// PushFromLeft
// FloatFromRight
// FloatFromLeft
// VerticalUpSwipeJump
// VerticalDownSwipeJump
global.Navgator = null;

//  sceneAnimation: Navigator.SceneConfigs.FloatFromBottom
//跳转页面集中控制 方便管理 和自定义动画
let pushView=(component,passProps=null,sceneAnimation=null)=>{
    return {component,passProps,sceneAnimation}
}


global.G_NavViews = {
    ADView: (data) => pushView(ADView,data),
    //tab页面
    TabbarView: () => pushView(TabbarView),
    //登陆
    LoginView: (data = {}) => pushView(LoginView,data),
    //ssc 游戏详情
    SSC_History: (data) =>pushView(SSC_History,data),
    //11-5 游戏详情
    G_11_5_History: (data) =>pushView(G_11_5_History,data),

    //个人中心页面
    RecordAwardView: (data = {}) =>pushView(RecordAwardView,data),
    RecordBetView: (data = {}) =>pushView(RecordBetView,data),
    RecordChaseView: (data = {}) =>pushView(RecordChaseView,data),
    MoneyDetailView: (data = {}) =>pushView(MoneyDetailView,data),
    MoneyInView: (data = {}) => pushView(MoneyInView,data),
    MoneyOuterView: (data = {}) => pushView(MoneyOuterView,data),
    PersonPwdView: (data = {}) => pushView(PersonPwdView,data),
    MoneyCardView: (data = {}) => pushView(MoneyCardView,data),
    PersonMailView: (data = {}) =>pushView(PersonMailView,data),
    AgentTeamView:(data = {}) =>pushView(AgentTeamView,data),
    AgentProfitView :(data = {}) =>pushView(AgentProfitView,data),
    AgentInfoView:(data = {}) =>pushView(AgentInfoView,data),
    AgentCreateUserView:(data = {}) =>pushView(AgentCreateUserView,data),
    AgentAssignMoney:(data = {}) =>pushView(AgentAssignMoney,data),

    L115View: (data) =>pushView(L115View,data),
    //福彩3d玩法
    D3View: (data) => pushView(D3View,data),
    //快3玩法
    K3View: (data) => pushView(K3View,data),
    KL10View: (data) => pushView(KL10View,data),

    PK10View: (data) =>pushView(PK10View,data),
    //游戏重启时时彩玩法
    SSCView: (data) =>pushView(SSCView,data),
    //号码篮
    LotteryOrders: (data) =>pushView(LotteryOrders,data),
    AddCardView: (data) =>pushView(AddCardView,data),
    //add step one
    AddValidView: (data) => pushView(AddValidView,data),
    EditCardAddView: (data) =>pushView(EditCardAddView,data),
    //del银行卡
    DelCardView: (data) => pushView(DelCardView,data),
    //edit
    EditCardView: (data) => pushView(EditCardView,data),
    BetDetailView: (data) => pushView(BetDetailView,data),
    ChaseDeatilView: (data) =>pushView(ChaseDeatilView,data),
    MessageDetail: (data) =>pushView(MessageDetail,data),
    NoticeDeailView: (data) =>pushView(NoticeDeailView,data),
    MoneyTransferView: (data) =>pushView(MoneyTransferView,data),
    TrendView: (data) =>pushView(TrendView,data),
    ARankView:(data={})=>pushView(ARankView,data),
}


global.G_NavUtil  = {
    pushToView: (data) => {
        Navgator.push(data);
    },
    replace: (data) => {
        Navgator.replace(data);
    },
    resetToView: (data) => {
        Navgator.resetTo(data);
    },
    pop: () => {
        Navgator.pop()

    },
    popN: (n = 1) => {
        Navgator.popN(n)
    },
    popToRoute:(data) => {
        Navgator.popToRoute(data);
        }
    }



global.G_InitRegistApp = false;




