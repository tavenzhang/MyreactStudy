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
showIsAgent(is_agent){
        if(!!is_agent){
            return (
                <View style={styles.inputContain}>
                    <Text>用户属性:</Text>
                        <Text style={[styles.textContent]}> {is_agent==1?'代理':'玩家'}</Text>
                </View>
            )
        }

}

    renderBody() {
        let {profitData} = this.props.passProps;

        return (
            <View style={G_Style.appView}>
                <View style={{flex: 1, marginLeft: 40, marginRight: 40, marginTop: 40}}>
                    <View style={styles.inputContain}>
                        <Text>用户名: </Text>
                        <Text style={[styles.textContent]}>{profitData.username}</Text>
                    </View>
                    {this.showIsAgent(profitData.is_agent)}
                    <View style={styles.inputContain}>
                        <Text>充值总额:</Text>
                        <Text style={[styles.textContent]}>{profitData.deposit}</Text>
                    </View>
                    <View style={styles.inputContain}>
                        <Text>提现总额: </Text>
                        <Text style={[styles.textContent]}>{profitData.withdrawal}</Text>
                    </View>
                    <View style={styles.inputContain}>
                        <Text>投注总额: </Text>
                        <Text style={[styles.textContent]}>{profitData.turnover}</Text>
                    </View>
                    <View style={styles.inputContain}>
                        <Text>派奖总额:</Text>
                        <Text style={[styles.textContent]}>{profitData.prize}</Text>

                    </View>
                    <View style={styles.inputContain}>
                        <Text>游戏盈亏: </Text>
                        <Text style={[styles.textContent]}>{profitData.profit}</Text>

                    </View>
                    <View style={styles.inputContain}>
                        <Text>返点总额:</Text>
                        <Text style={[styles.textContent]}>{profitData.commission}</Text>

                    </View>
                    <View style={styles.inputContain}>
                        <Text>促销红利: </Text>
                        <Text style={[styles.textContent]}>{profitData.dividend}</Text>

                    </View>
                    <View style={styles.inputContain}>
                        <Text>净盈亏: </Text>
                        <Text style={[styles.textContent]}>{profitData.profit_loss}</Text>

                    </View>


                </View>

            </View>)
    }
}

const styles = StyleSheet.create({
    textContent:{
        marginLeft:20

    },
    inputContain: {
        marginLeft:20,
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
    }, textStyle: {
        width: 150,
        left: 10,
        fontSize: 14,
        height: G_Theme.textInpuntH
    },

})
