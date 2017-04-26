/**
 * Created by soga on 2017/4/24.
 */

import React, {Component} from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
} from 'react-native';

import Games from "../../../../../componet/game/Games";
import Ball from "../../../../../componet/game/Ball";

export default class L115 extends Games {

    constructor(props) {
        super(props);

        this.state.rowBallNumber = 6; //一行几个球

        this.lastSelectBallIndex = -1;
    }

    //设置BallText
    setBallText = () => [0,1,2,3,4,5,6,7,8,9,10,11];

    setBallData(x, y, value) {
        const me = this;
        const {balls} = this.state;
        const data = balls;

        if (y >= 0 && y < data.length && x > 0) {
            data[y][x] = value;
            this.setState({balls: data});
        }
    }

    //formatViewBalls(original) {
    //    const me = this;
    //    let result = [],
    //        len,
    //        tempArr = [],
    //        i = 0;
    //
    //    for(let k; k<original.length; k++) {
    //        tempArr[k]  = [];
    //        for(let h; h < original[k].length; h++) {
    //            tempArr[k][h] = original[k][h] < 10 ? '0' + original[k][h] : '' + original[k][h];
    //        }
    //    }
    //
    //    len = tempArr.length;
    //    for (i =0; i < len; i++) {
    //        result = result.concat(tempArr[i].join(' '));
    //    }
    //    return result.join('|');
    //}


    buildBalls(row) {
        const me = this;
        const {balls,ballText,rowTitle} = this.state;
        if(balls.length > 0) {
            const rows = balls.length,
                len = balls[0].length,
                ballTextLen = ballText.length,
                ballTitleLen = rowTitle.length;

            if(rows == ballTitleLen && len == ballTextLen) {
                const ballWidth = (GlobelTheme.screenWidth - 20) / me.state.rowBallNumber;
                return <View style={styles.ballBox}>
                    {me.state.ballText.map((v,i) => {
                        if(i > 0) {
                            return <View  style={[styles.ballBtnBox,{width:ballWidth}]} key={i} >
                                <Ball
                                    text={v < 10 ? '0' + v : v}
                                    row={row}
                                    value={i}
                                    status={balls[row][i]}
                                    onPress={(x,y,v)=>me.selectBall(x,y,v)}
                                    />
                            </View>
                        }
                    })}
                </View>
            }
            else {
                return null;
            }
        }
        else {
            return null;
        }
    }
}


const styles = StyleSheet.create({

    ballBox: {
        flex: 1,
        flexDirection : 'row',
        flexWrap : 'wrap',
        //paddingLeft: 20,
        //paddingRight: 20,
    },

    ballBtnBox: {
        flexDirection : 'row',
        justifyContent:"center",
        alignItems:"center",
        height: 50
    },

});