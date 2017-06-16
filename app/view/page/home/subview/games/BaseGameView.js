import React from 'react';
import {
    View,
    StyleSheet,
    Text
} from 'react-native';
import BaseView from "../../../../componet/BaseView";
import {GAME_DERAIL} from "../../../../componet/navBarMenu/HeaderMenu";
import HeadMenuListView from "./HeadMenuListView";
import MoreMenu from "../../../../componet/MoreMenu";
import BannerView from "./BannerView";
import AIcon from 'react-native-vector-icons/FontAwesome';

export default class BaseGameView extends BaseView {

    constructor(props) {
        super(props);
        this.gameMenu = this.getGameWays();
        this.state = {
            bet_max_prize_group: null,
            bet_min_prize_group: null,
            user_prize_group: null,
            defaultMethodId: null,
            defaultMethod_cn: null,
            currentNumber: null,
            currentNumberTime: null,
            currentTime: null,
            gameNumbers: [],
            diff_grize_group: 1,
            noIssue: false,
            series_identifier: null,
            series_amount: 2000,
            traceMaxTimes: 1,
            history_lotterys: [],
            selectItem: null,
            isShowMenu: false,
            isRequestGameWay: false,
            // requestGameStatus: 1, //1=未开始,2=进行中,3=请求结束
            gameMethodHash: {},
            currentGameWay: {},
        }
        this.onRenderSubView = this.onRenderSubView.bind(this);
        this.getMoreMenuData = this.getMoreMenuData.bind(this);
        this.onMoreMenuSelect = this.onMoreMenuSelect.bind(this)
        this.getGameTitle=this.getGameTitle.bind(this);
        this.getGameWays=this.getGameWays.bind(this);
    }

    getNavigationBarProps() {
         this.gameName= this.getGameTitle();
        return {
            titleView: this.renderNavTitleView,
            rightView: GAME_DERAIL
        };
    }

    renderNavTitleView=()=>{
       return (<View style={[{flexDirection: "row"}]}>
            <Text key={'title'} style={styles.title}>{this.gameName}</Text>
            <AIcon color="white" style={{marginLeft: 5}} size={16} name={G_EnumFontNames.list_arrow_desc}/>
        </View>)
    }

    getGameTitle(){
        const {name} = this.props.passProps;

        const {currentGameWay} = this.state;
        let gameName = name;
        if (this.state.selectItem) {
            if(currentGameWay.parent_parent_name_cn)
            {
                gameName = "["+currentGameWay.parent_parent_name_cn +"]-" +this.state.selectItem.name;
            }
            else{
                gameName = "["+name +"]-" +this.state.selectItem.name;
            }
        }
        return gameName;
    }

    getGameWays()
    {
         const {series_id, playModel} = this.props.passProps;
         let list= playModel.getPlayByGid(series_id).arrayList
             TLog("getGameWays----",list)
         return list;
    }

    onRightPressed=()=>{
        if(this.refs.moreMenu)
        {
            this.refs.moreMenu.toggle();
        }
    }

    onHeadPressed=()=>{
        this.setState({isShowMenu: !this.state.isShowMenu});
    }

    renderBody() {
        const {currentGameWay, currentNumber, defaultMethodId} = this.state;
        const {series_id} = this.props.passProps
        let subView = this.state.selectItem ? this.onRenderSubView(this.state.selectItem) : null;
        let dim = (this.state.currentNumberTime - this.state.currentTime) * 1000;
        dim = dim > 0 ? dim : 0;
        let menuDataList = this.getMoreMenuData();
        return (defaultMethodId > 0) ? (
            <View style={G_Style.appContentView}>
                <BannerView dateHistoryList={this.state.history_lotterys} time={dim} prize={currentGameWay.prize} series_id={series_id}  currentNumber={currentNumber}/>
                {subView}
                <MoreMenu
                    ref="moreMenu"
                    menus={menuDataList}
                    contentStyle={{right: 20}}
                    onMoreMenuSelect={this.onMoreMenuSelect}
                    buttonRect={{x: G_Theme.windowWidth - 60, y: -50, width: 40, height: 40}}
                />
                {this.state.isShowMenu&&<HeadMenuListView selectItem={this.state.selectItem} onHeadPressed={this.onHeadPressed}
                                                          menuDataList={this.gameMenu}
                                                          clickMenuItem={this.clickMenuItem} rootStyle={styles.firstMenuContain}/>}
            </View>
        ) : null
    }


    componentDidMount() {
        this.requetGameData();
       // HttpUtil.flushMoneyBalance();
    }

    componentWillUnmount() {
        clearInterval(this.timeId);
    }

