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
import {TButton} from "../tcustom/button/TButton";

let iconGrounpWidth = G_Theme.windowWidth * 0.3;
let btnGrounpWidth = G_Theme.windowWidth * 0.7;
const controlPanelBottomHeight = 38;
const controlPanelTopHeight = 22;

export default class GameControlPannel extends Component {
    static propTypes = {
        lotterys : PropTypes.number.isRequired,
        multiple : PropTypes.number.isRequired,
        unitPrice : PropTypes.number.isRequired,
        balance : PropTypes.any.isRequired,
        btnEvent : PropTypes.func,
        btnIconEvent : PropTypes.func,
        btnName : PropTypes.string,
        topDesc : PropTypes.object,
        btnDisable: PropTypes.bool,
        onLeftBtnClick:PropTypes.func,
        btnLeftName:PropTypes.string,
        isShowBtnIcon: PropTypes.bool,
        isShowBtnIcon2: PropTypes.bool
    };

    static defaultProps = {
        lotterys : 0,
        multiple : 1,
        unitPrice : 2,
        balance : 0,
        btnName : '确 定',
        topDesc : <Text/>,
        btnDisable : true,
        onLeftBtnClick:null,
        isShowBtnIcon: true,
        isShowBtnIcon2: true,
        btnLeftName:"一键投注"
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

    btnIconAction2() {
        const { btnIconEvent2, btnIconDisable2 } = this.props;
        if(!btnIconDisable2) {
            btnIconEvent2();
        }
    }

    render() {
        const me = this;
        const { onLeftBtnClick,btnLeftName, topDesc, balance, btnName, btnDisable, btnIconEventDesc, btnIconEvent2, btnIconEvent, btnIconDisable, btnIconName, btnIconName2,btnIconDisable2,btnIconText,btnIconText2, isShowBtnIcon2, isShowBtnIcon } = this.props;
        const btnStatus = btnDisable ? styles.btnDisable : null;
        const btnIconStatus = btnIconDisable ? styles.btnIconDisable : null;
        const btnIconStatus2 = btnIconDisable2 ? styles.btnIconDisable : null;

        //icon btn
        let iconBtnDom = null;
        if(btnIconEvent && isShowBtnIcon) {
            const btnTopRightIconDom = btnIconEventDesc ? <View style={styles.btnDesc}><Text style={styles.btnDescText}>{btnIconEventDesc}</Text></View> : null;

            iconBtnDom = <TouchableOpacity onPress={() => me.btnIconAction()} style={[styles.btnIcon]}>
                                {btnTopRightIconDom}
                                <AIcon name={btnIconName} style={[styles.iconBtn,btnIconStatus]} />
                                <Text style={styles.iconBtnText}>{btnIconText}</Text>
            </TouchableOpacity>
        }

        let iconBtnDom2 = null;
        if(btnIconEvent2 && isShowBtnIcon2) {
            iconBtnDom2 = <TouchableOpacity onPress={() => me.btnIconAction2()} style={[styles.btnIcon]}>
                <AIcon name={btnIconName2} style={[styles.iconBtn,btnIconStatus2]} />
                <Text style={styles.iconBtnText}>{btnIconText2}</Text>
            </TouchableOpacity>
        }

        let btnWidth = btnGrounpWidth / 2;
        if(!iconBtnDom2) {
            btnWidth = G_Theme.windowWidth * 0.85 / 2;
        }

        if(!onLeftBtnClick) {
            btnWidth = G_Theme.windowWidth * 0.85;
        }

        return (
            <View style={styles.controlPanel}>
                <View style={styles.controlPanelTop}>
                    <View>
                        <Text style={styles.lotterys}>{topDesc}</Text>
                    </View>
                    <View>
                        <Text style={styles.money}>余额<Text style={{color: G_Theme.primary}}> {G_moneyFormat(balance)}</Text>元</Text>
                    </View>
                </View>
                <View style={styles.controlPanelBottom}>
                    <View style={styles.iconGrounp}>
                        {iconBtnDom}
                        {iconBtnDom2}
                    </View>
                    <View style={styles.btnGrounp}>
                        {
                            onLeftBtnClick ?  <TButton btnName={btnLeftName} onPress={onLeftBtnClick} containerStyle={[styles.btn,styles.btnLeft,{width: btnWidth}]} disable={btnDisable}/>:null
                        }
                        <TButton btnName={btnName} onPress={()=>me.btnAction()} disable={btnDisable} containerStyle={[styles.btn,styles.btnRight,btnStatus,{width: btnWidth}]} />
                        {/*<TouchableOpacity onPress={() => me.btnAction()} containerStyle style={[styles.btn,btnStatus]}>*/}
                        {/*<Text style={styles.btnText}>{btnName}</Text>*/}
                        {/*</TouchableOpacity>*/}
                    </View>

                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({

    controlPanel: {
        flex: 1,
        position: 'absolute',
        bottom: 0,
        width: G_Theme.windowWidth,
        height: G_Theme.gameOperatePanelHeight,
        backgroundColor: '#fff',
        borderTopWidth: 1 / G_Theme.lineBase,
        borderColor: G_Theme.gray,
        shadowOffset:{
            width: 0,
            height: -1,
        },
        shadowColor: '#ddd',
        shadowOpacity: 0.8,
    },
    controlPanelBottom: {
        flexDirection : 'row',
        alignItems:"center",
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        borderTopWidth: 1 / G_Theme.lineBase,
        borderColor: G_Theme.gray
    },
    controlPanelTop: {
        flexDirection : 'row',
        justifyContent: 'space-between',
        height: controlPanelTopHeight,
        paddingLeft:5,
        paddingRight:5,
        backgroundColor: '#fff'
    },
    lotterys: {
        color: G_Theme.second,
        fontSize: 12,
        lineHeight:controlPanelTopHeight
    },

    money: {
        color: G_Theme.black,
        fontSize: 12,
        lineHeight: controlPanelTopHeight
    },
    btnGrounp: {
        flexDirection : 'row',
    },
    iconGrounp: {
        flexDirection : 'row',
    },
    btn: {
        backgroundColor: global.G_Theme.primary,
        paddingLeft:15,
        paddingRight:15,
        height:controlPanelBottomHeight,
        width: btnGrounpWidth/2,
        borderRadius:0,
        paddingVertical: 0,
        paddingHorizontal: 0,
        justifyContent:"center",
    },
    btnLeft: {
        backgroundColor: G_Theme.third
    },
    btnRight: {
        //borderLeftWidth: 1,
        //borderColor: G_Theme.gray,
    },

    btnIcon: {
        justifyContent:"center",
        alignItems:"center",
        position:'relative',
        height: controlPanelBottomHeight,
        width: iconGrounpWidth/2 ,
        borderRightWidth: 1 / G_Theme.lineBase,
        backgroundColor: '#fff',
        borderColor: G_Theme.gray,
    },

    btnDesc: {
        position:'absolute',
        top: 1,
        right: 2,
        backgroundColor: G_Theme.primary,
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
        borderLeftWidth: 1 / G_Theme.lineBase,
        borderColor: G_Theme.gray,
        height:controlPanelBottomHeight,
        width: btnGrounpWidth/2,
        borderRadius:0,
        paddingVertical: 0,
        paddingHorizontal: 0,
        justifyContent:"center",
    },

    btnIconDisable: {
        color: G_Theme.gray,
    },

    btnText: {
        color: '#fff'
    },

    iconBtn: {
        fontSize: 22,
        color: G_Theme.second,
    },

    iconBtnText: {
        fontSize: 8,
        color: '#666',
        marginTop: 3
    }
});