import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Alert,
    TouchableWithoutFeedback
} from 'react-native';
import BaseView from "../../../../componet/BaseView";
import {GAME_DERAIL, HeaderMenuTitleView} from "../../../../componet/navBarMenu/HeaderMenu";
import HeadMenuListView from "./HeadMenuListView";
import MoreMenu from "../../../../componet/MoreMenu";
import BannerView from "./BannerView";

export default class BaseGameView extends BaseView {
    constructor(props) {
        super(props);
        const {series_id, playModel} = this.props.passProps;
        this.firstMenu = playModel.getPlayByGid(series_id).arrayList;
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
    }

    getNavigationBarProps() {
        const {id, gameModel} = this.props.passProps;
        let gameName = gameModel.getGameNameById(id);
        if (this.state.selectItem) {
            gameName = gameName + "-" + this.state.selectItem.name;
        }
        return {
            titleView: HeaderMenuTitleView,
            title: gameName,
            rightView: GAME_DERAIL
        };
    }

    onRightPressed() {
        this.refs.moreMenu.toggle();
    }

    onHeadPressed() {
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
            <View style={GlobeStyle.appContentView}>
                <HeadMenuListView selectItem={this.state.selectItem} onHeadPressed={this.onHeadPressed}
                                  menuDataList={this.firstMenu} isShowMenu={this.state.isShowMenu}
                                  clickMenuItem={this.clickMenuItem} rootStyle={styles.firstMenuContain}/>
                <BannerView dateHistoryList={this.state.history_lotterys} time={dim} prize={currentGameWay.prize} series_id={series_id}  currentNumber={currentNumber}/>
                {subView}
                <MoreMenu
                    ref="moreMenu"
                    menus={menuDataList}
                    contentStyle={{right: 20}}
                    onMoreMenuSelect={this.onMoreMenuSelect}
                    buttonRect={{x: GlobelTheme.screenWidth - 60, y: -50, width: 40, height: 40}}
                />
            </View>
        ) : null
    }


    componentDidMount() {
        this.requetGameData();
    }

    componentWillUnmount() {
        clearInterval(this.timeId);
    }

    requetGameData = () => {
        const {series_id} = this.props.passProps
        HTTP_SERVER.GET_GAME_DETAIL.url = HTTP_SERVER.GET_GAME_DETAIL.formatUrl.replace(/#id/g, series_id);
        ActDispatch.FetchAct.fetchVoWithAction(HTTP_SERVER.GET_GAME_DETAIL, ActionType.GameType.SET_GAMECONFIG, data => {
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
                // requestGameStatus: 3
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
        }, false);
    }

    //倒计时显示
    countTime = () => {
        let dim = (this.state.currentNumberTime - this.state.currentTime);
        if (dim > 0) {
            this.setState({currentTime: this.state.currentTime + 1})
        }
        else {
            clearInterval(this.timeId);
            ActDispatch.AppAct.showBox(`当前第${this.state.currentNumber}期已经结束，获取下一期数据`);
            this.requetGameData();
        }
    }

    clickMenuItem = (data) => {
        const {gameMethodHash, isRequestGameWay, currentGameWay} = this.state;
        const {series_id} = this.props.passProps;
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
                    HTTP_SERVER.GET_GAME_WAY.url = HTTP_SERVER.GET_GAME_WAY.formatUrl.replace(/#id/g, series_id).replace(/#way_id/g, data.id)
                    ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.GET_GAME_WAY, d => {
                        const pd = d.data;
                        gameMethodHash[pd.id] = pd;
                        this.setState({
                            currentGameWay: pd,
                            gameMethodHash: gameMethodHash,
                            isShowMenu: false,
                            isRequestGameWay: false,
                            selectItem: data
                        });
                    }, false);
                }
            }
        }
    }

    getMoreMenuData() {
        return [{name: "玩法说明", key: 1}, {name: "趋势图", key: 2}, {name: "近期开奖", key: 3}];
    }

    onMoreMenuSelect(data) {
        const {currentGameWay} = this.state;
        switch (data.key) {
            case 1:
                const gameName = currentGameWay.parent_parent_name_cn + currentGameWay.name_cn;
                const gameContent = `玩法说明:${currentGameWay.bonus_note}\n 玩法奖金:${moneyFormat(currentGameWay.prize)}`;
                Alert.alert(
                    `${gameName}玩法说明`,
                    gameContent,
                    [
                        {text: '知道了'},
                    ]
                )
                break;
            case 2:
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
    touchTabButton: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    firstMenuContain: {
        position: "absolute",
        zIndex: 6,
        width: GlobelTheme.screenWidth,
        height: GlobelTheme.screenHeight - GlobelTheme.NavigatorHeadH,
    },
});