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
import KENO from "./KENO";

export default class Quwei extends KENO {

    constructor(props) {
        super(props);
        this.isShowMoneyUnit = false;
        this.isShowGamePriceModelPannel = false;
        this.state.rowBallNumber = 4; //一行几个球
        this.clickMenuItem = props.clickMenuItem;
        this.state.gameMethod = [];
        this.currentGameWay = [];
        this.lastSelectBallY;
    }

    //
    setBallText = () => [['大', '和', '小'], ['上', '中', '下'], ['奇', '和', '偶'], ['单', '双'], ['大／单', '大／双', '小／单', '小／双'], ['金', '木', '水', '火', '土']];

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


//随机选一注
    selectAutoOne() {
        const {gameMethod} = this.state;
        const me = this;
        let len = 0;
        let i = Math.floor(Math.random() * 20);

        gameMethod[0]['children'].map((children, y) => {
            let clen = children.children.length;
            for (let x = 0; x < clen; x++) {
                len++;
                if (len == i) {
                    me.selectBall(x, y, 1, gameMethod[0].children[y].children[x]);
                }
            }

            //
        })
    }

    // //生成单注随机数
    createRandomNum() {
        const me = this,
            current = [];
        me.setRandomArr();
        const {gameMethod} = this.state;
        let len = 0,
            i = Math.floor(Math.random() * 20);


        gameMethod[0]['children'].map((children, y) => {
            let clen = children.children.length;
            for (let x = 0; x < clen; x++) {
                len++;
                if (len == i) {
                    this.currentGameWay = gameMethod[0].children[y].children[x];
                    this.currentGameWay.parent_parent_name_cn = gameMethod[0].name_cn
                    current[0] = [this.currentGameWay.valid_nums];
                    return false;
                }
            }

            //
        })
        return current;
    }

    //生成一个当前玩法的随机投注号码
    //该处实现复式，子类中实现其他个性化玩法
    //返回值： 按照当前玩法生成一注标准的随机投注单(order)
    randomNum() {
        const me = this,
            {prize_group} = this.state,
            {moneyUnit, prize} = this.props;
        let i = 0,
            current = [],
            order = [],
            lotterys = [],
            onePrice = this.currentGameWay.price,
            original = [];
        let multiple = this.currentGameWay.bet_min_amount > 0 ? this.currentGameWay.bet_min_amount : 1;

        current = me.checkRandomBets();
        original = current;
        lotterys = me.randomCombinLottery(original);
        order = {
            amount: lotterys.length * onePrice * multiple * moneyUnit,
            original: original,
            // ball: me.makePostParameter(original),
            // viewBalls: me.formatViewBalls(original),
            ball: this.currentGameWay.valid_nums,
            viewBalls: this.currentGameWay.series_way_name,
            wayId: this.currentGameWay.id,
            num: lotterys.length,
            prize_group: prize,
            onePrice: onePrice,
            moneyunit: moneyUnit,
            multiple: multiple,
            gameName: this.currentGameWay.parent_parent_name_cn + this.currentGameWay.name_cn
        };
        return order;
    }

    checkBallIsComplete(v = null) {
        let me = this,
            ball = me.state.balls,
            num = 0;
        for (let row in ball) {

            for (let s in ball[row]) {

                if (ball[row][s] > 0) {
                    num++;
                }
            }

        }


        if (num < 1) {
            this.setState({isBallsComplete: false});
            return false;
        }
        // //检查倍数
        // let {multiple} = this.props;//
        if (v != null) {
            let multiple = v;
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
        }
        this.setState({isBallsComplete: true});
        return true;

    }


    getResultData(lotterys) {
        const me = this;
        const {prize_group} = this.state;
        const {moneyUnit, multiple, currentGameWay, prize} = this.props;
        let onePrice = currentGameWay.price,
            lotterysOriginal = me.getOriginal();

        if (lotterys.length < 1) {
            return {};
        }
        return {
            original: lotterysOriginal,
            //lotterys:lotterys,
            amount: lotterys.length * onePrice * multiple * moneyUnit,
            wayId: currentGameWay.id,
            ball: this.currentGameWay.valid_nums,
            viewBalls: this.currentGameWay.series_way_name,
            num: 1,
            prize_group: prize,
            onePrice: onePrice,
            moneyunit: moneyUnit,
            multiple: multiple,
            gameName: currentGameWay.parent_parent_name_cn + currentGameWay.name_cn
        };
    }

