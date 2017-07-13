import React from 'react';
import {
    View
    , StyleSheet,
    TouchableOpacity,
    Text, Image,
} from 'react-native';

import AIcon from 'react-native-vector-icons/FontAwesome';
import {TButton} from "../../../componet/tcustom/button/TButton";
import {ItemNameEnum} from "../../MyView";
import {Icon_touxaing} from "../../../../assets/index";
import MyView from "../../MyView";

export class InfoView extends React.PureComponent {


    render() {
        let {userData, moneyBalance} = this.props;
        let infoView = null;
        if (userData.isLogined) {
            infoView = <View style={[styles.headContent]}>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: G_Theme.windowWidth,
                    paddingHorizontal: 60,
                    zIndex: 15,
                    position: "absolute"
                }}>
                    <TouchableOpacity onPress={this.onPushMsgView}>
                        <AIcon name={MyView.dataListPerson[1].ico}
                               style={[styles.IconOperation]}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.onPushPwdView}>
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
                    <View style={{flexDirection: "row", flex: 1, justifyContent: "center"}}>
                        <Text style={[{fontSize: 14, color: G_Theme.grayDeep}]}>奖金组: </Text>
                        <Text style={[{fontSize: 14}]}>{userData.data.user_forever_prize_group} </Text>
                    </View>
                    <View style={{flexDirection: "row", flex: 1, justifyContent: "center"}}>
                        <Text style={{
                            fontSize: 14,
                            color: G_Theme.grayDeep
                        }}>余额:</Text>
                        <Text style={{fontSize: 14,}}>{G_DateUtil.formatMoney(moneyBalance)} </Text>
                        <Text style={{fontSize: 14, color: G_Theme.grayDeep}}>元 </Text>
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
                    <TButton containerStyle={styles.button}
                             onPress={this.clickLogin}
                             btnName={"登陆"}/>
                </View>
        }

        return (<View>{infoView}</View>)
    }

    onPushMsgView = () => {
        G_NavUtil.pushToView(G_NavViews.PersonMailView({
            title: ItemNameEnum.msgNotice,
            defaultIndex: 0
        }))
    }

    onPushPwdView = () => {
        G_NavUtil.pushToView(G_NavViews.PersonPwdView({
            title: ItemNameEnum.pwdMange,
            defaultIndex: 0
        }));
    }

    clickLogin = () => {
        G_NavUtil.pushToView(G_NavViews.LoginView());
    }
}


const styles = StyleSheet.create({
    agentBar: {
        backgroundColor: G_Theme.primary,
        borderRadius: 4,
        padding: 1,
        paddingHorizontal: 5,
        justifyContent: "center",
        alignItems: "center"
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
})