import React from 'react';
import {
    View,
    Text, StyleSheet,
    TextInput,
    Alert
} from 'react-native';
import BaseView from "../../../../componet/BaseView";
import Button from "react-native-button";
import ModalDropdown from 'react-native-modal-dropdown';
import TDropListComponet from "../../../../componet/TDropListComponet";
import {TTextInput} from "../../../../componet/tcustom/textInput/TTextInput";
import {TButton} from "../../../../componet/tcustom/button/TButton";

export default class AddValidView extends BaseView {
    constructor(props) {
        super(props);
        this.state = {
            countName: "",
            careNumText: "",
            password: "",
            cardData: null
        }
    }

    renderBody() {
        let {passProps} = this.props;
        TLog("ValidCardView-----------", passProps);
        return (
            <View style={G_Style.appContentView}>
                <View style={{backgroundColor: "white", justifyContent: "center", alignItems: "center"}}>
                    <View style={styles.rowSp}>
                        <View style={styles.leftView}>
                            <Text>开户银行: </Text>
                        </View>
                        <TDropListComponet
                            style={{flex: 2, marginRight: 20}}
                            itemName={this.state.cardData ? this.state.cardData.accountEny : "请选择转账银行卡"}
                            dataList={passProps.cardList}
                            rendDropRow={this.rendCardRow}
                            onSelect={(idx, value) => {
                                this.setState({cardData: value});
                            }}
                        />
                    </View>

                    <View style={styles.rowSp}>
                        <View style={styles.leftView}>
                            <Text>开户人姓名: </Text>
                        </View>
                        <TTextInput
                            viewStyle={styles.cardInput}
                            placeholder={"请输入旧的银行卡开户人姓名"}
                            autoFocus={true}
                            onChangeText={(countName) => this.setState({countName: countName})}
                            value={this.state.countName}
                        />
                    </View>
                    <View style={styles.rowSp}>
                        <View style={styles.leftView}>
                            <Text >银行账号: </Text>
                        </View>
                        <TTextInput
                            viewStyle={styles.cardInput}
                            autoCapitalize="none"
                            placeholder={"请输入旧的银行卡卡号"}
                            autoFocus={true}
                            onChangeText={(careNumText) => this.setState({careNumText: careNumText})}
                            value={this.state.careNumText}
                            keyboardType={'numeric'}
                        />
                    </View>
                    <View style={styles.rowSp}>
                        <View style={styles.leftView}>
                            <Text>资金密码: </Text>
                        </View>
                        <TTextInput
                            viewStyle={styles.cardInput}
                            placeholder={"输入您的资金密码"}
                            autoFocus={true}
                            onChangeText={(password) => this.setState({password: password})}
                            value={this.state.password}
                            secureTextEntry={true}
                            keyboardType={'numeric'}
                        />
                    </View>
                </View>
                <TButton viewStyle={{
                    margin: 25,
                }}
                         btnName={"下一步"}
                         errMsg={this.onValid()}
                  onPress={this.clickNext}/>
            </View>
        );
    }

    rendCardRow = (rowData) => {
        return (<View style={{
            margin: 10,
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        }}><Text>{rowData.accountEny}</Text></View>)
    }

    onValid=()=>{
        let errMsg =null;
        if (this.state.cardData == null) {
            errMsg="请先选择一个验证银行卡"
        }
        else if (this.state.countName.length < 1) {
            errMsg="请输入有效的用户名"
        }
        else if (this.state.careNumText.length < 1) {
            errMsg="请输入有效的卡号"
        }
        else if (this.state.password.length < 1) {
            errMsg="资金密码不能为空"
        }
        return errMsg;
    }

    clickNext = () => {
        //TLog("-----------------------his.state.careNumText-:" + this.state.careNumText.length, this.state.careNumText);
        if (this.state.cardData == null) {
            Alert.alert("", "请先选择一个验证银行卡", [
                {text: 'ok'},
            ]);
        }
        else if (this.state.countName.length < 1) {
            Alert.alert("", "请输入有效的用户名", [
                {text: '了解'},
            ])
        }
        else if (this.state.careNumText.length < 1) {
            Alert.alert("", "请输入有效的卡号", [])
        }
        else if (this.state.password.length < 1) {
            Alert.alert("", "资金密码不能为空", [])
        }
        else {
            //id:1,account_name:"",account:"",fund_password:""
            HTTP_SERVER.BANK_CARD_ADD_STEP_0.body.id = this.state.cardData.id;
            HTTP_SERVER.BANK_CARD_ADD_STEP_0.body.account = this.state.careNumText.trim();
            HTTP_SERVER.BANK_CARD_ADD_STEP_0.body.account_name = this.state.countName.trim();
            HTTP_SERVER.BANK_CARD_ADD_STEP_0.body.fund_password = this.state.password.trim();
            ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.BANK_CARD_ADD_STEP_0, (result) => {
                if (result.isSuccess) {
                    G_NavUtil.pushToView(G_NavViews.AddCardView({title: "2. 添加新银行卡", isStep2: true}));
                }
                else {
                    // ActDispatch.AppAct.showErrorBox(result.Msg);
                }
            })
        }
    }

    componentDidMount() {

    }
}


const styles = StyleSheet.create({
    rowSp: {
        paddingVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        borderColor: 'gray',
        justifyContent: "center",
        marginHorizontal: 20

    },
    leftView: {
        alignItems: "flex-end",
        flex: 1
    },
    cardInput: {
        borderBottomWidth: 0.2,
        flex: 2,
        paddingLeft: 10,
    },


});
