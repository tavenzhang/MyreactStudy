/**
 * 主框架界面
 */
'use strict';
import React, {Component} from 'react';
import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/FontAwesome';
import MIcon from 'react-native-vector-icons/MaterialIcons';

import TabNavigator from 'react-native-tab-navigator';

import HomeContainer from './HomeContainer';
import RankContainer from './RankContainer';
import SeekContainer from './SeekContainer';
import UserContainer from './UserContainer';

import { Loading, InfoBox } from '../components';

import { appAct, fetchData, appAN } from '../actions';

import {
    StyleSheet,
    Image,
    View
} from 'react-native';

import CookieManager from 'react-native-cookies';
import { STYLE, WINDOW, REQURL } from '../config';

class AppMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
	  	      selectedTab:'home'
	    };
    }

    componentWillMount() {
        //加载数据
        const {dispatch,isLogin,userInfo} = this.props;

        //判断cookie是否有webuid
        CookieManager.getAll((err, res) => {
            if(!!res.webuid && !!res.webuid.value) {
                if(!isLogin) {//当用户处于连接状态，但是状态基是断开状态，重新设置连接
                    dispatch(appAct.login());
                }

                if(!userInfo.uid) {//当用户处在链接状态，并且状态基中userInfo的uid不存在时，请求用户数据
                    //请求用户信息
                    dispatch(fetchData({
                        url : REQURL.getUserInfo.url,
                        requestType : REQURL.getUserInfo.type,
                        successAction: appAN.UPDATE_USERINFO,
                        callback: function(data) {
                            if(!data.info.uid) { //当请求返回没有用户数据时，清空cookie值和状态基isLogin为false
                                //重置状态基
                                dispatch(appAct.logout());
                                //清空cookie
                                CookieManager.clearAll((err, res) => {
                                    console.log('cookies cleared!');
                                });
                            }
                        }
                    }));
                }
            }
        });
    }

    componentDidUpdate() {
        const { dispatch, infoBox } = this.props;

        //3秒后关闭提示信息
        if(infoBox.show) {
            setTimeout(() => {
                dispatch(appAct.closeInfoBox());
            }, 3000); // hide toast after 5s
        }
    };
    
    render() {
        const { isFatch, infoBox, dispatch } = this.props;
        return (
            <View style={styles.container}>
                <TabNavigator>
                    <TabNavigator.Item
                        title="大厅"
                        selected={this.state.selectedTab === 'home'}
                        selectedTitleStyle={styles.selectedTextStyle}
                        titleStyle={styles.textStyle}
                        renderIcon={() => <MIcon name='home' style={styles.iconNormal} />}
                        renderSelectedIcon={() => <MIcon name='home' style={styles.iconPress} />}
                        onPress={() => this.setState({ selectedTab: 'home' })}>
                        <HomeContainer {...this.props}/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        title="排行"
                        selected={this.state.selectedTab === 'rank'}
                        selectedTitleStyle={styles.selectedTextStyle}
                        titleStyle={styles.textStyle}
                        renderIcon={() => <Icon name='trophy' style={styles.iconNormal} />}
                        renderSelectedIcon={() => <Icon name='trophy' style={styles.iconPress} /> }
                        onPress={() => this.setState({ selectedTab: 'rank' })}>
                        <RankContainer {...this.props}/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        title="发现"
                        selected={this.state.selectedTab === 'seek'}
                        selectedTitleStyle={styles.selectedTextStyle}
                        titleStyle={styles.textStyle}
                        renderIcon={() => <MIcon name='camera' style={styles.iconNormal} />}
                        renderSelectedIcon={() => <MIcon name='camera' style={styles.iconPress} />}
                        onPress={() => this.setState({ selectedTab: 'seek' })}>
                        <SeekContainer {...this.props} />
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        title="我的"
                        selected={this.state.selectedTab === 'user'}
                        selectedTitleStyle={styles.selectedTextStyle}
                        titleStyle={styles.textStyle}
                        renderIcon={() => <Icon name='user' style={styles.iconNormal} />}
                        renderSelectedIcon={() => <Icon name='user' style={styles.iconPress} />}
                        onPress={() => this.setState({ selectedTab: 'user' })}>
                        <UserContainer {...this.props} />
                    </TabNavigator.Item>
                </TabNavigator>
                { isFatch ? <Loading /> : null }
                <InfoBox
                    open={infoBox.show}
                    msg={infoBox.msg}
                    dispatch={dispatch}
                    //onClose={()=>this.closeInfoBox()}
                    //style={infoBox.style}
                    />
            </View>
        );
    }
}

const styles=StyleSheet.create({
    container:{
        width: WINDOW.width,
        height: WINDOW.height,
        backgroundColor: 'white'
    },
    textStyle:{
        color:STYLE.gray,
    },
    selectedTextStyle:{
        color:STYLE.primary,
    },
    iconPress:{
        color:STYLE.primary,
        fontSize:25
    },
    iconNormal:{
        color:STYLE.gray,
        fontSize:25
    }

});

const mapStateToProps = state => {
    return {
        isFatch: state.fetchState.requesting,
        menuSelectIndex: state.appState.menuSelectIndex,
        infoBox: state.appState.infoBox,
        isLogin: state.appState.isLogin,
        userInfo: state.appState.userInfo
    }
}

export default connect(mapStateToProps)(AppMain);





