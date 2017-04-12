import React from 'react';
import {
    View,
    Text
    , StyleSheet,
    TouchableHighlight
} from 'react-native';
import BaseView from "../../../../componet/BaseView";
import {HeaderSD11Choose5} from "../../../../componet/navBarMenu/HeaderMenu";

export default class SD11Choose5 extends BaseView {

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
        let contentView = this.menuView(this.firstMenu, false, this.state.selectFirstMenu);
        let subView = this.menuView(this.state.subMenuList, true, this.state.selectSecondMenu);
        return (
            <View style={GlobeStyle.appContentView}>
                {this.state.isShowMenu ? <View style={styles.firstMenuContain}>
                    {contentView}
                </View> : null
                }
                {subView}
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