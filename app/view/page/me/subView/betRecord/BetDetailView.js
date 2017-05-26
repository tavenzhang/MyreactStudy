/**
 * Created by thomas on 2017/3/10.
 */
import React from 'react';
import {
    View,
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
        let {gameModel} = this.props.passProps
        let  gameName = gameModel.getGameNameById(this.state.data.lottery_id)

        return (<View style={[G_Style.appContentView]}>
            <View>
                <Text>游戏名称:   {gameName}</Text>
            </View>
            <View>
                <Text>序列号:   {this.state.data.serial_number}</Text>
            </View>
            <View>
                <Text>奖期:   {this.state.data.issue}</Text>
            </View>
            <View>
                <Text>投注号码:  {this.state.data.bet_number}</Text>
            </View>
            <View>
                <Text>模式:   {this.state.data.coefficient}元</Text>
            </View>
            <View>
                <Text>金额:   {this.state.data.amount}元</Text>
            </View>
            <View>
                <Text>奖金:   {this.state.data.prize ? this.state.data.prize:0}元</Text>
            </View>
            <View>
                <Text>中奖号码:   {this.state.data.winning_number}</Text>
            </View>
            <View>
                <Text>开奖状态:   {this.state.data.status}</Text>
            </View>
            <View>
                <Text>购彩时间:  {this.state.data.bought_at}</Text>
            </View>
        </View>);
    }

    componentDidMount() {
        let {id} = this.props.passProps
        HTTP_SERVER.BET_DETAIL.url = HTTP_SERVER.BET_DETAIL.formatUrl.replace(/#id/g, id);
        G_RunAfterInteractions(()=>{
            ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.BET_DETAIL, (result) => {
                if (result.data) {
                    // let arr = this.state.dataList.concat(result.data.data);
                    this.setState({data: result.data})
                }
            })
        })

    }
}