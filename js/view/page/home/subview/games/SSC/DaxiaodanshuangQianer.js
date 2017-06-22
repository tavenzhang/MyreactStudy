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

export default class DaxiaodanshuangQianer extends SSC {

    constructor(props) {
        super(props);

        this.state.rowBallNumber = 4; //一行几个球

    }

    //设置球排列
    setBalls = () => [
        [-1,-1,-1,-1],
        [-1,-1,-1,-1]
    ];

    //设置BallText
    setBallText = () => ['大', '小', '单', '双'];

    //设置rowtitle
    setRowTitle = () => ['万位','千位'];

    formatViewBalls(original){
        let me = this,
            result = [],
            len = original.length,
            i = 0,
            tempArr = [],
            names = ['大', '小', '单', '双'];
        for (; i < len; i++) {
            tempArr = [];
            for(let j=0; j<original[i].length; j++) {
                tempArr[j] = names[Number(original[i][j] )];
            }
            result = result.concat(tempArr.join(''));
        }
        return result.join('|');
    }

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