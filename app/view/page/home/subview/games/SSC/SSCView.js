import React from 'react';
import {
    View,
    Text
    , StyleSheet,
} from 'react-native';

import BaseGameView from "../BaseGameView";
import WuxingZhixuanFushi from "../SSC/WuxingZhixuanFushi";

import connect from "react-redux/src/components/connect";

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
        bet_max_prize_group: 1950,
        bet_min_prize_group: 1600,
    }
}

@connect(mapStateToProps)

export default class SSCView extends BaseGameView {

    constructor(props) {
        super(props);
    }

    onRenderSubView(data) {
        TLog("SSCView--onRenderSubView", data);
        switch (data.id)
        {
            case "95":
                return  <WuxingZhixuanFushi {...this.props} />
            default:
                return  <WuxingZhixuanFushi {...this.props} />
        }
    }
}