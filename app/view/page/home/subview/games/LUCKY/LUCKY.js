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

export default class LUCKY extends Games {

    constructor(props) {
        super(props);
        this.state.rowBallNumber = 5; //一行几个球
        this.lastSelectBallIndex = -1;
        this.ballFirstStart = 1;

    }

    //设置BallText
    setBallText = () => [0,1,2,3,4,5,6,7,8,9,10];

    setBallData(x, y, value) {
        const me = this;
        const {balls} = this.state;
        const data = balls;
        if(x < this.ballFirstStart ){
            return;
        }
        if (y >= 0 && y < data.length && x >= this.ballFirstStart) {
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