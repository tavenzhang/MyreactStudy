import React from 'react';
import {
    Text
} from 'react-native';

import BaseGameView from "../BaseGameView";
import QianyiFushi from "./QianyiFushi";
import QianerZhixuanFushi from "./QianerZhixuanFushi";
import QianerZhixuanDanshi from "./QianerZhixuanDanshi";
import QiansanZhixuanDanshi from "./QiansanZhixuanDanshi";
import QiansanZhixuanFushi from "./QiansanZhixuanFushi";
import Dingweidan from "./Dingweidan";
import DaxiaoFirst from "./DaxiaoFirst";
import DaxiaoSecond from "./DaxiaoSecond";
import DaxiaoThird from "./DaxiaoThird";
import DanshuangFirst from "./DanshuangFirst";
import DanshuangSecond from "./DanshuangSecond";
import DanshuangThird from "./DanshuangThird";
import LonghuFirst from "./LonghuFirst";
import LonghuSecond from "./LonghuSecond";
import LonghuThird from "./LonghuThird";

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
export default class PK10View extends BaseGameView {

    onRenderSubView(data) {
        TLog("PK10--onRenderSubView", data);
        switch (data.id + '') {
            //定位胆
            case "213":
                return <QianyiFushi {...this.props} {...this.state} />
            case '214':
                return <QianerZhixuanDanshi {...this.props} {...this.state} />
            case '215':
                return <QianerZhixuanFushi {...this.props} {...this.state} />
            case '216':
                return <QiansanZhixuanDanshi {...this.props} {...this.state} />
            case '217':
                return <QiansanZhixuanFushi {...this.props} {...this.state} />
            case '218':
                return <Dingweidan {...this.props} {...this.state} />
            //大小
            case '219':
                return <DaxiaoFirst {...this.props} {...this.state} />
            case '220':
                return <DaxiaoSecond {...this.props} {...this.state} />
            case '221':
                return <DaxiaoThird {...this.props} {...this.state} />

            //单双
            case '222':
                return <DanshuangFirst {...this.props} {...this.state} />
            case '223':
                return <DanshuangSecond {...this.props} {...this.state} />
            case '224':
                return <DanshuangThird {...this.props} {...this.state} />
            //龙虎
            case '225':
                return <LonghuFirst {...this.props} {...this.state} />
            case '226':
                return <LonghuSecond {...this.props} {...this.state} />
            case '227':
                return <LonghuThird {...this.props} {...this.state} />

            default:
                return <Text>{data.id}</Text>
        }
    }


}