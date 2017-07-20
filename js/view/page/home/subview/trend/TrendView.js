import React from 'react';
import {
    View,
} from 'react-native';
import BaseView from "../../../../componet/BaseView";
import SSCTrend from "./SSCTrend";
import L115Trend from "./L115Trend";
import D3Trend from "./D3Trend";
import Fast3Trend from "./Fast3Trend";
import Pk10Trend from "./Pk10Trend";
import Happy10Trend from "./Happy10Trend";

export default class TrendView extends BaseView {

    renderBody() {
        let {series_id,lotteryId} = this.props.navigation.state.params;
        let resultView = null;
        switch (series_id)
        {
            case 1://ssc
                resultView = <SSCTrend lotteryId={lotteryId}/>
                break;
            case 2://11选5
                resultView = <L115Trend lotteryId={lotteryId}/>
                break;
            case 3://3d
                resultView = <D3Trend lotteryId={lotteryId}/>
                break;
            case 5://fast3
                resultView = <Fast3Trend  lotteryId={lotteryId}/>
                break
            case 7://pk10Pk10Trend
                resultView = <Pk10Trend  lotteryId={lotteryId}/>
                break
            case 8://快乐10
                resultView = <Happy10Trend  lotteryId={lotteryId}/>
                break;
            default:
                resultView = <L115Trend lotteryId={lotteryId}/>
                break;

        }
        return (<View style={G_Style.appContentView}>
                     {resultView}
                </View>
        );
    }
}