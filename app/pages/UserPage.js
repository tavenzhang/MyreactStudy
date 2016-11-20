
import React, {Component,PropTypes} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    ListView,
    TouchableOpacity,
    InteractionManager
} from 'react-native';

import { STYLE, WINDOW, REQURL } from '../config';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Header, LvIcon } from '../components';

//actions
import {appAct,fetchData,appAN} from '../actions';

import {
    RegisterContainer,
    LoginContainer,
    MyFavContainer,
    MyOrdContainer,
    MyMountContainer,
    MySettingContainer,
    MyRecordContainer,
    MyMsgContainer
} from '../containers';

export default class User extends React.Component {
    constructor(props) {
        super(props);

        this.showDetail    =  this.showDetail.bind(this);
        this.goRegister    =  this.goRegister.bind(this);
        this.goLogin       =  this.goLogin.bind(this);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            dataSource: ds.cloneWithRows([
                {
                    'name':'我的关注',
                    'link':'MyFavContainer',
                    'icon':<Icon name="heart" style={styles.menuItemIcon} color="#e84548" />
                },
                {
                    'name':'我的预约',
                    'link':'MyOrdContainer',
                    'icon':<Icon name="star" style={styles.menuItemIcon} color="#1a80e8" />
                },
                {
                    'name':'我的信箱',
                    'link':'MyMsgContainer',
                    'icon':<Icon name="envelope" style={styles.menuItemIcon} color="#39e85a" />
                },
                {
                    'name':'我的道具',
                    'link':'MyMountContainer',
                    'icon':<Icon name="fighter-jet" style={styles.menuItemIcon} color="#e88b47" />
                },
                {
                    'name':'消费记录',
                    'link':'MyRecordContainer',
                    'icon':<Icon name="cart-plus" style={styles.menuItemIcon} color="#e86289" />
                },
                //{
                //    'name':'设置',
                //    'link':'MySettingContainer',
                //    'icon':<Icon name="cog" style={styles.menuItemIcon} color="#e854ca" />
                //},
                {
                    'name':'退出',
                    'link':'logout',
                    'icon':<Icon name="power-off" style={styles.menuItemIcon} color="#e84548" />
                }
            ])
        }
    }

    //显示详细页面
    showDetail(page) {
        const { isLogin, userInfo, dispatch } = this.props;

        let container = null;
        switch(page) {
            case 'MyFavContainer':
                container = MyFavContainer;
                break;
            case 'MyOrdContainer':
                container = MyOrdContainer;
                break;
            case 'MyMsgContainer':
                container = MyMsgContainer;
                break;
            case 'MyMountContainer':
                container = MyMountContainer;
                break;
            case 'MyRecordContainer':
                container = MyRecordContainer;
                break;
            case 'MySettingContainer':
                container = MySettingContainer;
                break;
            default:
                container = null;
        }
        if(isLogin && userInfo.uid) {//判断用户是否登陆
            //退出操作
            if(page == 'logout') {
                this.logout();
            }

            if(container) {
                InteractionManager.runAfterInteractions(()=>{
                    this.props.navigator.push({
                        name: page,
                        component: container,
                        passProps: {
                            type: 'normal'
                        }
                    })
                })
            }
        }
        else {
            dispatch(appAct.showInfoBox('登陆后才能操作','error'));
        }
    }

    renderMyList(rowData: string, sectionID: number, rowID: number) {

        return (
            <TouchableOpacity onPress={()=>{this.showDetail(rowData.link)}}>
                <View style={styles.menuItem}>
                    {rowData.icon}
                    <View style={styles.menuItemText}>
                        <Text>{rowData.name}</Text>
                        <Icon color="#999" name="angle-right" style={styles.menuItemArrow} />
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    goLogin() {
        InteractionManager.runAfterInteractions(()=>{
            this.props.navigator.push({
                name: 'LoginContainer',
                component: LoginContainer,
                passProps: {
                    type: 'normal'
                }
            })
        })
    }

    goRegister() {
        InteractionManager.runAfterInteractions(()=>{
            this.props.navigator.push({
                name: 'RegisterContainer',
                component: RegisterContainer,
                passProps: {
                    type: 'normal'
                }
            })
        })
    }

    //退出登陆
    logout() {
        const {dispatch} = this.props;
        //请求退出接口
        dispatch(fetchData({
            url : REQURL.logout.url,
            requestType : REQURL.logout.type,
            successAction: appAN.LOGOUT,
            callback: function(data) {
                console.log(data)
            }
        }));
    }

    render() {
        const { isLogin, userInfo } = this.props;
        //头衔
        let [Iexp,Irich,Ivip,logout] = [null,null,null,null];

        //主播等级
        //roled=3为主播
        if(userInfo.lv_exp && userInfo.roled == 3) {
            Iexp = <LvIcon
                    type='exp'
                    lv={userInfo.lv_exp}
                    />
        }

        //财富等级
        if(userInfo.lv_rich > 1) {
            Irich = <LvIcon
                    type='rich'
                    lv={userInfo.lv_rich}
                    />
        }

        //贵族等级
        if(userInfo.vip > 0) {
            Ivip = <LvIcon
                    type='vip'
                    lv={userInfo.vip}
                    />
        }

        //当用户没任何等级和徽章
        if(Iexp == null && Irich == null && Ivip == null) {
            Iexp = "不详";
        }

        //头部信息
        let headerMsg = <View style={styles.headerMsgBtn}>
                            <TouchableOpacity style={styles.regBtn} onPress={this.goRegister}>
                                <Text style={styles.btnText}>注册</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.loginBtn} onPress={this.goLogin}>
                                <Text style={styles.btnText}>登陆</Text>
                            </TouchableOpacity>
                        </View>;

        if(isLogin && userInfo.uid) {//判断用户是否登陆
            headerMsg = <View style={styles.headerContent}>
                            <Text style={styles.headerName}>{userInfo.nickname}</Text>
                            <Text style={styles.headerMoney}>余额 {userInfo.points>0 ? userInfo.points : 0} <Icon color={STYLE.second} name="diamond" /></Text>
                        </View>;

        }

        //用户头像
        let headImg = require('../images/default-avatar.png');
        if(userInfo.headimg) {
            headImg = { uri : userInfo.headimg };
        }

        return (
            <View style={{backgroundColor:'#fbf9fe'}}>
                <Header
                    title="我的"
                    />

                <View style={styles.header}>
                    <Image source={require('../images/user-bg.jpg')} style={styles.headerBg} />
                    <Image source={headImg} style={styles.avatar} />
                    {headerMsg}
                </View>
                <View style={styles.content}>
                    <Text style={styles.name}>{userInfo.nickname}</Text>
                    <Text style={styles.desc}>ID：{userInfo.uid ? userInfo.uid : "不详"}</Text>
                    <Text style={styles.desc}>邮箱：{userInfo.safemail ? userInfo.safemail  :"不详"}</Text>
                    <Text style={styles.desc}>头衔：{Iexp} {Irich} {Ivip}</Text>
                </View>
                <ListView
                    style={{marginTop:10}}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderMyList.bind(this)}
                    />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        width: WINDOW.width,
        height: WINDOW.width * 267 / 720,
        //shadowColor: '#000',
        //shadowOffset: {width: 555, height: 555}
    },

    menuItem: {
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:15,
        backgroundColor:'#fff',
        height:45
    },

    menuItemIcon: {
        fontSize: 20,
        marginRight:15,
        marginTop:2,
    },

    menuItemText: {
        flex:1,
        borderBottomWidth:0.5,
        borderBottomColor:'#f1f1f1',
        paddingBottom:15,
        paddingTop:15,
    },

    menuItemArrow: {
        fontSize:20,
        position:'absolute',
        right:20,
        top:12
    },

    headerContent: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center'
    },

    headerName: {
        color : '#fff',
        fontSize: 18
    },

    headerMoney: {
        color: '#fff',
        fontSize: 12,
        marginTop: 5
    },

    content: {
        backgroundColor: '#fff',
        padding: 15,
        shadowColor: "#555",
        shadowOpacity: 0.5,
        shadowOffset: {
            height: -1,
            width: 0
        }
    },

    name: {
        fontSize: 18,
        lineHeight: 30,
    },

    desc: {
        fontSize: 12,
        lineHeight: 20,
        color: '#777'
    },

    headerBg: {
        width: WINDOW.width,
        height: WINDOW.width * 267 / 720,
        resizeMode: 'contain',
        position: 'absolute',
        top: 0,
        left: 0,
    },
    regBtn: {
        backgroundColor: 'transparent',
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 25,
        paddingRight: 25,
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 4,

    },
    loginBtn: {
        backgroundColor: 'rgba(255,255,255,.5)',
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 25,
        paddingRight: 25,
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
        borderRadius: 4,
    },

    btnText: {
        color: '#fff'
    },

    avatar: {
        width: 70,
        height: 70,
        borderRadius: 35,
        resizeMode: 'contain',
        marginTop: 15,
        borderWidth: 2,
        borderColor: '#fff'
    },

    headerMsgBtn: {
        flexDirection:'row',
    }
})