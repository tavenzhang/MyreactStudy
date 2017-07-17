import React from 'react';
import {
    View,
    StyleSheet,
    Text,
} from 'react-native';
import BaseView from "../../../../componet/BaseView";

export  default class RecordAssignDetailView extends BaseView {

    renderBody() {
        let {appModel,data} = this.props.navigation.state.params
        return (<View style={[G_Style.appContentView]}>
            <View style={styles.profitRow}>
                <Text style={styles.title}>用户名:</Text>
                <Text
                    style={[styles.text, styles.winStatus]}>{data.username}</Text>
            </View>
            <View style={styles.profitRow}>
                <Text style={styles.title}>开始日期:</Text>
                <Text
                    style={[styles.text, styles.winStatus]}>{data.begin_date}</Text>
            </View>
            <View style={styles.profitRow}>
                <Text style={styles.title}>结束日期:</Text>
                <Text style={[styles.text, styles.winNumber]}>{data.end_date}</Text>
            </View>
            <View style={styles.profitRow}>
                <Text style={styles.title}>审核状态:</Text>
                <Text style={[styles.text, styles.winNumber]}>{appModel.getAWithdrawStatus(data.draw_status)}</Text>
            </View>
            <View style={styles.profitRow}>
                <Text style={styles.title}>领取状态:</Text>
                <Text style={[styles.text, styles.winNumber]}>{data.status ? "已领取":"未领取"}</Text>
            </View>

            <View style={[styles.profitRow,{borderColor: G_Theme.gray,backgroundColor: '#fff',}]}>
                <Text style={styles.title}>净盈亏:</Text>
                <Text style={[styles.text,{color:G_Theme.grayDeep}]}>{data.profit}</Text>
            </View>
            <View style={[styles.profitRow,{borderColor: G_Theme.gray,backgroundColor: '#fff',}]}>
                <Text style={styles.title}>总计盈亏:</Text>
                <Text style={[styles.text,{color:G_Theme.grayDeep}]}>{data.total_profit}</Text>
            </View>
            <View style={[styles.profitRow,{borderColor: G_Theme.gray,backgroundColor: '#fff',}]}>
                <Text style={styles.title}>销量:</Text>
                <Text style={[styles.text,{color:G_Theme.grayDeep}]}>{data.turnover}</Text>
            </View>
            <View style={styles.profitRow}>
                <Text style={[styles.title]}>分红比例:</Text>
                <Text style={[styles.text,styles.winNumber]}>{data.rate}%</Text>
            </View>
            <View style={styles.profitRow}>
                <Text style={[styles.title]}>分红:</Text>
                <Text  style={[styles.text,styles.winNumber,{color:"green"}]}>{data.bonus}</Text>
            </View>
            <View style={styles.profitRow}>
                <Text style={[styles.title]}>分红数量:</Text>
                <Text style={[styles.text,styles.winNumber,{color:"green"}]}>{data.bonus_count}</Text>
            </View>
        </View>);
    }

}
const styles = StyleSheet.create({
    profitRow: {
        //width: G_Theme.windowWidth,
        justifyContent: "flex-start",
        paddingTop: 5,
        paddingBottom: 5,
        flexDirection: "row",
        // borderBottomWidth: 1,
        borderColor: '#ccc',

    },
    title: {
        paddingHorizontal: 10,
        // textAlign: 'right',
        width:120
    },

    gameHead: {
        // height: 120,
        padding: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: G_Theme.gray,
    },
    textissueNum: {
        lineHeight: 30,
        fontSize: 12,
    },
    text: {
        paddingHorizontal: 10,
        marginRight:5,
        flex: 8
    },
    winStatus: {
        fontSize: 16,
        fontWeight: "bold"
    },
    betNumber: {
        padding:5,

        fontSize: 14,
        // borderWidth: 1,
        borderColor: G_Theme.gray,
        color: G_Theme.grayDeep,

    },
    winNumber: {
        fontSize: 16,
        fontWeight: "bold",
        color: G_Theme.primary,
    },
    thumb: {
        width: 30,
        height: 30,
        marginLeft: 4,
        borderRadius: 15,
    },

})
