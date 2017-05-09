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
import XixingZhixuanDanshi from "../SSC/XixingZhixuanDanshi";



import QiansanZhixuanZuhe from "../SSC/QiansanZhixuanZuhe";
import QiansanZuxuanZusan from "../SSC/QiansanZuxuanZusan";
import QiansanZuxuanZuliu from "../SSC/QiansanZuxuanZuliu";
import QiansanQitaHeziweisu from "../SSC/QiansanQitaHeziweisu";
import QiansanQitaTeshuhaoma from "../SSC/QiansanQitaTeshuhaoma";
import QiansanZhixuanKuadu from "../SSC/QiansanZhixuanKuadu";
import QiansanZuxuanBaodan from "../SSC/QiansanZuxuanBaodan";
import QiansanZhixuanFushi from "../SSC/QiansanZhixuanFushi";
import QiansanZhixuanHezhi from "../SSC/QiansanZhixuanHezhi";
import QiansanZuxuanHezhi from "../SSC/QiansanZuxuanHezhi";
import QiansanZhixuanDanshi from "../SSC/QiansanZhixuanDanshi";
import QiansanZusanDanshi from "../SSC/QiansanZusanDanshi";
import QiansanZuliuDanshi from "../SSC/QiansanZuliuDanshi";
import QiansanZuxuanHunhe from "../SSC/QiansanZuxuanHunhe";


import HousanZuxuanZusan from "../SSC/HousanZuxuanZusan";
import HousanZuxuanZuliu from "../SSC/HousanZuxuanZuliu";
import HousanQitaHeziweisu from "../SSC/HousanQitaHeziweisu";
import HousanQitaTeshuhaoma from "../SSC/HousanQitaTeshuhaoma";
import HousanZhixuanKuadu from "../SSC/HousanZhixuanKuadu";
import HousanZhixuanHezhi from "../SSC/HousanZhixuanHezhi";
import HousanZuxuanHezhi from "../SSC/HousanZuxuanHezhi";
import HousanZhixuanZuhe from "../SSC/HousanZhixuanZuhe";
import HousanZuxuanBaodan from "../SSC/HousanZuxuanBaodan";
import HousanZhixuanDanshi from "../SSC/HousanZhixuanDanshi";
import HousanZusanDanshi from "../SSC/HousanZusanDanshi";
import HousanZuliuDanshi from "../SSC/HousanZuliuDanshi";
import HousanZuxuanHunhe from "../SSC/HousanZuxuanHunhe";


import ErxingZhixuanHouerFushi from "../SSC/ErxingZhixuanHouerFushi";
import ErxingZhixuanQianerFushi from "../SSC/ErxingZhixuanQianerFushi";
import ErxingZuxuanQianerFushi from "../SSC/ErxingZuxuanQianerFushi";
import ErxingZuxuanHouerFushi from "../SSC/ErxingZuxuanHouerFushi";
import ErxingZhixuanQianerKuadu from "../SSC/ErxingZhixuanQianerKuadu";
import ErxingZhixuanHouerKuadu from "../SSC/ErxingZhixuanHouerKuadu";
import ErxingZhixuanQianerHezhi from "../SSC/ErxingZhixuanQianerHezhi";
import ErxingZhixuanHouerHezhi from "../SSC/ErxingZhixuanHouerHezhi";
import ErxingZuxuanQianerHezhi from "../SSC/ErxingZuxuanQianerHezhi";
import ErxingZuxuanHouerHezhi from "../SSC/ErxingZuxuanHouerHezhi";
import ErxingZuxuanQianerBaodan from "../SSC/ErxingZuxuanQianerBaodan";
import ErxingZuxuanHouerBaodan from "../SSC/ErxingZuxuanHouerBaodan";
import ErxingZhixuanQianerDanshi from "../SSC/ErxingZhixuanQianerDanshi";
import ErxingZuxuanQianerDanshi from "../SSC/ErxingZuxuanQianerDanshi";
import ErxingZhixuanHouerDanshi from "../SSC/ErxingZhixuanHouerDanshi";
import ErxingZuxuanHouerDanshi from "../SSC/ErxingZuxuanHouerDanshi";


import YixingDingweidanFushi from "../SSC/YixingDingweidanFushi";


import BudingweiSanxingQiansanyima from "../SSC/BudingweiSanxingQiansanyima";
import BudingweiSanxingQiansanerma from "../SSC/BudingweiSanxingQiansanerma";
import BudingweiSanxingHousanyima from "../SSC/BudingweiSanxingHousanyima";
import BudingweiSanxingHousanerma from "../SSC/BudingweiSanxingHousanerma";
import BudingweiSanxingZhongsanyima from "../SSC/BudingweiSanxingZhongsanyima";
import BudingweiSanxingZhongsanerma from "../SSC/BudingweiSanxingZhongsanerma";
import BudingweiSixingErma from "../SSC/BudingweiSixingErma";
import BudingweiSixingYima from "../SSC/BudingweiSixingYima";
import BudingweiWuxingYima from "../SSC/BudingweiWuxingYima";
import BudingweiWuxingErma from "../SSC/BudingweiWuxingErma";
import BudingweiWuxingSanma from "../SSC/BudingweiWuxingSanma";



import DaxiaodanshuangQianer from "../SSC/DaxiaodanshuangQianer";
import DaxiaodanshuangQiansan from "../SSC/DaxiaodanshuangQiansan";
import DaxiaodanshuangHousan from "../SSC/DaxiaodanshuangHousan";
import DaxiaodanshuangHouer from "../SSC/DaxiaodanshuangHouer";



import QuweiWumaSanxing from "../SSC/QuweiWumaSanxing";
import QuweiSimaSanxing from "../SSC/QuweiSimaSanxing";
import QuweiQiansanErxing from "../SSC/QuweiQiansanErxing";
import QuweiHousanErxing from "../SSC/QuweiHousanErxing";
import QuweiWumaQujianSanxing from "../SSC/QuweiWumaQujianSanxing";
import QuweiSimaQujianSanxing from "../SSC/QuweiSimaQujianSanxing";
import QuweiQiansanQujianErxing from "../SSC/QuweiQiansanQujianErxing";
import QuweiHousanQujianErxing from "../SSC/QuweiHousanQujianErxing";
import QuweiYifanfengshun from "../SSC/QuweiYifanfengshun";
import QuweiHaoshichengshuang from "../SSC/QuweiHaoshichengshuang";
import QuweiSanxingbaoxi from "../SSC/QuweiSanxingbaoxi";
import QuweiSijifacai from "../SSC/QuweiSijifacai";



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
       // TLog("SSCView--onRenderSubView", data);
        switch (`${data.id}`)
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

            case "58":
                return  <DaxiaodanshuangHouer {...this.props} {...this.state}  />

            //趣味
            case "38":
                return  <QuweiWumaSanxing {...this.props} {...this.state}  />

            case "39":
                return  <QuweiSimaSanxing {...this.props} {...this.state}  />

            case "40":
                return  <QuweiQiansanErxing {...this.props} {...this.state}  />

            case "55":
                return  <QuweiHousanErxing {...this.props} {...this.state}  />

            case "41":
                return  <QuweiWumaQujianSanxing {...this.props} {...this.state}  />

            case "42":
                return  <QuweiSimaQujianSanxing {...this.props} {...this.state}  />

            case "43":
                return  <QuweiQiansanQujianErxing {...this.props} {...this.state}  />

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