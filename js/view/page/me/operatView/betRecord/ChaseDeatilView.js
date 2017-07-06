import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableHighlight

} from 'react-native';
import BaseView from "../../../../componet/BaseView";
import TFlatList from "../../../../componet/TFlatList";
import {HOME_ICONS} from "../../../../../assets/index";


export  default class BetDetailView extends BaseView {

    constructor(props) {
        super(props)
        this.gameName = null;
        this.state = {
            data: {}
        }
    }


    renderBody() {
        let {gameModel, appModel} = this.props.navigation.state.params;
        let gameName = gameModel.getGameNameById(this.state.data.lottery_id)
        this.gameName = gameName;
        let dataList = this.state.data.detail_list ? this.state.data.detail_list.data : [];
        const {data} = this.state;
        TLog('trace dtat', data)

        let series_id = gameModel.getSeriesIdById(data.lottery_id)
        let coefficient = appModel.getACoefficients(data.coefficient);
        let isFinish = data.status == 1 ? true : false;
        return (<View style={[G_Style.appContentView]}>

                <View style={styles.gameHead}>
                    <View style={{flexDirection: "row"}}>
                        <Image style={styles.thumb} source={HOME_ICONS[series_id]}/>
                        <Text style={styles.textgameName}> {gameName}</Text>
                        <Text style={styles.textissueNum}> 起始奖期{data.start_issue}</Text>
                    </View>
                    <View style={{flexDirection: "row", marginTop: 10}}>
                        <Text style={[styles.text, {flex: 1, textAlign: 'center'}]}>追号期数</Text>
                        <Text style={[styles.text, {flex: 1, textAlign: 'center'}]}>完成期数</Text>
                        <Text style={[styles.text, {flex: 1, textAlign: 'center'}]}>取消期数</Text>
                    </View>
                    <View style={{flexDirection: "row", marginTop: 5}}>
                        <Text
                            style={[styles.text, styles.gameHeadText, styles.winNumber]}> {G_DateUtil.formatMoney(data.amount)}元</Text>
                        <Text
                            style={[styles.text, styles.gameHeadText, styles.winNumber]}> {data.prize ? G_DateUtil.formatMoney(data.prize) : 0}元</Text>
                        <Text style={[styles.text, styles.gameHeadText, styles.winNumber]}> {coefficient}</Text>
                    </View>
                </View>
                <View style={styles.profitRow}>
                    <Text style={styles.title}>追号状态:</Text>
                    <Text
                        style={[styles.text, styles.winStatus, {color: isFinish ? G_Theme.primary : G_Theme.grayDeep}]}>{appModel.getATraceStatus(this.state.data.status)}</Text>
                </View>
                <View style={styles.profitRow}>
                    <Text style={styles.title}>中奖奖金:</Text>
                    <Text
                        style={[styles.text, styles.winStatus, {color: G_Theme.primary}]}>{data.prize ? G_DateUtil.formatMoney(data.prize) : 0}元</Text>
                </View>
                <View style={styles.profitRow}>
                    <Text style={styles.title}>投注模式:</Text>
                    <Text
                        style={[styles.text,]}>{coefficient}</Text>
                </View>
                <View style={styles.profitRow}>
                    <Text style={styles.title}>订单金额:</Text>
                    <Text
                        style={[styles.text, styles.winStatus,{color: G_Theme.grayDeep}]}>{G_DateUtil.formatMoney(data.amount)}元</Text>
                </View>
                <View style={[styles.profitRow, {borderColor: G_Theme.gray, backgroundColor: '#fff',}]}>
                    <Text style={styles.title}>追号号码:</Text>
                    <Text style={[styles.text, {color: G_Theme.grayDeep}]}>{data.title} <Text
                        style={{color: G_Theme.grayDeep}}>{data.multiple}倍</Text></Text>
                </View>
                <View style={[styles.profitRow, {borderColor: G_Theme.gray, borderWidth: 1, backgroundColor: '#fff',}]}>
                    <Text style={[styles.text, styles.betNumber]}>{data.bet_number} </Text>
                </View>

                <View style={{flexDirection: "row", marginTop: 20}}>
                    <Text style={[styles.text, styles.gameHeadText, {flex: 2}]}>订单编号:</Text>
                    <Text style={[styles.text, styles.gameHeadText, {
                        flex: 8,
                        textAlign: 'left'
                    }]}>{data.serial_number}</Text>
                </View>

                <View style={{flexDirection: "row", marginTop: 5}}>
                    <Text style={[styles.text, styles.gameHeadText, {flex: 2}]}>订单时间:</Text>
                    <Text
                        style={[styles.text, styles.gameHeadText, {
                            flex: 8,
                            textAlign: 'left'
                        }]}>{data.created_at}</Text>
                </View>


                <TFlatList dataList={dataList} loadMore={this.loadMore} renderRow={this._renderRow}/>
            </View>
        );
    }

    componentDidMount() {
        let {id} = this.props.navigation.state.params
        HTTP_SERVER.CHASE_DETAIL.url = HTTP_SERVER.CHASE_DETAIL.formatUrl.replace(/#id/g, id);
        G_RunAfterInteractions(() => {
            ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.CHASE_DETAIL, (result) => {
                if (result.data) {
                    // let arr = this.state.dataList.concat(result.data.data);
                    this.setState({data: result.data})
                }
            })
        })
    }

    loadMore = (callBack, forcePage = 0) => {

    }

    _renderRow = (rowData,index) => {
        TLog("rowData----", rowData);
        return (
            <View>
                {/*<TouchableHighlight onPress={() => this.itemClick(rowData)} underlayColor='rgba(10,10,10,0.2)'>*/}
                    {/*<View style={styles.row}>*/}
                        {/*<View style={[styles.itemContentStyle, {flex: 2}]}>*/}
                            {/*<Text style={styles.textItemStyle}>{this.gameName}</Text>*/}
                        {/*</View>*/}
                        {/*<View style={[styles.itemContentStyle, {flex: 2}]}>*/}
                            {/*<Text style={styles.textItemStyle}>{rowData.title}</Text>*/}
                            {/*<Text style={{fontSize: 12, color: "gray", marginTop: 5}}*/}
                                  {/*numberOfLines={1}>{`投注号码:${rowData.bet_number}`}</Text>*/}
                        {/*</View>*/}
                        {/*<View style={styles.itemContentStyle}>*/}
                            {/*<Text style={styles.textItemStyle}>{rowData.status}</Text>*/}
                        {/*</View>*/}
                        {/*<View style={styles.itemContentStyle}>*/}
                            {/*<AIcon name={"angle-right"}*/}
                                   {/*style={{fontSize: 25, alignSelf: "center", color: "gray"}}/>*/}
                        {/*</View>*/}
                    {/*</View>*/}
                {/*</TouchableHighlight>*/}
            </View>
        );
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
        flex: 2
    },
    textgameName: {
        lineHeight: 30,
        fontSize: 16,
        paddingHorizontal: 5,

    },
    gameHeadText: {
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
        marginRight: 5,
        flex: 8
    },
    winStatus: {
        fontSize: 16,
        fontWeight: "bold"
    },
    betNumber: {
        padding: 5,

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