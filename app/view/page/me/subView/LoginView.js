import React from 'react';
import {
    View
    , StyleSheet,
    TextInput,
    Alert
} from 'react-native';

import AIcon from 'react-native-vector-icons/FontAwesome';
import Button from 'react-native-button';
import md5 from "react-native-md5";
import BaseView from "../../../componet/BaseView";

export default class LoginView extends BaseView {

    constructor(props) {
        super(props);
        this.state = {
            nameText: null,
            pwdText: null
        };
        G_MyStorage.getItem(G_EnumStroeKeys.USRTNAME, (data) => {
            this.setState({nameText: data});
        })
        G_MyStorage.getItem(G_EnumStroeKeys.PASS_PWD, (data) => {
            this.setState({pwdText: data});
        });
    }

    getNavigationBarProps()
    {
        return {title:"登陆"};
    }

    renderBody() {
        return (
            <View style={[G_Style.appContentView,{justifyContent:"center"}]}>
                <View style={{marginLeft:40,marginRight: 40, marginBottom:G_Theme.windowHeight/5,}}>
                    <View
                        style={styles.inputContain}>
                        <AIcon name="user-o" style={styles.iconUser}/>
                        <TextInput
                            style={styles.textStyle}
                            autoCapitalize="none"
                            onChangeText={(nameText) => this.setState({nameText:nameText})}
                            value={this.state.nameText}
                            placeholder={"输入账号"}
                            autoFocus={true}
                            underlineColorAndroid={'transparent'}
                        />
                    </View>
                    <View style={styles.inputContain}>
                        <AIcon name="lock" style={styles.icoPwd}/>
                        <TextInput
                            style={styles.textStyle}
                            onChangeText={(pwdText) => this.setState({pwdText:pwdText})}
                            value={this.state.pwdText}
                            placeholder={"密码"}
                            secureTextEntry={true}
                            multiline={false}
                            underlineColorAndroid={'transparent'}
                        />
                    </View>
                    <Button
                        containerStyle={{padding:5,margin: 10,  overflow:'hidden', borderRadius:3, backgroundColor: '#d7213c'}}
                        style={{ fontSize: 14,color:"white"}}
                        styleDisabled={{color: '#fff'}}
                        onPress={this.clickLogin}>
                        登陆
                    </Button>
                </View>
            </View>
        );
    }

    componentDidMount() {

    }



    componentWillUnmount() {
       // TLog("LoginView----------------componentWillUnmount")
    }

    clickLogin = () => {
        if (!this.state.nameText) {
            Alert.alert("账号不能为空", "请输入有效的账号");
        } else if (!this.state.pwdText) {
            Alert.alert("密码不能为空", "请输入有效的密码");
        }
        else {
            let bodyData = HTTP_SERVER.LOGIN_IN.body;
            bodyData.username = this.state.nameText;
            bodyData.password = md5.hex_md5(md5.hex_md5(md5.hex_md5(this.state.nameText + this.state.pwdText)));
            G_MyStorage.setItem(G_EnumStroeKeys.USRTNAME, bodyData.username);
            G_MyStorage.setItem(G_EnumStroeKeys.PASS_PWD, this.state.pwdText);
            ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.LOGIN_IN, (data) => {
                if (data.isSuccess) {
                    G_NavUtil.pop(this.props);
                    ActDispatch.AppAct.loginReault(data);
                } else {
                    ActDispatch.AppAct.showBox(data.Msg);
                }
            },false)
        }
    }
}

const styles = StyleSheet.create({
    textStyle: {
        width: 150,
        left: 10,
        fontSize: 14,
        height:40
    },
    iconUser: {
        color: G_Theme.grayDeep,
        fontSize: 18,
    },
    icoPwd: {
        color: G_Theme.grayDeep,
        fontSize: 20,
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

