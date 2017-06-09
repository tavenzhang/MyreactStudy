import React from 'react';
import {
    Text
} from 'react-native';

import BaseGameView from "../BaseGameView";

import Renxuan1 from "./Renxuan1";
import Renxuan2 from "./Renxuan2";
import Renxuan3 from "./Renxuan3";
import Renxuan4 from "./Renxuan4";
import Renxuan5 from "./Renxuan5";
import Renxuan6 from "./Renxuan6";
import Renxuan7 from "./Renxuan7";
import Quwei from "./Quwei";


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
export default class L115View extends BaseGameView {
    //
    // getGameTitle(){
    //     const {name} = this.props.passProps;
    //     let   gameName = "["+name +"]-趣味";
    //
    //     return gameName;
    // }
    // //
    getGameWays(){
        let methods= super.getGameWays();
        methods.map((item)=>{
            if(item.name=="趣味")
            {
                item.children=[{"id":163,"name":"趣味"}];
            }
        })
        return methods;
    }

    onRenderSubView(data) {
        TLog("KENO--onRenderSubView", data);
        switch (data.id + '') {
            //任选一
            case "184":
                return <Renxuan1 {...this.props} {...this.state} />
            //任选二
            case "185":
                return <Renxuan2 {...this.props} {...this.state} />
            //任选三
            case "186":
                return <Renxuan3 {...this.props} {...this.state} />
            //任选四
            case "187":
                return <Renxuan4 {...this.props} {...this.state} />
            //任选五
            case "188":
                return <Renxuan5 {...this.props} {...this.state} />
            //任选六
            case "189":
                return <Renxuan6 {...this.props} {...this.state} />
            //任选七
            case "190":
                return <Renxuan7 {...this.props} {...this.state} />
            //趣味
            case '163':
            case '164':
            case '165':
            case '166':
            case '167':
            case '168':
            case '169':
            case '170':
            case '171':
            case '172':
            case '173':
            case '174':
            case '175':
            case '176':
            case '177':
            case '178':
            case '179':
            case '180':
            case '182':
            // case '183':
                return <Quwei {...this.props} {...this.state}  clickMenuItem={this.clickMenuItem} />

            default:
                return <Text>{data.id}</Text>
        }
    }


}