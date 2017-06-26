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

export default class DelCardView extends BaseView {
    constructor(props) {
        super(props);
        this.state = {
            countName: "",
            careNumText:"",
            password:""
        }
    }

    renderBody() {
        let params = this.props.navigation.state.params
        TLog("DelCardView-----------", params)
        return (
            <View style={G_Style.appContentView}>
                <View style={{height: G_Theme.windowHeight / 3, backgroundColor: "white", paddingLeft: 10}}>
                    <Text style={{
                        fontSize: 14,
                        color: G_Theme.gray,
                        margin: 10,
                        alignSelf:"center"
                    }}>卡号:  {params.accountEny}</Text>

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
                <TButton btnName={"删除"}
                         viewStyle={{
                             margin: 30,
                         }}
                        errMsg={this.onErrMsg()}
                         onPress={this.clickNext}
                />
            </View>
        );
    }

    onErrMsg=()=>{
        let msg=null;
        if (this.state.countName.length < 1) {
            msg= "请输入有效的用户名";
        }
        else if(this.state.careNumText.length<1)
        {
            msg="请输入有效的卡号"

        }
        else if(this.state.password.length<1)
        {
            msg="资金密码不能为空"
        }
        return msg;
    }

    clickNext = () => {
           let params = this.props.navigation.state.params
            //id:1,account_name:"",account:"",fund_password:""
            HTTP_SERVER.BANK_CARDS_DEL.body.id = params.id;
            HTTP_SERVER.BANK_CARDS_DEL.body.account=this.state.careNumText.trim();
            HTTP_SERVER.BANK_CARDS_DEL.body.account_name=this.state.countName.trim();
            HTTP_SERVER.BANK_CARDS_DEL.body.fund_password = this.state.password.trim();
            ActDispatch.FetchAct.fetchVoWithResult( HTTP_SERVER.BANK_CARDS_DEL, (result) => {
                //ActDispatch.AppAct.showErrorBox(result.Msg);
                if(result.isSuccess)
                {
                    G_NavUtil.pop();
                    HTTP_SERVER.LIST_BANGK_CARDS.page=1;
                    ActDispatch.FetchAct.fetchVoWithAction(HTTP_SERVER.LIST_BANGK_CARDS, ActionType.AppType.CARD_LIST_GET);
                }
            })
    }

    componentDidMount() {

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
