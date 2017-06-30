import React from "react";
import {
    View,
    Text
    , StyleSheet,
} from 'react-native';
import AIcon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import Button from 'react-native-button';
import BaseView from "../componet/BaseView";
import AcountListView from "./me/subView/AcountListView";
import ConfigView from "./home/subview/ConfigView";
import {TButton} from "../componet/tcustom/button/TButton";
import {NavButtonText} from "../componet/navBarMenu/HeaderMenu";

export let ItemNameEnum = {
    //我的彩票
    awardFind: "中奖查询",
    betRecord: "投注记录",
    chaseRecode: "追号记录",
    //资金管理
    myMoney: "资金明细",
    outerMoney: "账户提现",
    inMoney: "账户充值",
    moneyTransfer: "账户转账",
    cardMange: "银行卡管理",
    // 个人信息
    pwdMange: "密码管理",
    msgNotice: "消息通知",
    //代理中心
    agentInfo: "代理信息",
    agentCreate: "账号开户",
    agentAssignMoney: "高点配额",
    agentTeam: "团队管理",
    agentProfit: "盈亏报表",
}

const mapStateToProps = state => {
    return {
        userData: state.get("appState").get("userData").toJS(),
        moneyBalance: state.get("appState").get("moneyBalance"),
    }
}

@connect(mapStateToProps)
export default class MyView extends BaseView {
    static navigationOptions = ({navigation,screenProps})=> {
        let {userData}=screenProps
        return {
        title: '我的',
        tabBarIcon: ({focused}) => {
            return <AIcon name='user' style={{ fontSize: 25, color:focused ? G_Theme.selectColor:G_Theme.gray}}/>
        },
        headerLeft:<NavButtonText isRightButton={false} name={"设置"} navigation={navigation}/>,
        headerRight: <NavButtonText name={"注销"} navigation={navigation} visible={userData.isLogined}/>
    }}

    static dataListRecord = [{ico: "star", name: ItemNameEnum.awardFind}, {
        ico: "file-text",
        name: ItemNameEnum.betRecord
    }, {ico: "file-text-o", name: ItemNameEnum.chaseRecode}];

    static dataListMoney = [{ico: "cny", name: ItemNameEnum.myMoney}, {ico: "meetup", name: ItemNameEnum.outerMoney}, {
        ico: "money",
        name: ItemNameEnum.inMoney
    }, {ico: "credit-card", name: ItemNameEnum.cardMange}];
    static dataListMoeny_Agent = [{ico: "cny", name: ItemNameEnum.myMoney}, {
        ico: "meetup",
        name: ItemNameEnum.outerMoney
    }, {
        ico: "money",
        name: ItemNameEnum.inMoney
    }, {
        ico: "exchange",
        name: ItemNameEnum.moneyTransfer
    }, {ico: "credit-card", name: ItemNameEnum.cardMange}];

    static dataListPerson = [{ico: "lock", name: ItemNameEnum.pwdMange}, {
        ico: "envelope-o",
        name: ItemNameEnum.msgNotice
    }];
    static dataListTopAgent = [{ico: "info-circle", name: ItemNameEnum.agentInfo}, {
        ico: "user-circle",
        name: ItemNameEnum.agentCreate
    }, {ico: "shekel", name: ItemNameEnum.agentAssignMoney},{ico: "cubes", name: ItemNameEnum.agentTeam}, {ico: "book", name: ItemNameEnum.agentProfit}];

    constructor(props)
    {
        super(props)
        this.state={
            modalVisible: false,
        }
    }

    onLeftPressed() {
          this.setState({modalVisible: true});
    }

    onRightPressed() {
        ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.LOGIN_OUT, () => {
            ActDispatch.AppAct.loginOut();
            G_NavUtil.pushToView(G_NavViews.LoginView())
        })
    }


    renderBody() {
        let {userData, moneyBalance} = this.props;
        let dataList = {
            "我的彩票": MyView.dataListRecord,
            "账户资金": MyView.dataListMoney,
            "个人信息": MyView.dataListPerson
        };
        let infoView = null;
        if (userData.isLogined) {
            //0：palyer 1：agent 2：topAgent
            if (userData.data.user_type == 1||userData.data.user_type == 2)//1表示是代理用户 才可以转账
            {
                dataList = {
                    "代理中心": MyView.dataListTopAgent,
                    "我的彩票": MyView.dataListRecord,
                    "账户资金": MyView.dataListMoeny_Agent,
                    "个人信息": MyView.dataListPerson
                };
            }
            infoView = <View style={[styles.headContent]}>
                    <View style={styles.rowSp}>
                        <Text><Text
                            style={styles.titleSyle}>用户名: </Text>{userData.data.username}
                        </Text>
                        <Text><Text
                            style={styles.titleSyle}>昵称: </Text>{userData.data.nickname}
                        </Text>
                    </View>
                    <View style={styles.rowSp}>
                        <Text><Text
                            style={styles.titleSyle}>账户总额: </Text>{parseInt(moneyBalance)}
                        </Text>
                        <Text style={{textAlign: "center"}}><Text
                            style={styles.titleSyle}>资金密码: </Text>{userData.data.is_set_fund_password ? "已设置" : "未设置"}
                        </Text>
                    </View>
                    <View style={styles.rowSp}>
                        <Text><Text
                            style={styles.titleSyle}>用户类型: </Text>{userData.data.user_type>0 ? "代理":"玩家"}
                        </Text>
                        <Text><Text
                            style={styles.titleSyle}>未读消息: </Text>{userData.data.unread_msg_count}
                        </Text>
                    </View>
            </View>
        } else {
            infoView = <View style={styles.headContent}>
                <Text style={{textAlign: "center", lineHeight: 20}}>您还未登陆，
                    <Text onPress={this.clickLogin} style={{color: "red"}}>登陆</Text>后可查看更多信息
                </Text>
                <Button
                    containerStyle={styles.button}
                    style={{fontSize: 14, color: 'white'}}
                    styleDisabled={{color: '#fff'}}
                    onPress={this.clickLogin}>
                    登陆
                </Button>
            </View>
        }
        return (
            <View style={[G_Style.appContentView, {backgroundColor: "rgba(230,230,230,0.5)"}]}>
                <ConfigView modalVisible={this.state.modalVisible} setModalVisible={this.setModalVisible}/>
                {infoView}
                <AcountListView dataList={dataList} userData={userData}/>
            </View>
        );
    }

    clickLogin = () => {
            G_NavUtil.pushToView(G_NavViews.LoginView());
    }

    setModalVisible=(visible)=> {
        this.setState({modalVisible: visible});
    }

    componentDidMount() {
        this.isLogin=this.props.userData.isLogined;
        this.props.navigation.setParams({isLogined:this.isLogin})
    }

}

const styles = StyleSheet.create({
    headContent: {
        margin: 10,
        height: 80,
        borderRadius: 10,
        borderColor: "#aaa",
        borderWidth: 1,
        shadowColor: "gray",
        elevation: 2,
        justifyContent: "center",
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.6
    },
    rowSp:{
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        flex: 1
    },
    titleSyle: {
        fontWeight: "bold",
    },
    button: {
        width: 100,
        padding: 5,
        marginTop: 10,
        borderRadius: 5,
        backgroundColor: '#d7213c',
        alignSelf:"center"
    }
});