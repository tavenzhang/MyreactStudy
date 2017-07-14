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
export default class MoneyAssginBack extends BaseView {
    constructor(props)
    {
        super(props)
        this.state = {
            index:0,
            routes: [
                { key: '1', title: '分红' },
                { key: '2', title: '返点' }
            ],
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
                return <MoneyChangeHistoryView {...this.props} style={styles.page} httpService={HTTP_SERVER.LIST_ASSIGN_MONEY} />;
            case '2':
                return <MoneyChangeHistoryView {...this.props} style={styles.page} httpService={HTTP_SERVER.LIST_BACK_MONEY} />;
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
