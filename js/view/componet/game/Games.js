/**
 * Created by soga on 2017/4/16.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Vibration,
    Image,
    TouchableHighlight
} from 'react-native';
import Ball from "./Ball";
import GameControlPannel from "./GameControlPannel";
import GameModelPannel from "./GameModelPannel";
import GamePriceModelPannel from "./GamePriceModelPannel";
import BallOperateBtn from "./BallOperateBtn";
import RNShakeEvent from 'react-native-shake-event';
import {Icon_yaoyiyao} from "../../../assets/index";


export default class Games extends Component {
    constructor(props) {
        super(props);
        this.state =
            {
                currentNumber: props.currentNumber,
                currentNumberTime: props.currentNumberTime,
                currentTime: props.currentTime,
                gameNumbers: props.gameNumbers,
                noIssue: props.noIssue,
                series_identifier: props.series_identifier,
                traceMaxTimes: props.traceMaxTimes,
                history_lotterys: props.history_lotterys,
                user_prize_group: props.user_prize_group,
                balls: [],
                ballText: [],
                rowTitle: [],
                isBallsComplete: false,
                lotterys: [],
                isSelect: false,
                rowBallNumber: 5, //一行几个球
            };
        this.randomBetsNum = 500;
        this.RandomArr = [];
        this.ballSpecialTitle = [];
        this.ballFirstStart = 0;
        this.isShowMoneyUnit = true;
        this.isShowGamePriceModelPannel = true;//是否显示奖金
        this.isShowOperate = true;
        this.buildBalls = this.buildBalls.bind(this);
        this.buildSpecialBalls = this.buildSpecialBalls.bind(this);
        this.buildUI = this.buildUI.bind(this);
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
        this.clearAllBall = this.clearAllBall.bind(this);
        this.selectAutoOne = this.selectAutoOne.bind(this);
        this.randomSelcet = this.randomSelcet.bind(this);
        this.randomLotterys = this.randomLotterys.bind(this);
        this.randomNum = this.randomNum.bind(this);
        this.checkRandomBets = this.checkRandomBets.bind(this);
        this.createRandomNum = this.createRandomNum.bind(this);
        this.randomCombinLottery = this.randomCombinLottery.bind(this);
        this.editSubmitData = this.editSubmitData.bind(this);
        this.isRandomSelect = true;//是否随机选择
        this.isRandomOrder = true;//允许随机下注


    }

    editSubmitData(data) {
        return data;
    }

    componentWillMount() {
        const me = this;
        const {bet_max_prize_group} = this.props;
        this.setState({
            rowTitle: me.setRowTitle(),
            ballText: me.setBallText(),
            balls: me.setBalls()
        });


        //初始化奖金组值
        ActDispatch.GameAct.updatePrize(bet_max_prize_group);
    }

    componentDidMount() {
        // TLog('ddunmount','++++++++++++++++++++');
        const me = this;
        if (this.isRandomSelect) {
            RNShakeEvent.addEventListener('shake', () => {

                me.randomSelcet();
                Vibration.vibrate();
            });
        }
    }

    componentWillUnmount() {
        // TLog('ddunmount','__________');
        if (this.isRandomSelect) {
            RNShakeEvent.removeEventListener('shake');
        }
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
                if (balls[j][i] > 0) {
                    me.selectBall(i, j, -1);
                }
            }
        }


    }

//随机选球
    randomSelcet() {
        //如果有选球先清空
        //if (this.checkIsSelectBall()) {
        this.clearAllBall();
        //}
        this.selectAutoOne();
    }

    //随机选一注
    selectAutoOne() {
        const me = this;
        const {balls} = this.state;

        let len = balls.length;
        for (let j = 0; j < len; j++) {
            me.setRandomArr(undefined, j);
            let i = me.getRandomNum();
            me.selectBall(i, j, 1);
        }
    }

//是否有选球
    checkIsSelectBall() {
        const {balls} = this.state;
        for (let j = 0; j < balls.length; j++) {
            for (let i = 0; i < balls[j].length; i++) {
                if (balls[j][i] > -1) {
                    return true;
                }
            }
        }
        return false;
    }

//设置随机选球
    setRandomArr(num = undefined, row = 0) {
        let me = this,
            balls = me.state.balls[row];
        if (num != undefined) {
            this.RandomArr.splice(num, 1);
        } else {
            this.RandomArr = [];
            for (let i = this.ballFirstStart; i < balls.length; i++) {
                this.RandomArr.push(i);
            }
        }
    }

    //获取随机
    getRandomNum() {
        let me = this,
            i = Math.floor(Math.random() * this.RandomArr.length);
        let Num = this.RandomArr[i];
        me.setRandomArr(i);
        return Num;
    }

    //选球操作
    ballSelectActions(action, irow, si) {
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

    selectBall(x, y, v) {
        const me = this;
        me.setBallData(x, y, v)
        const lotteryNums = me.getLottery();
        this.setState({lotterys: lotteryNums});
    }

    buildBalls(row) {
        const me = this;
        const {balls, ballText, rowTitle} = this.state;
        if (balls.length > 0) {
            const rows = balls.length,
                len = balls[0].length,
                ballTextLen = ballText.length,
                ballTitleLen = rowTitle.length;
            if (rows == ballTitleLen && len == ballTextLen) {
                const ballWidth = (G_Theme.windowWidth - 20) / me.state.rowBallNumber;
                return <View style={styles.ballBox}>
                    {ballText.map((v, i) => {
                        if (i >= me.ballFirstStart) {
                            return <View style={[styles.ballBtnBox, {width: ballWidth}]} key={i}>
                                <Ball
                                    text={v}
                                    row={row}
                                    value={i}
                                    status={balls[row][i]}
                                    onPress={(x, y, v) => me.selectBall(x, y, v)}
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
        const {balls, rowTitle} = this.state;
        if (balls.length > 0 && me.ballSpecialTitle.length > 0) {
            const rows = balls.length,
                ballTitleLen = rowTitle.length;

            if (rows == ballTitleLen) {
                const ballWidth = (G_Theme.windowWidth - 20) / me.state.rowBallNumber;
                return <View style={styles.ballBox}>
                    {me.ballSpecialTitle.map((v, i) => {
                        if (i >= me.ballFirstStart) {
                            return <View style={[styles.ballBtnBox, {width: ballWidth}]} key={i}>
                                <Ball
                                    text={v}
                                    row={row}
                                    value={i}
                                    status={balls[row][i]}
                                    onPress={(x, y, v) => me.selectBall(x, y, v)}
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

    buildBallOperates(row) {
        const me = this;
        return <View style={styles.ballBtnGrounp}>
            <BallOperateBtn text="全" onPress={() => me.ballSelectActions('all', row)}/>
            <BallOperateBtn text="大" onPress={() => me.ballSelectActions('big', row)}/>
            <BallOperateBtn text="小" onPress={() => me.ballSelectActions('small', row)}/>
            <BallOperateBtn text="单" onPress={() => me.ballSelectActions('odd', row)}/>
            <BallOperateBtn text="双" onPress={() => me.ballSelectActions('even', row)}/>
            <BallOperateBtn text="清" onPress={() => me.ballSelectActions('none', row)}/>
        </View>
    }

    buildUI() {
        const me = this;
        return <View style={styles.gameBox}>
            {me.state.rowTitle.map((v, i) => {
                return <View key={i} style={styles.gameRow}>
                    <View style={styles.gameRowTitle}><Text style={styles.gameRowTitleText}>{v}</Text></View>
                    {me.buildBalls(i)}
                    { me.isShowOperate ? me.buildBallOperates(i) : null}
                </View>
            })}
        </View>
    }

    //检测选球是否完整，是否能形成有效的投注
    //并设置 isBallsComplete
    checkBallIsComplete(multiple) {
        const me = this;
        const data = !!me.state.balls ? me.state.balls : [];
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
        return true;

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

        if (me.checkBallIsComplete()) {
            return me.combination(result);
        }
        return [];

    }

    changeReBetRate(v) {
        ActDispatch.GameAct.updatePrize(v);
    }

    beforeAddBallsToBasket() {
        const me = this;
        const {lotterys} = me.state;

        const orderData = lotterys.length ? me.getResultData(lotterys) : null;
        TLog('=======orderData=======>>>>>>>>>>>', orderData);
        //加入购彩篮
        if (orderData) {
            ActDispatch.GameAct.addOrderToBasket(orderData);
        }
        //清空选球
        me.clearAllBall();
        //清空当前注单
        me.setState({lotterys: []});
        me.setState({isBallsComplete: false});
    }

    addBallsToBasket() {
        this.beforeAddBallsToBasket();
    }

    render() {
        const me = this;
        const {lotterys, isBallsComplete, user_prize_group} = me.state;
        const {orderNum, moneyUnit, multiple, balance, bet_max_prize_group, bet_min_prize_group, diff_grize_group, series_amount, currentGameWay} = me.props;
        const operTopDesc = <Text>{lotterys.length}注 * {multiple}倍 =
            <Text
                style={{color: "red"}}> {G_moneyFormat(lotterys.length * multiple * currentGameWay.price * moneyUnit)}</Text>元</Text>;

        let modePriceOperate = null;
        if (bet_min_prize_group && bet_max_prize_group) {
            modePriceOperate = me.isShowGamePriceModelPannel ? <GamePriceModelPannel
                //value={prize_group}
                bet_max_prize_group={bet_max_prize_group}
                bet_min_prize_group={bet_min_prize_group}
                diff_grize_group={diff_grize_group}
                series_amount={series_amount}
                user_prize_group={user_prize_group}
                onChange={v => me.changeReBetRate(v)}
            />
                : null;
        }
        return (
            <View style={{flex: 1}}>
                {
                    this.isRandomSelect ?
                        <TouchableHighlight onPress={this.randomSelcet} style={styles.yaoyiyao}>
                            <View style={{alignItems: "center"}}>
                                <Image
                                    style={styles.yaoyiyaoImg}
                                    source={Icon_yaoyiyao}
                                />
                                <Text style={styles.yaoyiyaoText}>随机</Text>
                            </View>
                        </TouchableHighlight> : null
                }
                <ScrollView style={[styles.ballOperate]}>
                    {me.buildUI()}
                    <View style={styles.controlPanel}>
                        <GameModelPannel
                            moneyUnit={moneyUnit}
                            multiple={multiple}
                            bet_min_prize_group={bet_min_prize_group}
                            cleanBall={this.clearAllBall}

                            checkBallIsComplete={this.checkBallIsComplete}
                            isShowMoneyUnit={this.isShowMoneyUnit}
                            maxMultiple={currentGameWay.max_multiple}
                        />
                        {modePriceOperate}
                    </View>

                </ScrollView>
                <GameControlPannel
                    balance={balance}
                    topDesc={operTopDesc}
                    btnEvent={() => {
                        me.addBallsToBasket();
                    }}
                    btnIconEvent={() => {
                        // G_NavUtil.push(G_RoutConfig.LotteryOrders,{
                        //     randomLotterys: me.randomLotterys,
                        //     isRandomOrder: me.isRandomOrder
                        // });
                        ActDispatch.GameAct.lottoryState({
                            show: true,
                            randomLotterys: me.randomLotterys,
                            isRandomOrder: me.isRandomOrder
                        })
                        console.log("---btnIconEvent----",{
                            show: true,
                            randomLotterys: me.randomLotterys,
                            isRandomOrder: me.isRandomOrder
                        })
                    }}
                    btnIconEventDesc={orderNum}
                    btnIconName='cart-plus'
                    btnDisable={ !isBallsComplete }
                    btnIconDisable={ orderNum > 0 ? false : true }
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

    makePostParameter(original) {
        let result = [],
            len = original.length,
            i = 0;
        for (; i < len; i++) {
            result = result.concat(original[i].join(''));
        }
        return result.join('|');
    }

    getResultData(lotterys) {
        const me = this;
        const {moneyUnit, multiple, currentGameWay, prize} = this.props;
        let orderdata = {},
            onePrice = currentGameWay.price,
            lotterysOriginal = me.getOriginal();

        if (lotterys.length < 1) {
            return {};
        }
        orderdata = {
            //original:lotterysOriginal,
            //lotterys:lotterys,
            amount: lotterys.length * onePrice * multiple * moneyUnit,
            wayId: currentGameWay.id,
            original: lotterysOriginal,
            ball: me.makePostParameter(lotterysOriginal),
            viewBalls: me.formatViewBalls(lotterysOriginal),
            num: lotterys.length,
            prize_group: prize,
            onePrice: onePrice,
            moneyunit: moneyUnit,
            multiple: multiple,
            gameName: currentGameWay.parent_parent_name_cn + currentGameWay.name_cn
        };
        return me.editSubmitData(orderdata);
    }


    //生成单注随机数
    createRandomNum() {

        const me = this,
            current = [],
            {balls} = this.state;

        let len = balls.length;
        for (let j = 0; j < len; j++) {
            me.setRandomArr(undefined, j);
            let i = me.getRandomNum();
            current[j] = [i];
        }
        // current.sort(function (a, b) {
        //     return a > b ? 1 : -1;
        // })
        return current;
    }

    //组合随机注单组合方法
    //子类实现
    randomCombinLottery(arr) {
        const me = this;
        return me.combination(arr);
    }

    //限制随机投注重复
    checkRandomBets(hash, times) {
        const me = this,
            {orderList, currentGameWay} = this.props,
            {balls} = this.state;
        let neworderList = orderList.toJS();

        let allowTag,
            len = balls.length,
            rowLen = balls[0].length,
            // //生成单数随机数
            current = me.createRandomNum();
        allowTag = hash == undefined ? true : false;
        hash = hash || {};
        times = times || 0;
        //如果大于限制数量
        //则直接输出
        if (Number(times) > Number(this.randomBetsNum)) {
            return current;
        }
        //建立索引
        if (allowTag) {
            for (var i = 0; i < neworderList.length; i++) {

                if (neworderList[i]['wayId'] == currentGameWay.id) {
                    var name = neworderList[i]['original'].join('');
                    hash[name] = name;
                }
            }
        }
        //对比结果
        if (hash[current.join('')]) {
            times++;
            return arguments.callee.call(me, hash, times);
        }
        return current;
    }

    randomLotterys(num) {
        var me = this,
            i = 0;
        for (; i < num; i++) {
            //加入购彩篮
            let orderData = me.randomNum();
            TLog('=======orderData222=======>>>>>>>>>>>', orderData);
            if (orderData) {
                ActDispatch.GameAct.addOrderToBasket(orderData);
            }
        }
    }


    //生成一个当前玩法的随机投注号码
    //该处实现复式，子类中实现其他个性化玩法
    //返回值： 按照当前玩法生成一注标准的随机投注单(order)
    randomNum() {
        const me = this,
            {moneyUnit, multiple, currentGameWay, prize} = this.props;
        let i = 0,
            current = [],
            order = [],
            lotterys = [],
            onePrice = currentGameWay.price,
            original = [];

        current = me.checkRandomBets();
        original = current;
        lotterys = me.randomCombinLottery(original);

        order = {
            amount: lotterys.length * onePrice * multiple * moneyUnit,
            original: original,
            ball: me.makePostParameter(original),
            viewBalls: me.formatViewBalls(original),
            wayId: currentGameWay.id,
            num: lotterys.length,
            prize_group: prize,
            onePrice: onePrice,
            moneyunit: moneyUnit,
            multiple: multiple,
            gameName: currentGameWay.parent_parent_name_cn + currentGameWay.name_cn
        };
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
        marginBottom: G_Theme.gameOperatePanelHeight - 2,
    },
    ballBox: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        //paddingLeft: 20,
        //paddingRight: 20,
    },
    gameBox: {},
    yaoyiyao: {
        flexDirection: 'column',
        height: 45,
        width: 35,
        position: 'absolute',
        alignItems: "center",
        right: 2,
        top: -5,
        zIndex: 100,
        justifyContent: "center",
        backgroundColor: '#ff5722',
        borderRadius: 4,

    },
    yaoyiyaoImg: {
        flexDirection: 'row',
        height: 25,
        width: 35,
        alignItems: "center",
        justifyContent: "center",
        resizeMode: 'contain'
    },
    yaoyiyaoText: {
        fontSize: 8,
        marginTop: 2,
    },
    ballBtnBox: {
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        height: 50
    },

    ballBtnGrounp: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: G_Theme.gray,
        padding: 8,
        borderRadius: 15
    },
    gameRow: {
        flexWrap: 'wrap',
        margin: 10,
        zIndex: 1,
        backgroundColor: '#fff',
        marginBottom: 0,
        borderRadius: 8
    },
    gameRowTitle: {
        width: 45,
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
    },
    randButton: {
        alignSelf: "flex-end",//width: 100,
        marginTop: 1,
        height: 30,
        paddingTop: 5,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: G_Theme.gray,
        backgroundColor: "transparent"
    }

});