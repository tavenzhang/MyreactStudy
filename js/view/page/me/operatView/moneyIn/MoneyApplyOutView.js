import React,{PropTypes} from 'react';
import {
    View,
    Text, StyleSheet,
} from 'react-native';

import TFlatList from "../../../../componet/TFlatList";

export default class MoneyApplyOutView extends React.Component {
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
                        <Text style={styles.textHeadStyle}>手续费</Text>
                    </View>
                    <View style={[styles.itemHeadStyle,{flex:1}]}>
                        <Text style={styles.textHeadStyle}>编号</Text>
                    </View>
                    <View style={[styles.itemHeadStyle,{flex:1}]}>
                        <Text style={styles.textHeadStyle}>状态</Text>
                    </View>
                </View>
                <TFlatList dataList={dataList} loadMore={loadMore} renderRow={this._renderRow}/>
            </View>
        );
    }



    _renderRow = (data) => {
        let {appModel}=this.props
        let dateStr= G_DateUtil.formatSimpleItemDateString(data.request_time);
        return (
            <View style={styles.row}>
                <View style={[styles.itemContentStyle,{flex:2}]}>
                    <Text style={styles.textItemStyle}>{dateStr}</Text>
                </View>
                <View style={[styles.itemContentStyle,{flex:2}]}>
                    <Text style={[styles.textItemStyle]}>{data.amount}</Text>
                </View>
                <View style={[styles.itemContentStyle,{flex:2}]}>
                    <Text style={styles.textItemStyle}>{data.fee}</Text>
                </View>
                <View style={[styles.itemContentStyle,{flex:2}]}>
                    <Text style={styles.textItemStyle}>{data.serial_number}</Text>
                </View>
                <View style={[styles.itemContentStyle,{flex:2}]}>
                    <Text style={[styles.textItemStyle,{color:data.status ? "green":"red"}]} >{appModel.getAWithdrawStatus(data.status)}</Text>
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
