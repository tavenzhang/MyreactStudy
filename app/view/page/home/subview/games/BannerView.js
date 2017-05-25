import React, {PropTypes}from 'react';
import {
    View,
    Text,
    StyleSheet,
    ListView,
    TouchableWithoutFeedback
} from 'react-native';
import BaseView from "../../../../componet/BaseView";


export default class BannerView extends BaseView {
    // static defaultProps = {
    //     autoPlay: false,
    //     maxLoops: 10,
    // };
    static propTypes = {
        dateHistoryList: PropTypes.array,
        showHistory: PropTypes.bool,
        time: PropTypes.number,
        prize: PropTypes.any,
        currentNumber: PropTypes.any,
        series_id: PropTypes.any
    }

    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2,
            }),
            showHistory: false
        }
    }

    render() {
        let {dateHistoryList, time, currentNumber, prize} = this.props
        let ds = this.state.dataSource.cloneWithRows(dateHistoryList);
        let historyView = null;
        if (this.state.showHistory) {
            historyView = <View>
                <ListView
                    dataSource={ds}
                    renderRow={this._renderRow}
                />
            </View>
        }
        return (
            <TouchableWithoutFeedback onPress={() => {
                this.setState({showHistory: !this.state.showHistory});
            }}>
                <View>
                    <View style={styles.timeBanner}>
                        <View><Text style={styles.timeBannerText}>距第{currentNumber}期开奖:<Text style={{
                            color: "red",
                            fontWeight: "bold"
                        }}>{G_DateUtil.formatSecondDate(time)}</Text></Text></View>
                        <View ref="moreMenuButton"><Text
                            style={styles.timeBannerText}>玩法奖金:{G_moneyFormat(prize)}元</Text></View>
                    </View>
                    {historyView}
                </View>
            </TouchableWithoutFeedback>
        )
    }

    _renderRow = (rowData, section, row) => {
        let rowDataArr = rowData.split("=");
        let bgColor = row % 2 == 0 ? "gray" : "white";
        let {series_id} = this.props
        let ballText = this.getFormatBallText(series_id,rowDataArr[1]);
        return (
            <View key={`${row}`}  style={{flexDirection: "row", backgroundColor: bgColor}}>
                <Text>{`${rowDataArr[0]}期号码    ${ballText}`}</Text>
            </View>
        );
    }

    //根据游戏类型格式化某些显示
    getFormatBallText=(sid, stext)=>{
        let result="";
        switch (sid)
        {
            case "1":
                let arr=stext.split("");
                result=arr.join(" ");
                break;
            case "2":
                result=stext;
                break;
            default:
                result=stext;
                break;

        }
        return result;
    }
}


const styles = StyleSheet.create({
    timeBanner: {
        flexDirection: 'row',
        justifyContent: "space-between",
        backgroundColor: '#ddd',
        padding: 5
    },
    timeBannerText: {
        fontSize: 12
    },
    row: {
        flexDirection: 'row',
        height: 40,
        borderBottomColor: "#ddd",
        borderBottomWidth: 1,
    }
});