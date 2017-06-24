import React from 'react';
import {
    View,
    Text
    , StyleSheet,
} from 'react-native';

import BaseGameView from "../BaseGameView";
import WuxingZhixuanFushi from "./WuxingZhixuanFushi";
import WuxingZhixuanDanshi from "./WuxingZhixuanDanshi";
import WuxingZhixuanZuhe from "./WuxingZhixuanZuhe";
import WuxingZuxuanZuxuan5 from "./WuxingZuxuanZuxuan5";
import WuxingZuxuanZuxuan10 from "./WuxingZuxuanZuxuan10";
import WuxingZuxuanZuxuan20 from "./WuxingZuxuanZuxuan20";
import WuxingZuxuanZuxuan30 from "./WuxingZuxuanZuxuan30";
import WuxingZuxuanZuxuan60 from "./WuxingZuxuanZuxuan60";
import WuxingZuxuanZuxuan120 from "./WuxingZuxuanZuxuan120";
import HousanZhixuanFushi from "./HousanZhixuanFushi";


import XixingZuxuan4 from "./XixingZuxuan4";
import XixingZuxuan6 from "./XixingZuxuan6";
import XixingZuxuan12 from "./XixingZuxuan12";
import XixingZuxuan24 from "./XixingZuxuan24";
import XixingZhixuanFushi from "./XixingZhixuanFushi";
import XixingZhixuanZuhe from "./XixingZhixuanZuhe";
import XixingZhixuanDanshi from "./XixingZhixuanDanshi";



import QiansanZhixuanZuhe from "./QiansanZhixuanZuhe";
import QiansanZuxuanZusan from "./QiansanZuxuanZusan";
import QiansanZuxuanZuliu from "./QiansanZuxuanZuliu";
import QiansanQitaHeziweisu from "./QiansanQitaHeziweisu";
import QiansanQitaTeshuhaoma from "./QiansanQitaTeshuhaoma";
import QiansanZhixuanKuadu from "./QiansanZhixuanKuadu";
import QiansanZuxuanBaodan from "./QiansanZuxuanBaodan";
import QiansanZhixuanFushi from "./QiansanZhixuanFushi";
import QiansanZhixuanHezhi from "./QiansanZhixuanHezhi";
import QiansanZuxuanHezhi from "./QiansanZuxuanHezhi";
import QiansanZhixuanDanshi from "./QiansanZhixuanDanshi";
import QiansanZusanDanshi from "./QiansanZusanDanshi";
import QiansanZuliuDanshi from "./QiansanZuliuDanshi";
import QiansanZuxuanHunhe from "./QiansanZuxuanHunhe";

import ZhongsanZhixuanZuhe from "./ZhongsanZhixuanZuhe";
import ZhongsanZuxuanZusan from "./ZhongsanZuxuanZusan";
import ZhongsanZuxuanZuliu from "./ZhongsanZuxuanZuliu";
import ZhongsanQitaHeziweisu from "./ZhongsanQitaHeziweisu";
import ZhongsanQitaTeshuhaoma from "./ZhongsanQitaTeshuhaoma";
import ZhongsanZhixuanKuadu from "./ZhongsanZhixuanKuadu";
import ZhongsanZuxuanBaodan from "./ZhongsanZuxuanBaodan";
import ZhongsanZhixuanFushi from "./ZhongsanZhixuanFushi";
import ZhongsanZhixuanHezhi from "./ZhongsanZhixuanHezhi";
import ZhongsanZuxuanHezhi from "./ZhongsanZuxuanHezhi";
import ZhongsanZhixuanDanshi from "./ZhongsanZhixuanDanshi";
import ZhongsanZusanDanshi from "./ZhongsanZusanDanshi";
import ZhongsanZuliuDanshi from "./ZhongsanZuliuDanshi";
import ZhongsanZuxuanHunhe from "./ZhongsanZuxuanHunhe";


import HousanZuxuanZusan from "./HousanZuxuanZusan";
import HousanZuxuanZuliu from "./HousanZuxuanZuliu";
import HousanQitaHeziweisu from "./HousanQitaHeziweisu";
import HousanQitaTeshuhaoma from "./HousanQitaTeshuhaoma";
import HousanZhixuanKuadu from "./HousanZhixuanKuadu";
import HousanZhixuanHezhi from "./HousanZhixuanHezhi";
import HousanZuxuanHezhi from "./HousanZuxuanHezhi";
import HousanZhixuanZuhe from "./HousanZhixuanZuhe";
import HousanZuxuanBaodan from "./HousanZuxuanBaodan";
import HousanZhixuanDanshi from "./HousanZhixuanDanshi";
import HousanZusanDanshi from "./HousanZusanDanshi";
import HousanZuliuDanshi from "./HousanZuliuDanshi";
import HousanZuxuanHunhe from "./HousanZuxuanHunhe";


