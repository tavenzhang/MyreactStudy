import React,{PropTypes} from 'react';
import {
    View,
    Text, StyleSheet,
} from 'react-native';

import TFlatList from "../../../../componet/TFlatList";

export default class MoneyApplyInView extends React.Component {
   static propTypes={
       loadMore:PropTypes.func,
       dataList:PropTypes.any
    }

    render() {
        let {dataList,loadMore}=this.props
        return (
            <View style={G_Style.appContentView}>
                <View style={styles.headRow}>
                    <View style={[styles.itemHeadStyle,{flex:1}]}>
                        <Text style={styles.textHeadStyle}>日期</Text>
                    </View>
                    <View style={[styles.itemHeadStyle,{flex:1}]}>
                        <Text style={styles.textHeadStyle}>金额</Text>
                    </View>
                    <View style={[styles.itemHeadStyle,{flex:1}]}>
                        <Text style={styles.textHeadStyle}>实际充值</Text>
                    </View>
                    <View style={[styles.itemHeadStyle,{flex:1}]}>
                        <Text style={styles.textHeadStyle}>手续费</Text>
                    </View>
                    <View style={[styles.itemHeadStyle,{flex:1}]}>
                        <Text style={styles.textHeadStyle}>状态</Text>
                    </View>
                </View>
                <TFlatList dataList={dataList} loadMore={loadMore} renderRow={this._renderRow}/>
            </View>
        );
    }


    _renderRow = (rowData) => {
        let {appModel}=this.props

        let dateStr=   G_DateUtil.formatSimpleItemDateString(rowData.pay_time);
        let real_amount = rowData.real_amount ?  rowData.real_amount:0
        return (
                <View style={styles.row}>
                    <View style={[styles.itemContentStyle,{flex:2}]}>
                        <Text style={styles.textItemStyle}>{dateStr}</Text>
                    </View>
                    <View style={[styles.itemContentStyle,{flex:2}]}>
                        <Text style={[styles.textItemStyle]}>{rowData.amount}</Text>
                    </View>
                    <View style={[styles.itemContentStyle,{flex:2}]}>
                        <Text style={styles.textItemStyle}>{real_amount}</Text>
                    </View>
                    <View style={[styles.itemContentStyle,{flex:2}]}>
                        <Text style={styles.textItemStyle}>{rowData.fee}</Text>
                    </View>
                    <View style={[styles.itemContentStyle,{flex:2}]}>
                        <Text style={[styles.textItemStyle,{color:rowData.status ? "green":"red"}]} >{appModel.getADepositStatus(rowData.status)}</Text>
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
        height: 35,
        borderColor: "gray",
    },
    row: {
        flexDirection: 'row',
        height: 40,
        borderBottomWidth:0.5,
        borderColor: "gray",

    },
});
