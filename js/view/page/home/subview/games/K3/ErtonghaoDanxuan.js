/**
 * Created by soga on 2017/5/10.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

import Ball from "../../../../../componet/game/Ball";

import K3 from "./K3";

export default class ErtonghaoDanxuan extends K3 {

    constructor(props) {
        super(props);

        this.ballSpecialTitle = ['', '11', '22', '33', '44', '55', '66'];
    }

    //设置球排列
    setBalls = () => [
        [-1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1],
    ];

    //设置rowtitle
    setRowTitle = () => ['同号', '不同号'];

    //随机选一注
    selectAutoOne() {
        const me = this;
        const {balls} = this.state;
        let len = balls.length;
        me.setRandomArr();
        for (let j = 0; j < len; j++) {
            let i = me.getRandomNum();
            me.selectBall(i, j, 1);
        }
    }


    //生成单注随机数
    createRandomNum() {
        const me = this,
            current = [];
        me.setRandomArr();
        for (let j = 0; j < 2; j++) {
            let i = me.getRandomNum();
            current[j]=[i];
        }
        return current;
    }

    makePostParameter(original){
        let me = this,
            i = 0,
            len = original.length,
            result = [];

        for(;i < len;i++){
            result.push(original[i].join(''));
        }
        return result.join('|');
    }
    //组合随机注单组合方法
    //子类实现
    randomCombinLottery(arr) {
        const me = this;
        let nr = [], result = [],len=arr[0].length;
        //存储单号组合
        result = me.combine(arr[1], 1);
        //二重号组合
        for (let j = 0; j < len; j++) {
            //加上单号各种组合
            for (var s = 0; s < result.length; s++) {
                if (me.arrIndexOf(j, result[s]) == -1) {
                    nr.push(result[s].concat([j, j, j, j]));
                }
            }

        }
        return nr;
    }

    checkBallIsComplete() {
        let me = this,
            ball = me.state.balls,
            i = 0,
            len = ball[0].length,
            num = 0, oNum = 0;

        for (; i < len; i++) {
            if (ball[0][i] > 0) {
                oNum++;
            }
            if (ball[1][i] > 0) {
                num++;
            }
        }
        //二重号大于0 && 单号大于0
        if (num > 0 && oNum > 0) {
            this.setState({isBallsComplete: true});
            return true;
        }
        this.setState({isBallsComplete: false});
        return false;
    }


    //获取总注数/获取组合结果
    //isGetNum=true 只获取数量，返回为数字
    //isGetNum=false 获取组合结果，返回结果为单注数组
    getLottery(isGetNum) {
        let me = this,
            ball = me.state.balls,
            i = 0,
            len = ball[1].length,
            result = [],
            arr = [],
            nr = [];

        //校验当前的面板
        //获取选中数字
        if (me.checkBallIsComplete()) {
            for (; i < len; i++) {
                if (ball[1][i] > 0) {
                    arr.push(i);
                }
            }
            //存储单号组合
            result = me.combine(arr, 1);
            //二重号组合
            for (let j = 0; j < ball[0].length; j++) {
                if (ball[0][j] == 1) {
                    //加上单号各种组合
                    for (var s = 0; s < result.length; s++) {
                        if (me.arrIndexOf(j, result[s]) == -1) {
                            nr.push(result[s].concat([j, j, j, j]));
                        }
                    }
                }
            }
            return nr;
        }
        return [];
    }

    buildUI() {
        const me = this;
        return <View style={styles.gameBox}>
            {me.state.rowTitle.map((v, i) => {
                return <View key={i} style={styles.gameRow}>
                    <View style={styles.gameRowTitle}><Text style={styles.gameRowTitleText}>{v}</Text></View>
                    { i < 1 ? me.buildSpecialBalls(i) : me.buildBalls(i)}
                    { i >= 1 ? me.buildBallOperates(i) : null}
                </View>
            })}
        </View>
    }

}


const styles = StyleSheet.create({


    gameRow: {
        flexWrap: 'wrap',
        margin: 10,
        backgroundColor: '#fff',
        marginBottom: 0,
        borderRadius: 8
    },
    gameRowTitle: {
        width: 45,
        height: 18,
        backgroundColor: G_Theme.primary,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 1,
        marginTop: 6,
        marginBottom: 10,
    },
    gameRowTitleText: {
        color: '#fff',
        fontSize: 12
    }
});