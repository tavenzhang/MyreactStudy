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
import LUCKY from "./LUCKY";

export default class QUWEI extends LUCKY {

    constructor(props) {
        super(props);
        this.cfgNum = 1;

    }

    //
    setBallText = () => [[0, 1, 2, 3, 4, 5, 6, 7, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]];

    //设置球排列
    setBalls = () => [
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],

    ];

    //设置rowtitle
    setRowTitle = () => ['选球'];

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
        let xLen=0;
        for (let val in data[0]) {
            if(data[0][val] > 0){
                xLen++;
            }
        }
        if(value == 1){
            if(xLen >=1){
                me.setBallData(me.lastSelectBallIndex, 0, -1);
            }
            me.lastSelectBallIndex = x;
        }
        if (y >= 0 && y < data.length) {
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

    componentDidMount() {
        const {lotteryId} = this.props;
        HTTP_SERVER.TREND_DATA.url = HTTP_SERVER.TREND_DATA.formatUrl.replace(/{#lid}/, lotteryId).replace(/{#type}/, 5)
        G_RunAfterInteractions(() => {
            ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.TREND_DATA, (data) => {
                this.setState({
                    firstList: this.getDataByPosition(data, 0),
                    secondList: this.getDataByPosition(data, 1),
                    thirdList: this.getDataByPosition(data, 2),
                    fourList: this.getDataByPosition(data, 3),
                    fiveList: this.getDataByPosition(data, 4),
                    mixList: this.getDataByPosition(data, 5, true)
                })
            })
        })
    }

    buildSpecialBalls(row) {
        const me = this;
        const {balls, rowTitle} = this.state;
        const {gameMethod} = this.props;

        if (balls.length > 0) {
            const rows = balls.length,
                ballTitleLen = rowTitle.length;

            if (rows == ballTitleLen) {
                const ballWidth = (G_Theme.windowWidth - 20) / me.state.rowBallNumber;
                return <View style={styles.ballBox}>
                    {gameMethod[0].children.map((repo, i) => {
                        return <View style={[styles.ballBtnBox, {width: ballWidth}]} key={i}>
                            <Ball
                                text={i<=27?i:repo.name}
                                row={row}
                                value={i}
                                status={balls[row][i]}
                                onPress={(x, y, v) => me.selectBall(x, y, v)}
                            />
                        </View>
                    })
                    }
                    <View style={[styles.ballBtnBox, {width: ballWidth}]} key={1}>
                        <Ball
                            text={'01'}
                            row={0}
                            value={1}
                            status={balls[0][1]}
                            onPress={(x, y, v) => me.selectBall(x, y, v)}
                        />
                    </View>

                    <View style={[styles.ballBtnBox, {width: ballWidth}]} key={2}>
                        <Ball
                            text={'02'}
                            row={0}
                            value={2}
                            status={balls[0][2]}
                            onPress={(x, y, v) => me.selectBall(x, y, v)}
                        />
                    </View>
                    <View style={[styles.ballBtnBox, {width: ballWidth}]} key={3}>
                        <Ball
                            text={'03'}
                            row={0}
                            value={3}
                            status={balls[0][3]}
                            onPress={(x, y, v) => me.selectBall(x, y, v)}
                        />
                    </View>
                    <View style={[styles.ballBtnBox, {width: ballWidth}]} key={4}>
                        <Ball
                            text={'04'}
                            row={0}
                            value={4}
                            status={balls[0][4]}
                            onPress={(x, y, v) => me.selectBall(x, y, v)}
                        />
                    </View>
                    <View style={[styles.ballBtnBox, {width: ballWidth}]} key={5}>
                        <Ball
                            text={'05'}
                            row={0}
                            value={5}
                            status={balls[0][5]}
                            onPress={(x, y, v) => me.selectBall(x, y, v)}
                        />
                    </View>
                    <View style={[styles.ballBtnBox, {width: ballWidth}]} key={6}>
                        <Ball
                            text={'06'}
                            row={0}
                            value={6}
                            status={balls[0][6]}
                            onPress={(x, y, v) => me.selectBall(x, y, v)}
                        />
                    </View>

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