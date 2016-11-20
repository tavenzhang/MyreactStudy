/**
 * Created by soga on 16/11/2.
 */
import React, {Component,PropTypes} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native';

import { changLinkMsg } from '../../utils/util'
import {STYLE,CONFIG,WINDOW} from '../../config'


class RoomMsg extends Component {

    static propTypes = {
        data : PropTypes.any.isRequired
    };

    static defaultProps = {
    };

    render() {
        const { data } = this.props;
        //console.log(data)
        return (
            <View >
                {data.map(( v, index ) => {
                    let [msg] = [null];

                    //把含有链接的文字转换
                    const newMsgData = changLinkMsg(v.msg);
                    let newMsg = null;
                    if(newMsgData.length >1) {//含有链接的文字
                        newMsg = <Text style={styles.chatText}>
                                    {newMsgData[0]}
                            <Text style={styles.second} href={newMsgData[2]} target="_blank">{newMsgData[3]}</Text>
                            {newMsgData[1]}
                                </Text>
                    }
                    else {
                        newMsg = newMsgData[0];
                    }

                    if(v.type == 3) {//系统消息
                        msg = <Text style={styles.chatText}>【<Text style={styles.markSecond}>系统公告</Text>】{newMsg}</Text>;
                    }

                    if(v.type == 1) {//主播房间信息
                        msg = <Text style={styles.chatText}>【<Text style={styles.markSecond}>房间公告</Text>】{newMsg}</Text>;
                    }

                    return (
                        <View  key={index} style={styles.chatItem}>{msg}</View>
                    )
                })}
            </View>
        )
    }};

export default RoomMsg;

const styles = StyleSheet.create({
    chatItem: {
        height: 24,
        width: WINDOW.width,
        justifyContent: 'center',
        paddingLeft: 5,
        paddingRight: 5,
    },
    chatItemChild: {
        height: 24,
        flexDirection: 'row',
        width: WINDOW.width - 10,
        alignItems: 'center',
    },
    chatText: {
        fontSize: 13,
        color: '#444'
    },
    markPrimary: {
        color: STYLE.primary
    },
    markSecond: {
        color: STYLE.second
    },
})