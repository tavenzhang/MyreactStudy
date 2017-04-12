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
            <View style={GlobeStyle.appContentView}>
                <View style={{height: GlobelTheme.screenHeight / 3, backgroundColor: "white", paddingLeft: 10}}>
                    <View style={{flex: 1, alignItems: "center", flexDirection: "row"}}>
                        <View style={{width: GlobelTheme.screenWidth * 1 / 3, alignItems: "flex-end"}}>
                            <Text>开户银行: </Text>
                        </View>
                        <ModalDropdown style={styles.dropdown_1}
                                       options={passProps.cardList}
                                       renderRow={this.rendCardRow}
                                       onSelect={(idx, value) => {
                                           this.setState({cardData: value});
                                       }}
                        >
                            <Text style={{textAlign: "center"}}>{this.state.cardData ? this.state.cardData.accountEny : "请选择验证卡"}</Text>
                        </ModalDropdown>
                    </View>

                    <View style={{flex: 1, alignItems: "center", flexDirection: "row"}}>
                        <View style={{width: GlobelTheme.screenWidth * 1 / 3, alignItems: "flex-end"}}>
                            <Text>开户人姓名: </Text>
                        </View>
                        <TextInput
                            style={styles.cardInput}
                            autoCapitalize="none"
                            placeholder={"请输入旧的银行卡开户人姓名"}
                            autoFocus={true}
                            onChangeText={(countName) => this.setState({countName: countName})}
                            value={this.state.countName}
                        />
                    </View>
                    <View style={{flex: 1, alignItems: "center", flexDirection: "row"}}>
                        <View style={{width: GlobelTheme.screenWidth * 1 / 3, alignItems: "flex-end"}}>
                            <Text >银行账号: </Text>
                        </View>
                        <TextInput
                            style={styles.cardInput}
                            autoCapitalize="none"
                            placeholder={"请输入旧的银行卡卡号"}
                            autoFocus={true}
                            onChangeText={(careNumText) => this.setState({careNumText: careNumText})}
                            value={this.state.careNumText}
                            keyboardType={'numeric'}
                        />
                    </View>
                    <View style={{flex: 1, alignItems: "center", flexDirection: "row"}}>
                        <View style={{width: GlobelTheme.screenWidth * 1 / 3, alignItems: "flex-end"}}>
                            <Text>资金密码: </Text>
                        </View>
                        <TextInput
                            style={styles.cardInput}
                            autoCapitalize="none"
                            placeholder={"输入您的资金密码"}
                            autoFocus={true}
                            onChangeText={(password) => this.setState({password: password})}
                            value={this.state.password}
                            secureTextEntry={true}
                            keyboardType={'numeric'}
                        />
                    </View>
                </View>
                <Button
                    containerStyle={{
                        padding: 8,
                        margin: 10,
                        overflow: 'hidden',
                        borderRadius: 3,
                        backgroundColor: '#d7213c'
                    }}
                    style={{fontSize: 14, color: "white"}}
                    styleDisabled={{color: '#fff'}}
                    onPress={this.clickNext}>
                    添加
                </Button>
            </View>
        );
    }

    rendCardRow = (rowData, rowID, highlighted) => {
        return (<View style={{
            margin: 10,
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        }}><Text>{rowData.accountEny}</Text></View>)
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
                    NavUtil.pushToView(NavViews.AddCardView({title: "2. 添加新银行卡",isStep2:true}));
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
    touchTabButton: {
        flex: 1, alignItems: "center", justifyContent: "center",
    },
    cardInput: {
        width: GlobelTheme.screenWidth * 2 / 3,
        marginLeft: 20,
        fontSize: 14,
        flex: 2,
    },
    dropdown_1: {
        flex: 1,
        top: 0,
        left: 8,
        borderColor: "gray",
        borderWidth: StyleSheet.hairlineWidth,
    }

});