    componentDidMount() {
        super.componentDidMount();
        const {id} = this.props.navigation.state.params;
        HTTP_SERVER.MethodData.url = HTTP_SERVER.MethodData.formatUrl.replace(/#id/g, id);
        G_RunAfterInteractions(() => {
            ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.MethodData, (result) => {
                if (result.data) {

                    // let arr = this.state.dataList.concat(result.data.data);
                    this.setState({gameMethod: result.data})
                }
            })
        })
    }

    selectBall(x, y, v, data) {
        const {multiple} = this.props;


        const me = this;
        me.setBallData(x, y, v)
        if (v == 1) {
            this.currentGameWay = data;
            this.clickMenuItem(data);
            this.setState({selectItem: data.id});
            //设置最小倍数
            if (data.bet_min_amount > 0 && data.bet_min_amount > multiple) {
                ActDispatch.GameAct.setMultiple(data.bet_min_amount);
            }
        }
        const lotteryNums = me.getLottery();
        this.setState({lotterys: lotteryNums});

    }

    setBallData(x, y, value) {

        const me = this;
        const {balls} = this.state;
        const data = balls;
        let xLen = 0;
        for (let row in data) {
            for (let i in data[row]) {
                if (data[row][i] > 0) {
                    xLen++;
                }
            }
        }
        if (value == 1) {
            if (xLen >= 1) {
                me.setBallData(me.lastSelectBallIndex, me.lastSelectBallY, -1);
            }
            me.lastSelectBallIndex = x;
            me.lastSelectBallY = y;
        }

        if (y >= 0 && y < data.length) {
            data[y][x] = value;
            this.setState({balls: data});
        }
    }

    //获取组合结果
    getLottery() {
        let me = this,
            ball = me.state.balls,
            i = 0,
            len = ball.length,
            arr = [];

        for (; i < len; i++) {

            let len2 = ball[i].length;
            for (let j = 0; j < len2; j++) {
                if (ball[i][j] > 0) {
                    arr.push(j);
                }
            }
        }
        //校验当前的面板
        // //获取选中数字
        me.checkBallIsComplete()

        return me.combine(arr, 1);

    }


    buildSpecialBalls(row) {
        const me = this;
        const {balls, rowTitle, gameMethod} = this.state;

        if (balls.length > 0) {
            const rows = balls.length,
                ballTitleLen = rowTitle.length;
            if (rows == ballTitleLen && gameMethod.length > 0) {
                return rowTitle.map((v, row) => {
                    const ballWidth = (G_Theme.windowWidth - 20) / gameMethod[0].children[row].children.length;
                    return <View style={styles.ballBox} key={row}>
                        {
                            gameMethod[0].children[row].children.map((repo, i) => {
                                return <View style={[styles.ballBtnBoxQuwei, {
                                    width: ballWidth,
                                }]} key={i}>
                                    <BallSquare
                                        width={ ballWidth - 10}
                                        height={(G_Theme.windowWidth - 20) / 4 / 2}
                                        text={repo.series_way_name }
                                        desctext={ (repo.prize * 100) / 100}
                                        row={row}
                                        valid_nums={repo.valid_nums}
                                        value={i}
                                        status={balls[row][i]}
                                        onPress={(x, y, v) => me.selectBall(x, y, v, repo)}
                                    />
                                </View>
                            })
                        }

                    </View>
                })
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
        const {gameMethod} = this.state;
        return <View style={styles.gameBox}>
            <View key={0} style={styles.gameRow}>
                <View style={styles.gameRowTitle}><Text style={styles.gameRowTitleText}>选球</Text></View>

                {gameMethod.length > 0 ? me.buildSpecialBalls() : null}
            </View>
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
        height: 60
    },

    ballBtnBox: {
        flexWrap: 'wrap',
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