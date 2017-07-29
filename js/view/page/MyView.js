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
import md5 from "react-native-md5";
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
    agentMoney: "团队帐变",
    agentGame: "游戏记录",
    agentMoneyInOut: "存取明细",
    //系统信息
    aboutSystem:"关于我们"
}

const mapStateToProps = state => {
    return {
        userData: state.get("appState").get("userData").toJS(),
        moneyBalance: state.get("appState").get("moneyBalance"),
        showConfigModel:state.get("appState").get("showConfigModel"),
        storageUser: state.get("appState").get("storageUser").toJS(),
    }
}

@connect(mapStateToProps)
export default class MyView extends BaseView {

    static navigationOptions = ({navigation, screenProps}) => {
        let {userData} = screenProps
        return {
            title: '我的',
            tabBarIcon: ({focused}) =>{
                return <AIcon name='user' style={{fontSize: 25, color: focused ? G_Theme.selectColor : G_Theme.gray}}/>
            },
            headerLeft: <NavButtonText onClick={()=>ActDispatch.AppAct.showConfigModel(true)}  isRightButton={false} name={"设置"} navigation={navigation}/>,
            headerRight: <NavButtonText name={"注销"} navigation={navigation} visible={userData.isLogined}/>
        }
    }
    static dataListRecord = [
        { ico: "file-text",   name: ItemNameEnum.betRecord
        }, {ico: "file-text-o", name: ItemNameEnum.chaseRecode},
        {ico: "money", name: ItemNameEnum.recordMoney},
        {ico: "random", name: ItemNameEnum.recordBack}];

    static dataListRecordAgent = [
        { ico: "file-text",   name: ItemNameEnum.agentGame
        }, {ico: "file-text-o", name: ItemNameEnum.chaseRecode},
        {ico: "money", name: ItemNameEnum.agentMoney},
        {ico: "random", name: ItemNameEnum.recordBack},
        {ico: "gift", name: ItemNameEnum.recordAssignProfit}];

    static dataListMoney = [  {ico: "th-list", name: ItemNameEnum.applyMoney},
        {ico: "exchange", name: ItemNameEnum.myMoney},
        {ico: "credit-card", name: ItemNameEnum.cardMange},
     ];

    static dataListMoeny_Agent = [
        {ico: "th-list", name: ItemNameEnum.agentMoneyInOut},
        {ico: "cny", name: ItemNameEnum.myMoney},
        {ico: "credit-card", name: ItemNameEnum.cardMange},
   ];

    static dataListPerson = [{ico: "lock", name: ItemNameEnum.pwdMange}, {
        ico: "envelope-o",
        name: ItemNameEnum.msgNotice
    }];
    static dataListTopAgent = [{ico: "info-circle", name: ItemNameEnum.agentInfo}, {
        ico: "user-circle",
        name: ItemNameEnum.agentCreate
    }, {ico: "shekel", name: ItemNameEnum.agentAssignMoney},
        {ico: "cubes", name: ItemNameEnum.agentTeam},
        {ico: "book", name: ItemNameEnum.agentProfit}];

    static dataListSystem= [{ico: "info", name: ItemNameEnum.aboutSystem}];

    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
        }
        this.name="MyView";
        this.registOnForceFlush(G_RoutConfig.Main,(data)=>{
            if(!data.isLoginViewBack)
            {
                if(data&&data.mode=="changPwd"){
                    HTTP_SERVER.LOGIN_IN.body.srcPwd=data.pwd;
                    HTTP_SERVER.LOGIN_IN.body.password=md5.hex_md5(md5.hex_md5(md5.hex_md5(HTTP_SERVER.LOGIN_IN.body.username + HTTP_SERVER.LOGIN_IN.body.srcPwd)));
                }
                ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.LOGIN_IN,(data)=>{
                    if (data.isSuccess) {
                        ActDispatch.AppAct.loginReault(data);
                        G_MyStorage.setItem(G_EnumStroeKeys.USR_DATA, JSON.stringify(HTTP_SERVER.LOGIN_IN.body));
                    }
                },true,false,true);
            }
        })
        this.isFlush =false;
    }

    onRightPressed(){
            ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.LOGIN_OUT, () => {
                ActDispatch.AppAct.loginOut();
                this.clearSotoryLogin()
                G_NavUtil.push(G_RoutConfig.LoginView)})
    }


    clearSotoryLogin(){
        let {name,pwd} = this.props.storageUser
        ActDispatch.AppAct.setStorgeUser(name,"");
        let bodyData={};
        bodyData.username = name;
        bodyData.srcPwd = "";
        G_MyStorage.setItem(G_EnumStroeKeys.USR_DATA, JSON.stringify(bodyData));
    }

    componentWillUpdate(){
        let {userData} = this.props;
        super.componentWillUpdate();
        // if(userData.isLogined&&!this.isFlush) {
        //    // TLog("MyView0-----------componentWillUpdate==",G_NavState.routes)
        //      let viewName = G_NavState.routes[G_NavState.routes.length - 1].routeName;
        //    //  TLog("MyView0-----------componentWillUpdate=="+viewName)
        //     if(G_RoutConfig.Main.name ==viewName){
        //         this.isFlush=true
        //         HttpUtil.flushMoneyBalance(this.onCallBack) ;;
        //     }
        // }
    }

    onCallBack=()=>{
        this.isFlush=false
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
                    "我的彩票": MyView.dataListRecordAgent,
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