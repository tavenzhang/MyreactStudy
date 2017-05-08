import React from 'react';
import {
    Text
} from 'react-native';

import BaseGameView from "../BaseGameView";
import SanmaZhixuanFushi from "../L115/SanmaZhixuanFushi";
import SanmaZuxuanFushi from "../L115/SanmaZuxuanFushi";
import SanmaZuxuanDantuo from "../L115/SanmaZuxuanDantuo";
import SanmaZhixuanDanshi from "../L115/SanmaZhixuanDanshi";
import SanmaZuxuanDanshi from "../L115/SanmaZuxuanDanshi";

import ErmaZhixuanFushi from "../L115/ErmaZhixuanFushi";
import ErmaZuxuanFushi from "../L115/ErmaZuxuanFushi";
import ErmaZuxuanDantuo from "../L115/ErmaZuxuanDantuo";
import ErmaZhixuanDanshi from "../L115/ErmaZhixuanDanshi";
import ErmaZuxuanDanshi from "../L115/ErmaZuxuanDanshi";

import QiansanBudingwei from "../L115/QiansanBudingwei";

import QuweiDingdanshuang from "../L115/QuweiDingdanshuang";
import QuweiCaizhongwei from "../L115/QuweiCaizhongwei";

import Dingweidan from "../L115/Dingweidan";

import RenxuanFushi1z1 from "../L115/RenxuanFushi1z1";
import RenxuanFushi2z2 from "../L115/RenxuanFushi2z2";
import RenxuanFushi3z3 from "../L115/RenxuanFushi3z3";
import RenxuanFushi4z4 from "../L115/RenxuanFushi4z4";
import RenxuanFushi5z5 from "../L115/RenxuanFushi5z5";
import RenxuanFushi6z5 from "../L115/RenxuanFushi6z5";
import RenxuanFushi7z5 from "../L115/RenxuanFushi7z5";
import RenxuanFushi8z5 from "../L115/RenxuanFushi8z5";

import RenxuanDanshi1z1 from "../L115/RenxuanDanshi1z1";
import RenxuanDanshi2z2 from "../L115/RenxuanDanshi2z2";
import RenxuanDanshi3z3 from "../L115/RenxuanDanshi3z3";
import RenxuanDanshi4z4 from "../L115/RenxuanDanshi4z4";
import RenxuanDanshi5z5 from "../L115/RenxuanDanshi5z5";
import RenxuanDanshi6z5 from "../L115/RenxuanDanshi6z5";
import RenxuanDanshi7z5 from "../L115/RenxuanDanshi7z5";
import RenxuanDanshi8z5 from "../L115/RenxuanDanshi8z5";

import RenxuanDantuo2z2 from "../L115/RenxuanDantuo2z2";
import RenxuanDantuo3z3 from "../L115/RenxuanDantuo3z3";
import RenxuanDantuo4z4 from "../L115/RenxuanDantuo4z4";
import RenxuanDantuo5z5 from "../L115/RenxuanDantuo5z5";
import RenxuanDantuo6z5 from "../L115/RenxuanDantuo6z5";
import RenxuanDantuo7z5 from "../L115/RenxuanDantuo7z5";
import RenxuanDantuo8z5 from "../L115/RenxuanDantuo8z5";


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