import React from 'react';
import {
    Text
} from 'react-native';

import BaseGameView from "../BaseGameView";
import SanmaZhixuanFushi from "./SanmaZhixuanFushi";
import SanmaZuxuanFushi from "./SanmaZuxuanFushi";
import SanmaZuxuanDantuo from "./SanmaZuxuanDantuo";
import SanmaZhixuanDanshi from "./SanmaZhixuanDanshi";
import SanmaZuxuanDanshi from "./SanmaZuxuanDanshi";

import ErmaZhixuanFushi from "./ErmaZhixuanFushi";
import ErmaZuxuanFushi from "./ErmaZuxuanFushi";
import ErmaZuxuanDantuo from "./ErmaZuxuanDantuo";
import ErmaZhixuanDanshi from "./ErmaZhixuanDanshi";
import ErmaZuxuanDanshi from "./ErmaZuxuanDanshi";

import QiansanBudingwei from "./QiansanBudingwei";

import QuweiDingdanshuang from "./QuweiDingdanshuang";
import QuweiCaizhongwei from "./QuweiCaizhongwei";

import Dingweidan from "./Dingweidan";

import RenxuanFushi1z1 from "./RenxuanFushi1z1";
import RenxuanFushi2z2 from "./RenxuanFushi2z2";
import RenxuanFushi3z3 from "./RenxuanFushi3z3";
import RenxuanFushi4z4 from "./RenxuanFushi4z4";
import RenxuanFushi5z5 from "./RenxuanFushi5z5";
import RenxuanFushi6z5 from "./RenxuanFushi6z5";
import RenxuanFushi7z5 from "./RenxuanFushi7z5";
import RenxuanFushi8z5 from "./RenxuanFushi8z5";

import RenxuanDanshi1z1 from "./RenxuanDanshi1z1";
import RenxuanDanshi2z2 from "./RenxuanDanshi2z2";
import RenxuanDanshi3z3 from "./RenxuanDanshi3z3";
import RenxuanDanshi4z4 from "./RenxuanDanshi4z4";
import RenxuanDanshi5z5 from "./RenxuanDanshi5z5";
import RenxuanDanshi6z5 from "./RenxuanDanshi6z5";
import RenxuanDanshi7z5 from "./RenxuanDanshi7z5";
import RenxuanDanshi8z5 from "./RenxuanDanshi8z5";

import RenxuanDantuo2z2 from "./RenxuanDantuo2z2";
import RenxuanDantuo3z3 from "./RenxuanDantuo3z3";
import RenxuanDantuo4z4 from "./RenxuanDantuo4z4";
import RenxuanDantuo5z5 from "./RenxuanDantuo5z5";
import RenxuanDantuo6z5 from "./RenxuanDantuo6z5";
import RenxuanDantuo7z5 from "./RenxuanDantuo7z5";
import RenxuanDantuo8z5 from "./RenxuanDantuo8z5";


import connect from "react-redux/src/components/connect";

const mapStateToProps = state => {
    return {
        orderNum: state.get("gameState").get("orderList").count(),
        moneyUnit: state.get("gameState").get("moneyUnit"), //金额模式
        multiple: state.get("gameState").get("multiple"), //倍数
       // balance: parseFloat(state.get("appState").getIn(['userData','data','available']));
        balance:state.get("appState").get("moneyBalance"),
    }
}

@connect(mapStateToProps)
export default class L115View extends BaseGameView {

    onRenderSubView(data) {
        TLog("SD11Choose5--onRenderSubView", data);
        switch (data.id + '')
        {
            //前三
            case "112":
                return  <SanmaZhixuanFushi {...this.props} {...this.state} />

            case "108":
                return  <SanmaZuxuanFushi {...this.props} {...this.state} />

            case "121":
                return  <SanmaZuxuanDantuo {...this.props} {...this.state} />

            case "95":
                return  <SanmaZhixuanDanshi {...this.props} {...this.state} />

            case "97":
                return  <SanmaZuxuanDanshi {...this.props} {...this.state} />

            //前二
            case "107":
                return  <ErmaZhixuanFushi {...this.props} {...this.state} />

            case "111":
                return  <ErmaZuxuanFushi {...this.props} {...this.state} />

            case "120":
                return  <ErmaZuxuanDantuo {...this.props} {...this.state} />

            case "94":
                return  <ErmaZhixuanDanshi {...this.props} {...this.state} />

            case "96":
                return  <ErmaZuxuanDanshi {...this.props} {...this.state} />

            //不定位
            case "122":
                return  <QiansanBudingwei {...this.props} {...this.state} />

            //趣味
            case "109":
                return  <QuweiDingdanshuang {...this.props} {...this.state} />

            case "110":
                return  <QuweiCaizhongwei {...this.props} {...this.state} />

            //定位胆
            case "106":
                return  <Dingweidan {...this.props} {...this.state} />

            //任选单式
            case "86":
                return  <RenxuanDanshi1z1 {...this.props} {...this.state} />

            case "87":
                return  <RenxuanDanshi2z2 {...this.props} {...this.state} />

            case "88":
                return  <RenxuanDanshi3z3 {...this.props} {...this.state} />

            case "89":
                return  <RenxuanDanshi4z4 {...this.props} {...this.state} />

            case "90":
                return  <RenxuanDanshi5z5 {...this.props} {...this.state} />

            case "91":
                return  <RenxuanDanshi6z5 {...this.props} {...this.state} />

            case "92":
                return  <RenxuanDanshi7z5 {...this.props} {...this.state} />

            case "93":
                return  <RenxuanDanshi8z5 {...this.props} {...this.state} />

            //任选
            case "98":
                return  <RenxuanFushi1z1 {...this.props} {...this.state} />

            case "99":
                return  <RenxuanFushi2z2 {...this.props} {...this.state} />

            case "100":
                return  <RenxuanFushi3z3 {...this.props} {...this.state} />

            case "101":
                return  <RenxuanFushi4z4 {...this.props} {...this.state} />

            case "102":
                return  <RenxuanFushi5z5 {...this.props} {...this.state} />

            case "103":
                return  <RenxuanFushi6z5 {...this.props} {...this.state} />

            case "104":
                return  <RenxuanFushi7z5 {...this.props} {...this.state} />

            case "105":
                return  <RenxuanFushi8z5 {...this.props} {...this.state} />

            //胆拖
            case "113":
                return  <RenxuanDantuo2z2 {...this.props} {...this.state} />

            case "114":
                return  <RenxuanDantuo3z3 {...this.props} {...this.state} />

            case "115":
                return  <RenxuanDantuo4z4 {...this.props} {...this.state} />

            case "116":
                return  <RenxuanDantuo5z5 {...this.props} {...this.state} />

            case "117":
                return  <RenxuanDantuo6z5 {...this.props} {...this.state} />

            case "118":
                return  <RenxuanDantuo7z5 {...this.props} {...this.state} />

            case "119":
                return  <RenxuanDantuo8z5 {...this.props} {...this.state} />

            default:
                return  <Text>{data.id}</Text>
        }
    }

   

}