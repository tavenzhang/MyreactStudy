/**
 * Created by soga on 2017/5/6.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

import Ball from "../../../../../componet/game/Ball";
import KENO from "./KENO";

export default class Quwei extends KENO {

    constructor(props) {
        super(props);

    }
    //
   setBallText=()=>[['大', '和', '小'], ['上', '中', '下'], ['奇', '和', '偶'], ['单', '双'], ['大／单', '大／双', '小／单', '小／双'], ['金', '木', '水', '火', '土']];

    //设置球排列
    setBalls = () => [
        [-1, -1, -1],
        [-1, -1, -1],
        [-1, -1, -1],
        [-1, -1],
        [-1, -1, -1, -1],
        [-1, -1, -1, -1, -1],
    ];

    //设置rowtitle
    setRowTitle = () => ['和值大小', '上下盘', '奇偶盘', '单双盘', '大小单双', '五行'];

    checkBallIsComplete() {
        let me = this,
            ball = me.state.balls[0],
            i = 0,
            len = ball.length,
            num = 0;
        for (; i < len; i++) {
            if (ball[i] > 0) {
                num++;
            }
        }
        this.setState({isBallsComplete: true});
        return true;

    }
    setBallData(x, y, value) {

        const me = this;
        const {balls} = this.state;
        const data = balls;

        if (y >= 0 && y < data.length ) {
            data[y][x] = value;
            this.setState({balls: data});
        }
    }
    //获取组合结果
    getLottery() {
        let me = this,
            ball = me.state.balls[0],
            i = 0,
            len = ball.length,
            arr = [];

        for (; i < len; i++) {
            if (ball[i] > 0) {
                arr.push(i);
            }
        }
        //校验当前的面板
        //获取选中数字
        if (me.checkBallIsComplete()) {
            return me.combine(arr, 7);
        }

        return [];
    }

    buildBalls(row) {
        const me = this;
        const {balls, ballText, rowTitle} = this.state;
        if (balls.length > 0) {
            const rows = balls.length,
                ballTitleLen = rowTitle.length;

            if (rows == ballTitleLen) {
                const ballWidth = (G_Theme.windowWidth - 20) / me.state.rowBallNumber;
                return <View style={styles.ballBox}>
                    {ballText.map((v, i) => {
                        return <View style={[styles.ballBtnBox, {width: ballWidth}]} key={i}>
                            <Ball
                                text={v}
                                row={row}
                                value={i}
                                status={balls[row][i]}
                                onPress={(x, y, v) => me.selectBall(x, y, v)}
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
        const {balls, rowTitle} = this.state;
        if (balls.length > 0) {
            const rows = balls.length,
                ballTitleLen = rowTitle.length;

            if (rows == ballTitleLen) {
                const ballWidth = (G_Theme.windowWidth - 20) / me.state.rowBallNumber;
                return <View style={styles.ballBox}>
                    {me.state.ballText[row].map((v, i) => {
                            return <View style={[styles.ballBtnBox, {width: ballWidth}]} key={i}>
                                <Ball
                                    text={v}
                                    row={row}
                                    value={i}
                                    status={balls[row][i]}
                                    onPress={(x, y, v) => me.selectBall(x, y, v)}
                                />
                            </View>

                    })
                    }
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

    buildUI() {
        const me = this;
        return <View style={styles.gameBox}>
            {me.state.rowTitle.map((v, i) => {
                return <View key={i} style={styles.gameRow}>
                    <View style={styles.gameRowTitle}><Text style={styles.gameRowTitleText}>{v}</Text></View>
                    {me.buildSpecialBalls(i)}

                </View>
            })}
        </View>
    }
}


const styles = StyleSheet.create({

    ballBox: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        //paddingLeft: 20,
        //paddingRight: 20,
    },

    ballBtnBox: {
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        height: 50
    },

    gameRow: {
        flexWrap: 'wrap',
        margin: 10,
        backgroundColor: '#fff',
        marginBottom: 0,
        borderRadius: 8
    },
    gameRowTitle: {
        width: 60,
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
    controlPanel: {
        flex: 1,
        padding: 10,
        marginTop: 10,
        marginBottom: 5,
        //justifyContent: 'space-between'
    }

});