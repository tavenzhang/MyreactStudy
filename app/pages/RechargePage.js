/**
 * Created by soga on 16/10/27.
 */

'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    InteractionManager,
} from 'react-native';

import { Header } from '../components';

export default class RechargePage extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Header
                    title='充值'
                    leftIcon='chevron-left'
                    leftIconAction={()=>this.props.navigator.pop()}
                    />
                <View style={styles.content}>
                    <Text style={styles.textLine}>尊敬的各位玩家，目前移动端不支持充值功能，给大家带来不便敬请谅解~</Text>
                    <Text style={styles.textLine}>要充值的用户请登录电脑端网站充值，或者加QQ联系美女客服可可进行人工充值，可可的QQ号：3543088613</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        padding:15
    },
    textLine: {
        lineHeight:20,
        color: '#666',
        marginTop:20
    }
});