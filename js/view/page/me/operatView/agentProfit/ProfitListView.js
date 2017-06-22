import React from 'react';
import {
    View,
    ListView,
    StyleSheet,
    Text,
    Button,
    InteractionManager,
    TouchableHighlight
} from 'react-native';

import AIcon from 'react-native-vector-icons/FontAwesome';

export default class ProfitListView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2,
            }),
            searchData: {},
            oSelfProfit: {},
            oAgentSumPerDay: [],
            dataList: [],
            username: ''
        }

    }

    clickSum() {
        const {oAgentSumPerDay} = this.props;

        const profitData = {
            username: '合计',
            is_agent: '',
            deposit: oAgentSumPerDay.team_deposit,
            withdrawal: oAgentSumPerDay.team_withdrawal,
            turnover: oAgentSumPerDay.team_turnover,
            prize: oAgentSumPerDay.team_prize,
            profit: oAgentSumPerDay.team_profit,
            commission: oAgentSumPerDay.team_commission,
            dividend: oAgentSumPerDay.team_dividend,
            profit_loss: oAgentSumPerDay.team_profit_loss,
        }
        this.view(profitData);
    }

    clickItem(rowData) {
        const profitData = {
            username: rowData.username,
            is_agent: rowData.is_agent,
            deposit: rowData.team_deposit,
            withdrawal: rowData.team_withdrawal,
            turnover: rowData.team_turnover,
            prize: rowData.team_prize,
            profit: rowData.team_profit,
            commission: rowData.team_commission,
            dividend: rowData.team_dividend,
            profit_loss: rowData.team_profit_loss,
        }
        this.view(profitData);
    }

    clickSelf() {
        const {oSelfProfit} = this.props;

        const profitData = {
            username: '自己',
            is_agent: '',
            deposit: oSelfProfit.deposit,
            withdrawal: oSelfProfit.withdrawal,
            turnover: oSelfProfit.turnover,
            prize: oSelfProfit.prize,
            profit: oSelfProfit.profit,
            commission: oSelfProfit.commission,
            dividend: oSelfProfit.dividend,
            profit_loss: oSelfProfit.profit_loss,
        }
        this.view(profitData);
    }

    view(profitData) {
        G_NavUtil.pushToView(G_NavViews.ProfitView({
            title: '盈亏详情',
            profitData: profitData,
            formatMoney:this.formatMoney,
        }));

    }

    render() {
        let {dataList} = this.props;
        let ds = this.state.dataSource.cloneWithRows(dataList)
        if (dataList) {
            return (<View >
                {this.rendeSum()}
                {this.renderSelf()}
                {this.renderDirect()}

                <ListView
                    dataSource={ds}
                    renderRow={this.rendeRow}
                    enableEmptySections
                />
            </View>)
        }
        return (
            <View>
            </View>
        )
    }

    renderDirect() {
        const {oSelfProfit} = this.props;

        if (oSelfProfit && !!oSelfProfit.turnover) {
            return (<View style={[styles.row]}>
                <View style={[styles.itemContentStyle, {flex: 10}]}>
                    <Text style={[styles.textItemName]}>直属下级盈亏明细</Text>
                </View>
            </View>);
        }
        return (<View></View>);

    }

    renderSelf() {
        const {oSelfProfit} = this.props;
        if (oSelfProfit && !!oSelfProfit.turnover) {
            return (
                <TouchableHighlight onPress={() => this.clickSelf()} underlayColor='rgba(10,10,10,0.2)'>
                    <View style={[styles.row]}>
                        <View style={[styles.itemContentStyle, {flex: 2}]}>
                            <Text style={styles.textItemName}>自己</Text>
                        </View>
                        <View style={[styles.itemContentStyle, {flex: 2}]}>
                            <Text style={[styles.textItemStyle]}
                                  numberOfLines={1}>投注: {this.formatMoney(oSelfProfit.turnover)}</Text>
                            <Text style={[styles.textItemStyle]}
                                  numberOfLines={1}>返点: {this.formatMoney(oSelfProfit.commission)}</Text>
                        </View>
                        <View style={[styles.itemContentStyle, {flex: 2}]}>
                            <Text style={styles.textItemStyle}>中奖: {this.formatMoney(oSelfProfit.prize)}</Text>
                            <Text style={[styles.textItemStyle]}
                                  numberOfLines={1}>盈亏: {this.formatMoney(oSelfProfit.profit_loss)}</Text>
                        </View>
                        <View style={styles.itemContentStyle}>
                            <AIcon name={"angle-right"}
                                   style={{fontSize: 25, alignSelf: "center", color: "gray"}}/>
                        </View>

                    </View>
                </TouchableHighlight>
            )
        }
        return (<View></View>);
    }

    rendeSum() {
        const {oAgentSumPerDay} = this.props;

        if (oAgentSumPerDay && !!oAgentSumPerDay.team_turnover) {
            return (
                <TouchableHighlight onPress={() => this.clickSum()} underlayColor='rgba(10,10,10,0.2)'>

                    <View style={[styles.row]}>
                        <View style={[styles.itemContentStyle, {flex: 2}]}>
                            <Text style={styles.textItemName}>合计</Text>
                        </View>
                        <View style={[styles.itemContentStyle, {flex: 2}]}>
                            <Text style={[styles.textItemStyle]}
                                  numberOfLines={1}>投注: {this.formatMoney(oAgentSumPerDay.team_turnover)}</Text>
                            <Text style={[styles.textItemStyle]}
                                  numberOfLines={1}>返点: {this.formatMoney(oAgentSumPerDay.team_commission)}</Text>
                        </View>
                        <View style={[styles.itemContentStyle, {flex: 2}]}>
                            <Text style={styles.textItemStyle}>中奖: {this.formatMoney(oAgentSumPerDay.team_prize)}</Text>
                            <Text style={[styles.textItemStyle]}
                                  numberOfLines={1}>盈亏: {this.formatMoney(oAgentSumPerDay.team_profit_loss)}</Text>
                        </View>
                        <View style={styles.itemContentStyle}>
                            <AIcon name={"angle-right"}
                                   style={{fontSize: 25, alignSelf: "center", color: "gray"}}/>
                        </View>

                    </View>
                </TouchableHighlight>
            )
        }
        return (<View></View>);
    }

    rendeRow = (data, section) => {
        return (

            <TouchableHighlight onPress={() => this.clickItem(data)} underlayColor='rgba(10,10,10,0.2)'>

                <View style={[styles.row]}>
                    <View style={[styles.itemContentStyle, {flex: 2}]}>
                        <Text style={styles.textItemName}>{data.username}</Text>
                    </View>
                    <View style={[styles.itemContentStyle, {flex: 2}]}>
                        <Text style={[styles.textItemStyle]}
                              numberOfLines={1}>投注: {this.formatMoney(data.team_turnover)}</Text>
                        <Text style={[styles.textItemStyle]}
                              numberOfLines={1}>返点: {this.formatMoney(data.team_commission)}</Text>
                    </View>
                    <View style={[styles.itemContentStyle, {flex: 2}]}>
                        <Text style={styles.textItemStyle}>中奖: {this.formatMoney(data.team_prize)}</Text>
                        <Text style={[styles.textItemStyle]}
                              numberOfLines={1}>盈亏: {this.formatMoney(data.team_profit_loss)}</Text>
                    </View>
                    <View style={styles.itemContentStyle}>
                        <AIcon name={"angle-right"}
                               style={{fontSize: 25, alignSelf: "center", color: "gray"}}/>
                    </View>

                </View>
            </TouchableHighlight>)
    }

    formatMoney(num) {

        var num = Number(num),
            re = /(-?\d+)(\d{3})/,
            n = arguments[1] ? arguments[1] : 2;
        if (Number.prototype.toFixed) {
            num = (num).toFixed(n)
        } else {
            var j = 1;
            var b = 1;
            while (j >= n) {
                b = b * 10;
                j++;
            }
            num = Math.round(num * b) / b
        }
        num = '' + num;
        arr = num.split('.')
        while (re.test(arr[0])) {
            arr[0] = arr[0].replace(re, "$1,$2")
        }
        if (!!arr[1]) {
            num = arr[0] + '.' + arr[1];
        }
        return num
    }
}
const styles = StyleSheet.create({

    itemContentStyle: {
        flex: 1,
        justifyContent: "center"
        // borderWidth: 1
    },
    textItemName: {
        textAlign: "center",

    },
    textItemStyle: {
        fontSize: 12,
        color: "gray",
        marginTop: 5,

    },


    row: {
        width: G_Theme.windowWidth,
        height: 50,
        paddingTop: 5,
        paddingBottom: 5,
        flexDirection: "row",
        borderBottomWidth: 0.5,
        borderColor: '#ccc',

    },

    headText: {
        padding: 2,
        flex: 1,
        borderColor: "#ccc",
        textAlign: "center",
        fontWeight: "bold"
    }, contentText: {
        padding: 2,
        flex: 1,
        fontSize: 12,
        borderColor: '#ccc',
        textAlign: "center"
    },
    contentButton: {
        padding: 2,
        flex: 1,
        fontSize: 12,
        color: '#fff',
        textAlign: "center"
    }

})