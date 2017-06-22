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
        gameId: state.get("gameState").get("gameId"),
        lottery_items: state.get("gameState").get("lottery_items"),
        balance: parseFloat(state.get("appState").getIn(['userData','data','available']))
        //balls: newBalls,
    }
}

@connect(mapStateToProps)
export default class LotteryOrders extends BaseView {

    constructor(props) {
        super(props);
        this.state = {
        };

        //const { balls } = this.props;
        //this.gameMethod = new GameMethod();
        //this.gameMethod.setBalls(balls);
        this.submitOrders = this.submitOrders.bind(this);
    }

    componentWillMount() {

    }

    getNavigationBarProps() {
        return {
            title : '购彩篮',
            //rightView : () => {
            //    return <Text>继续选号</Text>
            //}
        };
    }

    submitOrders(amount) {
        const {gameId,orderList,lottery_items} = this.props;
        let submitData = {
            gameId:gameId,
            isTrace:0,
            traceWinStop:1,
            traceStopValue:1,
            balls:orderList,
            amount:amount
        };

        submitData['orders'] = {};
        ////非追号
        //if (result['isTrace'] < 1) {
        //    //获得当前期号，将期号作为键
        //    result['orders'][Games.getCurrentGame().getGameConfig().getInstance().getCurrentGameNumber()] = 1;
        //    //总金额
        //    result['amount'] = Games.getCurrentGameOrder().getTotal()['amount'];
        //} else {
        //    //追号
        //    for (; j < len2; j++) {
        //        result['orders'][traceInfo['traceData'][j]['traceNumber']] = traceInfo['traceData'][j]['multiple'];
        //    }
        //    //总金额
        //    result['amount'] = traceInfo['amount'];
        //}
        submitData['orders'][lottery_items] = 1;


        HTTP_SERVER.SUBMIT_ORDERS.url = HTTP_SERVER.SUBMIT_ORDERS.formatUrl.replace(/#id/g, gameId) + '?customer='+CUSTOMER;
        HTTP_SERVER.SUBMIT_ORDERS.body = submitData;
        TLog("------===submitData====-------",submitData)

        ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.SUBMIT_ORDERS, data => {
            TLog('注单提交反馈======》',data);
            if(data.isSuccess) {
                //清空购彩篮
                ActDispatch.GameAct.delOrder();
                HttpUtil.flushMoneyBalance();
                //返回选球页
                setTimeout(() => G_NavUtil.pop() , 1500);

            }
        },false,true)
    }

    renderBody() {
        const {orderList,balance,orderListNum} = this.props;
        const me = this;
        let total = 0,
            totalMoney = 0;

        const btnDisable = orderListNum == 0 ? styles.btnDisable : null;
        return (
            <View style={[G_Style.appContentView]}>
                <View style={styles.btnGrounp}>
                    <Button
                        btnName="机选1注"
                        onPress={()=> me.selectBallAuto()}
                        leftIcon="plus-circle"
                        />

                    <Button
                        btnName="机选5注"
                        onPress={()=> me.selectBallAuto(5)}
                        leftIcon="plus-circle"
                        />

                    <Button
                        btnName="继续选号"
                        onPress={() => G_NavUtil.pop()}
                        />
                </View>
                <ScrollView style={styles.orderListBox}>
                    {
                        orderList.map((v,i) => {
                            total = total + v.num;
                            totalMoney = totalMoney + v.amount;
                            return <OrderItem
                                    key={i}
                                    btnLeftPress={()=>ActDispatch.GameAct.delOrder(i)}
                                    data={v} />
                        })
                    }
                    <View style={styles.operateBox}>
                        <TouchableOpacity style={[styles.btnDeleteAll, btnDisable]} underlayColor={G_Theme.primary} onPress={
                            () => {
                                if(orderListNum) {
                                    Alert.alert(
                                        '',
                                        '确定要清空购彩篮吗?',
                                        [
                                          {text: '取消'},
                                          {text: '确定', onPress: () => {
                                            ActDispatch.GameAct.delOrder();
                                            //返回上一级
                                            //返回选球页
                                            setTimeout(() => G_NavUtil.pop() , 1000);
                                          }}
                                        ]
                                    )
                                }
                            }
                        }>
                            <View style={{flexDirection : 'row'}}>
                                <AIcon name="trash-o" style={styles.iconDelete} />
                                <Text style={styles.textDelete}>清空购彩篮</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

                <GameControlPannel
                    balance= {balance}
                    topDesc= {`总计: ${total}注, 共${G_moneyFormat(totalMoney)}元`}
                    btnEvent= {() => {
                        if(orderListNum == 0) {
                            Alert.alert(
                                '',
                                '您的购彩篮为空,请先选择投注号码!',
                                [
                                  {text: '确定',onPress: () => G_NavUtil.pop()}
                                ]
                            )
                        }
                        else {
                            me.submitOrders(totalMoney)
                        }
                    }}
                    btnDisable= {orderListNum == 0 ? true : false}
                    btnName= "投 注"
                    />
            </View>
        );
    }

    selectBallAuto=(num=1)=> {
        G_AlertUtil.show("","随机投注暂未开启！" )
        for(let i=0;i<=num;i++)
        {

        }
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }
}

const styles = StyleSheet.create({
    orderListBox: {
        marginBottom:G_Theme.gameOperatePanelHeight - 2,
        marginTop:10
    },
    operateBox: {
        alignItems:"center",
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
        flexDirection : 'row',
        //borderWidth: 1,
        //borderColor: '#333',
        backgroundColor: G_Theme.primary,
        padding: 10,
        width:140,
        justifyContent:"center",
        alignItems:"center",
    },
    btnDisable: {
        backgroundColor: G_Theme.gray
    },
    textDelete: {
        fontSize: 16,
        color: '#fff',
    },
    btnGrounp: {
        flexDirection : 'row',
        padding: 5,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        shadowColor:G_Theme.gray,
        shadowOffset:{height:5,with:0},
        shadowRadius:3,
        shadowOpacity:0.6,
    }
});