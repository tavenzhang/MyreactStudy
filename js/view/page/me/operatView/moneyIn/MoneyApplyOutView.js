import React, {PropTypes} from 'react';
import {
    View,
    Text, StyleSheet, TouchableOpacity,
} from 'react-native';

import TFlatList from "../../../../componet/TFlatList";
import {TAIco} from "../../../../componet/tcustom/button/TButton";

export default class MoneyApplyOutView extends React.PureComponent {
    static propTypes = {
        loadMore: PropTypes.func,
        dataList: PropTypes.any,
        curPage: PropTypes.number,
        totalPage: PropTypes.number
    }

    render() {
        let {dataList, loadMore, curPage, totalPage} = this.props
        return (
            <View style={G_Style.appContentView}>
                <View style={styles.headRow}>
                    <View style={[styles.itemHeadStyle]}>
                        <Text style={styles.textHeadStyle}>日期</Text>
                    </View>
                    <View style={[styles.itemHeadStyle]}>
                        <Text style={styles.textHeadStyle}>姓名</Text>
                    </View>
                    <View style={[styles.itemHeadStyle]}>
                        <Text style={styles.textHeadStyle}>金额</Text>
                    </View>
                    <View style={[styles.itemHeadStyle]}>
                        <Text style={styles.textHeadStyle}>手续费</Text>
                    </View>

                    <View style={[styles.itemHeadStyle]}>
                        <Text style={styles.textHeadStyle}>状态</Text>
                    </View>
                </View>
                <TFlatList curPage={curPage} totalPage={totalPage} dataList={dataList} loadMore={loadMore}
                           renderRow={this._renderRow}/>
            </View>
        );
    }


    _renderRow = (data) => {
        let {appModel} = this.props
        let dateStr = G_DateUtil.formatSimpleItemDateString(data.request_time);
        return (    <TouchableOpacity onPress={() => this.onPress(data)}>
                <View style={styles.row}>
                    <View style={[styles.itemContentStyle]}>
                        <Text style={styles.textItemStyle}>{dateStr}</Text>
                    </View>
                    <View style={[styles.itemContentStyle,]}>
                        <Text style={styles.textItemStyle}>{data.username}</Text>
                    </View>
                    <View style={[styles.itemContentStyle, ]}>
                        <Text style={[styles.textItemStyle]}>{data.amount}</Text>
                    </View>
                    <View style={[styles.itemContentStyle, ]}>
                        <Text style={styles.textItemStyle}>{data.fee}</Text>
                    </View>
                    <View style={[styles.itemContentStyle,{flexDirection:"row"}]}>
                        <Text
                            style={[styles.textItemStyle, {color: data.status ? "green" : "red"}]}>{appModel.getAWithdrawStatus(data.status)}</Text>
                        <TAIco name={"angle-right"}
                               style={{fontSize: 24, marginLeft: 10, fontWeight: "bold", color: "red"}}/>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    onPress=(data)=>{
        G_NavUtil.push(G_RoutConfig.ApplyOuterDetailView,{data,...this.props},"提款详情")
    }
}


const styles = StyleSheet.create({
    itemHeadStyle: {
        flex: 1,
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
        color: "gray"
    },
    textItemStyle: {
        fontSize: 13,
        textAlign: "center"
    },
    headRow: {
        flexDirection: 'row',
        height: 35,
        borderColor: "gray",
    },
    row: {
        flexDirection: 'row',
        height: 40,
        borderBottomWidth: 0.5,
        borderColor: "gray",

    },
});
