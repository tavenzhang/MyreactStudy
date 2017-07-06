import React from 'react';
import {
    View,
    Text, StyleSheet,
    TouchableHighlight,
} from 'react-native';

import TFlatList from "../../../../componet/TFlatList";
import AIcon from 'react-native-vector-icons/FontAwesome';

export default class BetRecordListView extends React.Component {
    constructor(props) {
        super(props);
        this.lastMonth = null;
        this.lastDay = null;
    }

    render() {
        let ds = this.props.dataList;
        return (
            <View style={G_Style.appContentView}>
                <TFlatList dataList={ds} loadMore={this.props.loadMore} renderRow={this._renderRow}/>
            </View>
        )
    }

    _renderRow = (rowData,index) => {

        let {gameModel, appModel} = this.props;
        let dataName = G_DateUtil.formatItemDateString(rowData.bought_at);
        let month = G_DateUtil.formatMonth(rowData.bought_at),
            day = G_DateUtil.formatDay(rowData.bought_at);
        if (this.lastMonth == month && this.lastDay == day) {
            month = '';
            day = '';
        } else {
            this.lastMonth = month;
            this.lastDay = day;
        }
        let gameName = gameModel.getGameNameById(rowData.lottery_id),
         statusColor = rowData.status == 3 ? G_Theme.primary : G_Theme.grayDeep,
            amount=G_DateUtil.formatMoney(rowData.amount);
        return (
            <View>
                <TouchableHighlight onPress={() => this.itemClick(rowData)} underlayColor='rgba(10,10,10,0.2)'>
                    <View style={styles.row}>
                        <View style={[styles.itemContentStyle,index==0||month==''?'':styles.record,{flex: 1}]}>
                            <Text style={[styles.textItemStyle,{ fontSize: 16,color:G_Theme.primary,alignSelf:'center',}]} numberOfLines={1}>{month}</Text>
                            <Text style={[styles.textItemStyle, {fontSize: 20, color:G_Theme.primary, alignSelf:'center',fontWeight: "bold",}]}
                                  numberOfLines={1}>{day} </Text>
                        </View>
                        <View style={[styles.itemContentStyle, index==0?'':styles.record, {flex: 5}]}>
                            <Text style={styles.textItemStyle}>{gameName}</Text>
                            {/*<Text style={{fontSize: 12, color: "gray", marginTop: 5}} numberOfLines={1}>{`投注号码:${rowData.bet_number}`}</Text>*/}
                            <Text style={{fontSize: 12, color: "gray", marginTop: 5}}
                                  numberOfLines={1}>{`${amount}元    ${rowData.title}`}</Text>

                        </View>
                        <View style={[styles.itemContentStyle, index==0?'':styles.record,{flex: 2}]}>
                            <Text style={[styles.textItemStyle, {
                                fontSize:16,
                                fontWeight: 'bold',
                                color: statusColor,
                                paddingRight:3
                            }]}>{appModel.getAProjectStatus(rowData.status)}&nbsp;&nbsp;
                            <AIcon name={"angle-right"} style={{fontSize: 25, paddingTop:2, alignSelf: "center", color: "gray"}}/></Text>
                        </View>
                        {/*<View style={[styles.itemContentStyle, styles.record]}>*/}
                            {/*<AIcon name={"angle-right"}*/}
                                   {/*style={{fontSize: 25, alignSelf: "center", color: "gray"}}/>*/}
                        {/*</View>*/}
                    </View>
                </TouchableHighlight>
            </View>
        );
    }

    itemClick = (data) => {
        G_NavUtil.pushToView(G_NavViews.BetDetailView({...data, title: "投注详情", ...this.props}));
    }
}

const styles = StyleSheet.create({
    itemHeadStyle: {
        alignItems: "center",
        borderRightWidth: 1,
        justifyContent: "center"
        // borderWidth: 1
    },
    itemContentStyle: {
        flex: 1,
        // alignItems: "center",
        justifyContent: "center"
        // borderWidth: 1
    },
    textHeadStyle: {
        fontSize: 14,
        fontWeight: "bold",
        color: "gray"
    },
    textItemStyle: {
        fontSize: 13,
    },
    headRow: {
        flexDirection: 'row',
        height: 20,
        borderBottomColor: "#ddd",
        borderBottomWidth: 1,
    },
    row: {
        flexDirection: 'row',
        height: 50,
        // borderBottomWidth: 1,
        marginLeft: 10,
        // borderColor: G_Theme.gray,
        // borderWidth: 1,
    },
    record: {
        borderTopWidth: 1,
        // marginLeft: 10,
        borderColor: G_Theme.gray,
        // borderWidth: 1,
    },


});