import ErxingZhixuanHouerFushi from "./ErxingZhixuanHouerFushi";
import ErxingZhixuanQianerFushi from "./ErxingZhixuanQianerFushi";
import ErxingZuxuanQianerFushi from "./ErxingZuxuanQianerFushi";
import ErxingZuxuanHouerFushi from "./ErxingZuxuanHouerFushi";
import ErxingZhixuanQianerKuadu from "./ErxingZhixuanQianerKuadu";
import ErxingZhixuanHouerKuadu from "./ErxingZhixuanHouerKuadu";
import ErxingZhixuanQianerHezhi from "./ErxingZhixuanQianerHezhi";
import ErxingZhixuanHouerHezhi from "./ErxingZhixuanHouerHezhi";
import ErxingZuxuanQianerHezhi from "./ErxingZuxuanQianerHezhi";
import ErxingZuxuanHouerHezhi from "./ErxingZuxuanHouerHezhi";
import ErxingZuxuanQianerBaodan from "./ErxingZuxuanQianerBaodan";
import ErxingZuxuanHouerBaodan from "./ErxingZuxuanHouerBaodan";
import ErxingZhixuanQianerDanshi from "./ErxingZhixuanQianerDanshi";
import ErxingZuxuanQianerDanshi from "./ErxingZuxuanQianerDanshi";
import ErxingZhixuanHouerDanshi from "./ErxingZhixuanHouerDanshi";
import ErxingZuxuanHouerDanshi from "./ErxingZuxuanHouerDanshi";


import YixingDingweidanFushi from "./YixingDingweidanFushi";


import BudingweiSanxingQiansanyima from "./BudingweiSanxingQiansanyima";
import BudingweiSanxingQiansanerma from "./BudingweiSanxingQiansanerma";
import BudingweiSanxingHousanyima from "./BudingweiSanxingHousanyima";
import BudingweiSanxingHousanerma from "./BudingweiSanxingHousanerma";
import BudingweiSanxingZhongsanyima from "./BudingweiSanxingZhongsanyima";
import BudingweiSanxingZhongsanerma from "./BudingweiSanxingZhongsanerma";
import BudingweiSixingErma from "./BudingweiSixingErma";
import BudingweiSixingYima from "./BudingweiSixingYima";
import BudingweiWuxingYima from "./BudingweiWuxingYima";
import BudingweiWuxingErma from "./BudingweiWuxingErma";
import BudingweiWuxingSanma from "./BudingweiWuxingSanma";



import DaxiaodanshuangQianer from "./DaxiaodanshuangQianer";
import DaxiaodanshuangQiansan from "./DaxiaodanshuangQiansan";
import DaxiaodanshuangHousan from "./DaxiaodanshuangHousan";
import DaxiaodanshuangZhongsan from "./DaxiaodanshuangZhongsan";
import DaxiaodanshuangHouer from "./DaxiaodanshuangHouer";



import QuweiWumaSanxing from "./QuweiWumaSanxing";
import QuweiSimaSanxing from "./QuweiSimaSanxing";
import QuweiQiansanErxing from "./QuweiQiansanErxing";
import QuweiZhongsanErxing from "./QuweiZhongsanErxing";
import QuweiHousanErxing from "./QuweiHousanErxing";
import QuweiWumaQujianSanxing from "./QuweiWumaQujianSanxing";
import QuweiSimaQujianSanxing from "./QuweiSimaQujianSanxing";
import QuweiQiansanQujianErxing from "./QuweiQiansanQujianErxing";
import QuweiZhongsanQujianErxing from "./QuweiZhongsanQujianErxing";
import QuweiHousanQujianErxing from "./QuweiHousanQujianErxing";
import QuweiYifanfengshun from "./QuweiYifanfengshun";
import QuweiHaoshichengshuang from "./QuweiHaoshichengshuang";
import QuweiSanxingbaoxi from "./QuweiSanxingbaoxi";
import QuweiSijifacai from "./QuweiSijifacai";



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
       // balance: parseFloat(state.get("appState").getIn(['userData','data','available']));
        balance:state.get("appState").get("moneyBalance"),
    }
}

