import React from 'react';
import {
    View,
    StyleSheet,
    Text, TouchableOpacity
} from 'react-native';
import BaseView from "../../../../componet/BaseView";
import {NavButtonAIco} from "../../../../componet/navBarMenu/HeaderMenu";
import HeadMenuListView from "./HeadMenuListView";
import MoreMenu from "../../../../componet/MoreMenu";
import BannerView from "./BannerView";
import AIcon from 'react-native-vector-icons/FontAwesome';
import LotteryOrders from "./LotteryOrders";

export default class BaseGameView extends BaseView {

    static navigationOptionsGame = ({navigation}) => {
        let {onHeadPressed, gameTitle} = navigation.state.params
        return {
            headerTitle: onHeadPressed && gameTitle ?
                <TouchableOpacity style={{alignSelf: "center"}} onPress={() => onHeadPressed()}>
                    <View style={[{flexDirection: "row"}]}>
                        <Text key={'title'} style={styles.title}>{gameTitle}</Text>
                        <AIcon color="white" style={{marginLeft: 5}} size={16}
                               name={G_EnumFontNames.list_arrow_desc}/>
                    </View>
                </TouchableOpacity> : null,
            headerRight: <NavButtonAIco navigation={navigation} icoName={G_EnumFontNames.bars} isRightButton={true}/>
        }
    }

    static  mapStateToProps = state => {
        return {
            //balls: newBalls,
            orderNum: state.get("gameState").get("orderList").count(),
            moneyUnit: state.get("gameState").get("moneyUnit"), //金额模式
            multiple: state.get("gameState").get("multiple"), //倍数
            orderList: state.get("gameState").get("orderList"),
            orderListNum: state.get("gameState").get("orderList").count(),
            balance:state.get("appState").get("moneyBalance"),
            prize: state.get("gameState").get("prize"), //奖金组
            gameId: state.get("gameState").get("gameId"),
            //balls: newBalls,
            lottorState:state.get("gameState").get("lottorState").toJS(), //够彩篮
        }
    }


