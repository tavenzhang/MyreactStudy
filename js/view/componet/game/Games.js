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
import GameModelPannel from "./GameModelPannel";
import GamePriceModelPannel from "./GamePriceModelPannel";
import BallOperateBtn from "./BallOperateBtn";

export default class Games extends Component {
    constructor(props) {
        super(props);
        this.state =
        {
            currentNumber: props.currentNumber,
            currentNumberTime: props.currentNumberTime,
            currentTime: props.currentTime,
            gameNumbers:props.gameNumbers,
            noIssue: props.noIssue,
            series_identifier: props.series_identifier,
            traceMaxTimes: props.traceMaxTimes,
            history_lotterys: props.history_lotterys,
            prize_group: props.bet_min_prize_group || props.user_prize_group,
            balls: [],
            ballText: [],
            rowTitle: [],
            isBallsComplete: false,
            lotterys: [],
            rowBallNumber: 5, //一行几个球
        };
        this.ballSpecialTitle = [];
        this.ballFirstStart = 0;
        this.isShowOperate = true;
        this.buildBalls = this.buildBalls.bind(this);
        this.buildSpecialBalls = this.buildSpecialBalls.bind(this);
        this.buildUI    = this.buildUI.bind(this);
        this.selectBall = this.selectBall.bind(this);
        this.setBallData = this.setBallData.bind(this);
        this.checkBallIsComplete = this.checkBallIsComplete.bind(this);
        this.getLottery = this.getLottery.bind(this);
        this.ballSelectActions = this.ballSelectActions.bind(this);
        this.getResultData = this.getResultData.bind(this);
        this.getOriginal = this.getOriginal.bind(this);
        this.formatViewBalls = this.formatViewBalls.bind(this);
        this.addBallsToBasket = this.addBallsToBasket.bind(this);
        this.beforeAddBallsToBasket = this.beforeAddBallsToBasket.bind(this);
    }

    componentWillMount() {
        const me = this;
        this.setState({
            rowTitle: me.setRowTitle(),
            ballText: me.setBallText(),
            balls: me.setBalls()
        });
    }

    //设置球排列
    setBalls = () => [];

    //设置rowtitle
    setRowTitle = () => [];

    //设置BallText
    setBallText = () => [];

    //清空所有选球
    clearAllBall() {
        const {balls} = this.state;
        const me = this;
        for (let j = 0; j < balls.length; j++) {
            for (let i = 0; i < balls[j].length; i++) {
                me.setBallData(i, j, -1);
            }
        }
    }

    //选球操作
    ballSelectActions(action,irow,si) {
        const me = this;
        const {balls} = this.state;
        let ballsData = balls,
            x = Number(irow),
            bound = action,
            row = ballsData[x],
            len = row.length,
            start = si || 0,
            halfLen = Math.ceil((len - start) / 2 + start),
            i = start;
        //清空该行选球
        for (; i < len; i++) {
            me.setBallData(i, x, -1);
        }

        switch (bound) {
            case 'all':
                for (i = start; i < len; i++) {
                    me.setBallData(i, x, 1);
                }
                break;
            case 'big':
                for (i = halfLen; i < len; i++) {
                    me.setBallData(i, x, 1);
                }
                break;
            case 'small':
                for (i = start; i < halfLen; i++) {
                    me.setBallData(i, x, 1);
                }
                break;
            case 'odd':
                for (i = start; i < len; i++) {
                    if ((i + 1) % 2 != 1) {
                        me.setBallData(i, x, 1);
                    }
                }
                break;
            case 'even':
                for (i = start; i < len; i++) {
                    if ((i + 1) % 2 == 1) {
                        me.setBallData(i, x, 1);
                    }
                }
                break;
            case 'prime':
                for (i = start; i < len; i++) {
                    let isPrime = true;
                    for (let j = 2; j <= Math.sqrt(i); j++) {
                        if (i % j === 0) {
                            isPrime = false;
                            break;
                        }
                    }

                    if (isPrime && i > 1) {
                        me.setBallData(i, x, 1);
                    }
                }
                break;
            case 'composite':
                for (i = start; i < len; i++) {
                    for (let j = 2; j <= Math.sqrt(i); j++) {
                        if (i % j === 0) {
                            me.setBallData(i, x, 1);
                            break;
                        }
                    }
                }
                break;
            case 'none':
                break;

            default:
                break;

        }

        //计算注单
        const lotteryNums = me.getLottery();
        this.setState({lotterys: lotteryNums});
    }

