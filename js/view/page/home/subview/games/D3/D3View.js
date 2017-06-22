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
import SanxingZuxuanHunhe from "./SanxingZuxuanHunhe";
import SanxingZuxuanZusan from "./SanxingZuxuanZusan";
import SanxingZuxuanZuliu from "./SanxingZuxuanZuliu";
import SanxingZhixuanFushi from "./SanxingZhixuanFushi";
import SanxingZhixuanHezhi from "./SanxingZhixuanHezhi";
import SanxingZuxuanHezhi from "./SanxingZuxuanHezhi";

import ErxingZhixuanQianerDanshi from "./ErxingZhixuanQianerDanshi";
import ErxingZuxuanQianerDanshi from "./ErxingZuxuanQianerDanshi";
import ErxingZhixuanHouerDanshi from "./ErxingZhixuanHouerDanshi";
import ErxingZuxuanHouerDanshi from "./ErxingZuxuanHouerDanshi";
import ErxingZuxuanQianerFushi from "./ErxingZuxuanQianerFushi";
import ErxingZuxuanHouerFushi from "./ErxingZuxuanHouerFushi";
import ErxingZhixuanQianerFushi from "./ErxingZhixuanQianerFushi";
import ErxingZhixuanHouerFushi from "./ErxingZhixuanHouerFushi";


import YixingDingweidanFushi from "./YixingDingweidanFushi";
import Budingwei from "./Budingwei";

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

            case "130":
                return  <SanxingZuxuanHunhe {...this.props} {...this.state} />

            case "131":
                return  <SanxingZuxuanZusan {...this.props} {...this.state} />

            case "132":
                return  <SanxingZuxuanZuliu {...this.props} {...this.state} />

            case "136":
                return  <SanxingZhixuanFushi {...this.props} {...this.state} />

            case "139":
                return  <SanxingZhixuanHezhi {...this.props} {...this.state} />

            case "140":
                return  <SanxingZuxuanHezhi {...this.props} {...this.state} />

            //二星
            case "126":
                return  <ErxingZhixuanQianerDanshi {...this.props} {...this.state} />

            case "127":
                return  <ErxingZuxuanQianerDanshi {...this.props} {...this.state} />

            case "128":
                return  <ErxingZhixuanHouerDanshi {...this.props} {...this.state} />

            case "129":
                return  <ErxingZuxuanHouerDanshi {...this.props} {...this.state} />

            case "134":
                return  <ErxingZuxuanQianerFushi {...this.props} {...this.state} />

            case "135":
                return  <ErxingZuxuanHouerFushi {...this.props} {...this.state} />

            case "137":
                return  <ErxingZhixuanQianerFushi {...this.props} {...this.state} />

            case "138":
                return  <ErxingZhixuanHouerFushi {...this.props} {...this.state} />

            case "141":
                return  <YixingDingweidanFushi {...this.props} {...this.state} />

            case "133":
                return  <Budingwei {...this.props} {...this.state} />

            default:
                return  <Text>{data.id}</Text>
        }
    }
}