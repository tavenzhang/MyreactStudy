/**
 * Created by soga on 2017/4/16.
 */

import React, {Component} from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
} from 'react-native';

import Ball from "./Ball";
import GameControlPannel from "./GameControlPannel";
import GameModelPannel from "./GameControlPannel";
import BallOperateBtn from "./BallOperateBtn";
import GameMethod from "../../../class/GameMethod";


export default class Games extends Component {
    constructor(props) {
        super(props);
        this.state =
        {
            ballText: [],
            rowTitle: [],
            isBallsComplete: false,
            lotterys: [],
            onePrice: props.onePrice,
            multiple: props.multiple,
            balance: props.balance,
            rowBallNumber: 5, //一行几个球
        };

        this.buildBalls = this.buildBalls.bind(this);
        this.buildUI    = this.buildUI.bind(this);
        this.selectBall = this.selectBall.bind(this);
        this.setBallData = this.setBallData.bind(this);
        this.checkBallIsComplete = this.checkBallIsComplete.bind(this);
        this.getLottery = this.getLottery.bind(this);
        this.ballSelectActions = this.ballSelectActions.bind(this);
        this.gameMethod = new GameMethod();
    }

    componentWillMount() {
        //初始化设置球排列
        const me = this;

        ActDispatch.GameAct.setBalls(me.setBalls());

        this.setState({rowTitle: me.setRowTitle()});
        this.setState({ballText: me.setBallText()});
    }

    //设置球排列
    setBalls = () => [];

    //设置rowtitle
    setRowTitle = () => [];

    //设置BallText
    setBallText = () => [];

    //选球操作
    ballSelectActions(action,irow,si) {

    }

    setBallData(x, y, value) {
        const me = this;
        const {balls} = this.props;
        const data = balls;

        if (y >= 0 && y < data.length && x >= 0) {
            data[y][x] = value;
            ActDispatch.GameAct.setBalls(data);
            me.gameMethod.setBalls(data);
        }
    }

    selectBall(x,y,v) {
        const me = this;
        me.setBallData(x,y,v)
        const lotteryNums = me.getLottery();
        this.setState({lotterys: lotteryNums});

    }

