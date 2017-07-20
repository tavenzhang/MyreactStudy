import React from "react";
import {
    View,
    StyleSheet,
} from 'react-native';
import AIcon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import BaseView from "../componet/BaseView";
import AcountListView from "./me/subView/AcountListView";
import {NavButtonText} from "../componet/navBarMenu/HeaderMenu";
import ConfigView from "./home/subview/ConfigView";
import {InfoView} from "./me/subView/InfoView";

export let ItemNameEnum = {
    //我的彩票
    awardFind: "中奖查询",
    betRecord: "投注记录",
    chaseRecode: "追号记录",
    recordBack:"返点记录",
    recordAssignProfit:"分红记录",
    recordMoney:"账变记录",
    //资金管理
    myMoney: "资金明细",
    outerMoney: "账户提现",
    inMoney: "账户充值",
    moneyTransfer: "账户转账",
    cardMange: "银行卡管理",
    applyMoney:"充提申请",
    // 个人信息
    pwdMange: "密码管理",
    msgNotice: "消息通知",
    //代理中心
    agentInfo: "代理中心",
    agentCreate: "账号开户",
    agentAssignMoney: "高点配额",
    agentTeam: "团队管理",
    agentProfit: "盈亏报表",
    //系统信息
    aboutSystem:"关于我们"
}

const mapStateToProps = state => {
    return {
        userData: state.get("appState").get("userData").toJS(),
        moneyBalance: state.get("appState").get("moneyBalance"),
        showConfigModel:state.get("appState").get("showConfigModel"),
    }
}

@connect(mapStateToProps)
export default class MyView extends BaseView {

    static navigationOptions = ({navigation, screenProps}) => {
        let {userData} = screenProps
        return {
            title: '我的',
            tabBarIcon: ({focused}) => {
                return <AIcon name='user' style={{fontSize: 25, color: focused ? G_Theme.selectColor : G_Theme.gray}}/>
            },
            headerLeft: <NavButtonText onClick={()=>ActDispatch.AppAct.showConfigModel(true)}  isRightButton={false} name={"设置"} navigation={navigation}/>,
            headerRight: <NavButtonText onClick={()=>{
                ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.LOGIN_OUT, () => {
                    ActDispatch.AppAct.loginOut();
                    G_NavUtil.push(G_RoutConfig.LoginView);
                })
            }}  name={"注销"} navigation={navigation} visible={userData.isLogined}/>
        }
    }

    static dataListRecord = [
        { ico: "file-text",   name: ItemNameEnum.betRecord
        }, {ico: "file-text-o", name: ItemNameEnum.chaseRecode},
        {ico: "money", name: ItemNameEnum.recordMoney},
        {ico: "random", name: ItemNameEnum.recordBack},
        {ico: "gift", name: ItemNameEnum.recordAssignProfit}];

    static dataListMoney = [{ico: "exchange", name: ItemNameEnum.myMoney}, {ico: "credit-card", name: ItemNameEnum.cardMange},
        {ico: "th-list", name: ItemNameEnum.applyMoney}];
    static dataListMoeny_Agent = [
        {ico: "cny", name: ItemNameEnum.myMoney},
        {ico: "credit-card", name: ItemNameEnum.cardMange},
        {ico: "th-list", name: ItemNameEnum.applyMoney}];

    static dataListPerson = [{ico: "lock", name: ItemNameEnum.pwdMange}, {
        ico: "envelope-o",
        name: ItemNameEnum.msgNotice
    }];
    static dataListTopAgent = [{ico: "info-circle", name: ItemNameEnum.agentInfo}, {
        ico: "user-circle",
        name: ItemNameEnum.agentCreate
    }, {ico: "shekel", name: ItemNameEnum.agentAssignMoney}, {ico: "cubes", name: ItemNameEnum.agentTeam}, {
        ico: "book",
        name: ItemNameEnum.agentProfit
    }];

    static dataListSystem= [{ico: "info", name: ItemNameEnum.aboutSystem}];

    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
        }
        this.name="MyView";
    }



    renderBody() {
        let {userData,showConfigModel} = this.props;
        let dataList = {
            "我的彩票": MyView.dataListRecord,
            "账户资金": MyView.dataListMoney,
            "系统信息": MyView.dataListSystem
        }
        if (userData.isLogined) {

            if (userData.data.user_type == 1 || userData.data.user_type == 2)//1表示是代理用户 才可以转账
            {
                dataList = {
                    "代理中心": MyView.dataListTopAgent,
                    "我的彩票": MyView.dataListRecord,
                    "账户资金": MyView.dataListMoeny_Agent,
                    "系统信息": MyView.dataListSystem
                };
            }
        }
        return (
            <View style={[G_Style.appContentView, {backgroundColor: "rgba(230,230,230,0.5)"}]}>
                <InfoView {...this.props}/>
                <ConfigView modalVisible={showConfigModel} setModalVisible={this.setModalVisible}/>
                <AcountListView dataList={dataList} userData={userData}/>
            </View>
        );
    }

    setModalVisible=(visible)=>{
        ActDispatch.AppAct.showConfigModel(visible);
    }

}

const styles = StyleSheet.create({
    agentBar: {
        backgroundColor: G_Theme.primary,
        borderRadius: 4,
        padding: 1,
        paddingHorizontal: 5,
        justifyContent:"center",
        alignItems:"center"
    },
    agentText: {color: '#fff', fontSize: 12, textAlign: 'center',},
    // username: {fontSize: 18,},

    commonBar: {borderColor: G_Theme.gray, alignItems: 'center', flex: 1,},
    commonText: {
        fontSize: 16,
        // color: G_Theme.grayDeep,
        marginLeft: 5,
    },
    commonIcon: {
        fontSize: 16,
        alignSelf: "center",
        color: G_Theme.primary
    },
    touxiang: {
        flex: 1, height: 70, alignItems: 'center'
    },
    IconTouxiang: {
        width: 50,
        height: 50,
        margin: 5,
        borderRadius: 25,
    },
    operationPannel: {
        // zIndex: 11,
        // position: 'absolute',
        // top: 3,

    },
    Operation: {
        zIndex: 11,
        position: 'absolute',
        top: 3,
    },
    IconOperation: {
        fontSize: 25,
        alignSelf: "center",
        color: G_Theme.primary,

    },
    headContent: {
        margin: 10,
        height: 170,
        elevation: 2,
        // justifyContent: "center",
    },
    rowSp: {
        flexDirection: "row",
        // justifyContent: "space-around",
        alignItems: "center",
        alignSelf: "center",
        flex: 1
    },

    button: {
        width: 100,
        padding: 5,
        marginTop: 10,
        borderRadius: 5,
        backgroundColor: '#d7213c',
        alignSelf: "center"
    }
});