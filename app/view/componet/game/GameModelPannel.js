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

import MoneyUnit from './MoneyUnit';
import MultipleBtnGrounp from "./MultipleBtnGrounp";


export default class GameModelPannel extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const me = this;
        const { moneyUnit, multiple, maxMultiple } = this.props;

        return (
            <View style={styles.moneyOperateBox}>
                <MultipleBtnGrounp multiple={multiple} maxMultiple={maxMultiple} />
                <MoneyUnit moneyMode={moneyUnit} />
            </View>
        );
    }

}


const styles = StyleSheet.create({

    moneyOperateBox: {
        flexDirection : 'row',
        marginBottom: 10,
        justifyContent: 'space-between'
    }

});