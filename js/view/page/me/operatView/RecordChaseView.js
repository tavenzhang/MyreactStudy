import React from 'react';
import {
    View,
    Text, StyleSheet,
    TouchableHighlight,
    TouchableOpacity
} from 'react-native';
import {connect} from 'react-redux';
import AIcon from 'react-native-vector-icons/FontAwesome';
import BaseView from "../../../componet/BaseView";
import ChaseRecodListView from "./record/ChaseRecodListView";
import RecordMenuView, {MenuListType} from "./record/RecordMenuView";


const mapStateToProps = state => {
    return {
        gameModel: state.get("appState").get("gameModel"),
        playModel: state.get("appState").get("playModel"),
        appModel: state.get("appState").get("appModel"),
    }
}
@connect(mapStateToProps)
export default class RecordChaseView extends BaseView {
    constructor(props) {
        super(props);
        this.state = {
            curGame: null,
            curPlay: null,
            curTime: null,
            dataList: [],
            curPage:1,
            totalPage:1
        }

    }

    renderBody() {
        return (
            <View style={G_Style.appContentView}>
                <RecordMenuView clickMenuItem={this.clickMenuItem} {...this.props}/>
                <View style={{flex: 1, marginTop: 35, backgroundColor: "yellow"}}>
                    <ChaseRecodListView curPage={this.state.curPage} totalPage={this.state.totalPage} dataList={this.state.dataList} loadMore={this.loadMore} {...this.props}/>
                </View>
            </View>
        );
    }

    componentDidMount() {
        this.loadMore(null, true);
    }

    onForceFlushData(data) {
        this.setState({dataList: []}, () => {
            this.loadMore(null, true);
        })
    }


    clickMenuItem = (data, listType) => {
        switch (listType) {
            case MenuListType.TimeList:
                this.setState({curTime: data, dataList: []}, () => {
                    this.loadMore(null, 1)
                });
                break;
            case MenuListType.GameList: //重新选择了游戏 需要重制游戏类型
                this.setState({curGame: data, curPlay: null, dataList: []}, () => {
                    this.loadMore(null, 1)
                });
                break;
            case MenuListType.PlayList:
                this.setState({curPlay: data, dataList: []}, () => {
                    this.loadMore(null, 1)
                });
                break;
        }
    }

    loadMore = (callBack, isFlush) => {
        HTTP_SERVER.CHASE_RECODE.body.bought_at_from = this.state.curTime ? this.state.curTime.date : "";
        HTTP_SERVER.CHASE_RECODE.body.bought_at_to = ""
        HTTP_SERVER.CHASE_RECODE.body.lottery_id = this.state.curGame ? this.state.curGame.id : "";
        HTTP_SERVER.CHASE_RECODE.body.way_group_id = this.state.curPlay ? this.state.curPlay.id : "";
        if (isFlush) {
            HTTP_SERVER.CHASE_RECODE.body.page = 1;
        }
        else {
            HTTP_SERVER.CHASE_RECODE.body.page += 1;
        }

        HTTP_SERVER.CHASE_RECODE.body.pagesize = 15;
        ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.CHASE_RECODE, (result) => {
            if (callBack) {
                callBack()
            }
            let arr = G_ArrayUtils.addComapreCopy(this.state.dataList, result.data.data)
            this.setState({dataList: arr,curPage:result.data.current_page,totalPage:result.data.last_page});
        }, false);

    }
}
