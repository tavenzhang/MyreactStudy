import React from 'react';
import {
    View,
    Text
    , StyleSheet,
    TextInput,
    Picker,
    Alert,
    Keyboard
} from 'react-native';

import BaseView from "../../../componet/BaseView";
import AutoHideKeyBoardView from "../../../componet/AutoHideKeyBoardView";
import {TButton} from "../../../componet/tcustom/button/TButton";
import {TPicker} from "../../../componet/tcustom/picker/TPicker";


export default class MoneyOuterView extends BaseView {
    constructor(props) {
        super(props);
        this.state = {
            money: "",
            pwdText: "",
            pickValue: null,
            dataInfo: null
        };
    }

    renderBody() {
        let contentView = null
        let bankCountView = null;
        if (this.state.pickValue && this.state.dataInfo) {
            let newList = this.state.dataInfo.bank_cards.filter((data) => data.id == this.state.pickValue)
            if (newList.length == 1) {
                bankCountView = (<View style={{flexDirection: "row", marginBottom: 15}}>
                    <View style={styles.trLeft}>
                        <Text style={styles.textLeft}>开卡信息:</Text>
                    </View>
                    <View style={styles.trRight}>
                        <Text
                            style={styles.cellMargin}>{`账户名:${newList[0].account_name}  ${newList[0].province}-${newList[0].city}`}</Text>
                    </View>
                </View>)
            }
        }

        if (this.state.dataInfo) {
            let limitTimes = parseInt(this.state.dataInfo.withdraw_limit_num);
            contentView = <View style={{flex: 2, marginLeft: 30, marginRight: 30}}>
                <View style={{flexDirection: "row"}}>
                    <View style={styles.trLeft}>
                        <Text style={styles.textLeft}>用户名:</Text>
                    </View>
                    <View style={styles.trRight}>
                        <Text style={styles.cellMargin}>{this.state.dataInfo.accounts.username}</Text>
                    </View>
                </View>
                <View style={{flexDirection: "row"}}>
                    <View style={styles.trLeft}>
                        <Text style={styles.textLeft}>可提现次数:</Text>
                    </View>
                    <View style={styles.trRight}>
                        <Text style={styles.cellMargin}>{limitTimes > 0 ? limitTimes : "无限制"}</Text>
                    </View>
                </View>
                <View style={{flexDirection: "row"}}>
                    <View style={styles.trLeft}>
                        <Text style={styles.textLeft}>今日已提现次数:</Text>
                    </View>
                    <View style={styles.trRight}>
                        <Text style={styles.cellMargin}>{this.state.dataInfo.withdraw_num}</Text>
                    </View>
                </View>
                <View style={{flexDirection: "row"}}>
                    <View style={styles.trLeft}>
                        <Text style={styles.textLeft}>可提现金额:</Text>
                    </View>
                    <View style={styles.trRight}>
                        <Text style={styles.cellMargin}>{parseInt(this.state.dataInfo.accounts.withdrawable)}</Text>
                    </View>
                </View>
                <View style={{flexDirection: "row", alignItems: "center"}}>
                    <View style={styles.trLeft}>
                        <Text style={styles.textLeft}>收款银行卡信息:</Text>
                    </View>
                    <View style={styles.trRight}>
                        <TPicker itemStyle={{width:200, height:150}} pickValue={this.state.pickValue}
                                 onValueChange={(data) => {
                                                  this.setState({pickValue: data})
                                      } }
                                 onRenderRow={this.onRenderPickRow}
                        />
                    </View>
                </View>
                {bankCountView}
                <View style={{flexDirection: "row"}}>
                    <View style={styles.trLeft}>
                        <Text style={styles.textLeft}>提现金额:</Text>
                    </View>
                    <View style={[styles.trRight, {
                        alignItems: "center",
                        flexDirection: "row",
                        borderBottomWidth: 0.5,
                        borderColor: G_Theme.gray
                    }]}>
                        <TextInput
                            style={styles.textStyle}
                            onChangeText={(money) => this.setState({money})}
                            value={this.state.money}
                            maxLength={8}
                            placeholder={`${this.state.dataInfo.min_withdraw_amount}起步,不超过${this.state.dataInfo.max_withdraw_amount}`}
                            keyboardType={"numeric"}
                            onSubmitEditing={Keyboard.dismiss}
                        />
                    </View>
                </View>
                <View style={{flexDirection: "row", marginVertical: 5, marginBottom:20}}>
                    <View style={styles.trLeft}>
                        <Text style={styles.textLeft}>资金密码:</Text>
                    </View>
                    <View style={[styles.trRight, {
                        alignItems: "center",
                        flexDirection: "row",
                        borderBottomWidth: 0.5,
                        borderColor: G_Theme.gray
                    }]}>
                        <TextInput
                            style={styles.textStyle}
                            onChangeText={(pwdText) => this.setState({pwdText})}
                            value={this.state.newPwd}
                            maxLength={10}
                            placeholder={`资金密码`}
                            secureTextEntry={true}
                        />
                    </View>
                </View>
                <TButton errMsg={this.checkValid()} btnName={"确认提现"} onPress={this.onFirmClick} containerStyle={{
                    padding: 20,
                    margin: 20,
                }}/>
            </View>
        }

        return (
            <AutoHideKeyBoardView>
                <View style={G_Style.appContentView}>
                    {contentView}
                </View>
            </AutoHideKeyBoardView>
        );
    }

