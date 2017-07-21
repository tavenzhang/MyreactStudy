import React from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    StyleSheet
} from 'react-native';

import {connect} from 'react-redux';
import BaseView from "../../../componet/BaseView";
import RecordMenuView, {MenuListType} from "./record/RecordMenuView";
import TFlatList from "../../../componet/TFlatList";
import {TAIco} from "../../../componet/tcustom/button/TButton";


const mapStateToProps = state => {
    return {
        gameModel: state.get("appState").get("gameModel"),
        playModel: state.get("appState").get("playModel"),
        appModel: state.get("appState").get("appModel"),
    }
}
@connect(mapStateToProps)
export default class RecordAssginView extends BaseView {

    constructor(props) {
        super(props);
        this.state = {
            curGame: null,
            curPlay: null,
            curTime: null,
            dataList: [],
            curPage:1,
            totalPage:1,
        }
    }

    renderBody() {
        return (
            <View style={G_Style.appContentView}>
                <RecordMenuView clickMenuItem={this.clickMenuItem} {...this.props}/>
                <TFlatList totalPage={this.state.totalPage} curPage={this.state.curPage} styleView={{flex: 1, marginTop: 35}} renderRow={this._renderRow} dataList={this.state.dataList} loadMore={this.loadMore}/>
            </View>
        );
    }

    componentDidMount() {
        this.loadMore(null, true);
    }

    _renderRow = (rowData,index) => {
        TLog("_renderRow----"+index,rowData);
        let {appModel} = this.props;
        return (<TouchableOpacity onPress={() => this.itemClick(rowData)}>
                <View style={styles.row}>
                    <View style={[styles.itemContentStyle,{flex:3}]}>
                        <Text style={[styles.textItemStyle,{fontSize:12}]}> 开始: {rowData.begin_date}</Text>
                        <Text style={[styles.textItemStyle,{fontSize:12}]}> 结束: {rowData.end_date}</Text>
                    </View>
                    <View style={[styles.itemContentStyle,{flex:4}]}>
                        <View>
                        <Text style={[styles.textItemStyle,{fontSize:12}]}> 比例: {rowData.rate}%</Text>
                        <Text style={[styles.textItemStyle,{fontSize:12}]}> 金额: {rowData.bonus}</Text>
                        </View>
                    </View>
                    <View style={[styles.itemContentStyle,{flex:2}]}>
                            <Text style={[styles.textItemStyle,{fontSize:14, color:"red", fontWeight:"bold"}]}> {appModel.getAWithdrawStatus(rowData.draw_status)}</Text>
                            <Text style={[styles.textItemStyle,{fontSize:12,fontWeight:"bold",color:rowData.status ? "green":'red'}]}> {rowData.status ? "已领取":"未领取"}</Text>
                    </View>
                    <View style={[styles.itemContentStyle,{flex: 1}]}>
                        <TAIco name={"angle-right"}
                               style={{fontSize: 25, paddingTop:2, alignSelf: "center", color: "gray"}}/>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    itemClick = (data) => {
        G_NavUtil.push(G_RoutConfig.RecordAssignDetailView,{data,...this.props},"分红详情");
    }

    clickMenuItem = (data, listType) => {
        switch (listType) {
            case MenuListType.TimeList:
                this.setState({curTime: data, dataList: []}, () => {
                    this.loadMore(null, 1)
                });
                break;
            case MenuListType.GameList: //重新选择了游戏 需要重制游戏类型
                this.setState({curGame: data, curPlay: null, dataList: []}, () => {
                    this.loadMore(null, 1)
                });
                break;
            case MenuListType.PlayList:
                this.setState({curPlay: data, dataList: []}, () => {
                    this.loadMore(null, 1)
                });
                break;
        }
    }

    loadMore = (callBack, isFlush) => {
        HTTP_SERVER.RECORD_ASSIGN_MONEY.body.bought_at_from = this.state.curTime ? this.state.curTime.date : "";
        HTTP_SERVER.RECORD_ASSIGN_MONEY.body.bought_at_to = ""
        HTTP_SERVER.RECORD_ASSIGN_MONEY.body.lottery_id = this.state.curGame ? this.state.curGame.id : "";
        HTTP_SERVER.RECORD_ASSIGN_MONEY.body.way_group_id = this.state.curPlay ? this.state.curPlay.id : "";
        if (isFlush) {
            HTTP_SERVER.RECORD_ASSIGN_MONEY.body.page = 1;
        }
        else {
            HTTP_SERVER.RECORD_ASSIGN_MONEY.body.page += 1;
        }
        ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.RECORD_ASSIGN_MONEY, (result) => {
            if (callBack) {
                callBack()
            }
            if(result.data.datas.data) {

                let arr = G_ArrayUtils.addComapreCopy(this.state.dataList, result.data.datas.data)
                this.setState({dataList: arr,
                    curPage:result.data.datas.current_page,
                    totalPage:result.data.datas.last_page,});
            }
        }, false);

    }
}

const styles = StyleSheet.create({
    itemContentStyle: {
        flex: 1,
        justifyContent: "center",
        alignItems:"center"
    },
    desc:{
        fontSize: 12,color:"gray", marginTop:5    },
    textItemStyle: {
        fontSize: 13,
    },
    row: {
        flexDirection: 'row',
        height: 50,
        borderBottomWidth:0.5,
        marginLeft:10,
        borderColor: "gray",
    },
});
