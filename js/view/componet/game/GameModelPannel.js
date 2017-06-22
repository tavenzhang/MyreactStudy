/**
 * Created by soga on 2017/4/20.
 */
import React, {Component, PropTypes} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

import MoneyUnit from './MoneyUnit';
import MultipleBtnGrounp from "./MultipleBtnGrounp";
import CleanBalls from "./CleanBalls";
import SelectAutoOne from "./SelectAutoOne";
import {TButton} from "../tcustom/button/TButton";


export default class GameModelPannel extends Component {


    constructor(props) {
        super(props);
    }

    static defaultProps = {
        isShowMoneyUnit: true//是否展示圆角分模式
    };

    showMoneyUnit(moneyUnit) {
        return ( <MoneyUnit moneyMode={moneyUnit}/>)
    }


    render() {
        const me = this;
        const {moneyUnit, multiple, maxMultiple, isShowMoneyUnit, isRandomSelect, checkBallIsComplete, cleanBall, randomSelcet} = this.props;
        return (<View>
                <View style={styles.moneyOperateBox}>
                    {/*<CleanBalls cleanBall={cleanBall}/>*/}

                    <MultipleBtnGrounp multiple={multiple} maxMultiple={maxMultiple}
                                       checkBallIsComplete={checkBallIsComplete}/>


                    {isShowMoneyUnit ? me.showMoneyUnit(moneyUnit) : null}

                </View>
                <TButton visible={isRandomSelect} containerStyle={[styles.multipleTextBox]}
                         textStyle={{color: "rgb(100,100,100)"}} btnName={"随机(摇一摇)"} onPress={randomSelcet}/>
            </View>
        );

    }

}


const styles = StyleSheet.create({

    moneyOperateBox: {
        flexDirection: 'row',
        marginBottom: 10,
        justifyContent: 'space-between'
    },
    multipleTextBox: {
        alignSelf: "center",//width: 100,
        marginTop: 1,
        borderRadius: 6,
        height: 30,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: G_Theme.second,
        backgroundColor: "transparent"
    },

});