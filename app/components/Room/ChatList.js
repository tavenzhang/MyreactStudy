/**
 * Created by soga on 16/10/31.
 */
import React, {Component,PropTypes} from 'react';
import { CONFIG, STYLE, WINDOW } from '../../config';
//import { changLinkMsg } from '../../utils/util'
import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native';
import {LvIcon} from '../';

class ChatList extends Component {

    static propTypes = {
        data : PropTypes.any.isRequired,
        uid : PropTypes.any.isRequired
    };

    static defaultProps = {
    };

    //componentDidUpdate() {
    //    //scrollTop();
    //    this.refs.test.scrollTop = 99999999
    //    console.log(this.refs.test.scrollTop)
    //}

    render() {
        const { data, uid } = this.props;

        return (
            <View style={styles.container}>
                {data.map(( v, index ) => {
                    let msg = null;
                    //财富等级
                    let lvIcon = <LvIcon type="rich" lv={v.richLv} />
                    let vipIcon = <LvIcon type="vip" lv={v.vip} />

                    //用户进入房间消息
                    if(v.cmd == 11002) {
                        let mount = null;
                        if(v.car) {
                            const giftSrc = `${CONFIG.giftPath}gift_material/${v.car}.png`;

                            mount = <View style={{ flexDirection: 'row', alignItems:'center'}}>
                                        <Text style={styles.userEnterText}>开着座驾</Text>
                                        <Image source={{uri: giftSrc}} style={styles.chatItemIcon} />
                                    </View>
                        }

                        msg = <View style={styles.userEnter}>
                                <Text style={styles.userEnterText}>欢迎【</Text>
                                {vipIcon}
                                {lvIcon}
                                <Text style={styles.userEnterText}>{v.name}】</Text>
                                {mount}
                                <Text style={styles.userEnterText}>进入房间</Text>
                            </View>
                    }

                    //聊天
                    if(v.cmd == 30001) {
                        switch(v.type) {
                            case 0://聊天
                                let lvIconChat = <LvIcon type="rich" lv={v.richLv} />
                                let vipIconChat = <LvIcon type="vip" lv={v.vip} />
                                const sendName = v.sendUid == uid ? "我" : v.sendName;
                                msg = <View style={styles.chatItemChild}>
                                        <Text style={styles.chatText}> {v.date} </Text>
                                        {vipIconChat}
                                        {lvIconChat}
                                        <Text style={styles.markSencond}>{sendName}</Text>
                                        <Text style={styles.chatText}>：{v.content}</Text>
                                    </View>
                                break;

                            case 3://系统消息
                                //把含有链接的文字转换
                                //const newMsgData = changLinkMsg(v.content);
                                //let newMsg = null;
                                //if(newMsgData.length >1) {//含有链接的文字
                                //    newMsg = <Text>
                                //    {newMsgData[0]}
                                //        <a className="str-link" href={newMsgData[2]} target="_blank">{newMsgData[3]}</a>
                                //        {newMsgData[1]}
                                //</Text>
                                //}
                                //else {
                                //    newMsg = newMsgData[0];
                                //}
                                //msg = <span>【<span className="mark">公告</span>】{newMsg}</span>;
                                msg = <Text style={styles.markRed}>【公告】</Text>;
                                break;

                            case 6://升级消息
                                let lvIcon = <LvIcon type="rich" lv={v.richLv} />;//等级icon，默认用户
                                if(v.content.indexOf("||@icon||") > 0) {//表示主播
                                    lvIcon = <LvIcon type="exp" lv={v.lv} />;
                                }

                                msg = <View style={styles.chatItemChild}>
                                        <Text style={styles.chatText}>【</Text>
                                        <Text style={styles.markRed}>贺语</Text>
                                        <Text style={styles.chatText}>】恭喜</Text>
                                        <Text style={styles.markRed}> {v.sendName} </Text>
                                        <Text style={styles.chatText}>晋升为</Text>
                                        {lvIcon}
                                    </View>
                                break;

                            case 7://开通贵族
                                let vipIcon = <LvIcon type="vip" lv={v.vip} />;//贵族icon

                                msg = <View style={styles.chatItemChild}>
                                        <Text style={styles.chatText}>【</Text>
                                        <Text style={styles.markPrimary}>贵族</Text>
                                        <Text style={styles.chatText}>】</Text>
                                        <Text style={styles.chatText}>恭喜</Text>
                                        <Text style={styles.markPrimary}> {v.sendName} </Text>
                                        <Text style={styles.chatText}>开通</Text>
                                        {vipIcon}
                                    </View>
                                break;

                            case 10://贵族到期
                                let vipIconExpir = <LvIcon type="vip" lv={v.icon} />;//贵族icon

                                const contents = v.content.split("||");
                                msg = <View style={styles.chatItemChild}>
                                        <Text style={styles.chatText}>【</Text>
                                        <Text style={styles.markPrimary}>贵族</Text>
                                        <Text style={styles.chatText}>】您的</Text>
                                        {vipIconExpir}
                                        <Text style={styles.chatText}>{contents[2]}</Text>
                                       </View>
                                break;


                            default:
                                msg = <Text style={styles.chatText}>{v.content}</Text>
                        }
                    }

                    //送礼
                    if(v.cmd == 40001) {
                        //<span className="date">[{v.date}]</span>
                        const sendName = v.sendUid == uid ? "我" : v.sendName;
                        const giftSrc = `${CONFIG.giftPath}gift_material/${v.gid}.png`;
                        const giftIcon = <View><Image source={{uri: giftSrc}} style={styles.chatItemIcon} /></View>

                        msg = <View style={styles.chatItemChild}>
                                <Text style={styles.chatText}>【</Text>
                                <Text style={styles.markPrimary}>礼物</Text>
                                <Text style={styles.chatText}>】</Text>
                                <Text style={styles.markPrimary}>{sendName} </Text>
                                <Text style={styles.chatText}>赠送给 </Text>
                                <Text style={styles.markPrimary}>{v.recName}</Text>
                                {giftIcon}
                                <Text style={styles.markPrimary}>x{v.gnum}</Text>
                             </View>
                        }

                    //系统信息
                    if(v.cmd == 1) {
                        msg = <Text style={styles.chatText}>【系统】{v.content}</Text>;
                    }

                    return (
                        <View key={index} style={styles.chatItem} >
                            {msg}
                        </View>
                    )
                })}
            </View>
        )
    }};

export default ChatList;

const styles = StyleSheet.create({
    container: {
        width:WINDOW.width,
        //height:WINDOW.height - STYLE.swipHeaderHeight - WINDOW.width*3/4 - 40,
        backgroundColor: '#fff',
        position: 'relative',
    },
    chatItem: {
        height: 24,
        width:WINDOW.width,
        justifyContent:'center',
        paddingLeft:5,
        paddingRight:5,
    },
    chatItemChild: {
        height: 24,
        flexDirection: 'row',
        width:WINDOW.width - 10,
        alignItems:'center',
    },
    chatText: {
        fontSize:13,
        color:'#444'
    },
    markPrimary: {
        color: STYLE.primary
    },
    markRed: {
        color: '#f71459'
    },
    markSencond: {
        color: STYLE.second
    },
    userEnter: {
        width:WINDOW.width-10,
        height:25,
        marginTop:8,
        marginBottom:8,
        flexDirection: 'row',
        backgroundColor:STYLE.primary,
        justifyContent:'center',
        alignItems:'center'
    },
    userEnterText: {
        fontSize:12,
        color:'#fff'
    },
    chatItemIcon: {
        height:20,
        width:20,
        marginLeft:2,
        marginRight:2,
        resizeMode:'contain'
    }
});