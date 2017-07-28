import React from 'react';
import {
    View,
    StyleSheet,
    Image
} from 'react-native';

import AIcon from 'react-native-vector-icons/FontAwesome';
import md5 from "react-native-md5";
import BaseView from "../../../componet/BaseView";
import {TTextInput} from "../../../componet/tcustom/textInput/TTextInput";
import {TButton} from "../../../componet/tcustom/button/TButton";
import connect from "react-redux/src/components/connect";
import CheckBox from 'react-native-check-box';
import {LOGO,LOGOBG,CHECK_WHITE,CHECK_WHITE_OUTLINE} from "../../../../assets/index";

const mapStateToProps = state => {
    return {
        storageUser: state.get("appState").get("storageUser").toJS(),
    }
}

@connect(mapStateToProps)
export default class LoginView extends React.Component {
    static navigationOptions = {
        title: "登录",
        header:null
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

    render() {
        return (
            <View style={[G_Style.appContentView, {justifyContent: "center", backgroundColor: '#000' }]}>
                <Image
                    style={styles.bgImg}
                    source={LOGOBG}
                    />
                <View style={styles.bgContent}>
                    <View style={{alignItems: "center"}}>
                        <Image
                            style={styles.logo}
                            source={LOGO}
                            />
                    </View>
                    <View
                        style={styles.inputContain}>
                        <AIcon name="user-o" style={styles.iconUser}/>
                        <TTextInput placeholder={"输入账号"}
                                    autoFocus={this.state.nameText == "" ? true : false}
                                    value={this.state.nameText}
                                    style={styles.input}
                                    onChangeText={(nameText) => this.setState({nameText})}
                        />
                    </View>
                    <View style={styles.inputContain}>
                        <AIcon name="lock" style={styles.icoPwd}/>
                        <TTextInput placeholder={"输入密码"}
                                    secureTextEntry={true}
                                    value={this.state.pwdText}
                                    style={styles.input}
                                    onChangeText={(pwdText) => this.setState({pwdText})}/>
                    </View>
                    <CheckBox
                        style={styles.checkBox}
                        rightTextStyle={{color:'#fff'}}
                        onClick={this.onClickCheck}
                        isChecked={this.state.checkSelect}
                        rightText={'记住密码'}
                        checkedImage={<Image
                            style={styles.checkBoxIcon}
                            source={CHECK_WHITE}
                            />}
                        unCheckedImage={
                            <Image
                            style={styles.checkBoxIcon}
                            source={CHECK_WHITE_OUTLINE}
                            />
                        }
                    />
                    <TButton errMsg={this.onErrMsg()}
                             containerStyle={styles.loginBtn}
                             btnName={"登  陆"} onPress={this.clickLogin}/>
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
                    G_MyStorage.setItem(G_EnumStroeKeys.USR_DATA, JSON.stringify(bodyData),this.onPopView);
                    ActDispatch.AppAct.setStorgeUser(this.state.nameText, this.state.pwdText);
                }else{
                    bodyData.srcPwd="";
                    ActDispatch.AppAct.setStorgeUser(this.state.nameText, "");
                    G_MyStorage.setItem(G_EnumStroeKeys.USR_DATA, JSON.stringify(bodyData), this.onPopView);
                }
            } else {
                ActDispatch.AppAct.showBox(data.Msg);
            }
        }, false, true)
    }

    onPopView=()=>{
        let {navigation}=this.props
        let viewName = G_NavState.routes[G_NavState.routes.length - 2].routeName;
        if(G_RoutConfig.Main.name ==viewName){
            navigation.goBack();
        }
        else{
            navigation.goBack()
            if(G_LastView){
                G_LastView.componentDidMount();
            }
        }

    }
}

const styles = StyleSheet.create({
    iconUser: {
        color: G_Theme.second,
        fontSize: 18,
        marginRight: 10
    },
    input: {
        color: '#fff'
    },
    bgImg: {
        width: G_Theme.windowWidth,
        height: G_Theme.windowHeight,
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1
    },
    bgContent: {
        marginLeft: 30,
        marginRight: 30,
        marginBottom: G_Theme.windowHeight / 5,
        zIndex: 10
    },
    checkBox: {
        flex: 1,
        marginTop: 20,
        borderColor: '#fff'
    },
    checkBoxIcon: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    },
    logo: {
        width: G_Theme.windowWidth * 0.8,
        marginBottom: 20
    },
    icoPwd: {
        color: G_Theme.second,
        fontSize: 20,
        marginRight: 10
    },
    loginBtn: {
        marginTop:50,
        height:40,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'rgb(78,8,90)'
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

//<Image
//    style={styles.bgImg}
//    source={LOGOBG}
//    />