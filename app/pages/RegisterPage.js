
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    TouchableOpacity,
    InteractionManager,
} from 'react-native';
import Toast from 'react-native-root-toast';
import { Header } from '../components';
import {RoomContainer} from '../containers';


import {appAct,fetchData,appAN,wsAct} from '../actions';

import { STYLE, WINDOW, REQURL, SERVERADDR } from '../config';
import { encode } from '../utils/util';

export default class RegisterPage extends Component {
    constructor(props){
        super(props);

        const vodehash = (new Date()).valueOf();

        this.state = {
            Rusername: '',
            Rnickname: '',
            Rpassword: '',
            Rrepassword:'',
            Rvcode: '',
            vcodeImg: `${SERVERADDR}/verfiycode?t=${vodehash}`,
            vodehash: vodehash
        };

        this.getScodeImg = this.getScodeImg.bind(this);
        this.requestUserInfo = this.requestUserInfo.bind(this);

    }


    /**
     * 获取验证码图片
     * @returns {*}
     */
    getScodeImg() {
        const vodehash = (new Date()).valueOf();

        this.setState({
            vodehash : vodehash,
            vcodeImg : `${SERVERADDR}/verfiycode?t=${vodehash}`
        });

    }

    onchangeUserName(text) {
        this.state.Rusername = text.trim();
    }

    onchangeNickName(text) {
        this.state.Rnickname = text.trim();
    }

    onchangePassword(text) {
        this.state.Rpassword = text.trim();
    }

    onchangeRepassword(text) {
        this.state.Rrepassword = text.trim();
    }

    onchangeVcode(text) {
        this.state.Rvcode = text.trim();
    }

    render(){
        return (
            <View style={styles.container}>
                <Header
                    leftIcon='chevron-left'
                    leftIconAction={()=>this.props.navigator.pop()}
                    title='注册'
                />
                <View style={[styles.formInput,{marginTop:30}]}>
                    <TextInput
                        ref="Rusername"
                        placeholder='请填写登录邮箱'
                        style={styles.loginInput}
                        onChangeText={(e)=>this.onchangeUserName(e)}
                        />
                </View>
                <View style={styles.formInput}>
                    <TextInput
                        ref="Rnickname"
                        style={styles.loginInput}
                        placeholder='请填写用户昵称'
                        onChangeText={(e)=>this.onchangeNickName(e)}
                        />
                </View>
                <View style={styles.formInput}>
                    <TextInput
                        ref="Rpsw"
                        style={styles.loginInput}
                        secureTextEntry={true}
                        placeholder='请设置密码'
                        onChangeText={(e)=>this.onchangePassword(e)}
                        />
                </View>
                <View style={styles.formInput}>
                    <TextInput
                        ref="Rrepsw"
                        style={styles.loginInput}
                        secureTextEntry={true}
                        placeholder='请确认密码'
                        onChangeText={(e)=>this.onchangeRepassword(e)}
                        />
                </View>
                <View style={styles.formInput}>
                    <TextInput
                        ref="Rvode"
                        style={styles.loginInput}
                        placeholder='请输入验证码'
                        onChangeText={(e)=>this.onchangeVcode(e)}
                        />
                    <TouchableOpacity onPress={()=>this.getScodeImg()}>
                        <Image
                            key={this.state.vodehash}
                            style={styles.vcodeImg}
                            source={{uri:this.state.vcodeImg}}
                            />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.registerBtn} onPress={()=>this.register()}>
                    <Text style={styles.registerText}>注册</Text>
                </TouchableOpacity>
            </View>
        )
    }

    register(){
        const {Rusername,Rnickname,Rpassword,Rrepassword,Rvcode} = this.state;
        const { dispatch } = this.props;

        const registerCallback = this.requestUserInfo;

        if (!Rusername.length) {
            Toast.show('请填写登录邮箱', {position:Toast.positions.CENTER});
            return;
        }
        if (!Rnickname.length) {
            Toast.show('请填写用户昵称', {position:Toast.positions.CENTER});
            return;
        }
        if (!Rpassword.length) {
            Toast.show('请设置密码', {position:Toast.positions.CENTER});
            return;
        }
        if (!Rrepassword.length) {
            Toast.show('请确认密码', {position:Toast.positions.CENTER});
            return;
        }
        if (!Rvcode.length) {
            Toast.show('请输入验证码', {position:Toast.positions.CENTER});
            return;
        }

        InteractionManager.runAfterInteractions(() => {
            const registerData = {
                "username": Rusername,
                "nickname": Rnickname,
                "password": encode(Rpassword),
                "repassword": encode(Rrepassword),
                "sCode": Rvcode
            }
            dispatch(fetchData({
                url : REQURL.register.url,
                requestType : REQURL.register.type,
                requestData : registerData,
                successAction : appAN.LOGIN,
                callback : registerCallback
            }));
        });
    };

    /**
     * 请求用户信息
     */
    requestUserInfo() {
        const { dispatch, navigator,roomid, from } = this.props;

        //请求用户信息
        dispatch(fetchData({
            url : REQURL.getUserInfo.url,
            requestType : REQURL.getUserInfo.type,
            successAction: appAN.UPDATE_USERINFO,
            callback : function() {
                if(from == 'room') {
                    //断开socket链接
                    dispatch(wsAct.logout());
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
                else if(from == 'shop') {
                    const routes = navigator.getCurrentRoutes();
                    const targetRoute = routes.filter(r => r.name === 'ShopContainer');
                    if (targetRoute.length > 0) {
                        navigator.popToRoute(targetRoute[0]);
                    }
                }
                else {
                    navigator.popToTop()
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

    registerBtn:{
        backgroundColor: STYLE.primary,
        padding: 10,
        alignItems: 'center',
        marginTop: 50,
        borderRadius: 3,
        width: WINDOW.width*0.9,
    },
    registerText:{
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

    vcodeImg: {
        height:35,
        width:100
    }
});
