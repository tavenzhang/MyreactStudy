import React from 'react';
import {StyleSheet } from 'react-native';
import {TabViewAnimated, TabBar } from 'react-native-tab-view';
import BaseView from "../../../componet/BaseView";

import connect from "react-redux/src/components/connect";
import MoneyChangeHistoryView from "./myMoney/MoneyChangeHistoryView";

const mapStateToProps = state => {
    return {
        appModel:state.get("appState").get("appModel"),
        gameModel:state.get("appState").get("gameModel"),
        playModel:state.get("appState").get("playModel"),
    }
}
@connect(mapStateToProps)
export default class MoneyDetailView extends BaseView {
    constructor(props)
    {
        super(props)
        this.state = {
            index:0,
            routes: [
                { key: '1', title: '全部' },
                { key: '2', title: '充值' },
                { key: '3', title: '提现' },
                { key: '4', title: '派奖' },
                { key: '5', title: '转账' },
            ],
            dataList1:[],
            dataList2:[],
            dataList3:[],
            dataList4:[],
            dataList5:[],
        };
    }

    _handleChangeTab = (index) => {
        this.setState({index});
    };

    _renderHeader = (props) => {
        return <TabBar style={styles.tabViewStyle} {...props} tabStyle={styles.tabStyle} labelStyle={styles.labelStyle} indicatorStyle={styles.indicatorStyle} pressColor={"#ff4081"} pressOpacity={5} />;
    };

    _renderScene = ({ route }) => {
        switch (route.key) {
            case '1':
                return <MoneyChangeHistoryView  dataList={this.state.dataList1} loadMore={this._loadMore} {...this.props} style={[ styles.page]} httpService={HTTP_SERVER.LIST_REANSACTON} />;
            case '2':
                return <MoneyChangeHistoryView dataList={this.state.dataList2} loadMore={this._loadMore}  {...this.props} style={[ styles.page]} httpService={HTTP_SERVER.LIST_ADD_MONEY}/>;
            case '3':
                return <MoneyChangeHistoryView dataList={this.state.dataList3} loadMore={this._loadMore}  {...this.props} style={[ styles.page]} httpService={HTTP_SERVER.LIST_DRAW} />;
            case '4':
                return <MoneyChangeHistoryView dataList={this.state.dataList4} loadMore={this._loadMore}  {...this.props} style={[ styles.page]} httpService={HTTP_SERVER.LIST_AWARD_MONEY} />;
            case '5':
                return <MoneyChangeHistoryView dataList={this.state.dataList5}  loadMore={this._loadMore}  {...this.props} style={[ styles.page]} httpService={HTTP_SERVER.LIST_TRANSLATE_MONEY} />;
           default:
               return null;
        }
    };

    renderBody() {
        return (
            <TabViewAnimated
                lazy={true}
                style={styles.container}
                navigationState={this.state}
                renderScene={this._renderScene}
                renderHeader={this._renderHeader}
                onRequestChangeTab={this._handleChangeTab}
            />
        );
    }

    componentDidMount(){
        this._loadMore(HTTP_SERVER.LIST_REANSACTON,null,1);
        this._loadMore(HTTP_SERVER.LIST_ADD_MONEY,null,1);
        this._loadMore(HTTP_SERVER.LIST_DRAW,null,1);
        this._loadMore(HTTP_SERVER.LIST_AWARD_MONEY,null,1);
        this._loadMore(HTTP_SERVER.LIST_TRANSLATE_MONEY,null,1);
    }

    _loadMore = (httpService,callFinishBack,isFlush) => {
        if(isFlush) {
            httpService.body.page = 1;
            httpService.body.pagesize = 15;
        }
        else{
            httpService.body.page += 1;
            httpService.body.pagesize = 15;
        }
        ActDispatch.FetchAct.fetchVoWithResult(httpService, (result) => {
            if (result.data.data) {
                let arr=null;
                switch (httpService) {
                    case HTTP_SERVER.LIST_REANSACTON:
                        arr =   G_ArrayUtils.addComapreCopy(this.state.dataList1,result.data.data)
                        this.setState({dataList1: arr})
                        break;
                    case HTTP_SERVER.LIST_ADD_MONEY:
                        arr =   G_ArrayUtils.addComapreCopy(this.state.dataList2,result.data.data)
                        this.setState({dataList2: arr})
                        break;
                    case HTTP_SERVER.LIST_DRAW:
                        arr =   G_ArrayUtils.addComapreCopy(this.state.dataList3,result.data.data)
                        this.setState({dataList3: arr})
                        break;
                    case HTTP_SERVER.LIST_AWARD_MONEY:
                        arr =   G_ArrayUtils.addComapreCopy(this.state.dataList4,result.data.data)
                        this.setState({dataList4: arr})
                        break;
                    case HTTP_SERVER.LIST_TRANSLATE_MONEY:
                        arr =   G_ArrayUtils.addComapreCopy(this.state.dataList5,result.data.data)
                        this.setState({dataList5: arr})
                        break;
                }

            }
            if(callFinishBack)
            {
                callFinishBack();
            }
        })
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    page: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabStyle:{
        //zIndex:0,
        height:40,
    },
    labelStyle:{
        color:"black",
    },
    indicatorStyle:{
        backgroundColor:"red",
    },
    tabViewStyle:{
        backgroundColor:"white",
    }
});
