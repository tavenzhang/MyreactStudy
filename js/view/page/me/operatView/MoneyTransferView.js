import React from 'react';
import {
    View,
    Text
    , StyleSheet,
    TextInput,
    Alert
} from 'react-native';
import TDropListComponet from "../../../componet/TDropListComponet";

import BaseView from "../../../componet/BaseView";
import AutoHideKeyBoardView from "../../../componet/AutoHideKeyBoardView";
import {TTextInput} from "../../../componet/tcustom/textInput/TTextInput";
import {TButton} from "../../../componet/tcustom/button/TButton";

export default class MoneyTransferView extends BaseView {
    constructor(props) {
        super(props);
        let agentName="";
        if(this.props.passProps&&this.props.passProps.username)
        {
            agentName=this.props.passProps.username;
        }
        this.state = {
            pwdText: "",
            agentCount: "",
            cardNum: "",
            money: "",
            dropDataList: [],
            dropSelectItem: null,
        };
    }



    renderBody() {
        const {passProps} = this.props;
        return (
            <AutoHideKeyBoardView>
                <View style={G_Style.appView}>
                    <View style={{flex: 1, marginLeft: 40, marginRight: 40, marginTop: 40}}>
                        <View style={styles.inputContain}>
                            <Text>账户余额: {parseInt(passProps.money)}</Text>
                        </View>
                        <View style={styles.inputContain}>
                            <Text>收款账号:</Text>
                            <TTextInput
                                style={styles.textStyle}
                                onChangeText={(agentCount) => this.setState({agentCount})}
                                value={this.state.agentCount}
                                placeholder={"直属下级(代理或玩家)"}
                            />
                        </View>
                        <View style={styles.inputContain}>
                            <Text>转账金额:</Text>
                            <TTextInput
                                style={styles.textStyle}
                                onChangeText={(money) => this.setState({money})}
                                value={this.state.money}
                                maxLength={20}
                                placeholder={"(不能大于账号余额)"}
                            />
                        </View>
                        <View style={styles.inputContain}>
                            <Text>资金密码:</Text>
                            <TTextInput
                                style={styles.textStyle}
                                onChangeText={(pwdText) => this.setState({pwdText})}
                                value={this.state.pwdText}
                                maxLength={8}
                                placeholder={"资金密码"}
                                secureTextEntry={true}
                            />
                        </View>
                        <View style={styles.inputContain}>
                            <Text>安全验证:</Text>
                            <TDropListComponet
                                itemName={this.state.dropSelectItem ? this.state.dropSelectItem.name : "请选择转账银行卡"}
                                dataList={this.state.dropDataList}
                                onSelect={(idx, value) => {
                                    this.setState({dropSelectItem: value});
                                }}/>

                        </View>
                        <View style={styles.inputContain}>
                            <TTextInput style={styles.textStyle} onChangeText={(cardNum) => this.setState({cardNum})}
                                        value={this.state.cardNum} keyboardType={"numeric"} maxLength={20}
                                        placeholder={"请输入验证银行卡完整卡号"}
                            />
                        </View>
                        <TButton errMsg={this.onDataValid()} btnName={"确认转账"} containerStyle={{
                            padding: 5,
                            margin: 20,
                        }} onPress={this.onConfirmClick}
                        />

                    </View>
                </View>
            </AutoHideKeyBoardView>
        );
    }

    componentDidMount() {
        G_RunAfterInteractions(() => {
            HTTP_SERVER.TRANSFER_GETINFO.url = HTTP_SERVER.TRANSFER_GETINFO.formatUrl.replace("#id", this.props.passProps.uid);
            ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.TRANSFER_GETINFO, (result) => {
                let dataList = result.data.aBankCards.map((item) => {
                    item.name = item.account + `[${item.bank}]`;
                    return item
                })
                this.setState({dropDataList: dataList});
            });
        })
    }

    onDataValid =()=>{
      let errMsg=null;
      const {passProps} = this.props;
      if (this.state.dropSelectItem == null) {
          errMsg ="请选择一张验证的银行卡";
      } else if (this.state.agentCount.length <= 0) {
          errMsg ="请入收款账号";
      }
      else if (this.state.money.length <= 0) {
        errMsg ="请入转账金额";
      }
      else if (this.state.pwdText.length <= 0) {
         errMsg ="请入资金密码";
      }
      else if (this.state.cardNum.length <= 0) {
          errMsg ="请入银行卡卡号";
      }
      else if (parseInt(passProps.money) < parseInt(this.state.money)) {
          errMsg ="转账金额不能大于账户余额";
      }
      return errMsg;
  }

    onConfirmClick = () => {

            HTTP_SERVER.TRANSFER_SUB_MINT.body.fund_password = this.state.pwdText;
            HTTP_SERVER.TRANSFER_SUB_MINT.body.card_id = this.state.dropSelectItem.id;
            HTTP_SERVER.TRANSFER_SUB_MINT.body.username = this.state.agentCount;
            HTTP_SERVER.TRANSFER_SUB_MINT.body.card_number = this.state.cardNum;
            HTTP_SERVER.TRANSFER_SUB_MINT.body.amount = this.state.money
            ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.TRANSFER_SUB_MINT, (result) => {
                if (result.isSuccess) {
                    G_NavUtil.pop();
                }
            })
    }
}


const styles = StyleSheet.create({
    textStyle: {
        width: 150,
        left: 10,
    },
    iconUser: {
        color: G_Theme.gray,
        fontSize: 18,
    },
    icoPwd: {
        color: G_Theme.gray,
        fontSize: 20,
    },
    inputContain: {
        paddingBottom: 5,
        marginBottom: 10,
        marginTop: 10,
        paddingLeft: 5,
        flexDirection: "row",
        height: 30,
        justifyContent: "flex-start",
        alignItems: "center",
        borderColor: 'gray',
        borderBottomWidth: 0.2
    }

});
