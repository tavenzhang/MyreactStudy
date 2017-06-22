import React from 'react';
import {
    Text
} from 'react-native';

import BaseGameView from "../BaseGameView";
import Dingweidan1 from "./Dingweidan1";
import Dingweidan2 from "./Dingweidan2";
import Dingweidan3 from "./Dingweidan3";
import Dingweidan4 from "./Dingweidan4";
import Dingweidan5 from "./Dingweidan5";
import Dingweidan6 from "./Dingweidan6";
import Dingweidan7 from "./Dingweidan7";
import Dingweidan8 from "./Dingweidan8";

import RenxuanFushi1z1 from "./RenxuanFushi1z1";
import RenxuanFushi2z2 from "./RenxuanFushi2z2";
import RenxuanFushi3z3 from "./RenxuanFushi3z3";
import RenxuanFushi4z4 from "./RenxuanFushi4z4";
import RenxuanFushi5z5 from "./RenxuanFushi5z5"

import RenxuanDantuo2z2 from "./RenxuanDantuo2z2"
import RenxuanDantuo3z3 from "./RenxuanDantuo3z3"
import RenxuanDantuo4z4 from "./RenxuanDantuo4z4"
import RenxuanDantuo5z5 from "./RenxuanDantuo5z5"

import QiansanZhixuanFushi from "./QiansanZhixuanFushi"
import HousanZhixuanFushi from "./HousanZhixuanFushi"
import QiansanZuxuanFushi from "./QiansanZuxuanFushi"
import HousanZuxuanFushi from "./HousanZuxuanFushi"

import QianerZhixuanFushi from "./QianerZhixuanFushi"
import QianerZuxuanFushi from "./QianerZuxuanFushi"


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
export default class KL10View extends BaseGameView {

    onRenderSubView(data) {
        TLog("KL10Choose5--onRenderSubView", data);
        switch (data.id + '') {
            //定位胆
            case "233":
                return <Dingweidan1 {...this.props} {...this.state} />
            case '244':
                return <Dingweidan2 {...this.props} {...this.state} />
            case '245':
                return <Dingweidan3 {...this.props} {...this.state} />
            case '246':
                return <Dingweidan4 {...this.props} {...this.state} />
            case '247':
                return <Dingweidan5 {...this.props} {...this.state} />
            case '248':
                return <Dingweidan6 {...this.props} {...this.state} />
            case '249':
                return <Dingweidan7 {...this.props} {...this.state} />
            case '250':
                return <Dingweidan8 {...this.props} {...this.state} />

            //任选
            case '228':
                return <RenxuanFushi1z1 {...this.props} {...this.state} />
            case '229':
                return <RenxuanFushi2z2 {...this.props} {...this.state} />
            case '230':
                return <RenxuanFushi3z3 {...this.props} {...this.state} />
            case '231':
                return <RenxuanFushi4z4 {...this.props} {...this.state} />
            case '232':
                return <RenxuanFushi5z5 {...this.props} {...this.state} />

            //胆拖
            case '234':
                return <RenxuanDantuo2z2 {...this.props} {...this.state} />
            case '235':
                return <RenxuanDantuo3z3 {...this.props} {...this.state} />
            case '236':
                return <RenxuanDantuo4z4 {...this.props} {...this.state} />
            case '237':
                return <RenxuanDantuo5z5 {...this.props} {...this.state} />

            //前三
            case '238':
                return <QiansanZhixuanFushi {...this.props} {...this.state} />
            case '240':
                return <HousanZhixuanFushi {...this.props} {...this.state} />
            case '239':
                return <QiansanZuxuanFushi {...this.props} {...this.state} />
            case '241':
                return <HousanZuxuanFushi {...this.props} {...this.state} />

            //前二
            case '242':
                return <QianerZhixuanFushi {...this.props} {...this.state} />

            case '243':
                return <QianerZuxuanFushi {...this.props} {...this.state} />


            default:
                return <Text>{data.id}</Text>
        }
    }


}