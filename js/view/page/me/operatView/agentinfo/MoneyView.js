import React ,{PropTypes} from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import Button from "react-native-button";

export  default  class MoneyView extends React.Component {

    static  propTypes={
        data:PropTypes.any
    }

    render() {
         let {data,moneyBalance}=this.props
        return(data ? <View>
                <View style={{flexDirection: "row", justifyContent: "center", margin: 5}}>
                    <View style={[styles.circleView, {borderColor: "green"}]}>
                        <Text style={styles.textOnlineHead}>在线用户</Text>
                        <Text style={styles.textPeople}>{parseInt(data.iUserOnline)}</Text>
                    </View>
                    <View style={[styles.circleView, {borderColor: "red"}]}>
                        <Text style={styles.textOnlineHead}>在线代理</Text>
                        <Text style={styles.textPeople}>{parseInt(data.iAgentCount)}</Text>
                    </View>
                    <View style={[styles.circleView, {borderColor: "blue"}]}>
                        <Text style={styles.textOnlineHead}>在线玩家</Text>
                        <Text style={styles.textPeople}>{parseInt(data.iPlayerCount)}</Text>
                    </View>
                </View>
                <View style={{backgroundColor: "#ddd", justifyContent: "center", margin: 5, padding: 10}}>
                    <Text style={styles.textMoneyName}>团队总投注额：<Text style={styles.textMoney}>{data.aCommissionAndProfit.team_turnover}</Text> 元</Text>
                    <Text  style={styles.textMoneyName}>团队净盈亏：<Text style={styles.textMoney}>{data.aCommissionAndProfit.team_deficit}</Text> 元</Text>
                    <Text  style={styles.textMoneyName}>返点收入：<Text style={styles.textMoney}>{data.aCommissionAndProfit.commission}</Text> 元</Text>
                    <Text  style={styles.textMoneyName}>预计分红：<Text style={styles.textMoney}>{`${parseInt(data.aCommissionAndProfit.bonus_percents)}%   ${data.aCommissionAndProfit.bonus}`}</Text> 元</Text>
                    <View style={{flexDirection:"row", alignItems:"center"}}>
                        <Text  style={styles.textMoneyName}>可用余额：<Text style={styles.textMoney}>{moneyBalance}</Text> 元</Text>
                        <Button containerStyle={{  padding: 5,backgroundColor:"rgb(240,80,120)",borderRadius:5,marginHorizontal:5}} style={{fontSize:14,
                           color:"white", borderRadius:
                        10}} onPress={this._gotoTransMoney}>转账</Button>
                        <Button containerStyle={{backgroundColor:"rgb(56,88,138)", borderRadius:5,padding: 5}}  style={{fontSize:14,  color:"white"}} onPress={this._gotoOutMoney}>提现</Button>
                    </View>
                </View>
            </View>:null
        );
    }

    _gotoOutMoney=()=>{
        let {userData}=this.props
        G_NavUtil.pushToView(G_NavViews.MoneyOuterView({
            money: parseInt(userData.data.available),
            uid: userData.data.user_id,
            name:userData.data.username
        }))
    }

    _gotoTransMoney=()=>{
        let {userData}=this.props
        G_NavUtil.pushToView(G_NavViews.MoneyTransferView({
            money: parseInt(userData.data.available),
            uid: userData.data.user_id
        }));
    }
}

const styles = StyleSheet.create({
    circleView: {
        width: 80,
        borderWidth: 5,
        height: 80,
        borderRadius: 86,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 10,
        backgroundColor: "transparent"
    },
    textOnlineHead: {
        fontWeight: 'bold',
        fontSize:12
    },
    textMoneyName:{
        paddingVertical:2
    },
    textPeople: {
        color: 'red',
        fontWeight: 'bold',
        marginTop: 5,
        fontSize:14,
    },
    textMoney: {
        color: 'red',
        fontWeight: 'bold',
        marginTop: 5,
        fontSize:14,
    },
    infoMoney: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        marginVertical: 5
    },
});
