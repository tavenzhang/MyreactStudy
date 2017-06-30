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
import BallSquare from "../../../../../componet/game/BallSquare";
import LUCKY from "./LUCKY";

export default class QUWEI extends LUCKY {

    constructor(props) {
        super(props);
        this.cfgNum = 1;
        this.isShowMoneyUnit = false;
        this.isShowGamePriceModelPannel = false;
        this.state.rowBallNumber = 4; //一行几个球
        this.state.gameMethod = [];
        this.clickMenuItem = props.clickMenuItem;
        this.currentGameWay = [];
        this.parent_name_cn=null;
    }

    //
    setBallText = () => [[0, 1, 2, 3, 4, 5, 6, 7, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37]];

    //设置球排列
    setBalls = () => [
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
            -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]];

    //设置rowtitle
    setRowTitle = () => ['选球'];

    checkBallIsComplete(v = null) {

        let me = this,
            ball = !!me.state.balls[0] ? me.state.balls[0] : [],
            i = 0,
            len = ball.length,
            num = 0;
        for (; i < len; i++) {
            if (ball[i] > 0) {
                num++;
            }
        }

        if (num < 1) {
            this.setState({isBallsComplete: false});
            return false;
        }
        //检查倍数


        let {multiple} = this.props;
        if (v != null) {
            multiple = v;
        }

        if (this.currentGameWay && this.currentGameWay.bet_max_amount > -1) {
            if (multiple > this.currentGameWay.bet_max_amount) {
                this.setState({isBallsComplete: false});
                return false;
            }
        }
        if (this.currentGameWay && this.currentGameWay.bet_min_amount > -1) {
            if (multiple < this.currentGameWay.bet_min_amount) {
                this.setState({isBallsComplete: false});
                return false;
            }
        }


        this.setState({isBallsComplete: true});
        return true;

    }


    selectBall(x, y, v, data) {

        const me = this;
        me.setBallData(x, y, v)
        if (v == 1) {
            this.currentGameWay = data;
            this.clickMenuItem(this.currentGameWay);
            this.setState({selectItem: data.id});
        }
        const lotteryNums = me.getLottery();
        this.setState({lotterys: lotteryNums});

    }

