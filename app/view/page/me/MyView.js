import React from "react";
import {
    View,
    Text
    , StyleSheet,
    ListView,
    TouchableHighlight,
    Alert
} from 'react-native';

import {connect} from 'react-redux';
import AIcon from 'react-native-vector-icons/FontAwesome';
import Button from 'react-native-button';
import BaseView from "../../componet/BaseView";
import {HeaderRightLoginOut} from "../../componet/navBarMenu/HeaderMenu";

let ItemNameEnum = {
    awardFind: "中奖查询",
    betRecord: "投注记录",
    chaseRecode: "追号记录",
    myMoney: "资金明细",
    outerMoney: "账户提现",
    inMoney: "账户充值",
    moneyTransfer: "账户转账",
    pwdMange: "密码管理",
    cardMange: "银行卡管理",
    msgNotice: "消息通知"
}


const mapStateToProps = state => {
    return {
        userData: state.get("appState").get("userData").toJS(),
    }
}

@connect(mapStateToProps)
export default class MyView extends BaseView {
    static dataList1 = [{ico: "star", name: ItemNameEnum.awardFind}, {
        ico: "file-text",
        name: ItemNameEnum.betRecord
    }, {ico: "file-text-o", name: ItemNameEnum.chaseRecode}];

    static dataList2 = [{ico: "cny", name: ItemNameEnum.myMoney}, {ico: "meetup", name: ItemNameEnum.outerMoney}, {
        ico: "money",
        name: ItemNameEnum.inMoney
    },{ico: "credit-card", name: ItemNameEnum.cardMange}];
    static dataList2_Agent = [{ico: "cny", name: ItemNameEnum.myMoney}, {ico: "meetup", name: ItemNameEnum.outerMoney}, {
        ico: "money",
        name: ItemNameEnum.inMoney
    },{
        ico: "exchange",
        name: ItemNameEnum.moneyTransfer
    },{ico: "credit-card", name: ItemNameEnum.cardMange}];

