import React from 'react';
import {
    View,
    Text, StyleSheet,
    TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import AIcon from 'react-native-vector-icons/FontAwesome';
import BaseView from "../../../componet/BaseView";
import BetRecordListView from "./record/BetRecordListView";


const ListType = {
    GameList: "33",
    PlayList: "22",
    TimeList: "11",
    Won:'3',
    Process:'0',
    Canceled:"1",
    UnPrize:"2",
    All:'',
}

const mapStateToProps = state => {
    return {
        gameModel: state.get("appState").get("gameModel"),
        playModel: state.get("appState").get("playModel"),
        appModel: state.get("appState").get("appModel"),
    }
}

@connect(mapStateToProps)
export default class RecordBetView extends BaseView {
    constructor(props) {
        super(props);
        let now = new Date();
        let lastWeekTime = G_DateUtil.formatRecodData(new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000));
        let lastMonth = G_DateUtil.formatRecodData(new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000));
        let lastTowMonth = G_DateUtil.formatRecodData(new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000));
        this.state = {
            status:ListType.All,
            curGame: null,
            curPlay: null,
            curTime: null,
            dataList: [],
            timeList: [{name: "全部时间", date: ""}, {name: "最近一周", date: lastWeekTime}, {
                name: "最近一个月",
                date: lastMonth
            }, {name: "最近二个月", date: lastTowMonth}],
            curClickType: "",
        }
    }

    renderBody() {
        let {gameModel, playModel} = this.props;
        let gameList = [{name: "全部彩种", id: "", series_id: ""}].concat(gameModel.gameInfoList)
        let playList = [{name: "全部玩法", id: ""}];
        if (this.state.curGame) {
            let mod = playModel.getPlayByGid(this.state.curGame.series_id)
            if (mod) {
                playList= playList.concat(mod.arrayList)
            }
        }
        let gameBtnName = this.state.curGame ? this.state.curGame.name : gameList[0].name;
        let playBtnName = this.state.curPlay ? this.state.curPlay.name : playList[0].name;
        let timeBtnName = this.state.curTime ? this.state.curTime.name : this.state.timeList[0].name;

        let gameView = this.state.curClickType == ListType.GameList ? this.menuView(gameList, ListType.GameList, gameBtnName) : null;
        let timeView = this.state.curClickType == ListType.TimeList ? this.menuView(this.state.timeList, ListType.TimeList, timeBtnName) : null;
        let playView = this.state.curClickType == ListType.PlayList ? this.menuView(playList, ListType.PlayList, playBtnName) : null;

        let gameStyle = this.state.curClickType == ListType.GameList ? {
            borderBottomWidth: 1,
            borderBottomColor: G_Theme.primary
        } : null;
        let playStyle = this.state.curClickType == ListType.PlayList ? {
            borderBottomWidth: 1,
            borderBottomColor: G_Theme.primary
        } : null;
        let timeStyle = this.state.curClickType == ListType.TimeList ? {
            borderBottomWidth: 1,
            borderBottomColor: G_Theme.primary
        } : null;
        return (
            <View style={G_Style.appContentView}>
                <View
                    style={{
                        flexDirection: "row",
                        height: 35,
                        borderBottomColor: G_Theme.gray, borderBottomWidth: 1
                    }}>
                    <TouchableOpacity style={[styles.touchTabButton, gameStyle]}
                                      onPress={() => this.onPressMenu(ListType.GameList)}
                    >
                        <View style={{flexDirection: "row"}}>
                            <Text
                                style={{color: !gameView ? G_Theme.black : G_Theme.primary}}>{gameBtnName}</Text>
                            <AIcon name={G_EnumFontNames.list_arrow_desc}
                                   style={{
                                       color: !gameView ? G_Theme.black : G_Theme.primary,
                                       fontSize: 15,
                                       marginLeft: 5,
                                       top: -3
                                   }}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.touchTabButton, playStyle]}
                                      onPress={() => this.onPressMenu(ListType.PlayList)}
                    >
                        <View style={{flexDirection: "row", alignItems: "center"}}>
                            <Text
                                style={{color: !playView ? G_Theme.black : G_Theme.primary}}>{playBtnName}</Text>
                            <AIcon name={G_EnumFontNames.list_arrow_desc}
                                   style={{
                                       color: !playView ? G_Theme.black : G_Theme.primary,
                                       fontSize: 15,
                                       marginLeft: 5,
                                       top: -3
                                   }}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.touchTabButton, timeStyle]}
                                      onPress={() => this.onPressMenu(ListType.TimeList)}
                    >
                        <View style={{flexDirection: "row"}}>
                            <Text
                                style={{color: !timeView ? G_Theme.black : G_Theme.primary}}>{timeBtnName}</Text>
                            <AIcon name={G_EnumFontNames.list_arrow_desc}
                                   style={{
                                       color: !timeView ? G_Theme.black : G_Theme.primary,
                                       fontSize: 15,
                                       marginLeft: 5,
                                       top: -3
                                   }}/>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{
                        flexDirection: "row",
                        height: 35,
                    backgroundColor:'#fff',

                        borderColor: G_Theme.gray, borderBottomWidth: 1
                    }}>
                    <TouchableOpacity style={[styles.touchTabButton, timeStyle,styles.searchTab,this.state.status==ListType.All?styles.selectedSearch:null,]}
                                      onPress={() => this.clickMenuItem([], ListType.All)}>
                        <Text style={[this.state.status==ListType.All?styles.selectedText:null,{fontSize:16}]}>全部</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.touchTabButton, timeStyle,styles.searchTab,this.state.status==ListType.Process?styles.selectedSearch:null]}
                                      onPress={() => this.clickMenuItem([], ListType.Process)}>
                        <Text style={[this.state.status==ListType.Process?styles.selectedText:null,{fontSize:16}]}>待开奖</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.touchTabButton, timeStyle,styles.searchTab,this.state.status==ListType.Won?styles.selectedSearch:null]}
                                      onPress={() => this.clickMenuItem([], ListType.Won)}>
                        <Text style={[this.state.status==ListType.Won?styles.selectedText:null,{fontSize:16}]}>已中奖</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.touchTabButton, timeStyle,styles.searchTab,this.state.status==ListType.UnPrize?styles.selectedSearch:null]}
                                      onPress={() => this.clickMenuItem([], ListType.UnPrize)}>
                        <Text style={[this.state.status==ListType.UnPrize?styles.selectedText:null,{fontSize:16}]}>未中奖</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.touchTabButton, timeStyle,styles.searchTab,this.state.status==ListType.Canceled?styles.selectedSearch:null]}
                                      onPress={() => this.clickMenuItem([], ListType.Canceled)}>
                        <Text style={[this.state.status==ListType.Canceled?styles.selectedText:null,{fontSize:16}]}>已撤单</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 1, backgroundColor: "yellow"}}>
                    <BetRecordListView  dataList={this.state.dataList}
                                       loadMore={this.loadMore} {...this.props}/>
                </View>
                <View style={{position: "absolute", zIndex: 6, top: 35}}>
                    {gameView}
                    {playView}
                    {timeView}
                </View>
            </View>
        );
    }

    onForceFlushData (data){
        TLog("onForceFlushData----",)
        this.clickMenuItem([],this.state.status)
    }

    componentDidMount() {
            this.loadMore(null, true);
    }

    componentWillUnmount(){
        ActDispatch.FetchAct.canCelVoFetch(HTTP_SERVER.BET_RECODE);
    }

    onPressMenu = (btnType) => {
        if (this.state.curClickType == btnType) {
            this.setState({curClickType: ""});
        }
        else {
            this.setState({curClickType: btnType});
        }
    }

    menuView = (data, listType, btnName) => {
        if (data) {
            return (
                <View
                    style={{
                        flexDirection: "row",
                        width: G_Theme.windowWidth,
                        flexWrap: "wrap",
                        backgroundColor: "#ddd",
                        alignItems: "center"
                    }}>
                    {
                        data.map((item, i) => {
                            let selectColor = G_Theme.grayDeep;
                            if (btnName == item.name) {
                                selectColor = G_Theme.primary;
                            }
                            return (<TouchableOpacity key={"menuView" + i}
                                                        style={{
                                                            paddingHorizontal: 10,
                                                            paddingVertical: 6,
                                                            width: G_Theme.windowWidth / 3,
                                                            height: 35
                                                        }}
                                                        onPress={() => this.clickMenuItem(item, listType)}>
                                <View
                                    style={{
                                        backgroundColor: "#fff",
                                        flex: 1,
                                        borderWidth: 1,
                                        alignItems: "center",
                                        justifyContent: "center",
                                        borderRadius: 5,
                                        borderColor: selectColor
                                    }}>
                                    <Text
                                        style={{
                                            fontWeight: "bold",
                                            fontSize: 12,
                                            color: selectColor
                                        }}>{item.name}</Text>
                                </View>
                            </TouchableOpacity>)
                        })
                    }
                </View>
            )
        }
        else {
            return null
        }
    }

    clickMenuItem = (data, listType) => {
        switch (listType) {
            case ListType.TimeList:
                this.setState({curClickType: "", curTime: data,dataList: []}, () => {
                    this.loadMore(null, 1)
                });
                break;
            case ListType.GameList: //重新选择了游戏 需要重制游戏类型
                this.setState({curClickType: "", curGame: data, curPlay: null,dataList: []}, () => {
                    this.loadMore(null, 1)
                });
                break;
            case ListType.PlayList:
                this.setState({curClickType: "", curPlay: data,dataList: []}, () => {
                    this.loadMore(null, 1)
                });
                break;
            case ListType.All:
            case ListType.Won:
            case ListType.Process:
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
            this.setState({dataList: arr});
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
    textHeadStyle: {
        fontSize: 16,
        fontWeight: "bold"
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
