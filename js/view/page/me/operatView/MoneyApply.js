import React from 'react';
import {StyleSheet } from 'react-native';
import {TabViewAnimated, TabBar } from 'react-native-tab-view';
import BaseView from "../../../componet/BaseView";

import connect from "react-redux/src/components/connect";
import MoneyApplyInView from "./moneyIn/MoneyApplyInView";
import MoneyApplyOutView from "./moneyIn/MoneyApplyOutView";

const mapStateToProps = state => {
    return {
        appModel:state.get("appState").get("appModel"),
    }
}
@connect(mapStateToProps)
export default class MoneyApply extends BaseView {
    constructor(props)
    {
        super(props)
        this.state = {
            index:0,
            routes: [
                { key: '1', title: '充值申请' },
                { key: '2', title: '提现申请' }
            ],
            dataListIn:[],
            dataListOut:[],
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
                return <MoneyApplyInView appModel={this.props.appModel}  dataList={this.state.dataListIn} style={styles.page} loadMore={this._loadMoreInView} />;
            case '2':
                return <MoneyApplyOutView appModel={this.props.appModel} dataList={this.state.dataListOut} style={styles.page} loadMore={this._loadMoreOutView} />;
            default:
                return null;
        }
    };

    renderBody() {
        return (
            <TabViewAnimated
                lazy={false}
                style={styles.container}
                navigationState={this.state}
                renderScene={this._renderScene}
                renderHeader={this._renderHeader}
                onRequestChangeTab={this._handleChangeTab}
            />
        );
    }

    componentDidMount(){
        this._loadMoreInView(null,1);
        this._loadMoreOutView(null,1)
    }


    _loadMoreInView = (callFinishBack,isFlush) => {
        if(isFlush) {
            HTTP_SERVER.MONEY_IN_APPLY.body.page = 1;
            HTTP_SERVER.MONEY_IN_APPLY.body.pagesize = 15;
        }
        else{
            HTTP_SERVER.MONEY_IN_APPLY.body.page += 1;
            HTTP_SERVER.MONEY_IN_APPLY.body.pagesize = 15;
        }
        ActDispatch.FetchAct.fetchVoWithResult(  HTTP_SERVER.MONEY_IN_APPLY, (result) => {
            if (result.data.data) {
                let arr =  G_ArrayUtils.addComapreCopy(this.state.dataListIn,result.data.data)
                    this.setState({dataListIn: arr})
            }
            if(callFinishBack)
            {
                callFinishBack();
            }
        })
    }

    _loadMoreOutView = (callFinishBack,isFlush) => {
        if(isFlush) {
            HTTP_SERVER.MONEY_OUTER_APPLY.body.page = 1;
            HTTP_SERVER.MONEY_OUTER_APPLY.body.pagesize = 15;
        }
        else{
            HTTP_SERVER.MONEY_OUTER_APPLY.body.page += 1;
            HTTP_SERVER.MONEY_OUTER_APPLY.body.pagesize = 15;
        }
        ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.MONEY_OUTER_APPLY, (result) => {
            if (result.data.datas.data) {
                let arr =  G_ArrayUtils.addComapreCopy(this.state.dataListOut,result.data.datas.data)
                this.setState({dataListOut: arr})
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
