/**
 * Created by soga on 16/10/25.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    InteractionManager,
    ScrollView
} from 'react-native';

import {Header} from '../components';

import {appAct,fetchData,appAN} from '../actions';

import { REQURL, WINDOW, STYLE } from '../config';

export default class MyMsgPage extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {
        //加载数据
        const {dispatch,myMsg} = this.props;

        if(!myMsg.length) {
            dispatch(fetchData({
                url : REQURL.getMyMsg.url,
                requestType : REQURL.getMyMsg.type,
                successAction : appAN.UPDATE_MYMSG,
            }));
        }
    }

    render(){

        const { myMsg } = this.props;
        return (
            <View style={styles.container}>
                <Header
                    title='我的信箱'
                    leftIcon='chevron-left'
                    leftIconAction={()=>{
                        InteractionManager.runAfterInteractions(()=>{
                            this.props.navigator.pop();
                        })
                    }}
                    />

                <ScrollView
                    scrollEventThrottle={200}
                    style={{
                        height:  WINDOW.height - STYLE.headerBannerHeight
                    }}
                    >
                    {
                        myMsg.map((v,i) => {
                            return (
                                <View key={i} style={styles.msgItem}>
                                    <Text style={styles.header}>收件日期：{v.created}</Text>
                                    <Text style={styles.desc}>{v.content}</Text>
                                </View>
                            )
                        })
                    }
                </ScrollView>


            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    msgItem: {
        flex: 1,
        padding: 15,
        paddingLeft: 0,
        marginLeft: 15,
        borderBottomWidth: 0.5,
        borderBottomColor: '#dddddd',
    },

    header: {
        lineHeight:30
    },

    desc: {
        fontSize:12,
        color:'#555'
    }
});