    requetGameData = () => {
        const {id} = this.props.passProps
        HTTP_SERVER.GET_GAME_DETAIL.url = HTTP_SERVER.GET_GAME_DETAIL.formatUrl.replace(/#id/g, id);
        G_RunAfterInteractions(()=>{
            ActDispatch.FetchAct.fetchVoWithAction(HTTP_SERVER.GET_GAME_DETAIL, ActionType.GameType.SET_GAMECONFIG, data => {
                if(`${data.isSuccess}`!="404")
                {
                    const pd = data.data;
                    this.setState({
                        bet_max_prize_group: parseInt(pd.bet_max_prize_group),
                        bet_min_prize_group: parseInt(pd.bet_min_prize_group),
                        user_prize_group: parseInt(pd.user_prize_group),
                        defaultMethod_cn: pd.defaultMethod_cn,
                        defaultMethodId: pd.defaultMethodId,
                        currentNumber: pd.currentNumber,
                        currentNumberTime: pd.currentNumberTime,
                        currentTime: pd.currentTime,
                        gameNumbers: pd.gameNumbers,
                        diff_grize_group: parseInt(pd.diff_grize_group),
                        noIssue: pd.noIssue,
                        series_identifier: pd.series_identifier,
                        series_amount: pd.series_amount,
                        traceMaxTimes: pd.traceMaxTimes,
                        history_lotterys: pd.history_lotterys.split(","),
                    });
                    let dim = (this.state.currentNumberTime - this.state.currentTime);
                    clearInterval(this.timeId);
                    if (dim > 0) {
                        this.timeId = setInterval(this.countTime, 1000);
                    }
                    //const {defaultMethodId} = this.state;
                    if (!this.state.selectItem && pd.defaultMethodId) {
                        const defaultGame = {"id": pd.defaultMethodId + '', "name": pd.defaultMethod_cn}
                        this.clickMenuItem(defaultGame);
                    }
                }else {
                    G_AlertUtil.showWithDestructive("","当前游戏获取数据出错，请稍后再尝试",[{text:"返回大厅",onPress:()=>{G_NavUtil.pop()}},{text:"了解"}])
                }

            },false,true);
        })
    }

    //倒计时显示
    countTime = () => {
        let dim = (this.state.currentNumberTime - this.state.currentTime);
        if (dim > 0) {
            this.setState({currentTime: this.state.currentTime + 1})
        }
        else {
            clearInterval(this.timeId);
            ActDispatch.AppAct.showBox(`当前第${this.state.currentNumber}期已经结束，新一期即将开始!`);
            this.requetGameData();
        }
    }

    clickMenuItem = (data) => {
        const {gameMethodHash, isRequestGameWay, currentGameWay} = this.state;
        const {id,playModel} = this.props.passProps;
        if (currentGameWay.id != data.id) {
            if (gameMethodHash[data.id]) {
                this.setState({
                    isShowMenu: false,
                    selectItem: data,
                    currentGameWay: gameMethodHash[data.id]
                });
            }
            else {
                if (!isRequestGameWay) {
                    this.setState({isRequestGameWay: true});
                    HTTP_SERVER.GET_GAME_WAY.url = HTTP_SERVER.GET_GAME_WAY.formatUrl.replace(/#id/g, id).replace(/#way_id/g, data.id)
                    ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.GET_GAME_WAY, d => {
                        const pd = d.data;
                        gameMethodHash[pd.id] = pd;
                        if(pd.name_cn)
                        {
                            data.name= pd.name_cn;
                        }
                        else {
                            data.name = playModel.getWayNameById(data.id)
                        }
                        this.setState({
                            currentGameWay: pd,
                            gameMethodHash: gameMethodHash,
                            isShowMenu: false,
                            isRequestGameWay: false,
                            selectItem: data
                        });
                    });
                }
            }
        }
    }

    getMoreMenuData() {
        return [{name: "玩法说明", key: 1}, {name: "走势图", key: 2}, {name: "近期开奖", key: 3}];
    }

    onMoreMenuSelect(data) {
        const {currentGameWay} = this.state;
        const {id, gameModel} = this.props.passProps;
        switch (data.key) {
            case 1:
                const gameName = currentGameWay.parent_parent_name_cn +"-"+ currentGameWay.name_cn;
                const gameContent = `玩法说明:${currentGameWay.bonus_note}\n 玩法奖金:${G_moneyFormat(currentGameWay.prize)}`;
                G_AlertUtil.show(`${gameName}玩法说明`,
                    gameContent,
                    [
                        {text: '知道了'},
                    ])
                break;
            case 2:
                G_NavUtil.pushToView(G_NavViews.TrendView({title:`${gameModel.getGameNameById(id)}-走势图`,lotteryId:id}))
                break;
            case 3:
                G_NavUtil.pushToView(G_NavViews.SSC_History({lottery_name:this.gameName,lottery_id:id}))
                break;
            default:
                break;
        }
    }

    onRenderSubView(data) {
        return null;
    }
}

const styles = StyleSheet.create({
    title: {
        color:"white",
        fontSize:18,
        fontWeight: "900",
        textAlign: 'center',
    },
    touchTabButton: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    firstMenuContain: {
        position: "absolute",
        zIndex: 6,
        width: G_Theme.windowWidth,
        height: G_Theme.windowHeight - G_Theme.navigatorHeadH,
    },
});