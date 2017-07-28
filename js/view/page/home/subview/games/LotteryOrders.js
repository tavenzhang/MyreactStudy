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
    return {
        orderList: state.get("gameState").get("orderList"),
        orderListNum: state.get("gameState").get("orderList").count(),
        gameId: state.get("gameState").get("gameId"),
        lottery_items: state.get("gameState").get("lottery_items"),
        gameNumbers: state.get("gameState").get("gameNumbers").toJS(),
        traceData:state.get("gameState").get("traceData").toJS(),
        balance: parseFloat(state.get("appState").getIn(['userData', 'data', 'available'])),
        userData: state.get("appState").get("userData").toJS(),
        //moneyBalance: state.get("appState").get("moneyBalance"),
    }
}
@connect(mapStateToProps)
export default class LotteryOrders extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowTraceModel : false
        };
    }

    submitOrders = (amount,isModel=false) => {
        const {gameId, orderList,lottery_items, traceData} = this.props;
        let submitData = {
                gameId: gameId,
                isTrace: traceData.isTrace,
                traceWinStop: traceData.traceWinStop,
                traceStopValue: 1,
                balls: orderList,
                // amount:amount
            };
         submitData['orders'] = {};

        ////非追号
        if (!traceData.isTrace) {
            //获得当前期号，将期号作为键
            submitData['orders'][lottery_items] = 1;
            //总金额
        } else {
            //追号
            for (let j = 0; j < traceData.traceTimes; j++) {
                let issue = traceData.traceList[j].issue,
                    multiple =traceData.traceList[j].mulity;
                    submitData['orders'][issue] = multiple;
            }
        }
        //总金额
        submitData['amount'] = traceData.isTrace ? traceData.traceTotalMoney :amount;
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
                this._onClearTrace()
                this._onPopView()
                G_NavUtil.push(G_RoutConfig.InvestResultView,{data:submitData,traceTimes:traceData.traceTimes},"投注结果")
            }
        },false,isModel)
    }


    render() {
        const {orderList, balance, orderListNum,randomLotterys, isRandomOrder, isTrace, traceData} = this.props;
        const {isShowTraceModel} = this.state;
        let total = 0, totalMoney = 0;
        const btnDisable = orderListNum == 0 ? styles.btnDisable : null;

        let randomLotteryOne = isRandomOrder ? <Button
            btnName="机选1单"
            onPress={() => randomLotterys(1)}
            leftIcon="plus-circle"
        /> : null;
        let randomLotteryFive = isRandomOrder ? <Button
            btnName="机选5单"
            onPress={() => randomLotterys(5)}
            leftIcon="plus-circle"
        /> : null;
        let isCanChase=true;
        let lastMode=null;
        let lastWay=null;
        TLog('traceData',traceData)
        return (
            <View style={[G_Style.appContentView]}>
                <View style={styles.btnGrounp}>
                    <Button btnName="返回游戏" style={{backgroundColor:"green"}} onPress={this._onPopView}/>
                    {randomLotteryOne}
                    {randomLotteryFive}
                </View>
                <View style={[styles.orderListBox, {flex: 1}]}>
                    <ScrollView style={{flex: 1}}>
                        {
                            orderList.map((v, i) => {
                                if(isCanChase){
                                    if(!lastMode){
                                        lastMode=v.moneyunit
                                    }
                                    if(!lastWay){
                                        lastWay = v.wayId
                                    }
                                    isCanChase = lastMode==v.moneyunit && lastWay==v.wayId;
                                }
                                total = total + v.num;
                                totalMoney = totalMoney + v.amount;
                                return <OrderItem
                                    key={i}
                                    btnLeftPress={() => ActDispatch.GameAct.delOrder(i)}
                                    data={v}/>
                            })
                        }
                    </ScrollView>
                </View>
                { isTrace ? <TGameTraceView
                    wayId={lastWay}
                    isShow={isShowTraceModel}
                    isCanChase={isCanChase}
                    totalMoney={totalMoney}
                    onCloseModel={() => this.setState({isShowTraceModel: false})}
                    {...this.props}
                /> : null}
                <GameControlPannel
                    balance={balance}
                    onLeftBtnClick={() => this.setState({isShowTraceModel: true})}
                    btnLeftName="我要追号"
                    topDesc={this.getTotalText(total,totalMoney)}
                    btnEvent={() => this._onInvest(totalMoney)}
                    btnDisable={orderListNum == 0 ? true : false}
                    btnName="确认投注"
                    btnIconEvent={() => this._onClearBasket()}
                    btnIconName="trash-o"
                    btnIconText="清空"
                    btnIconDisable={ orderListNum == 0 ? true : false }
                    btnIconEvent2={() => this._onClearTrace()}
                    btnIconName2="ban"
                    btnIconText2="取消追号"
                    btnIconDisable2={ !traceData.isTrace }
                />
            </View>
        );
    }

    componentDidMount() {
        let {isFast}=this.props;
        if(isFast){
            let investVo=this.onCountInvest();
            this.submitOrders(investVo.totalMoney,true)
        }
    }

    onCountInvest=()=>{
        let {traceData,orderList}=this.props;
        let isCanChase=true;
        let lastMode=null;
        let lastWay=null;
        let totalNum = 0, totalMoney = 0;
        orderList.map((v) => {
            if(isCanChase){
                if(!lastMode){
                    lastMode=v.moneyunit
                }
                if(!lastWay){
                    lastWay = v.wayId
                }
                isCanChase = lastMode==v.moneyunit && lastWay==v.wayId;
            }
            if(traceData.isTrace&&!isCanChase){
                this._onClearTrace();
            }
            totalNum = totalNum + v.num;
            totalMoney = totalMoney + v.amount;
        })
        if(isCanChase){
            if(traceData.isTrace){
                totalMoney= traceData.traceTotalMoney;
            }
        }
        return {totalMoney,totalNum,isCanChase}
    }


    getTotalText(total, totalMoney) {
        const {traceData} = this.props;
        let money= traceData.isTrace ? traceData.traceTotalMoney:totalMoney
        let txtLabel= traceData.isTrace ? `总计: ${total*traceData.traceTimes}注, 追号${traceData.traceTimes}期, 共`:`总计: ${total}注, 共`
        return <Text>{txtLabel}<Text
            style={{color: "red"}}> {G_moneyFormat(money)}</Text>元</Text>
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

    _onClearTrace = () => {
        let data = {};
        data.isTrace = 0;
        data.traceTimes = 0;
        data.traceWinStop = 0;
        data.traceList = [];
        data.traceTotalMoney = 0;
        ActDispatch.GameAct.setTrace(data);
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