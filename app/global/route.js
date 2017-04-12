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
import Fast3Notice from "../view/page/award/subView/Fast3Notice";
import ADView from "../view/page/home/subview/ADView";
import AddCardView from "../view/page/me/subView/cardManage/AddCardView";
import BetDetailView from "../view/page/me/subView/betRecord/BetDetailView";
import ChaseDeatilView from "../view/page/me/subView/betRecord/ChaseDeatilView";
import MessageDetail from "../view/page/me/subView/message/MessageDetail";
import NoticeDeailView from "../view/page/notice/noticeDetail/NoticeDeailView";
import SD11Choose5 from "../view/page/home/subview/games/SD11Choose5";
import DelCardView from "../view/page/me/subView/cardManage/DelCardView";
import EditCardView from "../view/page/me/subView/cardManage/EditCardView";
import AddValidView from "../view/page/me/subView/cardManage/AddValidView";
import EditCardAddView from "../view/page/me/subView/cardManage/EditCardAddView";
import MoneyTransferView from "../view/page/me/subView/MoneyTransferView";


// PushFromLeft
// FloatFromRight
// FloatFromLeft
// FloatFromBottom
// FloatFromBottomAndroid
// FadeAndroid
// HorizontalSwipeJump
// HorizontalSwipeJumpFromRight
// VerticalUpSwipeJump
// VerticalDownSwipeJump
global.Navgator = null;

let navigator;
//  sceneAnimation: Navigator.SceneConfigs.FloatFromBottom
//跳转页面集中控制 方便管理 和自定义动画

let NavViews = {
    ADView: (data) => ({"component": ADView, "passProps": data}),
    //tab页面
    TabbarView: () => ({component: TabbarView}),
    //登陆
    LoginView: (data) => ({"component": LoginView, "passProps": data}),
    //快3游戏通知
    Fast3Notice: (data) => ({"component": Fast3Notice, "passProps": data}),
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
    //游戏玩法
    SD11Choose5: (data) => ({"component": SD11Choose5, "passProps": data}),
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

    MoneyTransferView:(data) => ({"component": MoneyTransferView, "passProps": data})


}


global.NavViews = NavViews;


const NavUtil = {
    pushToView: (data) => {
        InteractionManager.runAfterInteractions(() => {
            Navgator.push(data);
        });
    },
    replace: (data) => {
        InteractionManager.runAfterInteractions(() => {
            Navgator.replace(data);
        });
    },
    resetToView: (data) => {
        InteractionManager.runAfterInteractions(() => {
            Navgator.resetTo(data);
        });
    },
    pop: () => {
        InteractionManager.runAfterInteractions(() => {
            Navgator.pop()
        });

    },
    popN: (n = 1) => {
        InteractionManager.runAfterInteractions(() => {
            Navgator.popN(n)
        });
    },
     popToRoute:(data) => {
            InteractionManager.runAfterInteractions(() => {
                Navgator.popToRoute(data);
            });
        }
    }
    global.NavUtil = NavUtil





