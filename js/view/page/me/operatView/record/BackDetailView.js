import React from 'react';
import {
    View,
    StyleSheet,
    Text,
} from 'react-native';
import BaseView from "../../../../componet/BaseView";

export  default class AssignDetailView extends BaseView {

    render() {
        let {appModel,data,gameModel,playModel} = this.props.navigation.state.params;
        let gameName = gameModel.getGameNameById(data.lottery_id);
       // let timeStr=G_DateUtil.formatSimpleItemDateString(data.created_at)
        let wayName=  playModel.getWayNameById(data.way_id);
        return (<View style={[G_Style.appContentView]}>
            <View style={styles.profitRow}>
                <Text style={styles.title}>用户名:</Text>
                <Text
                    style={[styles.text, styles.winStatus]}>{data.username}</Text>
            </View>
            <View style={styles.profitRow}>
                <Text style={styles.title}>注单编号:</Text>
                <Text
                    style={[styles.text, styles.winStatus]}>{data.project_no}</Text>
            </View>
            <View style={styles.profitRow}>
                <Text style={styles.title}>奖期:</Text>
                <Text style={[styles.text, styles.winNumber]}>{data.issue}</Text>
            </View>
            <View style={styles.profitRow}>
                <Text style={styles.title}>彩种玩法:</Text>
                <Text style={[styles.text, styles.winNumber]}>{gameName} - {wayName}</Text>
            </View>
            <View style={styles.profitRow}>
                <Text style={styles.title}>时间:</Text>
                <Text style={[styles.text, styles.winNumber]}>{data.created_at}</Text>
            </View>

            <View style={[styles.profitRow,{borderColor: G_Theme.gray,backgroundColor: '#fff',}]}>
                <Text style={styles.title}>模式:</Text>
                <Text style={[styles.text,{color:G_Theme.grayDeep}]}> {appModel.getACoefficients(data.coefficient)}</Text>
            </View>
            <View style={[styles.profitRow,{borderColor: G_Theme.gray,backgroundColor: '#fff',}]}>
                <Text style={styles.title}>倍数:</Text>
                <Text style={[styles.text,{color:G_Theme.grayDeep}]}>{data.multiple} 倍</Text>
            </View>
            <View style={[styles.profitRow,{borderColor: G_Theme.gray,backgroundColor: '#fff',}]}>
                <Text style={styles.title}>基础投注额:</Text>
                <Text style={[styles.text,{color:G_Theme.grayDeep}]}>{data.base_amount}</Text>
            </View>
            <View style={styles.profitRow}>
                <Text style={[styles.title]}>返点额:</Text>
                <Text style={[styles.text,styles.winNumber]}>{data.amount}</Text>
            </View>
            <View style={styles.profitRow}>
                <Text style={[styles.title]}>中奖次数:</Text>
                <Text  style={[styles.text,styles.winNumber,{color:"green"}]}>{data.won_count}</Text>
            </View>
            <View style={styles.profitRow}>
                <Text style={[styles.title]}>返点状态:</Text>
                <Text style={[styles.text,styles.winNumber,{color:data.status ? "green":"red"}]}>{data.status ? "已发放":"等待中"}</Text>
            </View>
        </View>)
    }



}
const styles = StyleSheet.create({
    profitRow: {
        width: G_Theme.windowWidth,
        paddingTop: 5,
        paddingBottom: 5,
        flexDirection: "row",
        // borderBottomWidth: 1,
        borderColor: '#ccc',

    },
    title: {
        paddingHorizontal: 10,
        // textAlign: 'right',
        // textAlign: 'right',
        width:120
    },
    textgameName: {
        lineHeight: 30,
        fontSize: 16,
        paddingHorizontal: 5,

    },
    gameHeadText:{
        flex: 3,
        color: G_Theme.grayDeep,
        fontSize: 12,
        textAlign: 'center'
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
