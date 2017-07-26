import React from 'react';
import {
    View,
    Text, StyleSheet,
    TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import BaseView from "../../../componet/BaseView";
import BetRecordListView from "./record/BetRecordListView";
import RecordMenuView, {MenuListType} from "./record/RecordMenuView";



const mapStateToProps = state => {
    return {
        gameModel: state.get("appState").get("gameModel"),
        playModel: state.get("appState").get("playModel"),
        appModel: state.get("appState").get("appModel"),
        userData: state.get("appState").get("userData").toJS(),
        //userID: state.get("appState").get("userData").get("data").get("user_id"),
    }
}

@connect(mapStateToProps)
export default class RecordBetView extends BaseView {
    constructor(props) {
        super(props);
        this.state = {
            status:MenuListType.All,
            dataList:[],
            curPage:1,
            totalPage:1,
            curGame:null,
            curTime:null
        }
        this.registOnForceFlush(G_RoutConfig.RecordBetView,(data)=>{
            TLog("RecordBetView----",data)
            this.clickMenuItem([],this.state.status);
        })
    }

    renderBody() {
         let {userData,gameModel}=this.props
        let {gameId}=this.props.navigation.state.params;
         let defaultGame = gameModel.getGameDataById(gameId);
         TLog("gameId====="+gameId,defaultGame)
        return (
            <View style={G_Style.appContentView}>
                <View style={{
                        flexDirection: "row",
                        height: 30,
                       backgroundColor:'#fff',
                    marginTop: 36  }}>
                    <TouchableOpacity style={[styles.touchTabButton,styles.searchTab,this.state.status==MenuListType.All?styles.selectedSearch:null,]}
                                      onPress={() => this.clickMenuItem([], MenuListType.All)}>
                        <Text style={[this.state.status==MenuListType.All?styles.selectedText:null,{fontSize:14}]}>全部</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.touchTabButton,styles.searchTab,this.state.status==MenuListType.Process?styles.selectedSearch:null]}
                                      onPress={() => this.clickMenuItem([], MenuListType.Process)}>
                        <Text style={[this.state.status==MenuListType.Process?styles.selectedText:null,{fontSize:14}]}>待开奖</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.touchTabButton,styles.searchTab,this.state.status==MenuListType.Won?styles.selectedSearch:null]}
                                      onPress={() => this.clickMenuItem([], MenuListType.Won)}>
                        <Text style={[this.state.status==MenuListType.Won?styles.selectedText:null,{fontSize:14}]}>已中奖</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.touchTabButton,styles.searchTab,this.state.status==MenuListType.UnPrize?styles.selectedSearch:null]}
                                      onPress={() => this.clickMenuItem([], MenuListType.UnPrize)}>
                        <Text style={[this.state.status==MenuListType.UnPrize?styles.selectedText:null,{fontSize:14}]}>未中奖</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.touchTabButton,styles.searchTab,this.state.status==MenuListType.Canceled?styles.selectedSearch:null]}
                                      onPress={() => this.clickMenuItem([], MenuListType.Canceled)}>
                        <Text style={[this.state.status==MenuListType.Canceled?styles.selectedText:null,{fontSize:14}]}>已撤单</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 1, backgroundColor: "yellow"}}>
                    <BetRecordListView  userID={userData.data.user_id} curPage={this.state.curPage} totalPage={this.state.totalPage} dataList={this.state.dataList}
                                       loadMore={this.loadMore} {...this.props}/>
                </View>
                <RecordMenuView defaultGame={defaultGame} clickMenuItem={this.clickMenuItem} {...this.props}/>
            </View>
        );
    }


    componentDidMount() {
        TLog("componentDidMount-----Record");

        this.loadMore(null, true);
    }

    componentWillUnmount() {
        TLog("componentWillUnmount-----Record");
        ActDispatch.FetchAct.canCelVoFetch(HTTP_SERVER.BET_RECODE);
    }


    clickMenuItem = (data, listType) => {
        switch (listType) {
            case MenuListType.TimeList:
                this.setState({curClickType: "", curTime: data,dataList: []}, () => {
                    this.loadMore(null, 1)
                });
                break;
            case MenuListType.GameList: //重新选择了游戏 需要重制游戏类型
                this.setState({curClickType: "", curGame: data, curPlay: null,dataList: []}, () => {
                    this.loadMore(null, 1)
                });
                break;
            case MenuListType.PlayList:
                this.setState({curClickType: "", curPlay: data,dataList: []}, () => {
                    this.loadMore(null, 1)
                });
                break;
            case MenuListType.All:
            case MenuListType.Won:
            case MenuListType.Process:
            default:
                this.setState({status:listType,dataList: []}, () => {
                    this.loadMore(null, 1)
                });
        }
    }

    loadMore = (callBack, isFlush) => {
        HTTP_SERVER.BET_RECODE.body.bought_at_from = this.state.curTime ? this.state.curTime.date : "";
        HTTP_SERVER.BET_RECODE.body.bought_at_to = "";
        HTTP_SERVER.BET_RECODE.body.lottery_id = this.state.curGame ? this.state.curGame.id : "";
        HTTP_SERVER.BET_RECODE.body.status = this.state.status ? this.state.status : "";
        HTTP_SERVER.BET_RECODE.body.way_group_id = this.state.curPlay ? this.state.curPlay.id : "";
        if (isFlush) {
            HTTP_SERVER.BET_RECODE.body.page = 1;
        }
        else {
            HTTP_SERVER.BET_RECODE.body.page += 1;
        }
        HTTP_SERVER.BET_RECODE.body.pagesize = 15;
        ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.BET_RECODE, (result) => {
            if (callBack) {
                callBack()
            }
            this.lastMonth="";
            this.lastDay="";
            let arr = G_ArrayUtils.addComapreCopy(this.state.dataList,result.data.data);
            for(let item of arr)
            {

                let month = G_DateUtil.formatMonth(item.bought_at),
                    day = G_DateUtil.formatDay(item.bought_at);
                   item.month = '';
                   item.day = '';
                      if (this.lastMonth != month || this.lastDay != day) {
                          item.month=month;
                          item.day=day;
                          this.lastMonth = month;
                          this.lastDay = day;
                    }
            }
            this.setState({dataList: arr,curPage:result.data.current_page,totalPage:result.data.last_page});
        }, false);
    }
}


const styles = StyleSheet.create({
    touchTabButton: {
        flex: 1, alignItems: "center", justifyContent: "center",
    },
    itemHeadStyle: {
        flex: 1,
        alignItems: "center",
        borderRightWidth: 1,
        justifyContent: "center"
        // borderWidth: 1
    },
    itemContentStyle: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
        // borderWidth: 1
    },
    textItemStyle: {
        fontSize: 13,
    }, titleSyle: {
        fontWeight: "bold",
    },
    row: {
        flexDirection: 'row',
        height: 40,
        borderBottomColor: G_Theme.gray,
        borderBottomWidth: 1,
    },
    searchTab:{
        // borderRightWidth:1,
        borderColor:'#fff',
    },
    selectedSearch:{
        borderColor:G_Theme.primary,
        borderBottomWidth:2,
        backgroundColor:'#fff'
    },
    selectedText:{
        color:G_Theme.primary
    }

});
