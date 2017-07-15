import React from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Text
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
export default class RecordBackView extends BaseView {

    constructor(props) {
        super(props);
        this.state = {
            curGame: null,
            curPlay: null,
            curTime: null,
            dataList: []
        }
    }

    renderBody() {
        return (
            <View style={G_Style.appContentView}>
                <RecordMenuView clickMenuItem={this.clickMenuItem} {...this.props}/>
                <TFlatList styleView={{flex: 1, marginTop: 35}} renderRow={this._renderRow} dataList={this.state.dataList} loadMore={this.loadMore}/>
            </View>
        );
    }

    componentDidMount() {
        this.loadMore(null, true);
    }

    _renderRow = (rowData,index) => {
        TLog("_renderRow----",rowData);
        let {gameModel,appModel,playModel} = this.props;
        let gameName = gameModel.getGameNameById(rowData.lottery_id);
        let timeStr=G_DateUtil.formatSimpleItemDateString(rowData.created_at)
        let wayName=  playModel.getWayNameById(rowData.way_id);

       // let statusColor=rowData.status==1?G_Theme.grayDeep:G_Theme.primary;
        return (
            <TouchableOpacity onPress={() => this.itemClick(rowData)}>
                <View style={styles.row}>
                    <View style={[styles.itemContentStyle,{flex:2}]}>
                        <Text style={styles.textItemStyle}>{timeStr}</Text>
                    </View>
                    <View style={[styles.itemContentStyle,{flex:3}]}>
                        <Text style={[styles.textItemStyle,{fontSize:14}]}>{gameName}</Text>
                        <Text style={[styles.textItemStyle,{color:"gray", marginTop:5}]}>{wayName}</Text>
                    </View>
                    <View style={[styles.itemContentStyle,{flex:1}]}>
                        <Text style={[styles.textItemStyle,]} >{ appModel.getACoefficients(rowData.coefficient)}</Text>
                    </View>
                    <View style={[styles.itemContentStyle,{flex:3, alignItems:"center"}]}>
                        <Text style={[styles.textItemStyle,{fontSize:14,
                            fontWeight: 'bold',}]} >{rowData.amount}</Text>
                    </View>
                    <View style={[styles.itemContentStyle,{flex: 2 }]}>
                        <TAIco name={"angle-right"}
                               style={{fontSize: 25, paddingTop:2, alignSelf: "center", color: "gray"}}/>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    itemClick = (data) => {
      //  G_NavUtil.pushToView(G_NavViews.ChaseDeatilView({...data,title:"追号详情",...this.props}));
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
        HTTP_SERVER.RECORD_BACK_MONEY.body.bought_at_from = this.state.curTime ? this.state.curTime.date : "";
        HTTP_SERVER.RECORD_BACK_MONEY.body.bought_at_to = ""
        HTTP_SERVER.RECORD_BACK_MONEY.body.lottery_id = this.state.curGame ? this.state.curGame.id : "";
        HTTP_SERVER.RECORD_BACK_MONEY.body.way_group_id = this.state.curPlay ? this.state.curPlay.id : "";
        if (isFlush) {
            HTTP_SERVER.RECORD_BACK_MONEY.body.page = 1;
        }
        else {
            HTTP_SERVER.RECORD_BACK_MONEY.body.page += 1;
        }

        HTTP_SERVER.RECORD_BACK_MONEY.body.pagesize = 15;
        ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.RECORD_BACK_MONEY, (result) => {
            if (callBack) {
                callBack()
            }
            if(result.data.datas.data)
            {
                let arr = G_ArrayUtils.addComapreCopy(this.state.dataList, result.data.datas.data)
                this.setState({dataList: arr});
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
