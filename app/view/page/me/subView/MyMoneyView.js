import React from 'react';
import { View, StyleSheet } from 'react-native';
import {TabViewAnimated, TabBar } from 'react-native-tab-view';
import BaseView from "../../../componet/BaseView";

import connect from "react-redux/src/components/connect";
import MoneyChangeHistoryView from "./myMoney/MoneyChangeHistoryView";

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
        //backgroundColor:"white",
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


const mapStateToProps = state => {
    return {
        typesModel:state.get("appState").get("typesModel"),
        gameModel:state.get("appState").get("gameModel"),
        playModel:state.get("appState").get("playModel"),
    }
}

@connect(mapStateToProps)
export default class MyMoneyView extends BaseView {
    state = {
        index: 0,
        routes: [
            { key: '1', title: '全部' },
            { key: '2', title: '充值' },
            { key: '3', title: '提现' },
            { key: '4', title: '派奖' },
            { key: '5', title: '转账' }
        ],
    };

    _handleChangeTab = (index) => {
        this.setState({index});
    };

    _renderHeader = (props) => {
        return <TabBar style={styles.tabViewStyle} {...props} tabStyle={styles.tabStyle} labelStyle={styles.labelStyle} indicatorStyle={styles.indicatorStyle} pressColor={"#ff4081"} pressOpacity={5} />;
    };

    _renderScene = ({ route }) => {
        switch (route.key) {
            case '1':
                return <MoneyChangeHistoryView {...this.props} style={[ styles.page]} httpService={HTTP_SERVER.LIST_REANSACTON} />;
            case '2':
                return <MoneyChangeHistoryView {...this.props} style={[ styles.page]} httpService={HTTP_SERVER.LIST_ADD_MONEY}/>;
            case '3':
                return <MoneyChangeHistoryView {...this.props} style={[ styles.page]} httpService={HTTP_SERVER.LIST_DRAW} />;
            case '4':
                return <MoneyChangeHistoryView {...this.props} style={[ styles.page]} httpService={HTTP_SERVER.LIST_AWARD_MONEY} />;
            case '5':
                return <MoneyChangeHistoryView {...this.props} style={[ styles.page]} httpService={HTTP_SERVER.LIST_TRANSLATE_MONEY} />;
            default:
                return <View style={[ styles.page, { backgroundColor: '#ff0' } ]} />;
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
}