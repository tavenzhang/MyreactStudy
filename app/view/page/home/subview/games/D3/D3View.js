/**
 * Created by soga on 2017/5/9.
 */
import React from 'react';
import {
    View,
    Text
    , StyleSheet,
} from 'react-native';

import BaseGameView from "../BaseGameView";
import SanxingZhixuanDanshi from "./SanxingZhixuanDanshi";
import SanxingZusanDanshi from "./SanxingZusanDanshi";
import SanxingZuliuDanshi from "./SanxingZuliuDanshi";

import connect from "react-redux/src/components/connect";

const mapStateToProps = state => {
    //const balls = state.get("gameState").get("balls").toArray();
    //let newBalls = []
    //balls.map((v,i) => {
    //    newBalls[i] = v.toArray();
    //});
    return {
        //balls: newBalls,
        orderNum: state.get("gameState").get("orderList").count(),
        moneyUnit: state.get("gameState").get("moneyUnit"), //金额模式
        multiple: state.get("gameState").get("multiple"), //倍数
        balance: parseFloat(state.get("appState").getIn(['userData','data','available']))
    }
}

@connect(mapStateToProps)
export default class D3View extends BaseGameView {

    constructor(props) {
        super(props);
    }

    onRenderSubView(data) {
        TLog("D3View--onRenderSubView", data);
        switch (data.id + '')
        {
            //五星
            case "123":
                return  <SanxingZhixuanDanshi {...this.props} {...this.state} />

            case "124":
                return  <SanxingZusanDanshi {...this.props} {...this.state} />

            case "125":
                return  <SanxingZuliuDanshi {...this.props} {...this.state} />

            default:
                return  <Text>{data.id}</Text>
        }
    }
}