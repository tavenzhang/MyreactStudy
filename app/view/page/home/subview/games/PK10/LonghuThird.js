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
import PK10 from "./PK10";

export default class LonghuThird extends PK10 {

    constructor(props) {
        super(props);
        this.state.rowBallNumber = 2; //一行几个球
        this.ballFirstStart = 0;
    }

    //设置球排列
    setBalls = () => [
        [-1, -1]
    ];

    //设置BallText
    setBallText = () => ['龙', '虎'];

    //设置rowtitle
    setRowTitle = () => ['第三名'];

    makePostParameter(original) {
        let me = this,
            result = [],
            tempArr = [],
            k=0,
            i = 0;

        for(; k < original.length; k++) {
            tempArr[k]  = [];
            for(let j = 0; j < original[k].length; j++ ) {
                tempArr[k][j] = '' + original[k][j];
            }
        }
        for (; i < tempArr.length; i++) {
            result = result.concat(tempArr[i].join(''));
        }
        return result.join('|');
    }

    formatViewBalls(original) {
        let me = this,
            result = [],
            len = original.length,
            i = 0,
            tempArr = [],
            names = ['龙', '虎'];
        for (; i < len; i++) {
            tempArr = [];
            for (let j = 0; j < original[i].length; j++) {
                tempArr[j] = names[Number(original[i][j])];
            }
            result = result.concat(tempArr.join(''));
        }
        return result.join('|');
    }

    buildUI() {
        const me = this;
        return <View style={styles.gameBox}>
            {me.state.rowTitle.map((v, i) => {
                return <View key={i} style={styles.gameRow}>
                    <View style={styles.gameRowTitle}><Text style={styles.gameRowTitleText}>{v}</Text></View>
                    {me.buildBalls(i)}
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
    },

});