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

export default class LoginView extends BaseView {

    constructor(props) {
        super(props);
        this.state = {
            nameText: "",
            pwdText: ""
        };

    }

    renderBody() {
        return (
            <View style={[G_Style.appContentView,{justifyContent:"center"}]}>
                <View style={{marginLeft:40,marginRight: 40, marginBottom:G_Theme.windowHeight/5,}}>
                    <View
                        style={styles.inputContain}>
                        <AIcon name="user-o" style={styles.iconUser}/>
                        <TTextInput    placeholder={"输入账号"}
                                       autoFocus={true}
                                       value={this.state.nameText}
                                       onChangeText={(nameText) => this.setState({nameText})}
                                    />
                    </View>
                    <View style={styles.inputContain}>
                        <AIcon name="lock" style={styles.icoPwd}/>
                        <TTextInput    placeholder={"输入密码"}
                                       secureTextEntry={true}
                                       value={this.state.pwdText}
                                       onChangeText={(pwdText) => this.setState({pwdText})}/>
                    </View>
                    <TButton errMsg={this.onErrMsg()} containerStyle={{margin: 20}} btnName={"登录"} onPress={this.clickLogin}/>
                </View>
            </View>
        );
    }

    componentDidMount() {
       setTimeout (()=>G_MyStorage.getItem(G_EnumStroeKeys.USR_DATA, (data) => {
            let udata=JSON.parse(data)
            this.setState({nameText: udata.username,pwdText:udata.srcPwd});
        }),500)
    }

    onErrMsg=()=>{
        let msg =null;
        if (!this.state.nameText) {
            msg= "账号不能为空", "请输入有效的账号";
        } else if (!this.state.pwdText) {
            msg= "密码不能为空", "请输入有效的密码"
        }
        return msg
    }

    clickLogin = () => {
            let bodyData = HTTP_SERVER.LOGIN_IN.body;
            bodyData.username = this.state.nameText;
            bodyData.srcPwd =this.state.pwdText;
            bodyData.password = md5.hex_md5(md5.hex_md5(md5.hex_md5(this.state.nameText + this.state.pwdText)));

            ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.LOGIN_IN, (data) => {
                if (data.isSuccess) {
                    G_MyStorage.setItem(G_EnumStroeKeys.USR_DATA, JSON.stringify(bodyData),()=>G_NavUtil.pop());
                    ActDispatch.AppAct.loginReault(data);
                } else {
                    ActDispatch.AppAct.showBox(data.Msg);
                }
            },false,true)

    }
}

const styles = StyleSheet.create({
    iconUser: {
        color: G_Theme.grayDeep,
        fontSize: 18,
        marginRight:10
    },
    icoPwd: {
        color: G_Theme.grayDeep,
        fontSize: 20,
        marginRight:10
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

