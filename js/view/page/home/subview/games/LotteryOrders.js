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
    TouchableOpacity
} from 'react-native';
import {connect} from 'react-redux';
import BaseView from "../../../../componet/BaseView";
import Button from "../../../../componet/Button";
import OrderItem from "../../../../componet/game/OrderItem";
import GameControlPannel from "../../../../componet/game/GameControlPannel";
import GameTracePannel from "../../../../componet/game/GameTracePannel";
import GameMethod from "../../../../../class/GameMethod";
import AIcon from 'react-native-vector-icons/FontAwesome';

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
        gameNumbers: state.get("gameState").get("gameNumbers"),
        balance: parseFloat(state.get("appState").getIn(['userData', 'data', 'available']))
        //balls: newBalls,
    }
}
@connect(mapStateToProps)
export default class LotteryOrders extends BaseView {

    constructor(props) {
        super(props);
        this.state = {};


        //this.gameMethod = new GameMethod();
        //this.gameMethod.setBalls(balls);
        this.submitOrders = this.submitOrders.bind(this);
    }


    getNavigationBarProps() {
        return {
            title: '购彩篮',
            //rightView : () => {
            //    return <Text>继续选号</Text>
            //}
        };
    }

    submitOrders(amount) {

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
                G_NavUtil.pop()
            }
        })
    }

    getTotalText(total, tracetimes, tracemultiple, totalMoney) {
        return <Text>总计: {total}注{tracetimes}期{tracemultiple}倍, 共<Text
            style={{color: "red"}}> {G_moneyFormat(totalMoney * tracetimes * tracemultiple)}</Text>元</Text>
    }


    renderBody() {

        const {orderList, balance, orderListNum, isTrace, traceTimes, traceMultiple, navigation} = this.props;
        const {randomLotterys, isRandomOrder} = navigation.state.params;
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
                    <Button
                        btnName="继续选号"
                        onPress={() => G_NavUtil.pop()}
                    />
                </View>
                <ScrollView style={styles.orderListBox}>
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
                    <View style={styles.operateBox}>
                        <TouchableOpacity style={[styles.btnDeleteAll, btnDisable]} underlayColor={G_Theme.primary}
                                          onPress={
                                              () => {
                                                  if (orderListNum) {
                                                      Alert.alert(
                                                          '',
                                                          '确定要清空购彩篮吗?',
                                                          [
                                                              {text: '取消'},
                                                              {
                                                                  text: '确定', onPress: () => {
                                                                  ActDispatch.GameAct.delOrder();
                                                                  //返回上一级
                                                                  //返回选球页
                                                                  setTimeout(() => G_NavUtil.pop(), 1000);
                                                              }
                                                              }
                                                          ]
                                                      )
                                                  }
                                              }
                                          }>
                            <View style={{flexDirection: 'row'}}>
                                <AIcon name="trash-o" style={styles.iconDelete}/>
                                <Text style={styles.textDelete}>清空购彩篮</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <GameTracePannel/>
                <GameControlPannel
                    balance={balance}
                    topDesc={this.getTotalText(total, tracetimes, tracemultiple, totalMoney)}
                    btnEvent={() => {
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
                            me.submitOrders(totalMoney)
                        }
                    }}
                    btnDisable={orderListNum == 0 ? true : false}
                    btnName="投 注"
                />
            </View>
        );
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }
}

const styles = StyleSheet.create({
    orderListBox: {
        marginBottom: G_Theme.gameOperatePanelHeight - 2,
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
        //borderWidth: 1,
        //borderColor: '#333',
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