    static dataList3 = [{ico: "lock", name: ItemNameEnum.pwdMange}, {ico: "envelope-o", name: ItemNameEnum.msgNotice}];


    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2,
                sectionHeaderHasChanged: (r1, r2) => r1 !== r2
            }),
        };
    }

    getNavigationBarProps() {
        let {userData} = this.props;
        if (userData.isLogined) {
            return {rightView: HeaderRightLoginOut};
        }
        else {
            return {};
        }
    }

    onRightPressed() {
        ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.LOGIN_OUT, (result) => {
            ActDispatch.AppAct.loginOut();
        })
    }

    renderBody() {
        let {userData} = this.props
        let dataS = {"我的彩票": MyView.dataList1, "账户资金": MyView.dataList2, "个人信息": MyView.dataList3};
        let infoView = null;
        if (userData.isLogined) {
            if(userData.data.user_type==1)//1表示是代理用户 才可以转账
            {
                dataS = {"我的彩票": MyView.dataList1, "账户资金": MyView.dataList2_Agent, "个人信息": MyView.dataList3};
            }
            infoView = <View style={styles.headContent2}>
                <View style={{flexDirection: "row", height: 60}}>
                    <View style={{justifyContent: "space-around", flex: 1, paddingLeft: 10}}>
                        <Text><Text
                            style={styles.titleSyle}>用户名: </Text>{userData.data.username}
                        </Text>
                        <Text ><Text
                            style={styles.titleSyle}>昵称: </Text>{userData.data.nickname}
                        </Text>
                    </View>
                    <View style={{justifyContent: "space-around", flex: 1}}>
                        <Text style={{textAlign: "center", textAlign: "left"}}><Text
                            style={styles.titleSyle}>账户总额: </Text>{parseInt(userData.data.available)}
                        </Text>
                        <Text style={{textAlign: "center", textAlign: "left"}}><Text
                            style={styles.titleSyle}>可提金额: </Text>100
                        </Text>
                    </View>
                </View>
                <View style={{flex: 1, alignItems: "center", flexDirection: "row", paddingLeft: 10}}>
                    <Text style={styles.titleSyle}>账户安全:</Text>
                    <View style={{flexDirection: "row", alignItems: "center", marginLeft: 15, marginRight: 15}}>
                        <AIcon name="id-card-o" style={{color: GlobelTheme.gray, fontSize: 20, marginRight: 5}}/>
                        <Text style={{color: "red"}}>未绑定身份证</Text>
                    </View>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <AIcon name="mobile" style={{color: GlobelTheme.gray, fontSize: 20, marginRight: 5}}/>
                        <Text style={{color: "red"}}>未绑定手机</Text>
                    </View>
                </View>
            </View>
        } else {
            infoView = <View style={styles.headContent}>
                <Text style={{textAlign: "center", lineHeight: 20}}>您还未登录，
                    <Text onPress={this.clickLogin} style={{color: "red"}}>登录</Text>登陆后可查看更多信息
                </Text>
                <View style={[{
                    flexDirection: "row",
                    justifyContent: "center",
                    width: 180,
                    flex: 1,
                    alignItems: "center"
                }]}>
                    <Button
                        containerStyle={{
                            padding: 5,
                            paddingLeft: 20,
                            paddingRight: 20,
                            overflow: 'hidden',
                            borderRadius: 5,
                            backgroundColor: '#d7213c'
                        }}
                        style={{fontSize: 14, color: 'white'}}
                        styleDisabled={{color: '#fff'}}
                        onPress={this.clickLogin}>
                        登录
                    </Button>
                </View>
            </View>
        }
        let ds = this.state.dataSource.cloneWithRowsAndSections(dataS);
        return (
            <View style={[GlobeStyle.appContentView, {backgroundColor: "rgba(230,230,230,0.5)"}]}>
                {infoView}
                <ListView
                    dataSource={ds}
                    renderRow={this._renderRow}
                />
            </View>
        );
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    clickReg = () => {
        NavUtil.pushToView(NavViews.RegView({title: "注册"}));
    }

    clickLogin = () => {
        NavUtil.pushToView(NavViews.LoginView({title: "登陆"}));
    }

    itemClick = (data) => {
        let {userData} = this.props
        if (userData.isLogined) {
            switch (data.name) {
                case ItemNameEnum.awardFind:
                    NavUtil.pushToView(NavViews.AwardRecord({title: data.name}))
                    break;
                case ItemNameEnum.betRecord:
                    NavUtil.pushToView(NavViews.BetRecord({title: data.name}));
                    break;
                case ItemNameEnum.chaseRecode:
                    NavUtil.pushToView(NavViews.ChaseRecord({title: data.name}));
                    break;
                case ItemNameEnum.myMoney:
                    NavUtil.pushToView(NavViews.MyMoneyView({title: data.name}));
                    break;
                case ItemNameEnum.inMoney:
                    NavUtil.pushToView(NavViews.InMoneyView({title: data.name}));
                    break;
                case ItemNameEnum.outerMoney:
                    NavUtil.pushToView(NavViews.OuterMoneyView({
                        title: data.name,
                        money: parseInt(userData.data.available),
                        uid: userData.data.user_id,
                        name:userData.data.username
                    }));
                    break;
                case ItemNameEnum.pwdMange:
                    NavUtil.pushToView(NavViews.ChangePwd({title: data.name,defaultIndex:0}));
                    break;
                case ItemNameEnum.cardMange:
                   if(userData.data.is_set_fund_password)
                   {
                       NavUtil.pushToView(NavViews.CardManageView({title: data.name}));
                   }
                   else{

                       Alert.alert("", "请先设置资金密码", [
                           {text: '设置密码', onPress: this.gotoFoundPwd,style:"destructive"},
                           // {text: '取消',style:"cancel"},
                           {text: '取消',style:"default"}
                       ])
                   }
                    break;
                case ItemNameEnum.msgNotice:
                    NavUtil.pushToView(NavViews.MsgView({title: data.name}));
                    break;
                case ItemNameEnum.moneyTransfer:
                    NavUtil.pushToView(NavViews.MoneyTransferView({
                        title: data.name,
                        money: parseInt(userData.data.available),
                        uid: userData.data.user_id
                    }));
                    break;
            }
        }
        else {
           Alert.alert("", "请先登陆", [
                {text: '登陆', onPress: this.clickLogin,style:"destructive"},
                {text: '取消'}
            ])
        }
    }

    _renderRow = (rowData, section, row) => {
        //第一行 渲染 sectionHead
        let headView = row == 0 ? <View
            style={{
                height: 25,
                borderBottomWidth: 1,
                borderColor: "#ddd",
                backgroundColor: "#ddd",
                justifyContent: "center"
            }}>
            <Text style={{left: 20, fontSize: 15, color: 'gray'}}>{section}</Text>
        </View> : null;
        return (
            <TouchableHighlight onPress={() => this.itemClick(rowData)} underlayColor='rgba(10,10,10,0.2)'>
                <View>
                    {headView}
                    <View style={styles.row}>
                        <View>
                            <View style={{flexDirection: "row", alignItems: "center"}}>
                                <AIcon name={rowData.ico} style={{color: GlobelTheme.gray, fontSize: 20, width: 25}}/>
                                <Text style={{fontSize: 14, left: 20}}>{rowData.name}</Text>
                            </View>
                        </View>
                        <AIcon name="angle-right" style={styles.iconNormal}/>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
    //为了去除section吸附效果 不用此函数
    // _renderSectionHeader = (sectionData, sectionID, row) => {
    //     return (
    //         <View
    //             style={{height:30, borderBottomWidth: 1,borderColor:"#ddd",backgroundColor: "#ddd" ,justifyContent: "center" }}>
    //             <Text style={{left:20,fontSize: 15, color: 'gray'}}>{sectionID}</Text>
    //         </View>
    //     );
    // }
    gotoFoundPwd=()=>{
        NavUtil.pushToView(NavViews.ChangePwd({title:"密码管理",defaultIndex:1}));
    }
}

const styles = StyleSheet.create({
    headContent2: {
        margin: 10,
        height: 100,
        borderRadius: 10,
        borderColor: "#aaa",
        borderWidth: 1,
        justifyContent: "flex-start",
        shadowColor: "gray",
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.6,
    },
    headContent: {
        margin: 10,
        padding: 20,
        paddingBottom: 10,
        height: 100,
        borderRadius: 10,
        borderColor: "#aaa",
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        shadowColor: "gray",
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.6
    },
    titleSyle: {
        fontWeight: "bold",
    },
    textStyle: {
        color: GlobelTheme.gray,
    },
    selectedTextStyle: {
        color: GlobelTheme.primary,
    },
    iconPress: {
        color: GlobelTheme.primary,
        fontSize: 25
    },
    iconNormal: {
        color: GlobelTheme.gray,
        fontSize: 25,
        right: 20
    },
    row: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        height: 40,
        borderBottomColor: "#ddd",
        borderBottomWidth: 1,
        marginLeft: 15
    },

});