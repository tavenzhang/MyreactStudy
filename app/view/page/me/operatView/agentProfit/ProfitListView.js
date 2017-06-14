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

        }));

    }

    render() {
        let {dataList}=this.props;
        let ds = this.state.dataSource.cloneWithRows(dataList)
        if (dataList) {
            return (<View >
                <View style={[styles.Head]}>
                    <Text style={[styles.headText,]}>用户</Text>
                    <Text style={[styles.headText]}>投注</Text>
                    <Text style={[styles.headText]}>返点</Text>
                    <Text style={[styles.headText]}>中奖</Text>
                    <Text style={[styles.headText]}>盈亏</Text>
                    <Text style={[styles.headText]}>操作</Text>
                </View>
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
    renderDirect(){
        const {oSelfProfit}=this.props;

        if (oSelfProfit&&!!oSelfProfit.turnover) {
            return (<View style={[styles.Head]}>
                <Text style={[styles.contentText]}>直属下级盈亏明细</Text>
            </View>);
        }
        return (<View></View>);

    }

    renderSelf() {
        const {oSelfProfit}=this.props;
        if (oSelfProfit&&!!oSelfProfit.turnover) {
            return (
                <View style={[styles.Head]}>
                    <Text style={[styles.contentText]}>自己</Text>
                    <Text style={[styles.contentText]}>{this.formatMoney(oSelfProfit.turnover)}</Text>
                    <Text style={[styles.contentText]}>{this.formatMoney(oSelfProfit.commission)}</Text>
                    <Text style={[styles.contentText]}>{this.formatMoney(oSelfProfit.prize)}</Text>
                    <Text style={[styles.contentText]}>{this.formatMoney(oSelfProfit.profit_loss)}</Text>

                    <TouchableHighlight style={{
                        padding: 2, marginRight: 4, marginLeft: 4, flex: 1,
                        overflow: 'hidden',
                        borderRadius: 3,
                        backgroundColor: '#d7213c'
                    }} onPress={() => this.clickSelf()} underlayColor='rgba(0,0,0,0)'>
                        <Text style={[styles.contentButton]}>详情</Text>
                    </TouchableHighlight>
                </View>
            )
        }
        return (<View></View>);
    }

    rendeSum() {
        const {oAgentSumPerDay}=this.props;

        if (oAgentSumPerDay&&!!oAgentSumPerDay.team_turnover) {
            return (<View style={[styles.Head]}>
                <Text style={[styles.contentText]}>合计</Text>
                <Text style={[styles.contentText]}>{this.formatMoney(oAgentSumPerDay.team_turnover)}</Text>
                <Text style={[styles.contentText]}>{this.formatMoney(oAgentSumPerDay.team_commission)}</Text>
                <Text style={[styles.contentText]}>{this.formatMoney(oAgentSumPerDay.team_prize)}</Text>
                <Text style={[styles.contentText]}>{this.formatMoney(oAgentSumPerDay.team_profit_loss)}</Text>

                <TouchableHighlight style={{
                    padding: 2, marginRight: 4, marginLeft: 4, flex: 1,
                    overflow: 'hidden',
                    borderRadius: 3,
                    backgroundColor: '#d7213c'
                }} onPress={() => this.clickSum()} underlayColor='rgba(0,0,0,0)'>
                    <Text style={[styles.contentButton]}>详情</Text>
                </TouchableHighlight>
            </View>)
        }
        return (<View></View>);
    }

    rendeRow = (data, section) => {
        return (<View style={[styles.row]}>
            {/*<TouchableHighlight key={data.id} onPress={() => this.item(data.username)} underlayColor='rgba(0,0,0,0)'>*/}
            <Text style={[styles.contentText,]}>{data.username}</Text>
            {/*</TouchableHighlight>*/}
            <Text style={[styles.contentText]}>{this.formatMoney(data.team_turnover)}</Text>
            <Text style={[styles.contentText]}>{this.formatMoney(data.team_commission)}</Text>
            <Text style={[styles.contentText]}>{this.formatMoney(data.team_prize)}</Text>
            <Text style={[styles.contentText]}>{this.formatMoney(data.team_profit_loss)}</Text>

            <TouchableHighlight style={{
                padding: 2, margin: 4, flex: 1,
                overflow: 'hidden',
                borderRadius: 3,
                backgroundColor: '#d7213c'
            }} onPress={() => this.clickItem(data)} underlayColor='rgba(0,0,0,0)'>
                <Text style={[styles.contentButton]}>详情</Text>
            </TouchableHighlight>

        </View>)
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
    Head: {
        width: G_Theme.windowWidth,
        height: 30,
        paddingTop: 5,
        paddingBottom: 5,
        flexDirection: "row",
        borderBottomWidth: 0.5,
        borderColor: '#ccc',
    },
    row: {
        borderBottomWidth: 0.5,
        borderColor: '#ccc',
        flexDirection: "row",
        height: 40,
        paddingTop: 5,
        paddingBottom: 5,
        width: G_Theme.windowWidth,

    },
    defaultStyle: {
        flexDirection: "row"
    },
    textStyle: {
        width: 150,
        left: 10,
        fontSize: 14,
        height: G_Theme.textInpuntH,
        marginRight: 15,
        paddingLeft: 5
    },
    headText: {
        padding: 2,
        flex: 1,
        borderColor: "#ccc",
        textAlign: "center",
        fontWeight: "bold"
    },
    contentText: {
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