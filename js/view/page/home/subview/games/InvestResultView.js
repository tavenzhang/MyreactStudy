import React from 'react';
import {
    View,
    StyleSheet,
    Text,
} from 'react-native';
import BaseView from "../../../../componet/BaseView";
import connect from "react-redux/src/components/connect";
import {TButton} from "../../../../componet/tcustom/button/TButton";

const mapStateToProps = state => {
    return {
        gameModel: state.get("appState").get("gameModel"),
        playModel: state.get("appState").get("playModel"),
        appModel: state.get("appState").get("appModel"),
        userData: state.get("appState").get("userData").toJS(),
        lottery_items: state.get("gameState").get("lottery_items"),
        //userID: state.get("appState").get("userData").get("data").get("user_id"),
    }
}

@connect(mapStateToProps)
export  default class InvestResultView extends BaseView {

    render() {
        let {gameModel,lottery_items}=this.props
        let {data,traceTimes} = this.props.navigation.state.params;
         let gameName = gameModel.getGameNameById(data.gameId);
        return (<View style={[G_Style.appContentView]}>
            <View style={{justifyContent:"center", alignItems:"center", marginBottom:20}}>
                <Text style={[styles.title,{fontSize:18, color:"red", fontWeight:"bold"}]}>投注成功!</Text>
            </View>
            <View style={styles.profitRow}>
                <Text style={styles.title}>彩种:</Text>
                <Text style={[styles.text, styles.winStatus]}>{gameName}</Text>
            </View>
            <View style={styles.profitRow}>
                <Text style={styles.title}>期号:</Text>
                <Text style={[styles.text, styles.winStatus]}>{lottery_items}期</Text>
            </View>
            <View style={styles.profitRow}>
                <Text style={styles.title}>单数:</Text>
                <Text style={[styles.text, styles.winNumber]}>{data.balls.length} 单</Text>
            </View>
            <View style={styles.profitRow}>
                <Text style={styles.title}>投注金额:</Text>
                <Text style={[styles.text, styles.winNumber]}>{data.amount} 元</Text>
            </View>
            {
                data.isTrace ?  <View style={styles.profitRow}>
                    <Text style={styles.title}>是否追号:</Text>
                    <Text style={[styles.text, styles.winNumber]}>{data.isTrace ? "是":"否"} </Text>
                </View>:null
            }
            {
                data.isTrace ? <View style={styles.profitRow}>
                    <Text style={styles.title}>中奖停止追号</Text>
                    <Text style={[styles.text, styles.winNumber]}>{data.traceWinStop ? "是":"否"}  </Text>
                </View>:null
            }
            {
                data.isTrace ? <View style={styles.profitRow}>
                    <Text style={styles.title}>追号次数:</Text>
                    <Text style={[styles.text, styles.winNumber]}>{traceTimes} 次 </Text>
                </View>:null
            }
            <View style={{flexDirection: "row", justifyContent:"center", alignItems:"center", marginVertical:20}}>
                <TButton onPress={this.onBetView} containerStyle={{width:100}} btnName={"投注记录"}/>
                {
                    data.isTrace ?  <TButton onPress={this.onChaseView} containerStyle={{width:100,backgroundColor:"blue",marginLeft: 20}} btnName={"追号记录"}/>:null
                }
                {/*<TButton  onPress={this.onBackGame} containerStyle={{width:100, marginLeft: 20,backgroundColor:"green"}} btnName={"继续投注"}/>*/}
            </View>
        </View>)
    }

    onBackGame=()=>{
        G_NavUtil.pop();
    }

    onChaseView=()=>{
        let {data} = this.props.navigation.state.params;
        G_NavUtil.push(G_RoutConfig.RecordChaseView,{gameId:data.gameId},"追号记录")
    }

    onBetView=()=>{
        let {data} = this.props.navigation.state.params;
        G_NavUtil.push(G_RoutConfig.RecordBetView,{gameId:data.gameId},"投注记录")
    }


}
const styles = StyleSheet.create({
    profitRow: {
        width: G_Theme.windowWidth,
        paddingTop: 5,
        paddingBottom: 5,
        flexDirection: "row",
        // borderBottomWidth: 1,
        borderColor: '#ccc',

    },
    title: {
        paddingHorizontal: 10,
        // textAlign: 'right',
        // textAlign: 'right',
        width:120
    },
    textgameName: {
        lineHeight: 30,
        fontSize: 16,
        paddingHorizontal: 5,

    },
    gameHeadText:{
        flex: 3,
        color: G_Theme.grayDeep,
        fontSize: 12,
        textAlign: 'center'
    },
    gameHead: {
        // height: 120,
        padding: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: G_Theme.gray,
    },
    textissueNum: {
        lineHeight: 30,
        fontSize: 12,
    },
    text: {
        paddingHorizontal: 10,
        marginRight:5,
        flex: 8
    },
    winStatus: {
        fontSize: 16,
        fontWeight: "bold"
    },
    betNumber: {
        padding:5,

        fontSize: 14,
        // borderWidth: 1,
        borderColor: G_Theme.gray,
        color: G_Theme.grayDeep,

    },
    winNumber: {
        fontSize: 16,
        fontWeight: "bold",
        color: G_Theme.primary,
    },
    thumb: {
        width: 30,
        height: 30,
        marginLeft: 4,
        borderRadius: 15,
    },

})
