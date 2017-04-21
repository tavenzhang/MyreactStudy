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
    const balls = state.get("gameState").get("balls").toArray();
    let newBalls = []
    balls.map((v,i) => {
        newBalls[i] = v.toArray();
    });

    return {
        orderList: state.get("gameState").get("orderList"),
        balls: newBalls,
    }
}

@connect(mapStateToProps)
export default class LotteryOrders extends BaseView {

    constructor(props) {
        super(props);
        this.state = {
        };

        const { balls } = this.props;
        this.gameMethod = new GameMethod();
        this.gameMethod.setBalls(balls);
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

    //生成指定数目的随机投注号码，并添加进号码篮
    selectBallAuto(num) {
        const me = this;

        for (let i=0; i < num; i++) {
            Games.getCurrentGameOrder().add(me.randomNum());
            const lottery = '';
            //加入购彩篮
            if(lottery) {
                ActDispatch.GameAct.addOrderToBasket(lottery);
            }
        }
    }

    renderBody() {
        const {orderList} = this.props;
        const me = this;
        const balance = 199999;
        let total = 0,
            totalMoney = 0;

        return (
            <View style={[GlobeStyle.appContentView]}>
                <View style={styles.btnGrounp}>
                    <Button
                        btnName="机选1注"
                        onPress={()=> me.selectBallAuto()}
                        leftIcon="plus-circle"
                        />

                    <Button
                        btnName="机选5注"
                        onPress={()=>{}}
                        leftIcon="plus-circle"
                        />

                    <Button
                        btnName="继续选号"
                        onPress={() => NavUtil.pop()}
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
                        <TouchableOpacity style={styles.btnDeleteAll} underlayColor={GlobelTheme.primary} onPress={
                            () => Alert.alert(
                                '',
                                '确定要清空购彩篮吗?',
                                [
                                  {text: '取消'},
                                  {text: '确定', onPress: () => {
                                    ActDispatch.GameAct.delOrder();
                                    //返回上一级
                                    //NavUtil.pop();
                                  }},
                                ]
                            )
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
                    topDesc= {`总计: ${total}注, 共${moneyFormat(totalMoney)}元`}
                    btnEvent= {() => {}}
                    btnDisable= {false}
                    btnName= "投 注"
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
        marginBottom:GlobelTheme.gameOperatePanelHeight - 2,
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
        backgroundColor: GlobelTheme.primary,
        padding: 10,
        width:140,
        justifyContent:"center",
        alignItems:"center",
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
        shadowColor:GlobelTheme.gray,
        shadowOffset:{h:5,w:0},
        shadowRadius:3,
        shadowOpacity:0.6,
    }
});