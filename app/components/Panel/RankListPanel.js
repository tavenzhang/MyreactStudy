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

//import LvIcon from '../LvIcon';
import { STYLE, WINDOW } from '../../config';

export default class RankListPanel extends Component {

    static propTypes = {
    };

    static defaultProps = {};

    render() {
        const { num, headimg, name, rightIcon } = this.props;

        return (
            <TouchableOpacity>
                <View style={styles.container}>
                    <View style={styles.numBox}>
                        <Text style={styles.num}>{num}</Text>
                    </View>
                    <Image source={headimg} style={styles.headimg} />
                    <Text style={styles.name}>{name}</Text>
                    <View style={styles.icon}>{rightIcon}</View>
                </View>
            </TouchableOpacity>
        )

    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        width: WINDOW.width*0.94,
        height: 50,
        alignItems: 'center',
        borderBottomWidth : 1,
        borderBottomColor : '#f1f1f1'
    },

    numBox: {
        width:50
    },

    num: {
        fontSize:25,
        fontWeight:"bold",
        color:'#999',
        marginLeft:10
    },

    name: {
        fontSize:16,
    },

    headimg: {
        width: 40,
        height: 40,
        borderRadius:20,
        marginLeft:10,
        marginRight:10,
    },

    icon: {
        position: 'absolute',
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        right: 30,
        top: 15
    }
});