    buildBalls(row) {
        const me = this;
        const {balls} = this.props;

        if(balls.length > 0) {
            const ballWidth = (GlobelTheme.screenWidth - 20) / me.state.rowBallNumber;
            return <View style={styles.ballBox}>
                        {me.state.ballText.map((v,i) => {
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

    buildBallOperates(row){
        const me = this;
        return <View style={styles.ballBtnGrounp}>
                <BallOperateBtn text="全" onPress={() => me.ballSelectActions('all',row)} />
                <BallOperateBtn text="大" onPress={() => me.ballSelectActions('big',row)} />
                <BallOperateBtn text="小" onPress={() => me.ballSelectActions('small',row)} />
                <BallOperateBtn text="单" onPress={() => me.ballSelectActions('odd',row)} />
                <BallOperateBtn text="双" onPress={() => me.ballSelectActions('even',row)} />
                <BallOperateBtn text="清" onPress={() => me.ballSelectActions('none',row)} />
              </View>
    }

    buildUI(){
        const me = this;
        return <View style={styles.gameBox}>
                    {me.state.rowTitle.map((v,i) => {
                        return <View key={i} style={styles.gameRow} >
                                    <View style={styles.gameRowTitle}><Text style={styles.gameRowTitleText}>{v}</Text></View>
                                    {me.buildBalls(i)}
                                    {me.buildBallOperates(i)}
                                </View>
                    })}
                </View>
    }
    //检测选球是否完整，是否能形成有效的投注
    //并设置 isBallsComplete
    checkBallIsComplete(){
        const me = this;
        const {data} = this.props;

        let i = 0,
            len = data.length,
            row,
            isEmptySelect = true,
            j = 0,
            len2 = 0;

        //检测球是否完整
        for (; i < len; i++) {
            row = data[i];
            len2 = row.length;
            isEmptySelect = true;
            for (j = 0; j < len2; j++) {
                if (row[j] > 0) {
                    isEmptySelect = false;
                }
            }
            if (isEmptySelect) {
                this.setState({isBallsComplete: false});
                return false;
            }
        }
        this.setState({isBallsComplete: true});
    }

    combination(arr2) {
        if (arr2.length < 1) {
            return [];
        }
        let w = arr2[0].length,
            h = arr2.length,
            i, j,
            m = [],
            n,
            result = [],
            _row = [];

        m[i = h] = 1;

        while (i--) {
            m[i] = m[i + 1] * arr2[i].length;
        }
        n = m[0];
        for (i = 0; i < n; i++) {
            _row = [];
            for (j = 0; j < h; j++) {
                _row[j] = arr2[j][~~(i % m[j] / m[j + 1])];
            }
            result[i] = _row;
        }
        return result;
    }

    //获取组合结果
    getLottery(isGetNum) {
        // tellmett：二维数组，球是否被选中
        const me = this;
        const {balls} = this.props;
        const data = balls;

        let i = 0,
            len = data.length,
            row,
            isEmptySelect = true,
            _tempRow = [],
            j = 0,
            len2 = 0,
            result = [],
            //总注数
            total = 1,
            rowNum = 0;
        // tellmett：这里是将各行的球数相乘，得到总注数（特殊的注数计算，不走这里）
        //检测球是否完整
        for (; i < len; i++) {
            result[i] = [];
            row = data[i];
            len2 = row.length;
            isEmptySelect = true;
            // tellmett：当前这一行，选了多少球
            rowNum = 0;
            for (j = 0; j < len2; j++) {
                if (row[j] > 0) {
                    isEmptySelect = false;
                    //需要计算组合则推入结果
                    if (!isGetNum) {
                        result[i].push(j);
                    }
                    rowNum++;
                }
            }
            if (isEmptySelect) {
                this.setState({isBallsComplete: false});
                return [];
            }
            //计算注数
            total *= rowNum;
        }
        this.setState({isBallsComplete: true});
        //返回注数
        //if (isGetNum) {
        //    return total;
        //}
        //if (me.state.isBallsComplete) {
        //    //组合结果
        //    return me.combination(result);
        //} else {
        //    return [];
        //}
        return me.combination(result);
    }

    render() {
        const me = this;
        const { lotterys, multiple, onePrice, balance } = me.state;
        const { orderNum } = me.props;
        const orderData = lotterys.length ? me.gameMethod.getResultData(lotterys) : null;
        const operTopDesc = `${lotterys.length}注 * ${multiple}倍 = ${moneyFormat(lotterys.length * multiple * onePrice)}元`;

        return (
            <View style={{flex:1}}>
                <ScrollView style={styles.ballOperate}>
                    {me.buildUI()}
                    <GameModelPannel />
                </ScrollView>
                <GameControlPannel
                    balance= {balance}
                    topDesc= {operTopDesc}
                    btnEvent= {() => {
                        //加入购彩篮
                        if(orderData) {
                            ActDispatch.GameAct.addOrderToBasket(orderData);
                        }
                        //清空选球
                        me.ballSelectActions();
                        //清空当前注单
                        me.setState({lotterys:[]});
                    }}
                    btnIconEvent= {() => {
                        NavUtil.pushToView(NavViews.LotteryOrders({}));
                    }}
                    btnIconEventDesc={orderNum}
                    btnIconName='cart-plus'
                    btnDisable= { lotterys.length > 0 ? false : true }
                    btnIconDisable= { orderNum > 0 ? false : true }
                    />
            </View>
        );
    }

}


const styles = StyleSheet.create({
    ballOperate: {
        marginBottom:GlobelTheme.gameOperatePanelHeight - 2,
    },
    ballBox: {
        flex: 1,
        flexDirection : 'row',
        flexWrap : 'wrap',
        //paddingLeft: 20,
        //paddingRight: 20,
    },

    gameBox: {
    },

    ballBtnBox: {
        flexDirection : 'row',
        justifyContent:"center",
        alignItems:"center",
        height: 50
    },

    ballBtnGrounp: {
        flexDirection : 'row',
        justifyContent: 'space-between',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: global.GlobelTheme.gray,
        padding :8,
        borderRadius: 15
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
        backgroundColor : global.GlobelTheme.primary,
        justifyContent:"center",
        alignItems:"center",
        marginLeft: 1,
        marginTop: 6,
        marginBottom: 10,
    },

    gameRowTitleText: {
        color: '#fff',
        fontSize: 12
    }
});