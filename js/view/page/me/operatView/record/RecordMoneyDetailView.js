import React from 'react';
import {
    View,
    StyleSheet,
    Text,
} from 'react-native';
import BaseView from "../../../../componet/BaseView";

export  default class RecordMoneyDetailView extends BaseView {

    renderBody() {
        let {appModel,data,gameModel,playModel,userData} = this.props.navigation.state.params
        let gameName= gameModel.getGameNameById(data.lottery_id);
        let playName = playModel.getWayNameById(data.way_id);
        let money= data.is_income ? `+${ parseInt(data.amount)}`:`-${ parseInt(data.amount)}`

        return (<View style={[G_Style.appContentView]}>
            <View style={styles.profitRow}>
                <Text style={styles.title}>用户名:</Text>
                <Text
                    style={[styles.text, styles.winStatus]}>{userData.data.nickname}</Text>
            </View>
            <View style={styles.profitRow}>
                <Text style={styles.title}>编号:</Text>
                <Text
                    style={[styles.text, styles.winStatus]}>{data.serial_number}</Text>
            </View>
            <View style={styles.profitRow}>
                <Text style={[styles.title]}>账变类型:</Text>
                <Text style={[styles.text,styles.winStatus]}>{appModel.getATransactionType(data.type_id)}</Text>
            </View>
            <View style={styles.profitRow}>
                <Text style={styles.title}>创建日期:</Text>
                <Text style={[styles.text, styles.winNumber]}>{data.created_at}</Text>
            </View>

            <View style={styles.profitRow}>
                <Text style={styles.title}>模式:</Text>
                <Text style={[styles.text, styles.winNumber]}>{appModel.getACoefficients(data.coefficient)}</Text>
            </View>
            <View style={styles.profitRow}>
                <Text style={styles.title}>账户余额:</Text>
                <Text style={[styles.text, styles.winNumber]}>{data.available}</Text>
            </View>
            <View style={[styles.profitRow,{borderColor: G_Theme.gray,backgroundColor: '#fff',}]}>
                <Text style={styles.title}>金额:</Text>
                <Text style={[styles.text,styles.winNumber]}>{money}</Text>
            </View>
            <View style={[styles.profitRow,{borderColor: G_Theme.gray,backgroundColor: '#fff',}]}>
                <Text style={styles.title}>游戏:</Text>
                <Text style={[styles.text,styles.winStatus]}>{gameName}</Text>
            </View>
            <View style={[styles.profitRow,{borderColor: G_Theme.gray,backgroundColor: '#fff',}]}>
                <Text style={styles.title}>玩法:</Text>
                <Text style={[styles.text,styles.winStatus]}>{playName}</Text>
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
