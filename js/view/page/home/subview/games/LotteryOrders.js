/**
 * Created by soga on 2017/4/17.
 */
import React from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Alert,
    TouchableOpacity,
    LayoutAnimation
} from 'react-native';

import Button from "../../../../componet/Button";
import OrderItem from "../../../../componet/game/OrderItem";
import GameControlPannel from "../../../../componet/game/GameControlPannel";
import AIcon from 'react-native-vector-icons/FontAwesome';
import TGameTraceView from "../../../../componet/game/TGameTraceView";
import connect from "react-redux/src/components/connect";
//
const mapStateToProps = state => {
    //const balls = state.get("gameState").get("balls").toArray();
    //let newBalls = []
    //balls.map((v,i) => {
    //    newBalls[i] = v.toArray();
    //});
    return {
        orderList: state.get("gameState").get("orderList"),
        orderListNum: state.get("gameState").get("orderList").count(),
        isTrace: state.get("gameState").get("isTrace"),
        traceTimes: state.get("gameState").get("traceTimes"),
        traceInfo: state.get("gameState").get("traceInfo"),
        traceMultiple: state.get("gameState").get("traceMultiple"),
        gameId: state.get("gameState").get("gameId"),
        lottery_items: state.get("gameState").get("lottery_items"),
        gameNumbers: state.get("gameState").get("gameNumbers").toJS(),
        balance: parseFloat(state.get("appState").getIn(['userData', 'data', 'available'])),
        userData: state.get("appState").get("userData").toJS(),
        //balls: newBalls,
    }
}
@connect(mapStateToProps)
export default class LotteryOrders extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }


    submitOrders = (amount) => {
        const {gameId, orderList, lottery_items, traceInfo, isTrace, traceTimes, traceMultiple} = this.props;
        let submitData = {
                gameId: gameId,
                isTrace: isTrace,
                traceWinStop: 1,
                traceStopValue: 1,
                balls: orderList,
                // amount:amount
            },
            newTraceInfo = traceInfo.toJS();
        submitData['orders'] = {};

        ////非追号
        if (isTrace == 0) {
            //获得当前期号，将期号作为键
            submitData['orders'][lottery_items] = 1;
            //总金额
        } else {
            //追号
            for (let j = 0; j < traceTimes; j++) {
                let number = newTraceInfo[j].traceNumber,
                    multiple = newTraceInfo[j].traceMultiple;
                submitData['orders'][number] = multiple;
            }
        }
        //总金额
        submitData['amount'] = amount * traceTimes * traceMultiple;
        HTTP_SERVER.SUBMIT_ORDERS.url = HTTP_SERVER.SUBMIT_ORDERS.formatUrl.replace(/#id/g, gameId) + '?customer=' + CUSTOMER;
        HTTP_SERVER.SUBMIT_ORDERS.body = submitData;
        TLog("------===submitData====-------", submitData)
        ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.SUBMIT_ORDERS, data => {
            TLog('注单提交反馈======》', data);
            if (data.isSuccess) {
                //清空购彩篮
                ActDispatch.GameAct.delOrder();
                HttpUtil.flushMoneyBalance();//体现余额 改变
                //返回选球页
                this._onPopView()
            }
        })
    }

    getTotalText(total, tracetimes, tracemultiple, totalMoney) {
        return <Text>总计: {total}注{tracetimes}期{tracemultiple}倍, 共<Text
            style={{color: "red"}}> {G_moneyFormat(totalMoney * tracetimes * tracemultiple)}</Text>元</Text>
    }

    componentWillUpdate() {
        G_PLATFORM_IOS ? LayoutAnimation.configureNext(G_LayoutAnimationHelp.springNoDelete) : LayoutAnimation.configureNext(G_LayoutAnimationHelp.springNoCreate);
    }


    render() {

        const {orderList, balance, orderListNum, traceTimes, traceMultiple,lottery_items} = this.props;
        const {randomLotterys, isRandomOrder} = this.props;
        TLog("lottery_items----",lottery_items)
        const me = this;
        let total = 0,
            totalMoney = 0,
            tracetimes = !traceTimes ? 1 : traceTimes,
            tracemultiple = !traceMultiple ? 1 : traceMultiple;
        const btnDisable = orderListNum == 0 ? styles.btnDisable : null;
        // let topDesc=<Text>总计: {total}注{tracetimes}期{tracemultiple}倍, 共<Text style={{color: "red"}}> {G_moneyFormat(totalMoney * traceTimes * traceMultiple)}</Text>元</Text>
        let randomLotteryOne = isRandomOrder ? <Button
            btnName="机选1注"
            onPress={() => randomLotterys(1)}
            leftIcon="plus-circle"
        /> : null;
        let randomLotteryFive = isRandomOrder ? <Button
            btnName="机选5注"
            onPress={() => randomLotterys(5)}
            leftIcon="plus-circle"
        /> : null;

        return (
            <View style={[G_Style.appContentView]}>
                <View style={styles.btnGrounp}>
                    {randomLotteryOne}
                    {randomLotteryFive}
                    <Button btnName="亲自选号" onPress={this._onPopView}/>
                </View>
                <View style={[styles.orderListBox, {flex: 1}]}>
                    <ScrollView style={{flex: 1}}>
                        {
                            orderList.map((v, i) => {
                                total = total + v.num;
                                totalMoney = totalMoney + v.amount;
                                return <OrderItem
                                    key={i}
                                    btnLeftPress={() => ActDispatch.GameAct.delOrder(i)}
                                    data={v}/>
                            })
                        }
                    </ScrollView>
                    <View style={[styles.operateBox, {alignItems: "center"}]}>
                        <TouchableOpacity style={[styles.btnDeleteAll, btnDisable]} underlayColor={G_Theme.primary}
                                          onPress={this._onClearBasket}>
                            <View style={{flexDirection: 'row'}}>
                                <AIcon name="trash-o" style={styles.iconDelete}/>
                                <Text style={styles.textDelete}>清空购彩篮</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <TGameTraceView {...this.props}/>
                <GameControlPannel
                    balance={balance}
                    topDesc={this.getTotalText(total, tracetimes, tracemultiple, totalMoney)}
                    btnEvent={() => this._onInvest(totalMoney)}
                    btnDisable={orderListNum == 0 ? true : false}
                    btnName="投 注"
                />
            </View>
        );
    }


    _onInvest = (totalMoney) => {
        const {orderListNum} = this.props;
        if (orderListNum == 0) {
            Alert.alert(
                '',
                '您的购彩篮为空,请先选择投注号码!',
                [
                    {text: '确定', onPress: () => G_NavUtil.pop()}
                ]
            )
        }
        else {
            this.submitOrders(totalMoney)
        }
    }

    _onPopView = () => {
        ActDispatch.GameAct.lottoryState({show: false})
    }

    _onClearBasket = () => {
        const {orderListNum} = this.props;
        if (orderListNum) {
            Alert.alert(
                '',
                '确定要清空购彩篮吗?',
                [
                    {text: '取消'},
                    {
                        text: '确定', onPress: () => {
                        ActDispatch.GameAct.delOrder();
                    }
                    }
                ]
            )
        }
    }
}

const styles = StyleSheet.create({
    orderListBox: {
        marginBottom: G_Theme.gameOperatePanelHeight - 2 + 30,
        marginTop: 10
    },
    operateBox: {
        alignItems: "center",
        //justifyContent:"center",
    },
    iconDelete: {
        fontSize: 16,
        marginRight: 5,
        color: '#fff',
    },
    btnDeleteAll: {
        marginTop: 5,
        marginBottom: 20,
        flexDirection: 'row',
        backgroundColor: G_Theme.primary,
        padding: 10,
        width: 140,
        justifyContent: "center",
        alignItems: "center",
    },
    btnDisable: {
        backgroundColor: G_Theme.gray
    },
    textDelete: {
        fontSize: 16,
        color: '#fff',
    },
    btnGrounp: {
        flexDirection: 'row',
        padding: 5,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        shadowColor: G_Theme.gray,
        shadowOffset: {h: 5, w: 0},
        shadowRadius: 3,
        shadowOpacity: 0.6,
    }
});