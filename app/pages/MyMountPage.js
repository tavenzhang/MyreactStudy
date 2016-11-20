/**
 * Created by soga on 16/10/25.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    TouchableHighlight,
    InteractionManager,
    ScrollView
} from 'react-native';

import {Header} from '../components';

import {appAct,fetchData,appAN} from '../actions';

import { STYLE, WINDOW, REQURL, CONFIG } from '../config'
import { changeDate } from '../utils/util'

import { RechargeContainer } from '../containers'


export default class MyMountPage extends Component {
    constructor(props){
        super(props);
        this.getMount    = this.getMount.bind(this);
        this.goRecharge  = this.goRecharge.bind(this);
    }

    componentDidMount() {
        //加载数据
        const {myMount} = this.props;

        if(!myMount.length) {
            this.getMount();
        }
    }

    /**
     * 获取坐骑数据
     */
    getMount() {
        const {dispatch} = this.props;
        dispatch(fetchData({
            url : REQURL.getMyMount.url,
            requestType : REQURL.getMyMount.type,
            successAction : appAN.UPDATE_MYMOUNT
        }));
    }

    /**
     * 装配坐骑
     */
    equip(gid) {
        const {dispatch} = this.props;
        const getMountData = this.getMount;

        dispatch(fetchData({
            url : REQURL.equipMount.url,
            requestType : REQURL.equipMount.type,
            requestData : {
                "handle": "equip",
                "gid": gid
            },
            callback : function(data) {
                if(data.status == 1) {
                    dispatch(appAct.showInfoBox('装配成功'));
                    //重新获取数据
                    getMountData();
                }
            }
        }));
    }

    /**
     * 取消装配
     */
    cancelEquip() {
        const {dispatch} = this.props;
        const getMountData = this.getMount;

        dispatch(fetchData({
            url : REQURL.cancelMount.url,
            requestType : REQURL.cancelMount.type,
            callback : function(data) {
                if(data.status == 1) {
                    //重新获取数据
                    getMountData();
                    dispatch(appAct.showInfoBox('装配取消成功'));
                }
            }
        }));
    }

    /**
     * 去充值页面
     */
    goRecharge() {
        InteractionManager.runAfterInteractions(()=>{
            this.props.navigator.push({
                name: 'RechargeContainer',
                component: RechargeContainer,
                passProps: {
                    type: 'normal'
                }
            })
        })
    }

    render(){
        const {myMount} = this.props;
        return (
            <View style={styles.container}>
                <Header
                    title='我的道具'
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
                        myMount.map((v,i) => {
                            const edate = changeDate(v.expires);
                            const edateStr = `截止日期：${edate}`;

                            let [status, canEquiped, btnLabel] = ["",false,null];//道具状态

                            if(v.gid < 120001 || v.gid > 121000) {
                                status = "不可装备";
                                btnLabel = <TouchableHighlight style={styles.btn}><Text style={{color:'#999'}}>不可装备</Text></TouchableHighlight>
                            }
                            else if(v.expires *1000 < (new Date()).valueOf()) {
                                status = "已过期";
                                btnLabel = <TouchableHighlight style={styles.btn} onPress={()=>this.goRecharge()}>
                                                <Text style={{color:STYLE.primary}}>前去续费</Text>
                                            </TouchableHighlight>
                            }
                            else {
                                if(v.equip.length == 0) {
                                    status = "未装备";
                                    canEquiped = true;
                                    btnLabel = <TouchableHighlight style={styles.btn} onPress={()=>this.equip(v.gid)}>
                                                    <Text style={{color:STYLE.second}}>立即装备</Text>
                                                </TouchableHighlight>
                                }
                                else {
                                    for(var prop in v.equip ) {
                                        if( prop == v.gid ) {
                                            status = "已装备";
                                            btnLabel = <TouchableHighlight style={styles.btn} onPress={()=>this.cancelEquip()}>
                                                            <Text style={{color:'green'}}>取消装备</Text>
                                                        </TouchableHighlight>
                                        }
                                        else {
                                            status = "未装备";
                                            canEquiped = true;
                                            btnLabel = <TouchableHighlight style={styles.btn} onPress={()=>this.equip(v.gid)}>
                                                            <Text style={{color:STYLE.second}}>立即装备</Text>
                                                        </TouchableHighlight>
                                        }
                                    }
                                }
                            }

                            //坐骑图片地址
                            const imgSrc = `${CONFIG.giftPath}gift_material/${v.gid}.png`;

                            return (
                                <View key={i} style={styles.item}>
                                    <Text style={styles.header}>{v.name}</Text>
                                    <Text style={styles.desc}>{edateStr}</Text>
                                    <Image source={{uri:imgSrc}} style={styles.iconImg} />
                                    <Text style={styles.desc}>{v.desc}</Text>
                                    {btnLabel}
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

    item: {
        paddingTop: 10,
        paddingRight: 15,
        paddingBottom: 10,
        marginBottom:10,
        marginLeft: 15,
        borderBottomWidth: 0.5,
        borderBottomColor: '#dddddd',

    },
    header: {
        lineHeight:30,
        fontSize:16,
        marginBottom:5
    },

    desc: {
        fontSize:12,
        color:'#555',
        lineHeight:18
    },

    btn: {
        marginTop: 15
    },

    iconImg: {
        height: 80,
        resizeMode: 'contain',
        margin: 10
    }
});