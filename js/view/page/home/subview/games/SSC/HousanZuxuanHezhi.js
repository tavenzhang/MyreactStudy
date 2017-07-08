/**
 * Created by soga on 2017/4/25.
 */

import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

import Ball from "../../../../../componet/game/Ball";
import SSC from "./SSC";

export default class HousanZuxuanHezhi extends SSC {

    constructor(props) {
        super(props);
        this.ballFirstStart=1;

    }

    //设置球排列
    setBalls = () => [
        [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
    ];

    setBallText = () => [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26];


    //设置rowtitle
    setRowTitle = () => ['选球']
    //生成单注随机数
    createRandomNum() {
        const me = this,
            current = [],
            {balls} = this.state;
        me.setRandomArr();
        let i = me.getRandomNum();
        current[0] = [i];
        return current;
    }

    //组合随机注单组合方法
    //子类实现
    randomCombinLottery(arr) {
        const me=this;
        let resultNum=[],j=0;;
        for(;j < arr.length;j++){
            resultNum = resultNum.concat(me.mathResult(arr[j], 0, 9));
        }
        return resultNum;
    }
    buildBalls(row) {
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
                                    text={v}
                                    row={row}
                                    value={i}
                                    status={balls[row][i]}
                                    onPress={(x,y,v)=>me.selectBall(x,y,v)}
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

    formatViewBalls(original){
        let me = this,
            result = [],
            len = original.length,
            i = 0;
        for (; i < len; i++) {
            result = result.concat(original[i].join('|'));
        }
        return result.join('|');
    }

    checkBallIsComplete(){
        let me = this,
            ball = me.state.balls[0],
            i = 0,
            len = ball.length,
            num = 0;
        for(;i < len;i++){
            if(ball[i] > 0){
                num++;
            }
        }
        if(num >= 1){
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
        const me = this;
        const {balls} = this.state;
        const ball = balls[0];

        let i = 0,
            len = ball.length,
            arr = [],
            resultNum = [];

        for(;i < len;i++){
            if(ball[i] > 0){
                arr.push(i);
            }
        }
        //校验当前的面板
        //获取选中数字
        if(me.checkBallIsComplete()){
            for(var j=0;j < arr.length;j++){
                resultNum = resultNum.concat(me.mathResult(arr[j], 0, 9));
            }
            return resultNum;
        }
        return [];
    }

    //检测结果重复
    checkResult(data, array){
        //检查重复
        for (let i = array.length - 1; i >= 0; i--) {
            if(array[i].join('') == data){
                return false;
            }
        }
        return true;
    }

    //计算各种结果
    mathResult(sum, nBegin, nEnd){
        let me = this,
            arr = [],
            checkArray = [],
            x,y,z;

        for (x=nBegin;x<=nEnd ;x++ ){
            for (y=nBegin;y<=nEnd ;y++ ){
                for (z=nBegin;z<=nEnd ;z++ ){
                    if(x+y+z==sum && me.arrIndexOf(x, [x,y,z]) != 3){
                        var postArray = [x,y,z].sort(function(a, b){
                            return a-b;
                        });
                        if(me.checkResult(postArray.join(''), checkArray)){
                            checkArray.push(postArray)
                            arr.push([x,y,z]);
                        }
                    }
                }
            }
        }
        return arr;
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