@connect(mapStateToProps)
export default class SSCView extends BaseGameView {

    constructor(props) {
        super(props);
    }

    onRenderSubView(data) {
       // TLog("SSCView--onRenderSubView", data);
        switch (data.id + '')
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

            case "6":
                return  <XixingZhixuanDanshi {...this.props} {...this.state}  />

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

            case "60":
                return  <QiansanZhixuanKuadu {...this.props} {...this.state}  />

            case "64":
                return  <QiansanZuxuanBaodan {...this.props} {...this.state}  />

            case "65":
                return  <QiansanZhixuanFushi {...this.props} {...this.state}  />

            case "71":
                return  <QiansanZhixuanHezhi {...this.props} {...this.state}  />

            case "75":
                return  <QiansanZuxuanHezhi {...this.props} {...this.state}  />

            case "1":
                return  <QiansanZhixuanDanshi {...this.props} {...this.state}  />

            case "2":
                return  <QiansanZusanDanshi {...this.props} {...this.state}  />

            case "3":
                return  <QiansanZuliuDanshi {...this.props} {...this.state}  />

            case "13":
                return  <QiansanZuxuanHunhe {...this.props} {...this.state}  />

            //中三
            case "148":
                return  <ZhongsanZhixuanZuhe {...this.props} {...this.state}  />

            case "151":
                return  <ZhongsanZuxuanZusan {...this.props} {...this.state}  />

            case "152":
                return  <ZhongsanZuxuanZuliu {...this.props} {...this.state}  />

            case "153":
                return  <ZhongsanQitaHeziweisu {...this.props} {...this.state}  />

            case "154":
                return  <ZhongsanQitaTeshuhaoma {...this.props} {...this.state}  />

            case "147":
                return  <ZhongsanZhixuanKuadu {...this.props} {...this.state}  />

            case "155":
                return  <ZhongsanZuxuanBaodan {...this.props} {...this.state}  />

            case "142":
                return  <ZhongsanZhixuanFushi {...this.props} {...this.state}  />

            case "146":
                return  <ZhongsanZhixuanHezhi {...this.props} {...this.state}  />

            case "157":
                return  <ZhongsanZuxuanHezhi {...this.props} {...this.state}  />

            case "145":
                return  <ZhongsanZhixuanDanshi {...this.props} {...this.state}  />

            case "149":
                return  <ZhongsanZusanDanshi {...this.props} {...this.state}  />

            case "150":
                return  <ZhongsanZuliuDanshi {...this.props} {...this.state}  />

            case "156":
                return  <ZhongsanZuxuanHunhe {...this.props} {...this.state}  />

            //后三
            case "69":
                return  <HousanZhixuanFushi {...this.props} {...this.state}  />

            case "49":
                return  <HousanZuxuanZusan {...this.props} {...this.state}  />

            case "50":
                return  <HousanZuxuanZuliu {...this.props} {...this.state}  />

            case "54":
                return  <HousanQitaHeziweisu {...this.props} {...this.state}  />

            case "57":
                return  <HousanQitaTeshuhaoma {...this.props} {...this.state}  />

            case "62":
                return  <HousanZhixuanKuadu {...this.props} {...this.state}  />

            case "73":
                return  <HousanZhixuanHezhi {...this.props} {...this.state}  />

            case "80":
                return  <HousanZuxuanHezhi {...this.props} {...this.state}  />

            case "82":
                return  <HousanZhixuanZuhe {...this.props} {...this.state}  />

            case "83":
                return  <HousanZuxuanBaodan {...this.props} {...this.state}  />

            case "8":
                return  <HousanZhixuanDanshi {...this.props} {...this.state}  />

            case "9":
                return  <HousanZusanDanshi {...this.props} {...this.state}  />

            case "10":
                return  <HousanZuliuDanshi {...this.props} {...this.state}  />

            case "81":
                return  <HousanZuxuanHunhe {...this.props} {...this.state}  />

            //erxing
            case "20":
                return  <ErxingZuxuanQianerFushi {...this.props} {...this.state}  />

            case "59":
                return  <ErxingZuxuanHouerFushi {...this.props} {...this.state}  />

            case "66":
                return  <ErxingZhixuanQianerFushi {...this.props} {...this.state}  />

            case "70":
                return  <ErxingZhixuanHouerFushi {...this.props} {...this.state}  />

            case "61":
                return  <ErxingZhixuanQianerKuadu {...this.props} {...this.state}  />

            case "63":
                return  <ErxingZhixuanHouerKuadu {...this.props} {...this.state}  />

            case "72":
                return  <ErxingZhixuanQianerHezhi {...this.props} {...this.state}  />

            case "74":
                return  <ErxingZhixuanHouerHezhi {...this.props} {...this.state}  />

            case "76":
                return  <ErxingZuxuanQianerHezhi {...this.props} {...this.state}  />

            case "77":
                return  <ErxingZuxuanHouerHezhi {...this.props} {...this.state}  />

            case "84":
                return  <ErxingZuxuanQianerBaodan {...this.props} {...this.state}  />

            case "85":
                return  <ErxingZuxuanHouerBaodan {...this.props} {...this.state}  />

            case "4":
                return  <ErxingZhixuanQianerDanshi {...this.props} {...this.state}  />

            case "5":
                return  <ErxingZuxuanQianerDanshi {...this.props} {...this.state}  />

            case "11":
                return  <ErxingZhixuanHouerDanshi {...this.props} {...this.state}  />

            case "12":
                return  <ErxingZuxuanHouerDanshi {...this.props} {...this.state}  />

            //一星
            case "78":
                return  <YixingDingweidanFushi {...this.props} {...this.state}  />


            //不定位
            case "18":
                return  <BudingweiSanxingQiansanyima {...this.props} {...this.state}  />

            case "21":
                return  <BudingweiSanxingQiansanerma {...this.props} {...this.state}  />

            case "51":
                return  <BudingweiSanxingHousanyima {...this.props} {...this.state}  />

            case "52":
                return  <BudingweiSanxingHousanerma {...this.props} {...this.state}  />

            case "158":
                return  <BudingweiSanxingZhongsanyima {...this.props} {...this.state}  />

            case "159":
                return  <BudingweiSanxingZhongsanerma {...this.props} {...this.state}  />

            case "34":
                return  <BudingweiSixingYima {...this.props} {...this.state}  />

            case "35":
                return  <BudingweiSixingErma {...this.props} {...this.state}  />

            case "36":
                return  <BudingweiWuxingErma {...this.props} {...this.state}  />

            case "37":
                return  <BudingweiWuxingSanma {...this.props} {...this.state}  />

            //大小单双
            case "19":
                return  <DaxiaodanshuangQianer {...this.props} {...this.state}  />

            case "22":
                return  <DaxiaodanshuangQiansan {...this.props} {...this.state}  />

            case "53":
                return  <DaxiaodanshuangHousan {...this.props} {...this.state}  />

            case "160":
                return  <DaxiaodanshuangZhongsan {...this.props} {...this.state}  />

            case "58":
                return  <DaxiaodanshuangHouer {...this.props} {...this.state}  />

            //趣味
            case "38":
                return  <QuweiWumaSanxing {...this.props} {...this.state}  />

            case "39":
                return  <QuweiSimaSanxing {...this.props} {...this.state}  />

            case "40":
                return  <QuweiQiansanErxing {...this.props} {...this.state}  />

            case "161":
                return  <QuweiZhongsanErxing {...this.props} {...this.state}  />

            case "55":
                return  <QuweiHousanErxing {...this.props} {...this.state}  />

            case "41":
                return  <QuweiWumaQujianSanxing {...this.props} {...this.state}  />

            case "42":
                return  <QuweiSimaQujianSanxing {...this.props} {...this.state}  />

            case "43":
                return  <QuweiQiansanQujianErxing {...this.props} {...this.state}  />

            case "162":
                return  <QuweiZhongsanQujianErxing {...this.props} {...this.state}  />

            case "56":
                return  <QuweiHousanQujianErxing {...this.props} {...this.state}  />

            case "44":
                return  <QuweiYifanfengshun {...this.props} {...this.state}  />

            case "45":
                return  <QuweiHaoshichengshuang {...this.props} {...this.state}  />

            case "46":
                return  <QuweiSanxingbaoxi {...this.props} {...this.state}  />

            case "47":
                return  <QuweiSijifacai {...this.props} {...this.state}  />

            default:
                return  <Text>{data.id}</Text>
        }
    }
}