import {
    InteractionManager,
    Navigator
} from 'react-native';
import AwardRecord from "../view/page/me/subView/AwardRecordView";
import BetRecord from "../view/page/me/subView/BetRecordView";
import ChaseRecord from "../view/page/me/subView/ChaseRecordView";
import MyMoneyView from "../view/page/me/subView/MyMoneyView";
import InMoneyView from "../view/page/me/subView/InMoneyView";
import OuterMoneyView from "../view/page/me/subView/OuterMoneyView";
import ChangePwd from "../view/page/me/subView/ChangePwd";
import CardManageView from "../view/page/me/subView/CardManageView";
import MsgView from "../view/page/me/subView/MailView";
import TabbarView from "../view/page/TabbarView";
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


// PushFromLeft
// FloatFromRight
// FloatFromLeft
// VerticalUpSwipeJump
// VerticalDownSwipeJump
global.Navgator = null;

//  sceneAnimation: Navigator.SceneConfigs.FloatFromBottom
//跳转页面集中控制 方便管理 和自定义动画

global.G_NavViews = {
    ADView: (data) => ({"component": ADView, "passProps": data}),
    //tab页面
    TabbarView: () => ({"component": TabbarView}),
    //登陆
    LoginView: (data={}) => ({"component": LoginView, "passProps": data}),
    //ssc 游戏详情
    SSC_History: (data) => ({"component": SSC_History, "passProps": data}),
    //11-5 游戏详情
    G_11_5_History: (data) => ({"component": G_11_5_History, "passProps": data}),
    //个人中心页面
    AwardRecord: (data) => ({"name": "AwardRecordView", "component": AwardRecord, "passProps": data}),
    BetRecord: (data) => ({"name": "BetRecordView", "component": BetRecord, "passProps": data}),
    ChaseRecord: (data) => ({"name": "ChaseRecordView", "component": ChaseRecord, "passProps": data}),
    MyMoneyView: (data) => ({"name": "MyMoneyView", "component": MyMoneyView, "passProps": data}),
    InMoneyView: (data) => ({"name": "InMoneyView", "component": InMoneyView, "passProps": data}),
    OuterMoneyView: (data) => ({"name": "OuterMoneyView", "component": OuterMoneyView, "passProps": data}),
    ChangePwd: (data) => ({"name": "ChangePwd", "component": ChangePwd, "passProps": data}),
    CardManageView: (data) => ({"name": "CardManageView", "component": CardManageView, "passProps": data}),
    MsgView: (data) => ({"name": "MailView", "component": MsgView, "passProps": data}),
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
    NoticeDeailView: (data) => ({"component": NoticeDeailView, "passProps": data}),

    MoneyTransferView:(data) => ({"component": MoneyTransferView, "passProps": data}),
    TrendView: (data) => ({"component": TrendView, "passProps": data}),
}


global.G_NavUtil  = {
    pushToView: (data) => {
        Navgator.push(data);
        // InteractionManager.runAfterInteractions(() => {
        //     Navgator.push(data);
        // });
    },
    replace: (data) => {
        Navgator.replace(data);
        // InteractionManager.runAfterInteractions(() => {
        //
        // });
    },
    resetToView: (data) => {
        Navgator.resetTo(data);
        // InteractionManager.runAfterInteractions(() => {
        //
        // });
    },
    pop: () => {
        Navgator.pop()
        // InteractionManager.runAfterInteractions(() => {
        //     Navgator.pop()
        // });

    },
    popN: (n = 1) => {
        Navgator.popN(n)
    },
    popToRoute:(data) => {
        Navgator.popToRoute(data);
        }
    }


global.G_InitRegistApp = false;




