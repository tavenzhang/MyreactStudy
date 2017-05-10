/**
 * Created by soga on 2017/5/10.
 */

//import React, {Component} from 'react';
//import {
//    View,
//    Text,
//    ScrollView,
//    StyleSheet,
//} from 'react-native';

import Games from "../../../../../componet/game/Games";
//import Ball from "../../../../../componet/game/Ball";

export default class K3 extends Games {

    constructor(props) {
        super(props);
        this.state.rowBallNumber = 3; //一行几个球
        //this.lastSelectBallIndex = -1;
    }

    //设置BallText
    setBallText = () => [1,2,3,4,5,6];

    makePostParameter(original) {

        let me = this,
            i = 0,
            len = original.length,
            result = [];

        for(;i < len;i++){
            for(let j=0; j< original[i].length; j++) {
                result[i][j] = original[i][j] + 1;
            }
            result[i] = result[i].join('');
        }

        return result.join('|');
    }

    formatViewBalls(original) {
        return this.makePostParameter(original);
    }

    buildBallOperates() {
        return null;
    }
    //buildBalls(row,ballStyle) {
    //    const me = this;
    //    const {balls,ballText,rowTitle} = this.state;
    //    if(balls.length > 0) {
    //        const rows = balls.length,
    //            len = balls[0].length,
    //            ballTextLen = ballText.length,
    //            ballTitleLen = rowTitle.length;
    //        if(rows == ballTitleLen && len == ballTextLen) {
    //            const ballWidth = (GlobelTheme.screenWidth - 20) / me.state.rowBallNumber;
    //            return <View style={styles.ballBox}>
    //                {me.state.ballText.map((v,i) => {
    //                    return <View  style={[styles.ballBtnBox,{width:ballWidth}]} key={i} >
    //                        <Ball
    //                            text={v}
    //                            row={row}
    //                            value={i}
    //                            status={balls[row][i]}
    //                            onPress={(x,y,v)=>me.selectBall(x,y,v)}
    //                            ballStyle={ballStyle ? ballStyle.ball : null}
    //                            textStyle={ballStyle ? ballStyle.text : null}
    //                            />
    //                    </View>
    //                })}
    //            </View>
    //        }
    //        else {
    //            return null;
    //        }
    //    }
    //    else {
    //        return null;
    //    }
    //}
}


//const styles = StyleSheet.create({
//
//    ballBox: {
//        flex: 1,
//        flexDirection : 'row',
//        flexWrap : 'wrap',
//        //paddingLeft: 20,
//        //paddingRight: 20,
//    },
//
//    ballBtnBox: {
//        flexDirection : 'row',
//        justifyContent:"center",
//        alignItems:"center",
//        height: 50
//    },
//
//});