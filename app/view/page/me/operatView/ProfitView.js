import React from 'react';
import {
    View,
    Text, StyleSheet,
    TouchableHighlight,
    LayoutAnimation,
    Button,
    TextInput

} from 'react-native';

import {connect} from 'react-redux';
import BaseView from "../../../componet/BaseView";


const mapStateToProps = state => {
    return {
        // gameModel:state.get("appState").get("gameModel"),
    }
}

@connect(mapStateToProps)
export default class AgentProfitView extends BaseView {

    constructor(props) {
        super(props);
        this.state = {}
    }

    getNavigationBarProps() {
        return {
            rightView: this.navRigntView
        };
    }

    showIsAgent(is_agent) {
        if (!!is_agent) {
            return (
                <View style={styles.inputContain}>
                    <Text>用户属性:</Text>
                    <Text style={[styles.textContent]}> {is_agent == 1 ? '代理' : '玩家'}</Text>
                </View>
            )
        }

    }

    renderBody() {
        let {profitData, formatMoney} = this.props.passProps;

        return (
            <View style={G_Style.appView}>
                <View style={[styles.profitRow]}>
                    <View style={[styles.itemContentStyle]}>
                        <Text style={styles.textItemName}>{profitData.username}</Text>
                    </View>

                </View>
                <View style={[styles.profitRow]}>
                    <View style={[styles.itemContentStyle,{paddingLeft: 30}]}>
                        <Text style={[styles.textMoney]}
                              numberOfLines={1}>充值总额: </Text>
                        <Text style={[{paddingLeft:10}]}>{formatMoney(profitData.deposit)}</Text>

                    </View>
                    <View style={[styles.itemContentStyle]}>

                        <Text style={[styles.textMoney]}
                              numberOfLines={1}>提现总额:</Text>
                        <Text style={[{paddingLeft:10}]}>{formatMoney(profitData.withdrawal)}</Text>

                    </View>
                </View>
                <View style={[styles.profitRow]}>
                    <View style={[styles.itemContentStyle, {paddingLeft: 30}]}>
                        <Text style={[styles.textMoney]}
                              numberOfLines={1}>投注总额: </Text>
                        <Text style={[{paddingLeft:10}]}>{formatMoney(profitData.turnover)}</Text>

                    </View>
                    <View style={[styles.itemContentStyle]}>

                        <Text style={[styles.textMoney]}
                              numberOfLines={1}>派奖总额:</Text>
                        <Text style={[{paddingLeft:10}]}>{formatMoney(profitData.prize)}</Text>

                    </View>
                </View>
                <View style={[styles.profitRow]}>
                    <View style={[styles.itemContentStyle, {paddingLeft: 30}]}>
                        <Text style={[styles.textMoney]}
                              numberOfLines={1}>游戏盈亏: </Text>
                        <Text style={[{paddingLeft:10}]}>{formatMoney(profitData.profit)}</Text>

                    </View>
                    <View style={[styles.itemContentStyle]}>

                        <Text style={[styles.textMoney]}
                              numberOfLines={1}>返点总额:</Text>
                        <Text style={[{paddingLeft:10}]}>{formatMoney(profitData.commission)}</Text>
                    </View>
                </View>
                <View style={[styles.profitRow]}>
                    <View style={[styles.itemContentStyle, {paddingLeft: 30}]}>
                        <Text style={[styles.textMoney]}
                             >促销红利:</Text>
                        <Text style={[{paddingLeft:10}]}
                        >{formatMoney(profitData.dividend)}</Text>
                    </View>
                    <View style={[styles.itemContentStyle]}>
                        <Text style={[styles.textMoney]}>净盈亏:</Text>
                        <Text style={[profitData.profit_loss>0?{color:'red'}:{color:'green'},{paddingLeft:10}]}
                             >{formatMoney(profitData.profit_loss)}</Text>
                    </View>
                </View>

            </View>)
    }
}

const styles = StyleSheet.create({
    textMoney:{
     color:'#ccc'
    },
    profitRow: {
        width: G_Theme.windowWidth,
        height: 50,
        paddingTop: 5,
        paddingBottom: 5,
        flexDirection: "row",
        borderBottomWidth: 0.5,
        borderColor: '#ccc',

    },
    textItemName: {
        textAlign: "center",

    },

    itemContentStyle: {
        paddingLeft: 20,
        flex: 1,
        justifyContent: "center",
        borderLeftWidth: 0.5,
        borderColor: '#ccc',
    },

    textContent: {
        marginLeft: 20

    },
    inputContain: {
        marginLeft: 20,
        paddingBottom: 5,
        marginBottom: 10,
        marginTop: 10,
        paddingLeft: 5,
        flexDirection: "row",
        height: 30,
        justifyContent: "flex-start",
        alignItems: "center",
        borderColor: 'gray',
        borderBottomWidth: 0.2,
    },
    textStyle: {
        width: 150,
        left: 10,
        fontSize: 14,
        height: G_Theme.textInpuntH
    },

})
