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
        if(x == 0){
            return;
        }
        if (y >= 0 && y < data.length && x > 0) {
            data[y][x] = value;
            this.setState({balls: data});
        }
    }

    makePostParameter(original) {
        let me = this,
            result = [],
            tempArr = [],
            k=0,
            i = 0;

        for(; k < original.length; k++) {
            tempArr[k]  = [];
            for(let j = 0; j < original[k].length; j++ ) {
                tempArr[k][j] = original[k][j] < 10 ? '0' + original[k][j] : '' + original[k][j];
            }
        }
        for (; i < tempArr.length; i++) {
            result = result.concat(tempArr[i].join(' '));
        }
        return result.join('|');
    }

    formatViewBalls(original) {
        return this.makePostParameter(original);
    }


    buildBalls(row,ballStyle) {
        const me = this;
        const {balls,ballText,rowTitle} = this.state;
        if(balls.length > 0) {
            const rows = balls.length,
                len = balls[0].length,
                ballTextLen = ballText.length,
                ballTitleLen = rowTitle.length;
            if(rows == ballTitleLen && len == ballTextLen) {
                const ballWidth = (G_Theme.windowWidth - 20) / me.state.rowBallNumber;
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
                                    ballStyle={ballStyle ? ballStyle.ball : null}
                                    textStyle={ballStyle ? ballStyle.text : null}
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