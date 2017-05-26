import React from 'react';
import {
    View,
    Text, StyleSheet,
    TouchableHighlight,
    LayoutAnimation,
    InteractionManager
} from 'react-native';

import {connect} from 'react-redux';
import BaseView from "../../../componet/BaseView";
import AwardListView from "../../../componet/BaseListView";


const mapStateToProps = state => {
    return {
        gameModel:state.get("appState").get("gameModel"),
    }
}

@connect(mapStateToProps)
export default class AwardRecordView extends BaseView {
    constructor(props) {
        super(props);
        this.state = {
            dataList: [],
        };
    }

    renderBody() {
        return (
            <View style={G_Style.appContentView}>
                <View style={styles.row}>
                    <View style={styles.itemHeadStyle}>
                        <Text style={styles.textHeadStyle}>游戏</Text>
                    </View>
                    <View style={styles.itemHeadStyle}>
                        <Text style={styles.textHeadStyle}>奖期</Text>
                    </View>
                    <View style={styles.itemHeadStyle}>
                        <Text style={styles.textHeadStyle}>投注</Text>
                    </View>
                    <View style={styles.itemHeadStyle}>
                        <Text style={styles.textHeadStyle}>奖金</Text>
                    </View>
                </View>
                <AwardListView dataList={this.state.dataList} loadMore={this._loadMore} renderRow={this._renderRow}/>
            </View>
        );
    }

    componentWillUpdate() {
        LayoutAnimation.configureNext(G_LayoutAnimationHelp.springNoDelete);
    }

    componentDidMount() {
        HTTP_SERVER.GET_BET_WIN.body.page = 1;
        HTTP_SERVER.GET_BET_WIN.body.pagesize = 15;
        InteractionManager.runAfterInteractions(() => {
            ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.GET_BET_WIN, (result) => {
                TLog("rowData------------------------------------",result.data);
                if (result.data.data) {
                    this.setState({dataList: result.data.data});
                }
            })
        });
    }

    _loadMore = (callFinishBack) => {
        HTTP_SERVER.GET_BET_WIN.body.page += 1;
        HTTP_SERVER.GET_BET_WIN.body.pagesize = 15;
        ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.GET_BET_WIN, (result) => {
            if (result.data.data) {
                let arr = this.state.dataList.concat(result.data.data);
                this.setState({dataList: arr})
            }
            if(callFinishBack)
            {
                callFinishBack();
            }
        })
    }

    _renderRow = (rowData,section) => {
        let {gameModel}=this.props;
        let gameName= gameModel.getGameNameById(rowData.lottery_id);
        return (
            <View>
                <TouchableHighlight onPress={() => this.itemClick(rowData)} underlayColor='rgba(10,10,10,0.2)'>
                    <View style={styles.row}>
                        <View style={styles.itemContentStyle}>
                            <Text style={styles.textItemStyle}>{gameName}</Text>
                        </View>
                        <View style={styles.itemContentStyle}>
                            <Text style={styles.textItemStyle}>{rowData.issue }</Text>
                        </View>
                        <View style={styles.itemContentStyle}>
                            <Text style={styles.textItemStyle} numberOfLines={2}>{rowData.bet_number}</Text>
                        </View>
                        <View style={styles.itemContentStyle}>
                            <Text style={styles.textItemStyle}>{parseInt(rowData.prize)}</Text>
                        </View>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }

    itemClick = (data) => {

    }
}


const styles = StyleSheet.create({
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
    },

    row: {
        flexDirection: 'row',
        height: 35,
        borderBottomColor: "gray",
        borderBottomWidth: 1,
    },

});
