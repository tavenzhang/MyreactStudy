import React from 'react';
import {
    View,
    Text
    , StyleSheet,
    TouchableHighlight,
    ListView
} from 'react-native';
import BaseView from "../../../../componet/BaseView";
import {HeaderMenuTitleView} from "../../../../componet/navBarMenu/HeaderMenu";

export default class BaseGameView extends BaseView {

    constructor(props) {
        super(props);
        let {series_id, playModel} = this.props.passProps;
        this.firstMenu = playModel.getPlayByGid(series_id).arrayList;
        this.state = {
            selectItem:null,
            isShowMenu: false,
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2,
            }),
        }
        this.onRenderSubView=this.onRenderSubView.bind(this)
    }

    getNavigationBarProps() {
        let {id, gameModel} = this.props.passProps;
        let gameName = gameModel.getGameNameById(id);
        if (this.state.selectItem) {
            gameName = gameName + "-" + this.state.selectItem.name;
        }
        return {titleView: HeaderMenuTitleView, title: gameName};
    }

    renderBody() {
        let ds = this.state.dataSource.cloneWithRows(this.firstMenu);
        let subView =this.state.selectItem ? this.onRenderSubView(this.state.selectItem):null;
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
                {subView}
            </View>
        );
    }

    componentDidMount() {
      if(this.firstMenu[0]&&this.firstMenu[0].children[0])
      {
          this.clickMenuItem(this.firstMenu[0].children[0]);
      }
    }


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
        this.setState({isShowMenu: false,selectItem:data});
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
        flex: 1, alignItems: "center", justifyContent: "center",
    },
    firstMenuContain: {
        position: "absolute",
        zIndex: 6,
        width: GlobelTheme.screenWidth,
        height: GlobelTheme.screenHeight - GlobelTheme.NavigatorHeadH,
        backgroundColor: GlobelTheme.halfAlpha
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