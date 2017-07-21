import React from 'react';
import {
    View
    , StyleSheet,
} from 'react-native';

import AIcon from 'react-native-vector-icons/FontAwesome';
import md5 from "react-native-md5";
import BaseView from "../../../componet/BaseView";
import {TTextInput} from "../../../componet/tcustom/textInput/TTextInput";
import {TButton} from "../../../componet/tcustom/button/TButton";
import connect from "react-redux/src/components/connect";
import CheckBox from 'react-native-check-box';

const mapStateToProps = state => {
    return {
        storageUser: state.get("appState").get("storageUser").toJS(),
    }
}

@connect(mapStateToProps)
export default class LoginView extends BaseView {
    static navigationOptions = {
        title: "登录",
    }

    constructor(props) {
        super(props);
        let {name, pwd} = this.props.storageUser
        let nameText=  name ? name:"";
        let pwdText=  pwd ? pwd:"";
        this.state = {
           nameText,
           pwdText,
            checkSelect: true
        };
    }

    renderBody() {
        return (
            <View style={[G_Style.appContentView, {justifyContent: "center"}]}>
                <View style={{marginLeft: 40, marginRight: 40, marginBottom: G_Theme.windowHeight / 5,}}>
                    <View
                        style={styles.inputContain}>
                        <AIcon name="user-o" style={styles.iconUser}/>
                        <TTextInput placeholder={"输入账号"}
                                    autoFocus={this.state.nameText == "" ? true : false}
                                    value={this.state.nameText}
                                    onChangeText={(nameText) => this.setState({nameText})}
                        />
                    </View>
                    <View style={styles.inputContain}>
                        <AIcon name="lock" style={styles.icoPwd}/>
                        <TTextInput placeholder={"输入密码"}
                                    secureTextEntry={true}
                                    value={this.state.pwdText}
                                    onChangeText={(pwdText) => this.setState({pwdText})}/>
                    </View>
                    <CheckBox
                        style={{flex: 1, padding: 10, marginTop: 15}}
                        onClick={this.onClickCheck}
                        isChecked={this.state.checkSelect}
                        rightText={'记住密码'}
                    />
                    <TButton errMsg={this.onErrMsg()} viewStyle={{marginTop: 20}} containerStyle={{margin: 20}}
                             btnName={"登陆"} onPress={this.clickLogin}/>
                </View>
            </View>
        );
    }

    componentDidMount(){
    TLog("componentDidMount----login")
    }

    componentWillUnmount() {
        TLog("componentWillUnmount----login")
    }

    onClickCheck = () => {
        this.setState({checkSelect: !this.state.checkSelect})
    }

    onErrMsg = () => {
        let msg = null;
        if (!this.state.nameText) {
            msg = "账号不能为空", "请输入有效的账号";
        } else if (!this.state.pwdText) {
            msg = "密码不能为空", "请输入有效的密码"
        }
        return msg
    }

    clickLogin = () => {
        let bodyData = HTTP_SERVER.LOGIN_IN.body;
        bodyData.username = this.state.nameText;
        bodyData.srcPwd = this.state.pwdText;
        bodyData.password = md5.hex_md5(md5.hex_md5(md5.hex_md5(this.state.nameText + this.state.pwdText)));
        ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.LOGIN_IN, (data) => {
            if (data.isSuccess) {
                ActDispatch.AppAct.loginReault(data);
                if(this.state.checkSelect) {
                    G_MyStorage.setItem(G_EnumStroeKeys.USR_DATA, JSON.stringify(bodyData), () => G_NavUtil.pop());
                    ActDispatch.AppAct.setStorgeUser(this.state.nameText, this.state.pwdText);
                }else{
                    bodyData.srcPwd="";
                    ActDispatch.AppAct.setStorgeUser(this.state.nameText, "");
                    G_MyStorage.setItem(G_EnumStroeKeys.USR_DATA, JSON.stringify(bodyData), () => G_NavUtil.pop());
                }
            } else {
                ActDispatch.AppAct.showBox(data.Msg);
            }
        }, false, true)
    }
}

const styles = StyleSheet.create({
    iconUser: {
        color: G_Theme.grayDeep,
        fontSize: 18,
        marginRight: 10
    },
    icoPwd: {
        color: G_Theme.grayDeep,
        fontSize: 20,
        marginRight: 10
    },
    inputContain: {
        paddingBottom: 5,
        marginTop: 15,
        paddingLeft: 5,
        flexDirection: "row",
        height: 40,
        justifyContent: "flex-start",
        alignItems: "center",
        borderColor: 'gray',
        borderBottomWidth: 0.5,
    }
});

