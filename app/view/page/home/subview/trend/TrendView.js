import React from 'react';
import {
    View,
} from 'react-native';
import BaseView from "../../../../componet/BaseView";
import SSCTrend from "./ssc/SSCTrend";
import L115Trend from "./l115/L115Trend";

export default class TrendView extends BaseView {

    constructor(props) {
        super(props)
    }

    renderBody() {
        let {lotteryId} = this.props.passProps
        let resultView = null;
        if (`${lotteryId}` == "1") {
            resultView = <SSCTrend lotteryId={lotteryId}/>
        }
        else {
            resultView = <L115Trend lotteryId={lotteryId}/>
        }
        return (
        <View style={G_Style.appContentView}>
            {resultView}
        </View>
        );
    }
}