import React from 'react';
import {
    View,
    StyleSheet,
    Text,
} from 'react-native';
import BaseView from "../../../../componet/BaseView";

export  default class ApplyOuterDetailView extends BaseView {

    renderBody() {
        let {data,appModel} = this.props.navigation.state.params
        let available= (data.after_available==""||data.after_available==null) ? "0.000":data.after_available

        return (<View style={[G_Style.appContentView]}>
            <View style={styles.profitRow}>
                <Text style={styles.title}>用户名:</Text>
                <Text
                    style={[styles.text, styles.winStatus]}>{data.username}</Text>
            </View>
            <View style={styles.profitRow}>
                <Text style={styles.title}>编号:</Text>
                <Text
                    style={[styles.text, styles.winStatus]}>{data.serial_number}</Text>
            </View>
            <View style={styles.profitRow}>
                <Text style={styles.title}>时间:</Text>
                <Text
                    style={[styles.text, styles.winStatus]}>{data.request_time}</Text>
            </View>
            <View style={[styles.profitRow,{borderColor: G_Theme.gray,backgroundColor: '#fff',}]}>
                <Text style={styles.title}>提款银行卡:</Text>
                <Text style={[styles.text,styles.winStatus]}>{data.account}</Text>
            </View>
            <View style={styles.profitRow}>
                <Text style={styles.title}>状态:</Text>
                <Text style={[styles.text, styles.winNumber]}>{appModel.getAWithdrawStatus(data.status)}</Text>
            </View>
            <View style={styles.profitRow}>
                <Text style={styles.title}>金额 :</Text>
                <Text style={[styles.text, styles.winNumber]}>{data.amount }</Text>
            </View>
            <View style={[styles.profitRow,{borderColor: G_Theme.gray,backgroundColor: '#fff',}]}>
                <Text style={styles.title}>手续费:</Text>
                <Text style={[styles.text,styles.winNumber]}>{data.fee}</Text>
            </View>
            <View style={[styles.profitRow,{borderColor: G_Theme.gray,backgroundColor: '#fff',}]}>
                <Text style={styles.title}>余额:</Text>
                <Text style={[styles.text,styles.winNumber]}>{available}</Text>
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