    constructor(props) {
        super(props);
        this.gameMenu = this.getGameWays();
        const {name} = this.props.navigation.state.params;
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
            gName:name,
        }
        this.onRenderSubView = this.onRenderSubView.bind(this);
        this.getMoreMenuData = this.getMoreMenuData.bind(this);
        this.onMoreMenuSelect = this.onMoreMenuSelect.bind(this)
        this.getGameTitle = this.getGameTitle.bind(this);
        this.getGameWays = this.getGameWays.bind(this);
        this.canViewShow=true;
    }

    getGameTitle() {
        const {name} = this.props.navigation.state.params;
        const {currentGameWay} = this.state;
        this.gameName = name;
        let gameName = name;
        if (this.state.selectItem) {
            if (currentGameWay.parent_parent_name_cn) {
                gameName = "[" + currentGameWay.parent_parent_name_cn + "]-" + this.state.selectItem.name_cn;
            }
            else {

                gameName = "[" + name + "]-" + this.state.selectItem.name_cn;
            }
        }
        return gameName;
    }

    getGameWays() {
        const {series_id, playModel} = this.props.navigation.state.params;
        let list = playModel.getPlayByGid(series_id).arrayList;
        return list;
    }

    onRightPressed = () => {
        if(this.canViewShow){
            this.canViewShow=false;
            if (this.refs.moreMenu) {
                this.refs.moreMenu.toggle();
            }
            setTimeout(()=>this.canViewShow=true,1000)
        }

    }

    onHeadPressed = () => {
        TLog("onHeadPressed-----",this.state.isShowMenu)
        this.setState({isShowMenu: !this.state.isShowMenu});
    }


    renderBody() {
        const {currentGameWay, defaultMethodId} = this.state;
        const {series_id} = this.props.navigation.state.params;
        let {lottorState}=this.props;
        let subView = this.state.selectItem ? this.onRenderSubView(this.state.selectItem) : null;
        let menuDataList = this.getMoreMenuData();
        const {moneyUnit,prize} = this.props;

        let maxGrounp = currentGameWay['max_group'],
            fullPrize = currentGameWay['full_prize'],
            price = 0;

        if(prize) {
            if( series_id == 1 || series_id == 3) { //时时彩,3d
                price = prize / 2000 * fullPrize;
                if(maxGrounp < 1960) {
                    price = maxGrounp / 1960 * price;
                }
            }
            else { // 2/4/6/7
                price = fullPrize * (prize - 1960 + maxGrounp) / 2000;
            }
        }

        price = price * moneyUnit;
        return (defaultMethodId > 0) ? (
            <View style={G_Style.appContentView}>
                <BannerView
                    {...this.state}
                    dateHistoryList={this.state.history_lotterys}
                    prize={price}
                    series_id={series_id} onTimeHanlde={this.requetGameData}/>
                 {lottorState.show ? <LotteryOrders prize={price} {...this.props} {...lottorState}/> :subView}
                <MoreMenu
                    ref="moreMenu"
                    menus={menuDataList}
                    contentStyle={{right: 20}}
                    onMoreMenuSelect={this.onMoreMenuSelect}
                    buttonRect={{x: G_Theme.windowWidth - 60, y: -50, width: 40, height: 40}}
                    />
                {this.state.isShowMenu &&
                <HeadMenuListView selectItem={this.state.selectItem} onHeadPressed={this.onHeadPressed}
                                  menuDataList={this.gameMenu}
                                  clickMenuItem={this.clickMenuItem} rootStyle={styles.firstMenuContain}/>}
            </View>
        ) : null
    }

    componentDidMount() {
        const {id} = this.props.navigation.state.params;
        let {gameId}= this.props
        this.requetGameData();
        if(gameId!=id){
            ActDispatch.GameAct.delOrder();
        }
        HttpUtil.flushMoneyBalance();
    }

    componentWillUnmount() {
        ActDispatch.GameAct.lottoryState({show:false})
        ActDispatch.FetchAct.canCelVoFetch(HTTP_SERVER.GET_GAME_DETAIL);
    }

    requetGameData = () => {
        const {id} = this.props.navigation.state.params;
        ActDispatch.GameAct.lottoryState({show:false})
        HTTP_SERVER.GET_GAME_DETAIL.url = HTTP_SERVER.GET_GAME_DETAIL.formatUrl.replace(/#id/g, id);
            ActDispatch.FetchAct.fetchVoWithAction(HTTP_SERVER.GET_GAME_DETAIL, ActionType.GameType.SET_GAMECONFIG, data => {
                if (data.isSuccess) {
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
                        history_lotterys: pd.history_lotterys.split("-"),
                    });
                    if (!this.state.selectItem && pd.defaultMethodId) {
                        const defaultGame = {"id": pd.defaultMethodId + '', "name_cn": pd.defaultMethod_cn}
                        this.clickMenuItem(defaultGame);
                    }
                } else {
                    ActDispatch.AppAct.showErrorBox("当前游戏获取数据出错，请稍后再尝试");
                }

            }, false, true);
    }


    clickMenuItem = (data) => {
        //  TLog("clickMenuItem--", data);
        const {gameMethodHash, isRequestGameWay, currentGameWay} = this.state;
        const {id, playModel} = this.props.navigation.state.params;
        if (currentGameWay.id != data.id) {
            if (gameMethodHash[data.id]) {
                this.setState({
                    isShowMenu: false,
                    selectItem: data,
                    currentGameWay: gameMethodHash[data.id]
                }, () => {
                    this.props.navigation.setParams({gameTitle: this.getGameTitle()})
                    ActDispatch.GameAct.lottoryState({show:false})
                });
            }
            else {
                if (!isRequestGameWay) {
                    this.setState({isRequestGameWay: true});
                    HTTP_SERVER.GET_GAME_WAY.url = HTTP_SERVER.GET_GAME_WAY.formatUrl.replace(/#id/g, id).replace(/#way_id/g, data.id)
                    ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.GET_GAME_WAY, d => {
                        const pd = d.data;
                        gameMethodHash[pd.id] = pd;
                        if (pd.name_cn ==null) {
                            data.name_cn = playModel.getWayNameById(data.id)
                        }
                        else{
                            data.name_cn =pd.name_cn
                        }
                        this.setState({
                            currentGameWay: pd,
                            gameMethodHash: gameMethodHash,
                            isShowMenu: false,
                            isRequestGameWay: false,
                            selectItem: data
                        }, () => {
                            this.props.navigation.setParams({gameTitle: this.getGameTitle()});
                            ActDispatch.GameAct.lottoryState({show:false})
                        });

                    });
                }
            }
        }
    }

    getMoreMenuData() {
        const {series_id} = this.props.navigation.state.params;
        switch (series_id)
        {
            case 4:
            case 6:
                return [{name: "玩法说明", key: 1},{name: "近期开奖", key: 3}];
                break;
            default:
                return [{name: "玩法说明", key: 1}, {name: "走势图", key: 2}, {name: "近期开奖", key: 3}];
                break;
        }

    }

    onMoreMenuSelect(data) {
        const {currentGameWay} = this.state;
        TLog("onMoreMenuSelect-----------",this.props.navigation.state.params)
        const {id, gameModel,series_id} = this.props.navigation.state.params;
        switch (data.key) {
            case 1:
                const gameName = currentGameWay.parent_parent_name_cn + "-" + currentGameWay.name_cn;
                const gameContent = `玩法说明:${currentGameWay.bonus_note}\n 玩法奖金:${G_moneyFormat(currentGameWay.prize)}`;
                G_AlertUtil.show(`${gameName}玩法说明`,
                    gameContent,
                    [
                        {text: '知道了'},
                    ])
                break;
            case 2:
                G_NavUtil.push(G_RoutConfig.TrendView,{
                    title: `${gameModel.getGameNameById(id)}-走势图`,
                    lotteryId: id,
                    series_id:series_id
                })
                break;
            case 3:
                G_NavUtil.push(G_RoutConfig.SSC_History,{lottery_name: this.gameName, lottery_id: id},this.gameName);
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
        color: "white",
        fontSize: 18,
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