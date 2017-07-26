import React,{PropTypes} from 'react';
import {
    View,
    Text, StyleSheet,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import AIcon from 'react-native-vector-icons/FontAwesome';
import LayoutAnimation from "react-native/Libraries/LayoutAnimation/LayoutAnimation";

export const MenuListType = {
    GameList: "点击彩种",
    PlayList: "点击玩法",
    TimeList: "点击时间",
    Won:'3',
    Process:'0',
    Canceled:"1",
    UnPrize:"2",
    All:'',
}

export default class RecordMenuView extends React.PureComponent {
    static propTypes={
        onPressMenu:PropTypes.func,
        clickMenuItem:PropTypes.func,
        isHideGame:PropTypes.bool,
        defaultGame:PropTypes.object
    }
    static defaultProps={
        isHideGame:false
    }

    constructor(props) {
        super(props);
        let now = new Date();
        let lastWeekTime = G_DateUtil.formatRecodData(new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000));
        let lastMonth = G_DateUtil.formatRecodData(new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000));
        let lastTowMonth = G_DateUtil.formatRecodData(new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000));
        let {defaultGame}=this.props
        this.state = {
            status:MenuListType.All,
            curGame: defaultGame ? defaultGame:null,
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

    componentWillUpdate() {
        LayoutAnimation.configureNext(G_LayoutAnimationHelp.springNoDelete);
    }

    render() {
        let {gameModel, playModel,isHideGame} = this.props;
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
        let gameView = this.state.curClickType == MenuListType.GameList ? this.menuView(gameList, MenuListType.GameList, gameBtnName) : null;
        let timeView = this.state.curClickType == MenuListType.TimeList ? this.menuView(this.state.timeList, MenuListType.TimeList, timeBtnName) : null;
        let playView = this.state.curClickType == MenuListType.PlayList ? this.menuView(playList, MenuListType.PlayList, playBtnName) : null;
        return (
            <View style={{position: "absolute", width:G_Theme.windowWidth ,zIndex: 112}}>
                <View
                    style={{flexDirection: "row",
                        height: 35,
                        borderBottomColor: G_Theme.gray, borderBottomWidth: 1
                    }}>
                    {!isHideGame ? <TouchableOpacity style={[styles.touchTabButton, gameView ? styles.tabSelectStyle:null]}
                                      onPress={() => this.onPressMenu(MenuListType.GameList)}
                    >
                        <View style={{flexDirection: "row"}}>
                            <Text style={{color: !gameView ? G_Theme.black : G_Theme.primary}}>{gameBtnName}</Text>
                            <AIcon name={G_EnumFontNames.list_arrow_desc}
                                   style={{
                                       color: !gameView ? G_Theme.black : G_Theme.primary,
                                       fontSize: 15,
                                       marginLeft: 5,
                                       top: -3
                                   }}/>
                        </View>
                    </TouchableOpacity>:null}
                    {!isHideGame ?  <TouchableOpacity style={[styles.touchTabButton, playView ? styles.tabSelectStyle:null]}
                                      onPress={() => this.onPressMenu(MenuListType.PlayList)}
                    >
                        <View style={{flexDirection: "row", alignItems: "center"}}>
                            <Text style={{color: !playView ? G_Theme.black : G_Theme.primary}}>{playBtnName}</Text>
                            <AIcon name={G_EnumFontNames.list_arrow_desc}
                                   style={{
                                       color: !playView ? G_Theme.black : G_Theme.primary,
                                       fontSize: 15,
                                       marginLeft: 5,
                                       top: -3
                                   }}/>
                        </View>
                    </TouchableOpacity>:null}
                    <TouchableOpacity style={[styles.touchTabButton, timeView? styles.tabSelectStyle:null]}
                                      onPress={() => this.onPressMenu(MenuListType.TimeList)}
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
                <View>
                    {gameView}
                    {playView}
                    {timeView}
                </View>
            </View>
        );
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
            <ScrollView style={{height:500}}>
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
                                                          paddingVertical: 2,
                                                          width: G_Theme.windowWidth / 3,
                                                          height: 30
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
            </ScrollView>)
        }
        else {
            return null
        }
    }

    clickMenuItem = (data, listType) => {
        TLog("clickMenuItem---------"+listType,data)
        let {clickMenuItem} = this.props;
        switch (listType) {
            case MenuListType.TimeList:
                this.setState({curClickType: "", curTime: data,dataList: []})
                break;
            case MenuListType.GameList: //重新选择了游戏 需要重制游戏类型
                this.setState({curClickType: "", curGame: data, curPlay: null,dataList: []});
                break;
            case MenuListType.PlayList:
                this.setState({curClickType: "", curPlay: data,dataList: []});
                break;
            case MenuListType.All:
            case MenuListType.Won:
            case MenuListType.Process:
            default:
                this.setState({status:listType,dataList: []});
        }
        if(clickMenuItem) {
            clickMenuItem(data,listType)
        }
    }
}


const styles = StyleSheet.create({
    tabSelectStyle:{
        borderBottomWidth: 1,
        borderBottomColor: G_Theme.primary
    },
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
