import React from 'react';
import {
    Text
} from 'react-native';

import BaseGameView from "../BaseGameView";
import connect from "react-redux/src/components/connect";
import WuxingZhixuanFushi from "../SSC/WuxingZhixuanFushi";

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
    }
}

@connect(mapStateToProps)
export default class SD11Choose5 extends BaseGameView {

    onRenderSubView(data) {
        TLog("SD11Choose5--onRenderSubView", data);
        switch (data.id)
        {
            case "95":
                return  <WuxingZhixuanFushi {...this.props} />
            default:
                return  <Text>{data.name}</Text>
        }


    }
}