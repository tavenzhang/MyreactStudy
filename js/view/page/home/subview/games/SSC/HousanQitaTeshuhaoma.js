/**
 * Created by soga on 2017/4/25.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

import Ball from "./../../../../../componet/game/Ball";

import SSC from "./SSC";

export default class HousanQitaTeshuhaoma extends SSC {

    constructor(props) {
        super(props);
        this.state.rowBallNumber = 3; //一行几个球

    }

    //设置球排列
    setBalls = () => [
        [-1,-1,-1],
    ];

    //设置rowtitle
    setRowTitle = () => ['选球'];

    //设置BallText
    setBallText = () => ['豹子', '顺子', '对子'];

    buildUI(){
        const me = this;
        return <View style={styles.gameBox}>
            {me.state.rowTitle.map((v,i) => {
                return <View key={i} style={styles.gameRow} >
                    <View style={styles.gameRowTitle}><Text style={styles.gameRowTitleText}>{v}</Text></View>
                    {me.buildBalls(i)}
                </View>
            })}
        </View>
    }

    //并设置 isBallsComplete
    checkBallIsComplete(){
        const me = this;
        const {balls} = this.state;
        const ball = balls[0];

        let i = 0,
            len = ball.length,
            num = 0;
        for (; i < len; i++) {
            if (ball[i] > 0) {
                num++;
            }
        }
        //二重号大于1 && 单号大于3
        if(num >= 1){
            this.setState({isBallsComplete: true});
            return true;
        }
        this.setState({isBallsComplete: false});
        return false;
    }

    //获取组合结果
    getLottery(){
        const me = this;
        const {balls} = this.state;
        const ball = balls[0];

        let i = 0,
            len = ball.length,
            arr = [],
            resultNum = [];

        for (; i < len; i++) {
            if (ball[i] > 0) {
                arr.push(i);
            }
        }
        //校验当前的面板
        //获取选中数字
        if (me.checkBallIsComplete()) {
            return arr;
        }
        return [];
    }

    formatViewBalls(original){
        let me = this,
            result = [],
            len = original.length,
            i = 0,
            tempArr = [],
            names = ['豹子', '顺子', '对子'];
        for (; i < len; i++) {
            tempArr = [];
            for(let j = 0; j< original[i].length; j++) {
                tempArr[j] = names[Number(original[i][j] )];
            }
            result = result.concat(tempArr.join('|'));
        }
        return result.join('');
    }
}


const styles = StyleSheet.create({

    gameRow: {
        flexWrap : 'wrap',
        margin: 10,
        backgroundColor: '#fff',
        marginBottom: 0,
        borderRadius: 8
    },

    gameRowTitle: {
        width: 45,
        height: 18,
        backgroundColor : global.G_Theme.primary,
        justifyContent:"center",
        alignItems:"center",
        marginLeft: 1,
        marginTop: 6,
        marginBottom: 10,
    },

    gameRowTitleText: {
        color: '#fff',
        fontSize: 12
    },

});