//随机选一注
    selectAutoOne() {
        const {gameMethod} = this.state;
        const me = this;
        let len = gameMethod.length;
        let i = Math.floor(Math.random() * len);
        me.selectBall(i, 0, 1, gameMethod[i]);
    }

    // //生成单注随机数
    createRandomNum() {
        const me = this,
            current = [];
        me.setRandomArr();
        const {gameMethod} = this.state;
        let len = gameMethod.length;
        let i = Math.floor(Math.random() * len);
        current[0]=[i];
        this.currentGameWay = gameMethod[i];

        return current;
    }

    //生成一个当前玩法的随机投注号码
    //该处实现复式，子类中实现其他个性化玩法
    //返回值： 按照当前玩法生成一注标准的随机投注单(order)
    randomNum() {
        const me = this,
            {prize_group} = this.state,
            {moneyUnit} = this.props;
        let i = 0,
            current = [],
            order = [],
            lotterys = [],
            onePrice = this.currentGameWay.price,
            original = [];
        let multiple= this.currentGameWay.bet_min_amount>0?this.currentGameWay.bet_min_amount:1;

        current = me.checkRandomBets();
        original = current;
        lotterys = me.randomCombinLottery(original);
        order = {
            amount: lotterys.length * onePrice * multiple * moneyUnit,
            original:original,
            // ball: me.makePostParameter(original),
            // viewBalls: me.formatViewBalls(original),
            ball: this.currentGameWay.valid_nums,
            viewBalls: this.currentGameWay.series_way_name,
            wayId: this.currentGameWay.id,
            num: lotterys.length,
            prize_group: prize_group,
            onePrice: onePrice,
            moneyunit: moneyUnit,
            multiple: multiple,
            gameName: this.parent_name_cn + this.currentGameWay.name_cn
        };
        return order;
    }

    // 组合随机注单组合方法
    // //子类实现
    // randomCombinLottery(arr) {
    //     const me=this;
    //     return me.combine(arr[0], 2);
    //
    // }
    setBallData(x, y, value) {

        const me = this;
        const {balls} = this.state;
        const data = balls;
        let xLen = 0;
        for (let val in data[0]) {
            if (data[0][val] > 0) {
                xLen++;
            }
        }
        if (value == 1) {
            if (xLen >= 1) {
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
        me.checkBallIsComplete();

        return me.combine(arr, 1);
    }

    componentDidMount() {
        const {id} = this.props.navigation.state.params;

        HTTP_SERVER.MethodData.url = HTTP_SERVER.MethodData.formatUrl.replace(/#id/g, id);
        G_RunAfterInteractions(() => {
            ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.MethodData, result => {
                if (result.data) {
                    // let arr = this.state.dataList.concat(result.data.data);
                    // TLog('result.data[0].children[0]',result.data[0].children[0]);
                    this.parent_name_cn=result.data[0].children[0].name_cn;
                    this.setState({gameMethod: result.data[0].children[0].children})
                }
            })
        })
    }

    getResultData(lotterys) {
        const me = this;
        const {prize_group} = this.state;
        const {moneyUnit, multiple, currentGameWay} = this.props;

        let onePrice = currentGameWay.price,
            lotterysOriginal = me.getOriginal();

        if (lotterys.length < 1) {
            return {};
        }
        return {
            //original:lotterysOriginal,
            //lotterys:lotterys,
            amount: lotterys.length * onePrice * multiple * moneyUnit,
            wayId: currentGameWay.id,
            original:lotterysOriginal,
            // ball: me.makePostParameter(lotterysOriginal),
            // viewBalls: me.formatViewBalls(lotterysOriginal),
            ball: this.currentGameWay.valid_nums,
            viewBalls: this.currentGameWay.series_way_name,
            num: lotterys.length,
            prize_group: prize_group,
            onePrice: onePrice,
            moneyunit: moneyUnit,
            multiple: multiple,
            gameName: currentGameWay.parent_parent_name_cn + currentGameWay.name_cn
        };
    }

    buildSpecialBalls(row) {
        const me = this;
        const {balls, rowTitle, gameMethod} = this.state;
        if (balls.length > 0) {
            const rows = balls.length,
                ballTitleLen = rowTitle.length;

            if (rows == ballTitleLen) {
                const ballWidth = (G_Theme.windowWidth - 20) / me.state.rowBallNumber;
                const ballWidthS = (G_Theme.windowWidth - 20) / 2;
                return <View style={styles.ballBox}>

                    {
                        gameMethod.map((repo, i) => {

                            if (i <= 27) {
                                return <View style={[styles.ballBtnBox, {width: ballWidth}]}
                                             key={i}>
                                    <Ball { ...repo}
                                          text={i <= 27 ? i : repo.series_way_name}
                                          row={row}
                                          value={repo.valid_nums}
                                          status={balls[row][i]}
                                          onPress={(x, y, v) => me.selectBall(x, y, v, repo)}
                                    />
                                    <Text style={{color: '#757575'}}>{(repo.prize * 100) / 100}</Text>
                                </View>
                            } else {

                                return <View style={[styles.ballBtnBoxQuwei, {
                                    width: i > 35 ? ballWidthS : ballWidth,
                                    height: ballWidth / 2 + 20
                                }]}
                                             key={i}>
                                    <BallSquare
                                        width={ i > 35 ? ballWidthS - 10 : ballWidth - 10}
                                        height={ballWidth / 2}
                                        text={repo.series_way_name }
                                        desctext={ (repo.prize * 100) / 100}
                                        row={row}
                                        value={repo.valid_nums}
                                        status={balls[row][i]}
                                        onPress={(x, y, v) => me.selectBall(x, y, v, repo)}
                                    />

                                </View>
                            }
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
    ballBtnBoxQuwei: {
        //flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        height: 80
    },
    ballBtnBox: {
        //flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        height: 80
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