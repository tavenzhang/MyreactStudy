
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    InteractionManager,
} from 'react-native';
import Toast from 'react-native-root-toast';
import {Header} from '../components';
import {RegisterContainer,RoomContainer} from '../containers';

import {appAct,fetchData,appAN,wsAct} from '../actions';

import { STYLE, WINDOW, REQURL } from '../config';
import { encode } from '../utils/util';


export default class LoginPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
        };

        this.requestUserInfo = this.requestUserInfo.bind(this);
    }
    componentWillUnmount(){
    }
    componentDidMount(){

    }

    goRegister() {
        const { location, navigator, roomid, from } = this.props;

        InteractionManager.runAfterInteractions(()=>{
            navigator.push({
                name: 'RegisterContainer',
                component: RegisterContainer,
                passProps: {
                    type: 'normal',
                    from: from,
                    roomid: roomid,
                }
            })
        })
    }

    render(){

        return (
            <View style={styles.container}>
                <Header
                    leftIcon='chevron-left'
                    leftIconAction={()=>this.props.navigator.pop()}
                    title='登录'
                />
                <Text style={styles.topDesc}>使用兰桂坊账号登陆</Text>
                <View style={[styles.formInput,{marginTop:30}]}>
                    <TextInput
                        ref="Luname"
                        placeholder='请输入登录账号'
                        style={styles.loginInput}
                        onChangeText={(e)=>this.setUserName(e)}
                        />
                </View>
                <View style={styles.formInput}>
                    <TextInput
                        ref="Lpassword"
                        style={styles.loginInput}
                        secureTextEntry={true}
                        blurOnSubmit={true}
                        placeholder='请输入登录密码'
                        onChangeText={(e)=>this.setPassword(e)}
                        />

                </View>
                <TouchableOpacity style={styles.loginBtn} onPress={()=>this.handleLogin()}>
                    <Text style={styles.loginText}>登录</Text>
                </TouchableOpacity>
                <View style={styles.registerWrap}>
                    <Text style={{fontSize:12}}>没有兰桂坊账号？</Text>
                    <TouchableOpacity onPress={()=>this.goRegister()}>
                        <Text style={{color:'#62a2e0'}}>立即注册</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    setUserName(e) {
        this.state.username = e.trim();
    }

    setPassword(e) {
        this.state.password = e.trim();
    }


    handleLogin(){

        const { dispatch } = this.props;
        const loginCallback = this.requestUserInfo;
        const { username,password } = this.state;

        if (!username.length) {
            Toast.show('请输入登录账号', {position: 70});
            return;
        }
        if (!password.length) {
            Toast.show('请输入登录密码', {position: 70});
            return;
        }

        let loginData = {
            "uname": username,
            "password": encode(password),
            "sCode": '',
            "v_remember": 0
        };
        //登录
        dispatch(fetchData({
            url : REQURL.login.url,
            requestType : REQURL.login.type,
            requestData : loginData,
            successAction: appAN.LOGIN,
            callback : loginCallback
        }));
    }

    /**
     * 请求用户信息
     */
    requestUserInfo() {
        const { dispatch, navigator, from, roomid } = this.props;

        if(from == 'room') {
            //断开socket链接
            dispatch(wsAct.logout());
        }
        //请求用户信息
        dispatch(fetchData({
            url : REQURL.getUserInfo.url,
            requestType : REQURL.getUserInfo.type,
            successAction: appAN.UPDATE_USERINFO,
            callback : function() {

                if(from == 'room') {

                    InteractionManager.runAfterInteractions(()=>{
                        navigator.push({
                            name: 'RoomContainer',
                            component: RoomContainer,
                            passProps: {
                                type: 'normal',
                                roomid: roomid,
                                from: 'login'
                            }
                        })
                    })
                }
                else {
                    navigator.pop();
                }
            }
        }));
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },

    formInput:{
        flexDirection:'row',
        width: WINDOW.width*0.9,
        height: 60,
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 5,
        paddingRight: 5,
        borderBottomWidth:1,
        borderBottomColor:'#dbdada',
    },

    loginInput: {
        height: 40,
        flex: 1,
        fontSize: 16,
    },

    topDesc: {
        marginTop: 40,
        color: '#666',
        fontSize: 12
    },

    loginBtn:{
        backgroundColor: STYLE.primary,
        padding: 10,
        alignItems: 'center',
        marginTop: 50,
        borderRadius: 3,
        width: WINDOW.width*0.9,
    },
    loginText:{
        color:'#ffffff',
        fontSize: 14,
    },

    loginWrap: {
        backgroundColor: '#FCE9D4',
    },

    registerWrap: {
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 20,
        width: WINDOW.width*0.9,
        alignItems: 'center',
        justifyContent: 'center'
    },
});
