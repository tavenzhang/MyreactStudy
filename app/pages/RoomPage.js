/**
 * Created by soga on 16/10/30.
 */
'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TextInput,
    InteractionManager,
    TouchableOpacity,
    ScrollView,
    Alert,
    Platform,
    NativeModules,
    Modal
} from 'react-native';

import { TabViewAnimated, TabBarTop, ChatList, AudienceList, GiftRank, LvIcon, RoomMsg, GiftPanel, UserMount, GiftEffect } from '../components';
import Video from 'react-native-video';
import { REQURL, CONFIG, STYLE, WINDOW } from '../config';

import Icon from 'react-native-vector-icons/FontAwesome';
import CookieManager from 'react-native-cookies';

import { rnd } from '../utils/util';

//action
import { wsAct, appAct, fetchData, wsAN } from '../actions';

import {
    LoginContainer,
} from '../containers';

const getSocketAddress = (host,port) => {
    return "ws://"+host+":"+port+"/ws";
};

export default class RoomPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            chatMsg: '',
            routes: [
                { key: '1', title: '聊天' },
                { key: '2', title: '观众' },
                { key: '3', title: '本日贡献' },
                { key: '4', title: '房间消息' },
            ],
        }

        this.isLogin          = this.isLogin.bind(this);
        this.connectSocket    = this.connectSocket.bind(this);
        this.sendMsg          = this.sendMsg.bind(this);
        this.getUid           = this.getUid.bind(this);
    }

    componentWillMount() {
        //加载数据
        const {dispatch,showVideo,gifts} = this.props;

        if(!showVideo) {
            dispatch(wsAct.showVideo(true));
        }

        //链接socket
        const connSocket = this.connectSocket;

        const getUidApp = this.getUid;

        //判断是否有session，没有的话，请求后在登陆
        CookieManager.getAll((err, res) => {
            if (!!res.PHPSESSID && !!res.PHPSESSID.value) {
                connSocket();
            }
            else {
                getUidApp(function(){
                    connSocket();
                })
            }
        })

        //获取礼物数据
        if(!gifts.length) {
            dispatch(fetchData({
                url : REQURL.getGifts.url,
                requestType : REQURL.getGifts.type,
                requestModel : REQURL.getGifts.model,
                successAction : wsAN.UPDATE_GIFTS
            }));
        }

        //定时10分钟执行请求一次session，防止网站过期
        setInterval(()=>{
            getUidApp();
        },1000 * 60 * 15);
    }

    componentWillUpdate(nextProps, nextState) {
        const {alertDialog,dispatch} = this.props;
        const alertDialogNext = nextProps.alertDialog;

        if( alertDialog.content != alertDialogNext.content) {

            if(alertDialogNext.show) {
                //弹出框内容
                let dialogContent = alertDialogNext.content;

                //提示登录注册的actions
                let alertActions = [
                    {text: '知道了', onPress: ()=>dispatch(wsAct.showAlertDialog(false,''))}
                ];

                if(alertDialogNext.type == 1) {//普通弹出框
                    alertActions.push({text: '重新连接', onPress: () => this.reConnectSocket()})
                }

                if(alertDialogNext.type == 5) {//只有关闭按钮的提示框

                }

                if(alertDialogNext.type == 6) {//动态内容窗口
                    let winers = "";

                    if(alertDialogNext.content.items) {
                        alertDialogNext.content.items.map((v,i)=>{
                            winers += v.name + "、";
                        })
                    }

                    const names = `恭喜以下用户中奖： ${winers.substr(0,winers.length-1)}`;
                    const dialogDesc = "奖品：" + alertDialogNext.content.detail;

                    dialogContent = names + "\n" +dialogDesc;

                }

                Alert.alert(
                    alertDialogNext.title,
                    dialogContent,
                    alertActions
                )
            }
        }
    }

    componentDidMount() {
        const {dispatch,isLogin} = this.props;
        //没登陆用户5分钟后移除视频框，弹出登录框
        if(!isLogin) {
            setTimeout(function(){
                dispatch(wsAct.showVideo(false));
                dispatch(wsAct.showAlertDialog(true,'用户登录后才能继续观看~',9));
            },5*60*1000)
        }

        //const keySendMsg = this.sendMsg;
        //window.onkeydown = function(e){
        //    if(e.keyCode === 13) {
        //        keySendMsg();
        //        window.focus();
        //    }
        //}
    }

    componentDidUpdate() {
        const {dispatch,videoUrls,seleVideoSrc} = this.props;
        //console.log("=======>",this.refs.chatInput)
        console.log("=======>view",this.refs.scrollView)
        console.log("=======>test",this.refs.test)
        //设置聊天窗口最新消息一直在最下边
        //this.refs.scrollView.scrollTo(999999999);
        //this.refs.chatBox.parentNode.scrollTop = 99999999;
        //console.log(this.refs.scrollView)
        //获取视频地址
        if(videoUrls.length > 0 && seleVideoSrc.length == 0) {
            dispatch(wsAct.getVideoUrl(videoUrls[0].split("@@")[0]));
        }
    }

    /**
     * 连接socket
     */
    connectSocket() {
        const {dispatch,navigator,socketConnect,roomid} = this.props;
        //console.log(this.props.navigator.getCurrentRoutes()[1].passProps )
        //const roomid = 1000014;
        //链接socket
        //移动版：139.59.240.47   一般请求：20036  聊天：20037  送礼：20038

        if(!socketConnect) {

            //获取socket地址
            dispatch(fetchData({
                url : REQURL.socketAddr.url+"?rid="+roomid,
                //requestData : { rid : roomid},
                requestType : REQURL.socketAddr.type,
                requestModel : REQURL.socketAddr.model,
                callback: function(data) {
                    if(data && data.ret == 1) {
                        let mcHosts = data.host.split(",");
                        const host = mcHosts[rnd(0,mcHosts.length)];
                        dispatch(wsAct.connect(getSocketAddress(host,data.mcMainPort),{
                            type : 'common',
                            roomid : roomid,
                            callback : function(e) {
                                //通用socket登陆后，根据返回的extck值，登陆聊天和送礼socket
                                //聊天socket
                                dispatch(wsAct.connect(getSocketAddress(host,data.mcChatPort),{
                                    type : 'chat',
                                    extck: e
                                }));
                                //送礼socket
                                dispatch(wsAct.connect(getSocketAddress(host,data.mcGiftPort),{
                                    type : 'gift',
                                    extck: e
                                }));
                            }
                        }));
                    }
                }
            }));
        }
    }

    reConnectSocket() {
        const {dispatch} = this.props;
        //初始化房间内信息
        dispatch(wsAct.resetWsState());
        //重连socket
        this.connectSocket();
    }

    /**
     * 请求用户数据，防止网站过期
     */
    getUid(callback) {

        fetch(REQURL.getUid.url).then(response => response.json())
            .then(res => {
                console.log(res)
                //回调
                if(callback) {
                    callback();
                }
            })
            .catch(e => {
                console.log("=========================error")
                console.log(e)
            })
    }

    /**
     * 发消息
     * @param e
     */
    sendMsg(e) {
        //e.preventDefault();
        const {dispatch} = this.props;

        const chatContent = this.state.chatMsg;
        if(this.isLogin()) {//是否登录
            if(chatContent) {
                dispatch(wsAct.postMessage(chatContent));
                //重置输入框数据
                this.setState({
                    chatMsg : ""
                })
            }
            else {
                dispatch(appAct.showInfoBox('聊天内容不能为空~','error'))
            }
        }
        else {
            Alert.alert(
                '系统提示',
                '用户登陆后才可以送礼~',
                [
                    {text: '立即登录', onPress: () => this.goLogin()},
                    {text: '取消'}
                ]
            )
        }
    }

    /**
     * 显示礼物对话框
     */
    showGift() {
        const { dispatch } = this.props;
        if(this.isLogin()) { //判断用户是否登录
            dispatch(wsAct.openGiftDialog(true));
        }
        else {
            Alert.alert(
                '系统提示',
                '用户登陆后才可以送礼~',
                [
                    {text: '立即登录', onPress: () => this.goLogin()},
                    {text: '取消'}
                ]
            )
        }
    }

    /**
     * 送礼物
     */
    sendGift(giftNum) {
        const { dispatch, navigator, currentSeleGift, roomid } = this.props;

        if(currentSeleGift) {
            const giftData = {
                gnum : parseInt(giftNum) || 1,
                gid : currentSeleGift,
                uid : roomid,//主播id
                cmd : 40001 //请求报文
            };
            //console.log(giftData)
            dispatch(wsAct.sendGift(giftData));
            //关闭礼物框
            dispatch(wsAct.openGiftDialog(false));
        }
        else {
            dispatch(appAct.showInfoBox('请先选择礼物~','error'));
        }
    }

    //判断用户是否已登录
    isLogin() {
        const { uid, isLogin} = this.props;
        if(uid && isLogin) {
            return true;
        }
        else {
            return false;
        }
    }

    //去登陆页面
    goLogin() {
        const {dispatch,navigator,roomid} = this.props;

        //断开socket链接
        //dispatch(wsAct.logout());

        InteractionManager.runAfterInteractions(()=>{
            navigator.push({
                name: 'LoginContainer',
                component: LoginContainer,
                passProps: {
                    type: 'normal',
                    from: 'room',
                    roomid: roomid
                }
            })
        })
    }

    //返回来源
    backhome() {
        const {dispatch,from,navigator} = this.props;
        //断开socket链接
        dispatch(wsAct.logout());

        if(from == 'login') {
            navigator.popToTop()
        }
        else {
            navigator.pop()
        }
    }

    //切换聊天，送礼，房间信息等tab键
    //changeTab(e) {
    //    const {dispatch} = this.props;
    //    //设置当期选择的tab值
    //    dispatch(appAct.setVideoTabIndex(e));
    //}

    //切换礼物tab键
    //changeGiftTab(e) {
    //    const {dispatch} = this.props;
    //    //设置当期选择的tab值
    //    dispatch(wsAct.setGiftTabIndex(e));
    //}


    //设置当前选中的礼物id
    setCurrentSelectGift(gid) {
        const { dispatch } = this.props;
        dispatch(wsAct.setSeleGift(gid));
    }

    _handleChangeTab = index => {
        this.setState({ index });
    };

    _renderHeader = props => {
        return <TabBarTop
            {...props}
            //scrollEnabled
            indicatorStyle={styles.indicator}
            style={styles.tabbar}
            labelStyle={styles.label}
            />;
    };


    _renderScene = ({ route }) => {
        const { messages, uid, admins, audiences, todayGifts, seleVideoSrc, roomMsg } = this.props;
        let content = null;
        switch (route.key) {
            case '1':
                content = <ChatList data={messages} uid={uid} ref="test" />
                break;

            case '2':
                content = <View>
                            <AudienceList data={admins} type="admin" />
                            <AudienceList data={audiences} type="audience" />
                        </View>
                break;

            case '3':
                content = <GiftRank data={todayGifts} />
                break;

            case '4':
                let zhubo = null;
                if(seleVideoSrc.length > 0) {
                    const zhuboMsg = seleVideoSrc[0];

                    //主播信息
                    zhubo = <View style={styles.roomMain}>
                                <Image source={{ uri : CONFIG.imageServe + zhuboMsg.headimg }} style={styles.roomAvatar} />
                                <View style={{ flexDirection:'row', alignItems:'center' }}>
                                    <Text style={styles.roomHosterName} >{zhuboMsg.name} </Text>
                                    <LvIcon lv={zhuboMsg.lv} />
                                </View>
                            </View>
                }
                content = <View>
                                {zhubo}
                                <RoomMsg data={roomMsg} />
                            </View>
                break;

            default:
                content = null;
        }

        return <ScrollView
                scrollEventThrottle={200}
                ref={scrollView=>this.scrollBottom(scrollView)}
                //ref="scrollView"
                //onContentSizeChange={(w, h) => this.contentHeight = h}
                key={route.key}
                style={{
                            height: WINDOW.height - STYLE.swipHeaderHeight - WINDOW.width*3/4 - 40,
                        }}
                contentContainerStyle={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            justifyContent:'center',
                        }}
                >
                {content}
            </ScrollView>
    };

    scrollBottom(scrollView) {
        if(scrollView) {
            console.log("777777777777777777777777777777777")
            if (Platform.OS === 'android') { // android可以直接9999，ios不行，会滚出去
                scrollView.scrollTo({y: 9999});
            } else {
                NativeModules.UIManager.measure(scrollView.getInnerViewNode(),
                    (...arg) => {// x y width height pageX pageY
                        let contentHeight = arg[3];
                        NativeModules.UIManager.measure(scrollView.getScrollableNode(),
                            (...arg2) => {
                                let scrollHeight = arg2[3];
                                let scrollY = contentHeight - scrollHeight;// 内容高-容器高
                                if (scrollY > 0) { // 小于等于0说明没有滚动条不用滚动
                                    scrollView.scrollTo({y: scrollY});
                                }
                            });

                    });
            }
        }
    }

    changeChatMsg(e) {
        //this.state.chatMsg = e.trim();
        this.setState({
            chatMsg : e
        })
    }

    render() {
        const { dispatch, slideIndex, audiences, admins, messages, roomMsg, uid, todayGifts, gifts, openGiftDialog, slideGiftIndex, currentSeleGift, alertDialog, money, userMount, sendGifts, seleVideoSrc, showVideo, moneyTotal } = this.props;

        //视频资源地址
        let [video,zhubo] = [null,null];
        if(seleVideoSrc.length > 0) {
            const zhuboMsg = seleVideoSrc[0];

            const videoSrc = `${zhuboMsg['rtmp'] +"/" + zhuboMsg['sid'] + "_ff.m3u8"}`;
            console.log(videoSrc)
            //http://playertest.longtailvideo.com/adaptive/bipbop/gear4/prog_index.m3u8
            //http://45.55.6.80:8082/proxypublish/14003608375095100|B2E442C5392FFCC1C2C89A62942A337E_ff.m3u8
            video = <Video source={{uri: "http://playertest.longtailvideo.com/adaptive/bipbop/gear4/prog_index.m3u8"}}
                           style={styles.backgroundVideo}
                           resizeMode="cover" repeat={true} key="video">
                    </Video>
        }

        return (
            <View style={styles.container}>
                { showVideo ? video : null }
                <Image source={require('../images/videoBg_default.jpg')} style={styles.videoBg} />
                <TouchableOpacity onPress={()=>this.backhome()} style={styles.backIcon}>
                    <Icon name="arrow-circle-left" size={30} color="#fff"  />
                </TouchableOpacity>
                <View style={styles.giftNumsBg}>
                    <Text style={styles.giftNums}>收礼：{moneyTotal} </Text>
                    <Icon color={STYLE.second} name="diamond" />
                </View>
                <View style={styles.operateBox}>
                    <TouchableOpacity style={styles.giftIconBox} onPress={()=>this.showGift()}>
                        <Icon name="gift" size={30} color={STYLE.primary}  />
                    </TouchableOpacity>
                    <View style={styles.inputBox}>
                        <TextInput
                            ref="chatInput"
                            style={styles.chatInput}
                            blurOnSubmit={true}
                            placeholder='和大家聊天吧~~'
                            value={this.state.chatMsg}
                            onChangeText={e=>this.changeChatMsg(e)}
                            onSubmitEditing={()=>this.sendMsg()}
                            />
                    </View>
                </View>
                <TabViewAnimated
                    style={styles.roomTabs}
                    navigationState={this.state}
                    renderScene={this._renderScene.bind(this)}
                    renderHeader={this._renderHeader}
                    onRequestChangeTab={this._handleChangeTab.bind(this)}
                    />

                { gifts.length ?
                    <GiftPanel
                        show={openGiftDialog}
                        close={() => dispatch(wsAct.openGiftDialog(false))}
                        data={gifts}
                        setCurrentSelectGift={e=>this.setCurrentSelectGift(e)}
                        currentSeleGift={currentSeleGift}
                        money={money}
                        sendGift={num=>this.sendGift(num)}
                        /> : null
                }

                <GiftEffect data={sendGifts} />
                <UserMount data={userMount} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        position: 'relative',
    },
    backgroundVideo: {
        width: WINDOW.width,
        height: WINDOW.width * 3 / 4,
        position: 'absolute',
        zIndex: 10,
        top: 0,
        left: 0
    },

    videoBg: {
        width: WINDOW.width,
        height: WINDOW.width * 3 / 4,
        position: 'absolute',
        top: 0,
        left: 0
    },

    operateBox: {
        flex: 1,
        height: 40,
        width: WINDOW.width,
        position: 'absolute',
        borderTopWidth: 0.5,
        borderTopColor: '#ccc',
        zIndex: 10,
        bottom: 0,
        left: 0,
        flexDirection: 'row',
        //justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee'
    },

    backIcon: {
        position: 'absolute',
        zIndex: 100,
        top: 15,
        left: 5,
        backgroundColor:'transparent'
    },

    giftNumsBg: {
        position: 'absolute',
        zIndex: 100,
        top: 18,
        right: 5,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop:5,
        paddingBottom:5,
        paddingLeft:8,
        paddingRight:8,
        backgroundColor:'rgba(255,255,255,.5)'
    },

    giftNums: {
        fontSize: 12,
    },

    giftIconBox: {
        width: WINDOW.width*0.15,
        flexDirection: 'row',
        justifyContent: 'center',
    },

    inputBox: {
        width: WINDOW.width*0.85,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    chatInput: {
        backgroundColor: '#fff',
        width: WINDOW.width*0.80,
        height: 30,
        borderRadius:3,
        paddingLeft:10,
        paddingRight:10,

    },

    roomTabs: {
        position: 'relative',
        top: WINDOW.width * 3 / 4,
        left: 0,
    },

    tabbar: {
        backgroundColor: 'white',
    },

    indicator: {
        backgroundColor: STYLE.primary,
    },

    label: {
        color: STYLE.primary,
        fontWeight: '400',
    },

    roomMain: {
        flexDirection:'row',
        width: WINDOW.width,
        padding: 15,
        alignItems: 'center',
        flex:1,
        backgroundColor: '#f1f1f1'
        //borderBottomWidth: 0.5,
        //borderBottomColor: '#',
    },

    roomAvatar: {
        width: 50,
        height:50,
        resizeMode: 'contain',
        shadowColor: "#444",
        borderRadius:25,
        marginRight: 15,
        shadowOpacity: 0.5,
        shadowOffset: {
            height: 1,
            width: 0
        }
    },

    roomHosterName: {
        fontSize: 20,
        color: STYLE.primary
    },

});