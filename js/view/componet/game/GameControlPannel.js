/**
 * Created by soga on 2017/4/17.
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
        lotterys : PropTypes.number.isRequired,
        multiple : PropTypes.number.isRequired,
        unitPrice : PropTypes.number.isRequired,
        balance : PropTypes.number.isRequired,
        btnEvent : PropTypes.func,
        btnIconEvent : PropTypes.func,
        btnName : PropTypes.string,
        topDesc : PropTypes.string,
        btnDisable: PropTypes.bool
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

    btnAction() {
        const { btnEvent, btnDisable } = this.props;
        if(!btnDisable) {
            btnEvent();
        }
    }

    btnIconAction() {
        const { btnIconEvent, btnIconDisable } = this.props;
        if(!btnIconDisable) {
            btnIconEvent();
        }
    }

    render() {
        const me = this;
        const { topDesc, balance, btnName, btnDisable, btnIconEventDesc, btnIconEvent, btnIconDisable, btnIconName } = this.props;
        const btnStatus = btnDisable ? styles.btnDisable : null;
        const btnIconStatus = btnIconDisable ? styles.btnIconDisable : null;

        //icon btn
        let iconBtnDom = null;
        if(btnIconEvent) {
            const btnTopRightIconDom = btnIconEventDesc ? <View style={styles.btnDesc}><Text style={styles.btnDescText}>{btnIconEventDesc}</Text></View> : null;

            iconBtnDom = <TouchableOpacity onPress={() => me.btnIconAction()} style={[styles.btnIcon]}>
                                {btnTopRightIconDom}
                                <AIcon name={btnIconName} style={[styles.iconCar,btnIconStatus]} />
                            </TouchableOpacity>
        }

        return (
            <View style={styles.controlPanel}>
                <View>
                    <View>
                        <Text style={styles.lotterys}>{topDesc}</Text>
                    </View>
                    <View>
                        <Text style={styles.money}>可用余额:{G_moneyFormat(balance)}元</Text>
                    </View>
                </View>
                <View style={{flexDirection : 'row'}}>
                    {iconBtnDom}
                    <TouchableOpacity onPress={() => me.btnAction()} style={[styles.btn,btnStatus]}>
                        <Text style={styles.btnText}>{btnName}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

}


const styles = StyleSheet.create({

    controlPanel: {
        flex: 1,
        flexDirection : 'row',
        position: 'absolute',
        bottom: -3,
        width: G_Theme.windowWidth,
        padding: 8,
        height: G_Theme.gameOperatePanelHeight,
        backgroundColor: G_Theme.black,
        justifyContent: 'space-between'
    },

    lotterys: {
        color: G_Theme.second,
        fontSize: 14
    },

    money: {
        color: '#fff',
        fontSize: 12,
        lineHeight: 18
    },

    btn: {
        backgroundColor: global.G_Theme.primary,
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
        backgroundColor: G_Theme.second,
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
        backgroundColor: global.G_Theme.gray,
    },

    btnIconDisable: {
        color: global.G_Theme.gray,
    },

    btnText: {
        color: '#fff'
    },

    iconCar: {
        fontSize: 25,
        color: global.G_Theme.second,
    }
});