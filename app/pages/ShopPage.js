/**
 * Created by soga on 16/10/24.
 */
'use strict';

import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Alert,
    TouchableHighlight,
    InteractionManager,
    RefreshControl
} from 'react-native';

//组件
import { Header, TabViewAnimated, TabBarTop, ShopGiftPanel } from '../components';

//actions
import { appAct, appAN, fetchData } from '../actions';

//config
import { REQURL, CONFIG, STYLE, WINDOW } from '../config';

import { RechargeContainer, LoginContainer } from '../containers';
import { isEmptyObj } from '../utils/util'


export default class ShopPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            routes: [
                { key: '1', title: '普通坐骑' },
                { key: '2', title: 'VIP特权专属' },
                { key: '3', title: '开通VIP特权' }
            ],
        }

        this._handleChangeTab    = this._handleChangeTab.bind(this);
        this.gotologin           = this.gotologin.bind(this);
        this.buyMounts           = this.buyMounts.bind(this);
        this.buyVIP              = this.buyVIP.bind(this);
        this.getVIPMount         = this.getVIPMount.bind(this);
        this.getVIPMount         = this.getVIPMount.bind(this);
        this.getShops            = this.getShops.bind(this);

    }


    componentDidMount() {
        //交互管理器在任意交互/动画完成之后，允许安排长期的运行工作. 在所有交互都完成之后安排一个函数来运行。
        InteractionManager.runAfterInteractions(() => {
            //加载数据
            const { mounts, vipmount, vipIcons } = this.props;
            if(mounts.length == 0 || vipmount.length == 0 || vipIcons.length == 0) {
                this.getShops()
            }
        });
    }

    getShops() {
        const {dispatch } = this.props;
        dispatch(fetchData({
            url : REQURL.getShops.url,
            requestType : REQURL.getShops.type,
            successAction: appAN.UPDATE_SHOPS
        }));
    }

    /**
     * 立即登录
     */
    gotologin() {
        InteractionManager.runAfterInteractions(()=>{
            this.props.navigator.push({
                name: 'LoginContainer',
                component: LoginContainer,
                passProps: {
                    type: 'normal',
                    from: 'shop'
                }
            })
        })
    }

    /**
     * 购买坐骑
     */
    buyMounts(gid) {
        const {dispatch,userInfo} = this.props;

        if(userInfo.uid) {
            dispatch(fetchData({
                url : REQURL.payMount.url,
                requestType : REQURL.payMount.type,
                requestData : {
                    gid: gid,
                    nums: 1,//数量
                    type: 0//0是按月支付，1是包年
                },
                //successAction: appAN.UPDATE_SHOPS
                callback :function(d) {
                    //console.log(d)
                    //显示信息
                    if(d.ret) {//成功
                        dispatch(appAct.showInfoBox(d.info),'success');
                    }
                    else {
                        dispatch(appAct.showInfoBox(d.info,'error'));
                    }
                }
            }));
        }
        else {
            Alert.alert(
                '系统提示',
                '登陆后才可以购买',
                [
                    {text: '立即登陆', onPress: () => this.gotologin()},
                    {text: '取消'},
                ]
            )
        }
    }

    /**
     * 开通vip
     * @param id
     */
    buyVIP(gid) {
        const {dispatch,userInfo} = this.props;

        if(userInfo.uid) {
            dispatch(fetchData({
                url : REQURL.openVIP.url,
                requestType : REQURL.openVIP.type,
                requestData : {
                    gid: gid,
                    roomId: 0//房间id
                },
                callback :function(d) {
                    //console.log(d)
                    //显示信息
                    if(d.code == 0) {//成功
                        dispatch(appAct.showInfoBox(d.info));
                    }
                    else {
                        dispatch(appAct.showInfoBox(d.msg,'error'));
                    }
                }
            }));
        }
        else {
            Alert.alert(
                '系统提示',
                '登陆后才可以购买',
                [
                    {text: '立即登陆', onPress: () => this.gotologin()},
                    {text: '取消'},
                ]
            )
        }
    }

    //获取vip坐骑
    getVIPMount(gid) {
        const {dispatch,userInfo} = this.props;

        if(userInfo.uid) {
            dispatch(fetchData({
                url : REQURL.getVIPMount.url,
                requestType : REQURL.getVIPMount.type,
                requestData : {
                    mid: gid
                },
                callback :function(d) {
                    //显示信息
                    if(d.code == 0) {//成功
                        dispatch(appAct.showInfoBox(d.info));
                    }
                    else {
                        dispatch(appAct.showInfoBox(d.msg,'error'));
                    }
                }
            }));
        }
        else {
            Alert.alert(
                '系统提示',
                '登陆后才可以购买',
                [
                    {text: '立即登陆', onPress: () => this.gotologin()},
                    {text: '取消'},
                ]
            )
        }
    }

    /**
     * 去充值页
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

    _handleChangeTab = index => {
        this.setState({index});
    }

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
        const {  mounts, vipmount, vipIcons } = this.props;

        let content = null;

        const alertTitle = "购买道具";

        //取消按钮
        const btnCancl = {text: '取消'}

        //去充值页的button
        const btnGoRecharge = {text: '充值', onPress: () => this.goRecharge()}

        switch (route.key) {
            case '1':
                content = (
                    <View style={styles.giftBox}>
                        {mounts.map((d,i)=>{
                            const img = `${CONFIG.giftPath}gift_material/${d.gid}.png`;
                            return <ShopGiftPanel
                                key={i}
                                img={img}
                                name={d.name}
                                price={d.price}
                                btnName="购买"
                                btnClick={()=>Alert.alert(
                                    alertTitle,
                                    `确认购买坐骑${d.name}?`,
                                    [
                                        {text: '确认', onPress: () => this.buyMounts(d.gid)},
                                        btnGoRecharge,
                                        btnCancl
                                    ]
                                )}
                                />
                        })}
                    </View>
                );
                break;
            case '2':
                content = (
                    <View style={styles.giftBox}>
                        {vipmount.map((d,i)=>{
                            const img = `${CONFIG.giftPath}gift_material/${d.gid}.png`;
                            return <ShopGiftPanel
                                key={i}
                                img={img}
                                name={d.name}
                                price={d.price}
                                btnName="领取"
                                btnClick={()=>Alert.alert(
                                    '领取道具',
                                    `确认领取坐骑${d.name}?`,
                                    [
                                        {text: '确认', onPress: () => this.getVIPMount(d.gid)},
                                        btnCancl
                                    ]
                                )}
                                />
                        })}
                    </View>
                );
                break;
            case '3':
                content = (
                    <View style={styles.giftBox}>
                        {vipIcons.map((d,i)=>{
                            const img = `${CONFIG.giftPath}patrician_l/${d.level_id}.png`;
                            return <ShopGiftPanel
                                key={i}
                                img={img}
                                name={d.level_name}
                                price={d.system.open_money}
                                btnName="购买"
                                btnClick={()=>Alert.alert(
                                    alertTitle,
                                    `确认开通VIP专属${d.level_name}?`,
                                    [
                                        {text: '确认', onPress: () => this.buyVIP(d.gid)},
                                        btnGoRecharge,
                                        btnCancl
                                    ]
                                )}
                                />
                        })}
                    </View>
                );
                break;
            default:
                return null;
        }

        return (
            <ScrollView
                scrollEventThrottle={200}
                horizontal={false}
                refreshControl={
                        <RefreshControl
                            refreshing={false}
                            onRefresh={()=>this.getShops()}
                            tintColor={STYLE.primary}
                            title="Loading..."
                            titleColor="#999"
                            colors={[STYLE.primary, '#999', '#fff']}
                            progressBackgroundColor="#fff"
                        />
                    }
                style={{
                            height:WINDOW.height - STYLE.headerBannerHeight - STYLE.swipHeaderHeight,
                            width:WINDOW.width,
                        }}
                >
                {content}
            </ScrollView>
        )
    };

    render() {
        //let { dialogOpen } = this.props;

        return (
            <View style={{flex: 1}}>
                <Header
                    title='商城'
                    leftIcon='chevron-left'
                    leftIconAction={()=>{
                        InteractionManager.runAfterInteractions(()=>{
                            this.props.navigator.pop();
                        })
                    }}
                    rightIcon='cny'
                    rightIconAction={()=>this.goRecharge()}
                    />

                <TabViewAnimated
                    style={styles.container}
                    navigationState={this.state}
                    renderScene={this._renderScene.bind(this)}
                    renderHeader={this._renderHeader}
                    onRequestChangeTab={this._handleChangeTab}
                    />
            </View>
        )
    }
}


const styles = StyleSheet.create({
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

    giftBox: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems:'center',
        justifyContent:'space-around',
    }
});