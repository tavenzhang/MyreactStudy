import React from 'react';
import {
    View,
    Text
    , StyleSheet,
    TextInput,
} from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab'
import Button from 'react-native-button'
import AIcon from 'react-native-vector-icons/FontAwesome';
import BaseView from "../../../componet/BaseView";
import connect from "react-redux/src/components/connect";

const mapStateToProps = state => {
    return {
        userData: state.get("appState").get("userData").toJS(),
    }
}
@connect(mapStateToProps)
export default class ChangePwd extends BaseView {

    constructor(props) {
        super(props);
        let {userData} = this.props;
        let {defaultIndex}=this.props.passProps;
        this.isSetFundPwd=userData.data.is_set_fund_password;
        this.state = {
            oldPwd: "",
            newPwd: "",
            repeatPwd: "",
            selectedTabIndex: defaultIndex,
        };
    }

    renderBody() {
        let oldPwdView = this.state.selectedTabIndex == 1 && !this.isSetFundPwd ? null : (
            <View style={styles.inputContain}>
                <AIcon name="lock" style={styles.icoPwd}/>
                <TextInput
                    style={styles.textStyle}
                    onChangeText={(pwd) => this.setState({oldPwd: pwd})}
                    value={this.state.oldPwd}
                    placeholder={this.state.selectedTabIndex ? "原资金密码" : "原登陆密码"}
                    secureTextEntry={true}
                    autoFocus={true}
                />
            </View>)

        return (
            <View style={GlobeStyle.appView}>
                <SegmentedControlTab
                    values={['登陆密码', '资金密码']}
                    onTabPress={this.onTabChange}
                    tabsContainerStyle={{marginLeft: 40, marginRight: 40, alignSelf: "center", margin: 5}}
                    tabStyle={{borderColor: "#a52a2a"}}
                    selectedIndex={this.state.selectedTabIndex}
                    activeTabStyle={{backgroundColor: "#a52a2a"}}
                />
                <View style={{marginLeft: 40, marginRight: 40, top: GlobelTheme.screenHeight / 9}}>
                    {oldPwdView}
                    <View style={styles.inputContain}>
                        <AIcon name="lock" style={styles.icoPwd}/>
                        <TextInput
                            style={styles.textStyle}
                            onChangeText={(pwd) => this.setState({newPwd: pwd})}
                            value={this.state.newPwd}
                            maxLength={9}
                            placeholder={this.state.selectedTabIndex ? "新资金密码" : "新登陆密码"}
                            secureTextEntry={true}
                        />
                    </View>
                    <View style={styles.inputContain}>
                        <AIcon name="lock" style={styles.icoPwd}/>
                        <TextInput
                            style={styles.textStyle}
                            onChangeText={(pwd) => this.setState({repeatPwd: pwd})}
                            value={this.state.repeatPwd}
                            maxLength={9}
                            placeholder={"确认密码"}
                            secureTextEntry={true}
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
                        onPress={()=>this.onCommitAction()}>
                        {this.state.selectedTabIndex ? "资金密码" : "登陆密码"}
                        提交
                    </Button>
                </View>
            </View>
        );
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    onTabChange = (index) => {
        this.setState({
            selectedTabIndex: index,
            oldPwd: "",
            newPwd: "",
            repeatPwd: "",
        })
    }

    onCommitAction = () => {
        if (this.state.oldPwd == ""&&(this.isSetFundPwd||this.state.selectedTabIndex==0)) {
            {
                ActDispatch.AppAct.showErrorBox("原密码不能为空.")
            }
        }
        else if (this.state.newPwd == "") {
            ActDispatch.AppAct.showErrorBox("新密码不能为空.");
        }
        else if (this.state.repeatPwd == "") {
            ActDispatch.AppAct.showErrorBox("确认密码不能为空.")
        }
        else if (this.state.newPwd != this.state.repeatPwd) {
            ActDispatch.AppAct.showErrorBox("确认密码与新密码不一致.")

        } else {
            if (this.state.selectedTabIndex == 0)//修改登陆密码
            {
                HTTP_SERVER.PWD_LOGIN.body.old_password = this.state.oldPwd;
                HTTP_SERVER.PWD_LOGIN.body.password = this.state.newPwd;
                HTTP_SERVER.PWD_LOGIN.body.password_confirmation = this.state.repeatPwd;
                ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.PWD_LOGIN, (data) => {
                    ActDispatch.AppAct.showErrorBox(data.Msg);
                    if(data.isSuccess)
                    {
                        NavUtil.pop();
                    }
                }, false)
            }
            else {//修改资金密码
                if (this.isSetFundPwd)
                {
                    HTTP_SERVER.PWD_FUND.body.old_fund_password = this.state.oldPwd;
                    HTTP_SERVER.PWD_FUND.body.fund_password = this.state.newPwd;
                    HTTP_SERVER.PWD_FUND.body.fund_password_confirmation = this.state.repeatPwd;
                    ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.PWD_FUND, (data) => {
                        ActDispatch.AppAct.showErrorBox(data.Msg);
                        if(data.isSuccess)
                        {
                            NavUtil.pop();
                        }
                    }, false)
                }
                else {
                    //如果没有资金密码 则先设置资金密码
                    HTTP_SERVER.PWD_CONFIG_FUND.body.fund_password = this.state.newPwd;
                    HTTP_SERVER.PWD_CONFIG_FUND.body.fund_password_confirmation = this.state.repeatPwd;
                    ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.PWD_CONFIG_FUND, (data) => {
                        ActDispatch.AppAct.showErrorBox(data.Msg);
                        if(data.isSuccess)
                        {
                            NavUtil.pop();
                        }
                    }, false)

                }

            }

        }
    }

}


const styles = StyleSheet.create({
    textStyle: {
        width: 150,
        left: 10,
        fontSize: 14
    },
    iconUser: {
        color: GlobelTheme.gray,
        fontSize: 18,
    },
    icoPwd: {
        color: GlobelTheme.gray,
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
