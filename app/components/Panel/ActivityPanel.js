/**
 * Created by soga on 16/10/24.
 */
import React, {Component,PropTypes} from 'react';
import { CONFIG } from '../../config';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';

import { STYLE, WINDOW } from '../../config';
import Icon from 'react-native-vector-icons/FontAwesome';
import {datetime2unix} from '../../utils/util'


export default class ActivityPanel extends Component {

    static propTypes = {
    };
    
    static defaultProps = {};

    render() {
        const { img, start_time, title, end_time } = this.props;

        let [status,statusColor] = [`即将开始`,'orange'];

        let [startDate,endDate,nowDate] = [datetime2unix(start_time)*1000,datetime2unix(end_time)*1000,Date.parse(new Date())];

        //活动进行中
        if(nowDate > startDate && nowDate <= endDate) {
            status = `进行中`;
            statusColor = 'green';
        }

        //活动结束
        if(nowDate > endDate) {
            status = `已结束`;
            statusColor = 'gray';
        }

        return (
            <View style={styles.container}>
                <Text style={styles.title}>活动主题：<Text style={{color:'#666'}}>{title}</Text></Text>
                <Image source={img} style={styles.img} />
                <View style={[styles.status,{backgroundColor:statusColor}]}><Text style={styles.statusText}>{status}</Text></View>
                <Text style={styles.desc}>开始时间：{start_time.substr(0,10)}</Text>
            </View>
        )

    }
}

const styles = StyleSheet.create({
    container: {
        width: WINDOW.width,
        borderBottomWidth : 1,
        borderTopWidth : 1,
        marginTop: 10,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomColor : '#f1f1f1',
        borderTopColor : '#f1f1f1',
        position: 'relative'
    },

    title: {
        fontSize: 16
    },

    img: {
        width: WINDOW.width-30,
        height: (WINDOW.width-30)/3,
        borderRadius: 2,
        marginTop: 10,
        marginBottom: 10,
    },

    desc: {
        color: '#666',
        fontSize: 12
    },

    iconArrow: {
        fontSize:25,
        color:'#999',
        marginLeft: 20
    },

    status: {
        position: 'absolute',
        padding: 5,
        borderTopRightRadius: 2,
        top: 36,
        right: 15
    },

    statusText: {
        color: '#fff',
        fontSize: 12
    }
});