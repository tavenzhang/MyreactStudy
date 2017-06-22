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

export default class KENOQUWEI extends Games {

    constructor(props) {
        super(props);
        this.state.rowBallNumber = 6; //一行几个球
        this.lastSelectBallIndex = -1;
    }
    //设置BallText
    setBallText = () => ['大','和','小'];

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
            result = result.concat(tempArr[i].join('|'));
        }
        return result.join(' ');
    }

    formatViewBalls(original) {
        return this.makePostParameter(original);
    }


    buildBalls(row) {
        const me = this;
        const {balls,ballText,rowTitle} = this.state;
        if(balls.length > 0) {
            const rows = balls.length,
                ballTitleLen = rowTitle.length;

            if(rows == ballTitleLen) {
                const ballWidth = (G_Theme.windowWidth - 20) / me.state.rowBallNumber;
                return <View style={styles.ballBox}>
                    {ballText.map((v,i) => {
                        return <View  style={[styles.ballBtnBox,{width:ballWidth}]} key={i} >
                            <Ball
                                text={v}
                                row={row}
                                value={i}
                                status={balls[row][i]}
                                onPress={(x,y,v)=>me.selectBall(x,y,v)}
                            />
                        </View>
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

    buildSpecialBalls(row) {
        const me = this;
        const {balls,rowTitle} = this.state;
        if(balls.length > 0) {
            const rows = balls.length,
                ballTitleLen = rowTitle.length;

            if(rows == ballTitleLen) {
                const ballWidth = (G_Theme.windowWidth - 20) / me.state.rowBallNumber;
                return <View style={styles.ballBox}>
                    {['大','小'].map((v,i) => {
                        return <View  style={[styles.ballBtnBox,{width:ballWidth}]} key={i} >
                            <Ball
                                text={v}
                                row={row}
                                value={i}
                                status={balls[row][i]}
                                onPress={(x,y,v)=>me.selectBall(x,y,v)}
                            />
                        </View>
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

    buildUI(){
        const me = this;
        return <View style={styles.gameBox}>
            {me.state.rowTitle.map((v,i) => {
                return <View key={i} style={styles.gameRow} >
                    <View style={styles.gameRowTitle}><Text style={styles.gameRowTitleText}>{v}</Text></View>
                    { i == 0 ? me.buildSpecialBalls(i) : me.buildBalls(i)}
                    { i != 0 ? me.buildBallOperates(i) : null }
                </View>
            })}
        </View>
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