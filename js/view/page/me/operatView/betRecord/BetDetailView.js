/**
 * Created by thomas on 2017/3/10.
 */
import React from 'react';
import {
    View,
    StyleSheet,
    Text,
} from 'react-native';
import BaseView from "../../../../componet/BaseView";


export  default class BetDetailView extends BaseView {

    constructor(props) {
        super(props)
        this.state = {
            data: {}
        }
    }

    renderBody() {
        let {gameModel, appModel} = this.props.navigation.state.params
        let gameName = gameModel.getGameNameById(this.state.data.lottery_id)
        return (<View style={[G_Style.appContentView, {paddingTop: 10}]}>
            <View style={styles.profitRow}>
                <Text style={styles.title}> 游戏名称: </Text>
                <Text style={styles.text}> {gameName}</Text>
            </View>
            <View style={styles.profitRow}>
                <Text style={styles.title}>序列号:</Text>
                <Text style={styles.text}>{this.state.data.serial_number}</Text>
            </View>
            <View style={styles.profitRow}>
                <Text style={styles.title}>奖期:</Text>
                <Text style={styles.text}>{this.state.data.issue}</Text>
            </View>
            <View style={styles.profitRow}>
                <Text style={styles.title}>投注号码:</Text>
                <Text style={[styles.text, {color: G_Theme.primary}]}>{this.state.data.bet_number}</Text>
            </View>
            <View style={styles.profitRow}>
                <Text style={styles.title}>模式:</Text>
                <Text style={styles.text}>{this.state.data.coefficient}元</Text>
            </View>
            <View style={styles.profitRow}>
                <Text style={styles.title}>金额:</Text>
                <Text style={[styles.text, {color: G_Theme.primary}]}>{this.state.data.amount}元</Text>
            </View>
            <View style={styles.profitRow}>
                <Text style={styles.title}>奖金:</Text>
                <Text
                    style={[styles.text, {color: G_Theme.primary}]}>{this.state.data.prize ? this.state.data.prize : 0}元</Text>
            </View>
            <View style={styles.profitRow}>
                <Text style={styles.title}>中奖号码:</Text>
                <Text style={[{color: G_Theme.primary}, styles.text]}>{this.state.data.winning_number}</Text>
            </View>
            <View style={styles.profitRow}>
                <Text style={styles.title}>开奖状态:</Text>
                <Text style={styles.text}>{appModel.getAProjectStatus(this.state.data.status)}</Text>
            </View>
            <View style={styles.profitRow}>
                <Text style={styles.title}>购彩时间:</Text>
                <Text style={styles.text}>{this.state.data.bought_at}</Text>
            </View>
        </View>);
    }

    componentDidMount() {
        let {id} = this.props.navigation.state.params;
        HTTP_SERVER.BET_DETAIL.url = HTTP_SERVER.BET_DETAIL.formatUrl.replace(/#id/g, id);
        G_RunAfterInteractions(() => {
            ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.BET_DETAIL, (result) => {
                if (result.data) {
                    // let arr = this.state.dataList.concat(result.data.data);
                    this.setState({data: result.data})
                }
            })
        })

    }
}
const styles = StyleSheet.create({
    profitRow: {
        width: G_Theme.windowWidth,
        height: 30,
        paddingTop: 5,
        paddingBottom: 5,
        flexDirection: "row",
        borderBottomWidth: 0.5,
        borderColor: '#ccc',

    },
    title: {
        paddingHorizontal: 10,
        textAlign: 'right',
        flex: 2
    },
    text: {
        flex: 5
    }
})
