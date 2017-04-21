import React from 'react';
import {
    View,
    Text
    , StyleSheet,
    TouchableHighlight
} from 'react-native';

import {connect} from 'react-redux';
import BaseView from "../../../../componet/BaseView";
import {HeaderSD11Choose5} from "../../../../componet/navBarMenu/HeaderMenu";
import WuxingZhixuanFushi from "./SSC/WuxingZhixuanFushi";

const mapStateToProps = state => {
    const balls = state.get("gameState").get("balls").toArray();
    let newBalls = []
    balls.map((v,i) => {
        newBalls[i] = v.toArray();
    });
    return {
        balls: newBalls,
        orderNum: state.get("gameState").get("orderList").count(),
        moneyUnit: state.get("gameState").get("moneyUnit"), //金额模式
        multiple: state.get("gameState").get("multiple"), //倍数
        onePrice: state.get("gameState").get("onePrice"), //单价
        wayId: state.get("gameState").get("wayId"), //游戏id
        type: state.get("gameState").get("type"), //游戏类型
        title: state.get("gameState").get("title"), //游戏类型
        balance: 200000,
    }
}

class SD11Choose5 extends BaseView {

    constructor(props) {
        super(props);
        let {series_id, playModel} = this.props.passProps;
        this.firstMenu = playModel.getPlayByGid(series_id).arrayList;
        this.state = {
            subMenuList: [],
            selectFirstMenu: null,
            selectSecondMenu: null,
            firstMenuList: [],
            isShowMenu: false,
        }
    }

    getNavigationBarProps() {
        let {id, gameModel} = this.props.passProps;
        let gameName = gameModel.getGameNameById(id);
        if (this.state.selectFirstMenu) {
            gameName = gameName + "-" + this.state.selectFirstMenu.name;
        }
        return {titleView: HeaderSD11Choose5, title: gameName};
    }


    renderBody() {
        const me = this;
        let contentView = this.menuView(this.firstMenu, false, this.state.selectFirstMenu);
        let subView = this.menuView(this.state.subMenuList, true, this.state.selectSecondMenu);
        //{this.state.isShowMenu ? <View style={styles.firstMenuContain}>
        //    {contentView}
        //</View> : null
        //}
        //{subView}
        return (
            <View style={GlobeStyle.appContentView}>
                <WuxingZhixuanFushi {...this.props} />
            </View>
        );
    }

    componentDidMount() {
        this.setState({selectFirstMenu: this.firstMenu[0]});
        this.clickMenuItem(this.firstMenu[0], false);
    }

    menuView = (data, isSubMenu, selectItem) => {
        if (data) {
            return (
                <View
                    style={{
                        flexDirection: "row",
                        width: GlobelTheme.screenWidth,
                        flexWrap: "wrap",
                        backgroundColor: isSubMenu ? null : "#ddd",
                        alignItems: "center"
                    }}>
                    {
                        data.map((item, i) => {
                            let selectColor = GlobelTheme.gray
                            if(selectItem&&selectItem.name == item.name)
                            {
                                selectColor =  GlobelTheme.primary;
                            }
                            return (<TouchableHighlight key={"menuView" + i}
                                                        style={{
                                                            paddingHorizontal: 10,
                                                            paddingVertical: 6,
                                                            width: GlobelTheme.screenWidth / 3,
                                                            height: 35
                                                        }}
                                                        underlayColor='rgba(0,0,0,0)'
                                                        onPress={() => this.clickMenuItem(item, isSubMenu)}>
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
                            </TouchableHighlight>)
                        })
                    }
                </View>
            )
        }
        else {
            return null
        }
    }

    clickMenuItem = (data, isSubMenu: Boolean) => {
        this.setState({isShowMenu: false});
        if (isSubMenu) {
            this.setState({selectSecondMenu: data},this.onSelectSubView);
        }
        else {
            this.setState({subMenuList: data["children"], selectFirstMenu: data, selectSecondMenu:data["children"][0]},this.onSelectSubView);
        }
    }

    onHeadPressed() {
        TLog('onHeadPressed');
        if (!this.state.isShowMenu) {
            this.setState({isShowMenu: !this.state.isShowMenu});
        }
        else {
            this.setState({isShowMenu: !this.state.isShowMenu});
        }
    }

    onSelectSubView=()=>{
        TLog("onSelectSubView---------------",this.state.selectSecondMenu);
    }
}

export default connect(mapStateToProps)(SD11Choose5);

const styles = StyleSheet.create({
    touchTabButton: {
        flex: 1, alignItems: "center", justifyContent: "center",
    },
    firstMenuContain: {
        position: "absolute",
        zIndex: 6
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
});