    componentDidMount() {
        G_RunAfterInteractions(()=>{
            ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.MONEY_OUTER_0, (data) => {
                if (data.isSuccess) {
                    if (data.data.bank_cards && data.data.bank_cards.length > 0) {
                        this.setState({dataInfo: data.data, pickValue: data.data.bank_cards[0].id})
                    }
                    else {
                        this.setState({dataInfo: data.data});
                    }
                }
            })
        })
    }

    onRenderPickRow=()=>{
        let view=  this.state.dataInfo.bank_cards.map((item, index) => {
            let name = `${item.account}[${item.bank}]`;
            return (<Picker.Item label={name} value={item.id} key={index + "item"}/>)
        })
        return view;
    }

    checkValid=()=>{
        let errMsg=null;
        if (!this.state.pickValue) {
            errMsg ="请先选择一张收款银行卡";
        }else if (this.state.money.length<=0){
            errMsg ="请输入有效的提现金额";
        }
        else if ((parseInt(this.state.money) < parseInt(this.state.dataInfo.min_withdraw_amount)) || (parseInt(this.state.money) > parseInt(this.state.dataInfo.max_withdraw_amount))) {
            errMsg= "提现金额,不能少于"+this.state.dataInfo.min_withdraw_amount;
        }
        else if(parseInt(this.state.money)>parseInt(this.state.dataInfo.accounts.withdrawable)){
            errMsg="提现次数已经达到最大限制"


        }else if (this.state.pwdText.length<=0){
            errMsg="请输入有效的资金密码"
        }
        return errMsg;
    }

    onFirmClick = () => {

            let newList = this.state.dataInfo.bank_cards.filter((data) => data.id == this.state.pickValue)
            HTTP_SERVER.MONEY_OUTER_1.body.account = newList[0].account;
            HTTP_SERVER.MONEY_OUTER_1.body.id = newList[0].id;
            HTTP_SERVER.MONEY_OUTER_1.body.fund_password = this.state.pwdText;
            HTTP_SERVER.MONEY_OUTER_1.body.amount = this.state.money;
            ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.MONEY_OUTER_1, (data) => {
                if (data.isSuccess) {
                    G_NavUtil.pop();
                }
            })
    }
}


const styles = StyleSheet.create({
    trLeft: {
        alignItems: "flex-end",
        flex: 2,
    },
    trRight: {
        flex: 3
    },
    cellMargin: {
        margin: 5,

    },
    textStyle: {
        width: 180,
        left: 10,
        fontSize: 14,
        height:G_Theme.textInpuntH
    },
    textLeft:{
        color:G_Theme.grayDeep,
        margin: 5,
    }
});
