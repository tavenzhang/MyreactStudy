/**
 * Created by soga on 2017/5/6.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

import Ball from "./../../../../../componet/game/Ball";
import L115 from "./L115";

export default class QuweiDingdanshuang extends L115 {

    constructor(props) {
        super(props);
        this.state.rowBallNumber = 3; //一行几个球
    }

    //设置球排列
    setBalls = () => [
        [-1,-1,-1,-1,-1,-1,-1],
    ];

    //设置BallText
    setBallText = () => ['','5单\n0双', '4单\n1双', '3单\n2双', '2单\n3双', '1单\n4双', '0单\n5双'];

    //设置rowtitle
    setRowTitle = () => ['定单双'];

    formatViewBalls(original){
        let me = this,
            result = [],
            len = original.length,
            i = 0,
            tempArr = [],
            names = ['','5单0双', '4单1双', '3单2双', '2单3双', '1单4双', '0单5双'];
        for (; i < len; i++) {
            tempArr = [];
            for(let j=0; j<original[i].length; j++) {
                tempArr[j] = names[Number(original[i][j])];
            }
            result = result.concat(tempArr.join(''));
        }
        return result.join('|');
    }

    buildUI(){
        const me = this;
        const ballstyle = {
            ball : styles.ball,
            text : styles.ballText,
        };
        return <View style={styles.gameBox}>
            {me.state.rowTitle.map((v,i) => {
                return <View key={i} style={styles.gameRow} >
                    <View style={styles.gameRowTitle}><Text style={styles.gameRowTitleText}>{v}</Text></View>
                    {me.buildBalls(i,ballstyle)}
                </View>
            })}
        </View>
    }

    //data 该玩法的单注信息
    editSubmitData(data){
        let ball_num = {'1':'5','2':'4','3':'3','4':'2','5':'1','6':'0'},
            numArr = data['ball'].split(''),
            result = [];
        for(let i=0; i < numArr.length; i++) {
            ball_num['' + i] ? result.push(ball_num['' + i]) : result.push(i);
        }
        data['ball'] = result.join('');
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

    ball: {
        borderRadius:25,
        width:50,
        marginBottom: 20,
        height:50
    },

    ballText: {
        fontWeight: 'bold',
        fontSize: 14
    }
});