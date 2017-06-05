import React from 'react';
import {
    Text
} from 'react-native';

import BaseGameView from "../BaseGameView";
import QUWEI from "./QUWEI";

import connect from "react-redux/src/components/connect";

const mapStateToProps = state => {
    return {
        orderNum: state.get("gameState").get("orderList").count(),
        moneyUnit: state.get("gameState").get("moneyUnit"), //金额模式
        multiple: state.get("gameState").get("multiple"), //倍数
        // balance: parseFloat(state.get("appState").getIn(['userData','data','available']));
        balance: state.get("appState").get("moneyBalance"),
    }
}

@connect(mapStateToProps)
export default class LUCKYView extends BaseGameView {

    constructor(props) {
        super(props);
    }
    onRenderSubView(data) {
        TLog("lucky--onRenderSubView", data);
        TLog('firstMenu', this.firstMenu);

        switch (data.id + '') {

            default:
                return <QUWEI {...this.props} {...this.state} gameMethod={this.firstMenu} />
        }
    }


}