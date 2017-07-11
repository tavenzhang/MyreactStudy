import React from "react";
import {
    View,
    Text
    , StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';
import AIcon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import BaseView from "../componet/BaseView";
import AcountListView from "./me/subView/AcountListView";
import ConfigView from "./home/subview/ConfigView";
import {TButton} from "../componet/tcustom/button/TButton";
import {NavButtonText} from "../componet/navBarMenu/HeaderMenu";
import {Icon_touxaing} from "../../assets/index";

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
    agentInfo: "代理中心",
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
    static navigationOptions = ({navigation, screenProps}) => {
        let {userData} = screenProps
        return {
            title: '我的',
            tabBarIcon: ({focused}) => {
                return <AIcon name='user' style={{fontSize: 25, color: focused ? G_Theme.selectColor : G_Theme.gray}}/>
            },
            headerLeft: <NavButtonText isRightButton={false} name={"设置"} navigation={navigation}/>,
            headerRight: <NavButtonText name={"注销"} navigation={navigation} visible={userData.isLogined}/>
        }
    }

    static dataListRecord = [
        {
            ico: "file-text",
            name: ItemNameEnum.betRecord
        }, {ico: "file-text-o", name: ItemNameEnum.chaseRecode}];

    static dataListMoney = [{ico: "exchange", name: ItemNameEnum.myMoney}, {ico: "credit-card", name: ItemNameEnum.cardMange}];
    static dataListMoeny_Agent = [
        {ico: "cny", name: ItemNameEnum.myMoney},
        //     {
        //     ico: "meetup",
        //     name: ItemNameEnum.outerMoney
        // },
        //     {
        //     ico: "money",
        //     name: ItemNameEnum.inMoney
        // },
        //     {
        //     ico: "exchange",
        //     name: ItemNameEnum.moneyTransfer
        // },
        {ico: "credit-card", name: ItemNameEnum.cardMange}];

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

    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
        }
    }

    onLeftPressed() {
        this.setState({modalVisible: true});
    }

    onRightPressed() {
        ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.LOGIN_OUT, () => {
            ActDispatch.AppAct.loginOut();
            if (G_PLATFORM_IOS) {

                G_NavUtil.pushToView(G_NavViews.LoginView())
            } else {
                setTimeout(() => {
                    G_NavUtil.pushToView(G_NavViews.LoginView())
                }, 500)
            }

        })
    }


    renderBody() {
        let {userData, moneyBalance} = this.props;
        let dataList = {
            "我的彩票": MyView.dataListRecord,
            "账户资金": MyView.dataListMoney,
            // "个人信息": MyView.dataListPerson
        };
        let infoView = null;
        if (userData.isLogined) {
            //0：palyer 1：agent 2：topAgent
            if (userData.data.user_type == 1 || userData.data.user_type == 2)//1表示是代理用户 才可以转账
            {
                dataList = {
                    "代理中心": MyView.dataListTopAgent,
                    "我的彩票": MyView.dataListRecord,
                    "账户资金": MyView.dataListMoeny_Agent,
                    // "个人信息": MyView.dataListPerson
                };
            }
            infoView = <View style={[styles.headContent]}>
                <View style={{flexDirection: "row", justifyContent: "space-between", width:G_Theme.windowWidth, paddingHorizontal:60, zIndex:15, position:"absolute"}}>
                    <TouchableOpacity underlayColor={G_Theme.gray}
                                        onPress={() => {
                                            G_NavUtil.pushToView(G_NavViews.PersonMailView({
                                                title: ItemNameEnum.msgNotice,
                                                defaultIndex: 0

                                            }));
                                        }}>
                        <AIcon name={MyView.dataListPerson[1].ico}
                               style={[styles.IconOperation]}/>
                    </TouchableOpacity>
                    <TouchableOpacity underlayColor={G_Theme.gray} onPress={() => {
                        G_NavUtil.pushToView(G_NavViews.PersonPwdView({
                            title: ItemNameEnum.pwdMange,
                            defaultIndex: 0
                        }));
                    }}>
                        <AIcon name={MyView.dataListPerson[0].ico}
                               style={styles.IconOperation}/>
                    </TouchableOpacity>
                </View>
                <View style={[styles.rowSp, {paddingTop: 10}]}>
                    <View style={styles.touxiang}>
                        <Image style={styles.IconTouxiang} source={Icon_touxaing}/>
                    </View>
                </View>
                <View style={[styles.rowSp,]}>
                    <Text >{userData.data.nickname}</Text>
                    <View style={styles.agentBar}>
                        <Text style={styles.agentText}>
                            {userData.data.user_type > 0 ? "代理" : "玩家"}
                        </Text>
                    </View>
                </View>
                <View style={[styles.rowSp]}>
                    <Text style={[{fontSize: 12}]}>账号:{userData.data.username}</Text>
                </View>
                <View style={styles.rowSp}>
                    {/*<View style={{flexDirection: "row", height: 50, alignItems: "center",}}>*/}
                    <View style={{flexDirection: "row", flex: 1, justifyContent:"center"}}>
                        <Text style={[{fontSize: 14, color: G_Theme.grayDeep}]}>奖金组: </Text>
                        <Text style={[{fontSize: 14}]}>{userData.data.user_forever_prize_group} </Text>
                    </View>
                    <View style={{flexDirection: "row", flex: 1,justifyContent:"center"}}>
                        <Text style={{
                            fontSize: 14,
                            color: G_Theme.grayDeep
                        }}>余额:</Text>
                        <Text style={{fontSize: 14,}}>{G_DateUtil.formatMoney(moneyBalance)} </Text>
                        <Text style={{fontSize: 14, color: G_Theme.grayDeep}}>元 </Text>
                        {/*</View>*/}
                    </View>
                </View>

                <View style={[styles.rowSp, {
                    alignItems: 'flex-end',
                    borderTopColor: G_Theme.gray,
                    borderTopWidth: 1,
                }]}>
                    <View style={[styles.commonBar]}>

                        <TouchableOpacity onPress={() => {
                            G_NavUtil.pushToView(G_NavViews.MoneyInView());
                        }}>
                            <View style={{flexDirection: "row",}}>
                                <AIcon name={"cny"}
                                       style={styles.commonIcon}/>
                                <Text style={styles.commonText}>充值</Text>

                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.commonBar, {
                        borderLeftWidth: 1,
                    }]}>
                        <TouchableOpacity onPress={() => {
                            G_NavUtil.pushToView(G_NavViews.MoneyOuterView());
                        }}>
                            <View style={{flexDirection: "row",}}>
                                <AIcon name={"money"}
                                       style={styles.commonIcon}/>
                                <Text style={styles.commonText}>提现</Text>

                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.commonBar, {
                        borderLeftWidth: 1,
                    }]}>
                        <TouchableOpacity onPress={() => {
                            G_NavUtil.pushToView(G_NavViews.MoneyTransferView({
                                title: '转账',
                                money: moneyBalance,
                                // uid: userData.data.user_id,
                                username: userData.data.username
                            }));
                        }}>
                            <View style={{flexDirection: "row",}}>
                                <AIcon name={"exchange"}
                                       style={styles.commonIcon}/>
                                <Text style={styles.commonText}>转账</Text>

                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        } else {
            infoView =
                <View style={[styles.headContent, {justifyContent: "center", height: userData.isLogined ? 170 : 100}]}>
                    <Text style={{textAlign: "center", lineHeight: 20}}>您还未登陆，
                        <Text onPress={this.clickLogin} style={{color: "red"}}>登陆</Text>后可查看更多信息
                    </Text>
                    <TButton
                        containerStyle={styles.button}
                        onPress={this.clickLogin}
                        btnName={"登陆"}/>
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

    setModalVisible = (visible) => {
        this.setState({modalVisible: visible});
    }

    componentDidMount() {
        this.isLogin = this.props.userData.isLogined;
        this.props.navigation.setParams({isLogined: this.isLogin})
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