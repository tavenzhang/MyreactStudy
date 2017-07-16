import React,{PropTypes} from 'react';
import {
    View,
    Text, StyleSheet,
} from 'react-native';

import TFlatList from "../../../../componet/TFlatList";
export default class MoneyChangeHistoryView extends React.Component {
    static propTypes={
        loadMore:PropTypes.func,
        dataList:PropTypes.any
    }
    constructor(props) {
        super(props);
        this.state = {
            dataList: [],
        };
    }
    render() {
        let {dataList}=this.props
        return (
            <View style={G_Style.appContentView}>
                <View style={styles.headRow}>
                    <View style={[styles.itemHeadStyle,{flex:1}]}>
                        <Text style={styles.textHeadStyle}>日期</Text>
                    </View>
                    <View style={[styles.itemHeadStyle,{flex:2}]}>
                        <Text style={styles.textHeadStyle}>金额</Text>
                    </View>
                    <View style={[styles.itemHeadStyle,{flex:2}]}>
                        <Text style={styles.textHeadStyle}>类型</Text>
                    </View>
                    <View style={[styles.itemHeadStyle,{flex:2}]}>
                        <Text style={styles.textHeadStyle}>彩种</Text>
                    </View>
                    <View style={[styles.itemHeadStyle,{flex:2}]}>
                        <Text style={styles.textHeadStyle}>余额</Text>
                    </View>
                </View>
                <TFlatList dataList={dataList} loadMore={this._loadMore} renderRow={this._renderRow}/>
            </View>
        );
    }


    componentWillUnmount(){
        // TLog("MoneyChangeHistoryView---componentWillUnmount--")
        // let {httpService} = this.props
        // ActDispatch.FetchAct.canCelVoFetch(httpService)
    }

    _loadMore = (callFinishBack,isFlush) => {
        let {loadMore,httpService}=this.props;
        loadMore(httpService,callFinishBack,isFlush);
    }

    _renderRow = (rowData) => {
        let {gameModel,playModel,appModel}=this.props;
        let gameName= gameModel.getGameNameById(rowData.lottery_id);
         let dateStr=   G_DateUtil.formatSimpleItemDateString(rowData.created_at);
         let playName = playModel.getWayNameById(rowData.way_id);
         let money= rowData.is_income ? `+${ parseInt(rowData.amount)}`:`-${ parseInt(rowData.amount)}`

        return (
                    <View style={styles.row}>
                        <View style={[styles.itemContentStyle,{flex:1}]}>
                            <Text style={styles.textItemStyle}>{dateStr}</Text>
                        </View>
                        <View style={[styles.itemContentStyle,{flex:2}]}>
                            <Text style={[styles.textItemStyle,{color:rowData.is_income ? "green":"red"}]}>{money}</Text>
                        </View>
                        <View style={[styles.itemContentStyle,{flex:2}]}>
                            <Text style={styles.textItemStyle}>{appModel.getATransactionType(rowData.type_id)}</Text>
                        </View>
                        <View style={[styles.itemContentStyle,{flex:2}]}>
                            <Text style={styles.textItemStyle}>{gameName}</Text>
                            <Text style={{fontSize:12,color:G_Theme.grayDeep, marginTop:5}} >{playName}</Text>
                        </View>
                        <View style={[styles.itemContentStyle,{flex:2}]}>
                            <Text style={styles.textItemStyle}  numberOfLines={2}>{rowData.available}</Text>
                        </View>
                    </View>
        );
    }

}



const styles = StyleSheet.create({
    itemHeadStyle: {
        alignItems: "center",
        justifyContent: "center"
    },
    itemContentStyle: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
        // borderWidth: 1
    },
    textHeadStyle: {
        fontSize: 14,
        fontWeight: "bold",
        color:"gray"
    },
    textItemStyle: {
        fontSize: 13,
        textAlign:"center"
    },
    headRow: {
        flexDirection: 'row',
        height: 32,
        borderColor: "gray",
    },
    row: {
        flexDirection: 'row',
        height: 45,
        borderBottomWidth:0.5,
        borderColor: "gray",
    },
});
