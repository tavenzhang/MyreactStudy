/**
 * Created by soga on 2017/5/3.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

import Ball from "../../../../../componet/game/Ball";
import SSC from "./SSC";

export default class QuweiSimaSanxing extends SSC {

    constructor(props) {
        super(props);

    }

    //设置球排列
    setBalls = () => [
        [-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
    ];

    //设置rowtitle
    setRowTitle = () => ['万位','千位','百位'];


    formatViewBalls(original){
        let me = this,
            result = [],
            len = original.length,
            i = 0,
            tempArr = [],
            names = ['小','大'];
        for (; i < len; i++) {
            if(i == 0){
                tempArr = [];
                for(let j=0; j < original[i].length; j++) {
                    tempArr[j] = names[Number(original[i][j] )];
                }
                result = result.concat(tempArr.join(''));
            }else{
                result = result.concat(original[i].join(''));
            }

        }
        return result.join('|');
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
                    {['小','大'].map((v,i) => {
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
        backgroundColor :G_Theme.primary,
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
    controlPanel: {
        flex: 1,
        padding: 10,
        marginTop:10,
        marginBottom:5,
        //justifyContent: 'space-between'
    }

});