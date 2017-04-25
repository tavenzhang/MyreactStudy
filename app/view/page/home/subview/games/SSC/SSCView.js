import React from 'react';
import {
    View,
    Text
    , StyleSheet,
} from 'react-native';

import BaseGameView from "../BaseGameView";
import WuxingZhixuanFushi from "../SSC/WuxingZhixuanFushi";
import WuxingZhixuanDanshi from "../SSC/WuxingZhixuanDanshi";
import WuxingZhixuanZuhe from "../SSC/WuxingZhixuanZuhe";
import WuxingZuxuanZuxuan5 from "../SSC/WuxingZuxuanZuxuan5";
import WuxingZuxuanZuxuan10 from "../SSC/WuxingZuxuanZuxuan10";
import WuxingZuxuanZuxuan20 from "../SSC/WuxingZuxuanZuxuan20";
import WuxingZuxuanZuxuan30 from "../SSC/WuxingZuxuanZuxuan30";
import WuxingZuxuanZuxuan60 from "../SSC/WuxingZuxuanZuxuan60";
import WuxingZuxuanZuxuan120 from "../SSC/WuxingZuxuanZuxuan120";
import HousanZhixuanFushi from "../SSC/HousanZhixuanFushi";


import XixingZuxuan4 from "../SSC/XixingZuxuan4";
import XixingZuxuan6 from "../SSC/XixingZuxuan6";
import XixingZuxuan12 from "../SSC/XixingZuxuan12";
import XixingZuxuan24 from "../SSC/XixingZuxuan24";
import XixingZhixuanFushi from "../SSC/XixingZhixuanFushi";
import XixingZhixuanZuhe from "../SSC/XixingZhixuanZuhe";



import QiansanZhixuanZuhe from "../SSC/QiansanZhixuanZuhe";
import QiansanZuxuanZusan from "../SSC/QiansanZuxuanZusan";
import QiansanZuxuanZuliu from "../SSC/QiansanZuxuanZuliu";
import QiansanQitaHeziweisu from "../SSC/QiansanQitaHeziweisu";
import QiansanQitaTeshuhaoma from "../SSC/QiansanQitaTeshuhaoma";



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

export default class SSCView extends BaseGameView {

    constructor(props) {
        super(props);
    }

    onRenderSubView(data) {
        TLog("SSCView--onRenderSubView", data);
        switch (data.id)
        {
            //五星
            case "68":
                return  <WuxingZhixuanFushi {...this.props} {...this.state} />

            case "7":
                return  <WuxingZhixuanDanshi {...this.props} {...this.state}  />

            case "15":
                return  <WuxingZhixuanZuhe {...this.props} {...this.state}  />

            case "27":
                return  <WuxingZuxuanZuxuan5 {...this.props} {...this.state}  />

            case "28":
                return  <WuxingZuxuanZuxuan10 {...this.props} {...this.state}  />

            case "29":
                return  <WuxingZuxuanZuxuan20 {...this.props} {...this.state}  />

            case "30":
                return  <WuxingZuxuanZuxuan30 {...this.props} {...this.state}  />

            case "31":
                return  <WuxingZuxuanZuxuan60 {...this.props} {...this.state}  />

            case "32":
                return  <WuxingZuxuanZuxuan120 {...this.props} {...this.state}  />

            //四星
            case "67":
                return  <XixingZhixuanFushi {...this.props} {...this.state}  />

            case "23":
                return  <XixingZuxuan4 {...this.props} {...this.state}  />

            case "24":
                return  <XixingZuxuan6 {...this.props} {...this.state}  />

            case "25":
                return  <XixingZuxuan12 {...this.props} {...this.state}  />

            case "26":
                return  <XixingZuxuan24 {...this.props} {...this.state}  />

            case "79":
                return  <XixingZhixuanZuhe {...this.props} {...this.state}  />

            //前三
            case "14":
                return  <QiansanZhixuanZuhe {...this.props} {...this.state}  />

            case "16":
                return  <QiansanZuxuanZusan {...this.props} {...this.state}  />

            case "17":
                return  <QiansanZuxuanZuliu {...this.props} {...this.state}  />

            case "33":
                return  <QiansanQitaHeziweisu {...this.props} {...this.state}  />

            case "48":
                return  <QiansanQitaTeshuhaoma {...this.props} {...this.state}  />

            //三星
            case "69":
                return  <HousanZhixuanFushi {...this.props} {...this.state}  />

            default:
                return  <Text>{data.id}</Text>
        }
    }
}