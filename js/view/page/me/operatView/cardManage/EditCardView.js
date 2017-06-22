import React from 'react';
import {
    View,
    Text, StyleSheet,
    TextInput,
    Alert
} from 'react-native';

import BaseView from "../../../../componet/BaseView";
import Button from "react-native-button";
import {TButton} from "../../../../componet/tcustom/button/TButton";

export default class EditCardView extends BaseView {
    constructor(props) {
        super(props);
        this.state = {
            countName: "",
            careNumText: "",
            password: ""
        }
    }

    renderBody() {
        let {passProps} = this.props;
        //TLog("EditCardView-----------", passProps)
        return (
            <View style={G_Style.appContentView}>
                <View style={{height: G_Theme.windowHeight / 3, backgroundColor: "white", paddingLeft: 10}}>
                    <Text style={{
                        fontSize: 14,
                        color: G_Theme.gray,
                        margin: 10,
                        alignSelf: "center"
                    }}>卡号: {passProps.accountEny}</Text>

                    <View style={{flex: 1, alignItems: "center", flexDirection: "row"}}>
                        <View style={{width: G_Theme.windowWidth * 1 / 3, alignItems: "flex-end"}}>
                            <Text >开户人姓名: </Text>
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
                        <View style={{width: G_Theme.windowWidth * 1 / 3, alignItems: "flex-end"}}>
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
                        <View style={{width: G_Theme.windowWidth * 1 / 3, alignItems: "flex-end"}}>
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
                <TButton viewStyle={{
                    padding: 8,
                    margin: 25,
                }}
                         btnName={"下一步"}
                         errMsg={this.onValid()}
                         onPress={this.clickNext}/>
            </View>
        );
    }

    onValid = () => {
        let msg = "";
        if (this.state.countName.length < 1) {
            msg = "请输入有效的用户名";

        }
        else if (this.state.careNumText.length < 1) {
            msg = "请输入有效的卡号";
        }
        else if (this.state.password.length < 1) {
            msg = "资金密码不能为空"
        }
        return msg;
    }

    clickNext = () => {
        // TLog("-----------------------his.state.careNumText-:" + this.state.careNumText.length, this.state.careNumText);

        let {passProps} = this.props;
        //id:1,account_name:"",account:"",fund_password:""
        HTTP_SERVER.BANK_CARD_MODIFY_STEP_O.body.id = passProps.id;
        HTTP_SERVER.BANK_CARD_MODIFY_STEP_O.body.account = passProps.account;
        HTTP_SERVER.BANK_CARD_MODIFY_STEP_O.body.account_name = this.state.countName;
        HTTP_SERVER.BANK_CARD_MODIFY_STEP_O.body.fund_password = this.state.password;
        HTTP_SERVER.BANK_CARD_MODIFY_STEP_O.url = HTTP_SERVER.BANK_CARD_MODIFY_STEP_O.formatUrl.replace("#id", passProps.id)
        ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.BANK_CARD_MODIFY_STEP_O, (result) => {
            if (result.isSuccess) {
                G_NavUtil.pushToView(G_NavViews.EditCardAddView({...passProps, title: "2. 修改银行卡", isStep2: true}));
            }
        })
    }
}




const styles = StyleSheet.create({
    touchTabButton: {
        flex: 1, alignItems: "center", justifyContent: "center",
    },
    cardInput: {
        width: G_Theme.windowWidth * 2 / 3,
        marginLeft: 20,
        fontSize: 14,
        flex: 2,
    }

});
