/**
 * Created by soga on 2017/5/10.
 */
import React from 'react';
import {
    Text
} from 'react-native';

import BaseGameView from "../BaseGameView";

import ErtonghaoFuxuan from "./ErtonghaoFuxuan";
import ErtonghaoDanxuan from "./ErtonghaoDanxuan";
import ErbutonghaoBiaozhun from "./ErbutonghaoBiaozhun";
import ErbutonghaoDantuo from "./ErbutonghaoDantuo";


import SantonghaoDanxuan from "./SantonghaoDanxuan";
import SantonghaoTongxuan from "./SantonghaoTongxuan";


import SanbutonghaoBiaozhun from "./SanbutonghaoBiaozhun";
import SanbutonghaoDantuo from "./SanbutonghaoDantuo";

import SanlianhaoDanxuan from "./SanlianhaoDanxuan";
import SanlianhaoTongxuan from "./SanlianhaoTongxuan";

import Hezhi from "./Hezhi";


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
export default class K3View extends BaseGameView {

    onRenderSubView(data) {
        TLog("K3--onRenderSubView", data);
        switch (data.id + '')
        {
            //二同号
            case "191":
                return  <Hezhi {...this.props} {...this.state} />

            //二同号
            case "192":
                return  <ErtonghaoDanxuan {...this.props} {...this.state} />

            case "193":
                return  <ErtonghaoFuxuan {...this.props} {...this.state} />

            //二不同号
            case "194":
                return  <ErbutonghaoBiaozhun {...this.props} {...this.state} />

            case "195":
                return  <ErbutonghaoDantuo {...this.props} {...this.state} />

            //三同号
            case "196":
                return  <SantonghaoDanxuan {...this.props} {...this.state} />

            case "197":
                return  <SantonghaoTongxuan {...this.props} {...this.state} />

            //三不同号
            case "198":
                return  <SanbutonghaoBiaozhun {...this.props} {...this.state} />

            case "199":
                return  <SanbutonghaoDantuo {...this.props} {...this.state} />

            //三不同号
            case "200":
                return  <SanlianhaoDanxuan {...this.props} {...this.state} />

            case "201":
                return  <SanlianhaoTongxuan {...this.props} {...this.state} />

            default:
                return  <Text>{data.id}</Text>
        }
    }



}