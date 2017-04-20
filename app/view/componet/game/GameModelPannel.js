/**
 * Created by soga on 2017/4/20.
 */
import React, {Component,PropTypes} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

import AIcon from 'react-native-vector-icons/FontAwesome';

export default class GameControlPannel extends Component {
    static propTypes = {
        //lotterys : PropTypes.number.isRequired,
        //multiple : PropTypes.number.isRequired,
        //unitPrice : PropTypes.number.isRequired,
        //balance : PropTypes.number.isRequired,
        //btnEvent : PropTypes.func,
        //btnIconEvent : PropTypes.func,
        //btnName : PropTypes.string,
        //topDesc : PropTypes.string,
        //btnDisable: PropTypes.bool
    };

    static defaultProps = {
        lotterys : 0,
        multiple : 1,
        unitPrice : 2,
        balance : 0,
        btnName : '确 定',
        topDesc : '',
        btnDisable : true
    };

    render() {
        const me = this;

        return (
            <View style={styles.controlPanel}>
                <View>
                    <View>
                        <Text style={styles.lotterys}>11111</Text>
                    </View>
                    <View>
                        <Text style={styles.money}>22222</Text>
                    </View>
                </View>
                <View style={{flexDirection : 'row'}}>

                </View>
            </View>
        );
    }

}


const styles = StyleSheet.create({

    controlPanel: {
        flex: 1,
        flexDirection : 'row',
        padding: 8,
        //justifyContent: 'space-between'
    },

    lotterys: {
        color: global.GlobelTheme.second,
        fontSize: 14
    },

    money: {
        color: '#fff',
        fontSize: 12,
        lineHeight: 18
    },

    btn: {
        backgroundColor: global.GlobelTheme.primary,
        justifyContent:"center",
        alignItems:"center",
        padding:10,
        paddingLeft:20,
        paddingRight:20,
        position:'relative'
    },

    btnIcon: {
        justifyContent:"center",
        alignItems:"center",
        padding:10,
        marginLeft:10,
        marginRight:10,
        position:'relative'
    },

    btnDesc: {
        position:'absolute',
        top: -1,
        right: -1,
        backgroundColor: GlobelTheme.second,
        width: 18,
        height: 18,
        borderRadius: 9,
        justifyContent:"center",
        alignItems:"center",
        zIndex: 10
    },

    btnDescText: {
        color: '#fff',
        fontSize: 10
    },

    btnDisable: {
        backgroundColor: global.GlobelTheme.gray,
    },

    btnIconDisable: {
        color: global.GlobelTheme.gray,
    },

    btnText: {
        color: '#fff'
    },

    iconCar: {
        fontSize: 25,
        color: global.GlobelTheme.second,
    }
});