import React from 'react';
import {
    Text
} from 'react-native';

import BaseGameView from "../BaseGameView";
import SanmaZhixuanFushi from "../L115/SanmaZhixuanFushi";
import SanmaZuxuanFushi from "../L115/SanmaZuxuanFushi";
import SanmaZuxuanDantuo from "../L115/SanmaZuxuanDantuo";

import ErmaZhixuanFushi from "../L115/ErmaZhixuanFushi";
import ErmaZuxuanFushi from "../L115/ErmaZuxuanFushi";
import ErmaZuxuanDantuo from "../L115/ErmaZuxuanDantuo";

import connect from "react-redux/src/components/connect";

const mapStateToProps = state => {
    return {
        orderNum: state.get("gameState").get("orderList").count(),
        moneyUnit: state.get("gameState").get("moneyUnit"), //金额模式
        multiple: state.get("gameState").get("multiple"), //倍数
        balance: parseFloat(state.get("appState").getIn(['userData','data','available']))
    }
}

@connect(mapStateToProps)
export default class L115View extends BaseGameView {

    onRenderSubView(data) {
        TLog("SD11Choose5--onRenderSubView", data);
        switch (data.id)
        {
            //前三
            case "112":
                return  <SanmaZhixuanFushi {...this.props} {...this.state} />

            case "108":
                return  <SanmaZuxuanFushi {...this.props} {...this.state} />

            case "121":
                return  <SanmaZuxuanDantuo {...this.props} {...this.state} />

            //前二
            case "107":
                return  <ErmaZhixuanFushi {...this.props} {...this.state} />

            case "111":
                return  <ErmaZuxuanFushi {...this.props} {...this.state} />

            case "120":
                return  <ErmaZuxuanDantuo {...this.props} {...this.state} />

            default:
                return  <Text>{data.id}</Text>
        }
    }

   

}