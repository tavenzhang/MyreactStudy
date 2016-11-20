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


export default class SeekPanel extends Component {

    static propTypes = {
    };

    static defaultProps = {};

    render() {
        const { img, onPress } = this.props;

        return (
            <TouchableOpacity onPress={onPress}>
                <View style={styles.container}>
                    <Image source={img} style={styles.img} />
                    <Icon name='angle-right' style={styles.iconArrow} />
                </View>
            </TouchableOpacity>
        )

    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        alignItems: 'center',
        width: WINDOW.width,
        borderBottomWidth : 1,
        height:120,
        borderBottomColor : '#f1f1f1'
    },

    img: {
        width: WINDOW.width*0.8,
        resizeMode: 'contain',
        marginLeft:15
    },

    iconArrow: {
        fontSize:35,
        color:'#999',
        marginLeft: 20
    }
});