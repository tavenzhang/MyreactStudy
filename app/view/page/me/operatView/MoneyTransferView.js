import React from 'react';
import {
    View,
    Text
    , StyleSheet,
    TextInput,
    Alert
} from 'react-native';
import DropListComponet from "../../../componet/DropListComponet";

import Button from 'react-native-button'
import BaseView from "../../../componet/BaseView";
import AutoHideKeyBoardView from "../../../componet/AutoHideKeyBoardView";

export default class MoneyTransferView extends BaseView {
    constructor(props) {
        super(props);
        this.state = {
            pwdText: "",
            agentCount: "",
            cardNum: "",
            money: "",
            dropDataList: [],
            dropSelectItem: null,
        };
    }
componentWillMount(){
    const {passProps} = this.props;
    this.setState({agentCount:passProps.username});

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
                            <TextInput
                                style={styles.textStyle}
                                onChangeText={(agentCount) => this.setState({agentCount})}
                                value={this.state.agentCount}
                                placeholder={"直属下级(代理或玩家)"}
                                keyboardType={"default"}
                                autoCapitalize={"none"}
                                underlineColorAndroid={'transparent'}

                            />
                        </View>
                        <View style={styles.inputContain}>
                            <Text>转账金额:</Text>
                            <TextInput
                                style={styles.textStyle}
                                onChangeText={(money) => this.setState({money})}
                                value={this.state.money}
                                maxLength={20}
                                placeholder={"转账金额"}
                                keyboardType={"numeric"}
                                underlineColorAndroid={'transparent'}
                            />
                        </View>
                        <View style={styles.inputContain}>
                            <Text>资金密码:</Text>
                            <TextInput
                                style={styles.textStyle}
                                onChangeText={(pwdText) => this.setState({pwdText})}
                                value={this.state.pwdText}
                                maxLength={8}
                                placeholder={"资金密码"}
                                secureTextEntry={true}
                                underlineColorAndroid={'transparent'}
                            />
                        </View>
                        <View style={styles.inputContain}>
                            <Text>安全验证:</Text>
                            <DropListComponet
                                itemName={this.state.dropSelectItem ? this.state.dropSelectItem.name : "请选择转账银行卡"}
                                dataList={this.state.dropDataList}
                                onSelect={(idx, value) => {
                                    TLog("DropListComponet----select--", value);
                                    this.setState({dropSelectItem: value});
                                }}/>

                        </View>
                        <View style={styles.inputContain}>
                            <TextInput
                                style={styles.textStyle}
                                onChangeText={(cardNum) => this.setState({cardNum})}
                                value={this.state.cardNum}
                                maxLength={20}
                                keyboardType={"numeric"}
                                placeholder={"请输入验证银行卡完整卡号"}
                                underlineColorAndroid={'transparent'}
                            />
                        </View>
                        <Button
                            containerStyle={{
                                padding: 5,
                                margin: 10,
                                overflow: 'hidden',
                                borderRadius: 3,
                                backgroundColor: '#d7213c'
                            }}
                            style={{fontSize: 14, color: "white"}}
                            styleDisabled={{color: '#fff'}}
                            onPress={this.onConfirmClick}>
                            确认转账
                        </Button>
                    </View>
                </View>
            </AutoHideKeyBoardView>
        );
    }

    componentDidMount() {
        G_RunAfterInteractions(()=>{
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

    onConfirmClick = () => {
        const {passProps} = this.props;
        if (this.state.dropSelectItem == null) {
            Alert.alert("", "请选择一张验证的银行卡", []);
        } else if (this.state.agentCount.length <= 0) {
            Alert.alert("", "请入收款账号", []);
        }
        else if (this.state.money.length <= 0) {
            Alert.alert("", "请入转账金额", []);
        }
        else if (this.state.pwdText.length <= 0) {
            Alert.alert("", "请入资金密码", []);
        }
        else if (this.state.cardNum.length <= 0) {
            Alert.alert("", "请入银行卡卡号", []);
        }
        else if (parseInt(passProps.money) < parseInt(this.state.money)) {
            Alert.alert("", "转账金额不能大于账户余额", []);
        }
        else {
            HTTP_SERVER.TRANSFER_SUB_MINT.body.fund_password = this.state.pwdText;
            HTTP_SERVER.TRANSFER_SUB_MINT.body.card_id = this.state.dropSelectItem.id;
            HTTP_SERVER.TRANSFER_SUB_MINT.body.amount = this.state.agentCount;
            HTTP_SERVER.TRANSFER_SUB_MINT.body.card_number = this.state.cardNum;
            ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.TRANSFER_SUB_MINT, (result) => {
                if (result.isSuccess) {
                    G_NavUtil.pop();
                }

            })
        }
    }
}


const styles = StyleSheet.create({
    textStyle: {
        width: 150,
        left: 10,
        fontSize: 14,
        height:G_Theme.textInpuntH
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