    setBallData(x, y, value) {
        const {balls} = this.state;
        const data = balls;
        if (y >= 0 && y < data.length && x >= 0) {
            data[y][x] = value;
            this.setState({balls: data});
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
        const {balls,ballText,rowTitle} = this.state;
        if(balls.length > 0) {
            const rows = balls.length,
                len = balls[0].length,
                ballTextLen = ballText.length,
                ballTitleLen = rowTitle.length;
            if(rows == ballTitleLen && len == ballTextLen) {
                const ballWidth = (G_Theme.windowWidth - 20) / me.state.rowBallNumber;
                return <View style={styles.ballBox}>
                    {ballText.map((v,i) => {
                        if(i >= me.ballFirstStart) {
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

    buildSpecialBalls(row) {
        const me = this;
        const {balls,rowTitle} = this.state;
        if(balls.length > 0 && me.ballSpecialTitle.length > 0) {
            const rows = balls.length,
                ballTitleLen = rowTitle.length;

            if(rows == ballTitleLen) {
                const ballWidth = (G_Theme.windowWidth - 20) / me.state.rowBallNumber;
                return <View style={styles.ballBox}>
                    {me.ballSpecialTitle.map((v,i) => {
                        if(i >= me.ballFirstStart) {
                            return <View style={[styles.ballBtnBox,{width:ballWidth}]} key={i}>
                                <Ball
                                    text={v}
                                    row={row}
                                    value={i}
                                    status={balls[row][i]}
                                    onPress={(x,y,v)=>me.selectBall(x,y,v)}
                                    //textStyle={styles.ballText}
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
                                    { me.isShowOperate ? me.buildBallOperates(i) : null}
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

    //单行数组的排列组合
    //list 参与排列的数组
    //num 每组提取数量
    //last 递归中间变量
    combine(list, num, last) {
        let result = [],
            i = 0;
        last = last || [];
        if (num == 0) {
            return [last];
        }
        for (; i <= list.length - num; i++) {
            result = result.concat(arguments.callee(list.slice(i + 1), num - 1, last.slice(0).concat(list[i])));
        }
        return result;
    }

    //检查数组存在某数
    arrIndexOf(value, arr) {
        let r = 0;
        for (let s = 0; s < arr.length; s++) {
            if (arr[s] == value) {
                r += 1;
            }
        }
        return r || -1;
    }

    //获取组合结果
    getLottery(isGetNum) {
        // tellmett：二维数组，球是否被选中
        const me = this;
        const {balls} = this.state;
        const data = balls;
        let i = 0,
            len = data.length,
            row,
            isEmptySelect = true,
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
                return [];
            }
            //计算注数
            total *= rowNum;
        }
        return me.combination(result);
    }

    changeReBetRate(v) {
        this.setState({prize_group:v});
    }

    beforeAddBallsToBasket() {
        const me = this;
        const { lotterys } = me.state;

        const orderData = lotterys.length ? me.getResultData(lotterys) : null;

        TLog('=======orderData=======>>>>>>>>>>>',orderData)
        //加入购彩篮
        if(orderData) {
            ActDispatch.GameAct.addOrderToBasket(orderData);
        }
        //清空选球
        me.clearAllBall();
        //清空当前注单
        me.setState({lotterys:[]});
    }

    addBallsToBasket() {
        this.beforeAddBallsToBasket();
    }

    render() {
        const me = this;
        const { lotterys, prize_group } = me.state;
        const { orderNum, moneyUnit, multiple, balance, bet_max_prize_group, bet_min_prize_group, diff_grize_group, series_amount , currentGameWay} = me.props;
        const operTopDesc = `${lotterys.length}注 * ${multiple}倍 = ${G_moneyFormat(lotterys.length * multiple * currentGameWay.price * moneyUnit)}元`;

        let modePriceOperate = null;
        if(bet_min_prize_group && bet_max_prize_group) {
            modePriceOperate = <GamePriceModelPannel
                            value={prize_group}
                            bet_max_prize_group={bet_max_prize_group}
                            bet_min_prize_group={bet_min_prize_group}
                            diff_grize_group={diff_grize_group}
                            series_amount={series_amount}
                            onChange={v => me.changeReBetRate(v)}
                        />
        }
        return (
            <View style={{flex:1}}>
                <ScrollView style={styles.ballOperate}>
                    {me.buildUI()}
                    <View style={styles.controlPanel}>
                        <GameModelPannel
                            moneyUnit={moneyUnit}
                            multiple={multiple}
                            maxMultiple={currentGameWay.max_multiple}
                            />
                        {modePriceOperate}
                    </View>

                </ScrollView>
                <GameControlPannel
                    balance= {balance}
                    topDesc= {operTopDesc}
                    btnEvent= {() => {
                        me.addBallsToBasket();
                    }}
                    btnIconEvent= {() => {
                        G_NavUtil.pushToView(G_NavViews.LotteryOrders({}));
                    }}
                    btnIconEventDesc={orderNum}
                    btnIconName='cart-plus'
                    btnDisable= { lotterys.length > 0 ? false : true }
                    btnIconDisable= { orderNum > 0 ? false : true }
                    />
            </View>
        );
    }

    getOriginal() {
        const {balls} = this.state;

        let len = balls.length,
            len2 = 0,
            i = 0,
            j = 0,
            row = [],
            result = [];
        for (; i < len; i++) {
            row = [];
            len2 = balls[i].length;
            for (j = 0; j < len2; j++) {
                if (balls[i][j] > 0) {
                    row.push(j);
                }
            }
            result.push(row);
        }
        return result;
    }

    formatViewBalls(original) {
        return this.makePostParameter(original);
    }

    makePostParameter(original){
        let result = [],
            len = original.length,
            i = 0;
        for (; i < len; i++) {
            result = result.concat(original[i].join(''));
        }
        return result.join('|');
    }

    getResultData(lotterys){
        const me = this;
        const { prize_group } = this.state;
        const { moneyUnit, multiple, currentGameWay } = this.props;

        let onePrice = currentGameWay.price,
            lotterysOriginal = me.getOriginal();

        if(lotterys.length < 1){
            return {};
        }
        return {
            //original:lotterysOriginal,
            //lotterys:lotterys,
            amount:lotterys.length * onePrice * multiple * moneyUnit,
            wayId: currentGameWay.id,
            ball:me.makePostParameter(lotterysOriginal),
            viewBalls:me.formatViewBalls(lotterysOriginal),
            num:lotterys.length,
            prize_group:prize_group,
            onePrice: onePrice,
            moneyunit: moneyUnit,
            multiple:multiple,
            gameName:currentGameWay.parent_parent_name_cn + currentGameWay.name_cn
        };
    }

    //生成单注随机数
    createRandomNum() {
        var me = this,
            current = [],
            len = me.getBallData().length,
            rowLen = me.getBallData()[0].length;
        //随机数
        for (var k = 0; k < len; k++) {
            current[k] = [Math.floor(Math.random() * rowLen)];
            current[k].sort(function (a, b) {
                return a > b ? 1 : -1;
            });
        }
        ;
        return current;
    }
    //限制随机投注重复
    checkRandomBets(hash, times) {
        var me = this,
            allowTag = typeof hash == 'undefined' ? true : false,
            hash = hash || {},
            current = [],
            times = times || 0,
            len = me.getBallData().length,
            rowLen = me.getBallData()[0].length,
            order = Games.getCurrentGameOrder().getTotal()['orders'];
        //生成单数随机数
        current = me.createRandomNum();
        //如果大于限制数量
        //则直接输出
        if (Number(times) > Number(me.getRandomBetsNum())) {
            return current;
        }
        //建立索引
        if (allowTag) {
            for (var i = 0; i < order.length; i++) {
                if (order[i]['type'] == me.defConfig.name) {
                    var name = order[i]['original'].join('');
                    hash[name] = name;
                }
            }
            ;
        }
        //对比结果
        if (hash[current.join('')]) {
            times++;
            return arguments.callee.call(me, hash, times);
        }
        return current;
    }
    //生成一个当前玩法的随机投注号码
    //该处实现复式，子类中实现其他个性化玩法
    //返回值： 按照当前玩法生成一注标准的随机投注单(order)
    randomNum() {
        const me = this;
        let i = 0,
            current = [],
            currentNum,
            ranNum,
            order = null,
            dataNum = me.balls,
            name = '',
            name_en = '',
            lotterys = [],
            original = [];

        current = me.checkRandomBets();
        original = current;
        lotterys = me.combination(original);

        order = {
            'type': name_en,
            'original': original,
            'lotterys': lotterys,
            'moneyUnit': 1,
            'multiple': 1,
            'onePrice': 2,
            'num': lotterys.length
        };
        order['amountText'] = Games.getCurrentGameStatistics().formatMoney(order['num'] * order['moneyUnit'] * order['multiple'] * order['onePrice']);
        return order;
    }

    //计算当前选中的球数量
    //限制计算某一单行内球数量
    countBallsNumInLine(lineNum) {
        const ball = this.state.balls;
        let num = 0;
        if (Object.prototype.toString.call(ball[lineNum]) == '[object Array]' && ball[lineNum].length > 0) {
            for (let j = ball[lineNum].length - 1; j >= 0; j--) {
                if (ball[lineNum][j] == 1) {
                    num++;
                }
            }
        } else {
            if (ball[lineNum] == 1) {
                num++;
            }
        }
        return num || -1;
    }
}


const styles = StyleSheet.create({
    ballOperate: {
        marginBottom:G_Theme.gameOperatePanelHeight - 2,
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
        borderColor: G_Theme.gray,
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