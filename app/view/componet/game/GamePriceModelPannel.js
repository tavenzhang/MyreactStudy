/**
 * Created by soga on 2017/4/22.
 */
import React, {Component,PropTypes} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Slider,
    TouchableOpacity,
} from 'react-native';

import AIcon from 'react-native-vector-icons/FontAwesome';
import MoneyUnit from './MoneyUnit';
import MultipleBtnGrounp from "./MultipleBtnGrounp";


export default class GamePriceModelPannel extends Component {

    static propTypes={
        bet_max_prize_group:PropTypes.any,
        bet_min_prize_group:PropTypes.any,
        series_amount:PropTypes.number,
        diff_grize_group:PropTypes.number,
        onChange:PropTypes.func,
        value:PropTypes.any
    }

    constructor(props) {
        super(props);
        //this.state = {
        //    rebat : props.bet_min_prize_group, //返点
        //}
    }

    render() {
        const { bet_max_prize_group, bet_min_prize_group, series_amount, diff_grize_group, onChange, value } = this.props;

        return (
            <View style={{flexDirection : 'row'}}>
                <View style={styles.priceControlTitleBox}>
                    <Text style={styles.priceControlTitle}>奖金调节</Text>
                </View>
                <Slider
                    value={value}
                    onSlidingComplete={(value) => {}}
                    onValueChange={ value => onChange(value)}
                    style={styles.slider}
                    minimumValue={bet_min_prize_group}
                    maximumValue={bet_max_prize_group}
                    maximumTrackTintColor={G_Theme.gray}
                    step={diff_grize_group}
                    />
                <View style={styles.priceDataBox}>
                    <Text style={styles.priceData}>{value} / {((bet_max_prize_group-value)*100/series_amount).toFixed(2)}%</Text>
                </View>
            </View>
        );
    }

}


const styles = StyleSheet.create({

    priceControlTitleBox: {
        width: 30
    },

    priceControlTitle: {
        fontSize:11,
        color: G_Theme.fontGray
    },

    priceDataBox: {
        width: 100,
        padding: 2,
        borderRadius: 15,
        backgroundColor: '#ccc',
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 10
    },

    priceData: {
        fontSize:11,
        color: G_Theme.second
    },

    slider: {
        height: 30,
        flex: 1,
    },

});