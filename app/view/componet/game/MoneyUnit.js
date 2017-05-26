/**
 * Created by soga on 2017/4/21.
 */

import React, {PropTypes} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';


export default class MoneyUnit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            moneyUnits : [{title:'元',value:1},{title:'角',value:0.1},{title:'分',value:0.01}]
        }

        this.setMoneyMode = this.setMoneyMode.bind(this);
    }

    static propTypes = {
        moneyMode : PropTypes.any.isRequired
    };

    static defaultProps = {
        moneyMode : 1
    };

    setMoneyMode(value) {
        const { moneyMode } = this.props;
        if(value && moneyMode != value) {
            ActDispatch.GameAct.setMoneyUnit(value);
        }
    }

    render() {

        const me = this;
        const { moneyUnits } = me.state;
        const { moneyMode } = me.props;

        return (
            <View style={styles.moneyBtnGrounps}>
                {moneyUnits.map((v,i) => {
                    let styleSpecial = null;
                    if(i == 0) styleSpecial = styles.borderRadiusLeft;
                    if(i == moneyUnits.length - 1) styleSpecial = styles.borderRadiusRight;
                    const currentStyle = moneyMode == v.value ? styles.btnSelected : null;
                    const currentTextStyle = moneyMode == v.value ? styles.btnTextSelected : null;

                    return <TouchableOpacity key={i} onPress={() => me.setMoneyMode(v.value)} >
                                <View  style={[styles.moneyBtn,styleSpecial,currentStyle]}>
                                    <Text style={[styles.moneyBtnText,currentTextStyle]}>{v.title}</Text>
                                </View>
                            </TouchableOpacity>
                })}
            </View>
        )
    }
};

const borderRadius = 6;

const styles = StyleSheet.create({
    moneyBtnGrounps: {
        flexDirection : 'row',
    },
    moneyBtn: {
        backgroundColor:G_Theme.gray,
        justifyContent:"center",
        alignItems:"center",
        width: 30,
        height: 30,
        borderWidth:1,
        borderColor: G_Theme.second,
        borderRightWidth: 0
    },

    borderRadiusLeft: {
        borderTopLeftRadius: borderRadius,
        borderBottomLeftRadius: borderRadius,
    },

    borderRadiusRight: {
        borderTopRightRadius: borderRadius,
        borderBottomRightRadius: borderRadius,
        borderRightWidth: 1
    },

    btnSelected: {
        backgroundColor:G_Theme.second,
    },

    moneyBtnText: {
        fontWeight: '700',
        fontSize: 14
    },

    btnTextSelected: {
        color : '#fff'
    },
});
