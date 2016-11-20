
'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    InteractionManager,
} from 'react-native';

import { ActivityContainer, ShopContainer } from '../containers';

import { Header, SeekPanel } from '../components';

export default class SeekPage extends Component {

    goDetailPage(type) {
        if(type == 'activity') {
            InteractionManager.runAfterInteractions(()=>{
                this.props.navigator.push({
                    name: 'ActivityContainer',
                    component: ActivityContainer,
                    passProps: {
                        type: 'normal'
                    }
                })
            })
        }
        else {
            InteractionManager.runAfterInteractions(()=>{
                this.props.navigator.push({
                    name: 'ShopContainer',
                    component: ShopContainer,
                    passProps: {
                        type: 'normal'
                    }
                })
            })
        }
    }

    render() {
        return (
        <View>
            <Header title='发现' />
            <SeekPanel
                img={require('../images/seek-activity.jpg')}
                onPress={()=>this.goDetailPage("activity")}
                />
            <SeekPanel
                img={require('../images/seek-shop.jpg')}
                onPress={()=>this.goDetailPage("shop")}
                />
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
    },
    headerWrap: {
        alignItems: 'center',
        height: 44,
        backgroundColor: '#ff7419',
    },
    header: {
        color: '#fff',
        paddingTop: 22,
        fontSize: 16,
    },
    mainWrap: {
    },

    //我的设备
    deviceInfoWrap: {
        padding: 10,
        backgroundColor: 'white',
    },
    deviceTitle: {
        fontSize: 15,
        color: '#383838',
    },
    deviceRow: {
        flexDirection: 'row',
        marginTop: 8,
    },
    deviceName: {
        fontSize: 14,
        color: '#555',
    },
    deviceValue: {
        fontSize: 13,
        color: '#777',
        marginLeft: 2,
    },
});