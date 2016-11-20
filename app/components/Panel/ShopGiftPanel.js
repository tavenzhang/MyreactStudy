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


export default class ShopGiftPanel extends Component {

    static propTypes = {
    };

    static defaultProps = {};

    render() {
        const { img, btnClick, name, btnName, price } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.imgBg}>
                    <Image source={{uri : img}} style={styles.gift}/>
                </View>
                <Text style={styles.name}>{name}</Text>
                <Text>
                    {price} <Icon name="diamond" style={styles.diamond} />/月
                </Text>
                <TouchableOpacity style={styles.buyBtn} onPress={btnClick}>
                    <Text style={styles.btnText}>{btnName}</Text>
                </TouchableOpacity>
            </View>
        )

    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: 120,
        margin: 10
    },

    imgBg: {
        width: 120,
        borderRadius:8,
        paddingTop:10,
        paddingBottom:10,
        height:120,
        backgroundColor : '#f1f1f1',
        justifyContent: 'center'
    },

    gift: {
        height:80,
        resizeMode: 'contain'
    },

    diamond: {
        color: STYLE.second,
    },

    name: {
        fontSize:14,
        marginTop:5,
        marginBottom:5,
    },

    buyBtn: {
        backgroundColor: STYLE.primary,
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
        borderRadius: 2,
    },

    btnText: {
        color:'#fff'
    }
});