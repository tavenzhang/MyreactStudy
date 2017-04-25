import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Alert,
    TouchableHighlight,
    ListView
} from 'react-native';
import BaseView from "../../../../componet/BaseView";
import {HeaderMenuTitleView} from "../../../../componet/navBarMenu/HeaderMenu";
import AIcon from 'react-native-vector-icons/FontAwesome';

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
            gameNumbers:[],
            diff_grize_group: 1,
            noIssue: false,
            series_identifier: null,
            series_amount: 2000,
            traceMaxTimes: 1,
            history_lotterys: [],
            selectItem:null,
            isShowMenu: false,
            isRequestGameWay: false,
            requestGameStatus: 1, //1=未开始,2=进行中,3=请求结束
            gameMethodHash: {},
            currentGameWay: {},
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2,
            }),
        }
        this.onRenderSubView=this.onRenderSubView.bind(this);
    }

    //componentDidMount
    componentDidMount() {
        const me = this;
        const {series_id} = this.props.passProps;
        const { requestGameStatus } = this.state;

        if(requestGameStatus == 1) {
            this.setState({requestGameStatus:2});
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
                    history_lotterys: pd.history_lotterys,
                    requestGameStatus: 3
                });

                //const {defaultMethodId} = this.state;
                if(pd.defaultMethodId) {
                    const defaultGame = {"id":pd.defaultMethodId+'',"name":pd.defaultMethod_cn}
                    me.clickMenuItem(defaultGame);
                }

            }, false);
        }
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
            rightView : () => {
                return <AIcon name="info-circle" style={styles.barRightIcon} />
            }
        };
    }


    onRightPressed() {
        const {currentGameWay} = this.state;
        const gameName = currentGameWay.parent_parent_name_cn + currentGameWay.name_cn;
        const gameContent = `玩法说明:${currentGameWay.bonus_note}\n 玩法奖金:${moneyFormat(currentGameWay.prize)}`;
        Alert.alert(
            `${gameName}玩法说明`,
            gameContent,
            [
                {text: '知道了'},
            ]
        )
    }

    renderBody() {
        const {currentGameWay,currentNumber,requestGameStatus} = this.state;

        let ds = this.state.dataSource.cloneWithRows(this.firstMenu);
        let subView =this.state.selectItem ? this.onRenderSubView(this.state.selectItem):null;

        if(requestGameStatus == 3) {
            return (
                <View style={GlobeStyle.appContentView}>
                    {this.state.isShowMenu ? <View style={styles.firstMenuContain}>
                        <View style={{height: GlobelTheme.screenHeight * 2 / 3}}>
                            <ListView
                                dataSource={ds}
                                renderRow={this._renderRow}
                                style={{backgroundColor: "white"}}
                                />
                        </View></View> : null
                    }
                    <View style={styles.timeBanner}>
                        <View><Text style={styles.timeBannerText}>距第{currentNumber}期开奖:--:--</Text></View>
                        <View><Text style={styles.timeBannerText}>玩法奖金:{moneyFormat(currentGameWay.prize)}元</Text></View>
                    </View>
                    {subView}
                </View>
            );
        }
        else {
            return null;
        }
    }

    //componentDidMount() {
    //  //if(this.firstMenu[0]&&this.firstMenu[0].children[0])
    //  //{
    //  //    TLog('000999000000000',this.firstMenu[0].children[0]);
    //  //    this.clickMenuItem(this.firstMenu[0].children[0]);
    //  //}
    //    const {defaultMethodId} = this.state;
    //    if(defaultMethodId) {
    //        const defaultGame = {"id":defaultMethodId+'',"name":"默认玩法"}
    //        this.clickMenuItem(defaultGame);
    //    }
    //}


    _renderRow = (rowData) => {
       // TLog("rowData------", rowData);
        return (
            <View
                style={{flexDirection: "row", margin: 5, borderBottomWidth: 1}}>
                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                    <Text>{rowData.name}</Text>
                </View>
                <View style={{
                    flex: 5,
                    justifyContent: "flex-start",
                    alignItems: 'flex-start',
                    flexDirection: "row",
                    flexWrap: "wrap"
                }}>
                    {
                        rowData.children.map((item, index) => {
                            let selectItemStyle=null
                            if(this.state.selectItem&&this.state.selectItem==item)
                            {
                                selectItemStyle = {borderWidth:1, backgroundColor:"yellow"};
                            }
                            return (<TouchableHighlight key={index * 999}  onPress={() => this.clickMenuItem(item)}
                                                        underlayColor='rgba(10,10,10,0.2)'>
                                <View style={[{
                                    padding: 5,
                                    marginHorizontal: 5,
                                    marginBottom: 1
                                },selectItemStyle]}><Text>{item.name}</Text>
                                </View>
                            </TouchableHighlight>)
                        })
                    }
                </View>
            </View>
        );
    }


    clickMenuItem = (data) => {
        const me = this;
        const { gameMethodHash, isRequestGameWay, currentGameWay } = this.state;
        const {series_id} = this.props.passProps;

        if(currentGameWay.id != data.id) {
            if(gameMethodHash[data.id]) {
                this.setState({
                    isShowMenu: false,
                    selectItem:data,
                    currentGameWay: gameMethodHash[data.id]
                });
            }
            else {
                if(!isRequestGameWay) {
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
                            selectItem:data
                        });
                    }, false);
                }
            }
        }

    }

    onHeadPressed() {
            this.setState({isShowMenu: !this.state.isShowMenu});
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
        backgroundColor: GlobelTheme.halfAlpha
    },
    timeBanner:{
        flexDirection: 'row',
        justifyContent: "space-between",
        backgroundColor: '#ddd',
        padding: 5
    },
    timeBannerText:{
        fontSize: 12
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
        borderBottomColor: "#ddd",
        borderBottomWidth: 1,
    },
    barRightIcon: {
        color: '#fff',
        fontSize: 20
    }
});