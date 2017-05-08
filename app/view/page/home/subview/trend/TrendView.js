import React, {PropTypes}from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
} from 'react-native';
import BaseView from "../../../../componet/BaseView";
import SSCTrend from "./ssc/SSCTrend";
import L115Trend from "./l115/L115Trend";

export default class TrendView extends BaseView {

    constructor(props) {
        super(props)
        this.state = {
            index: 0,
            routes: [
                {key: '1', title: '万位'},
                {key: '2', title: '千位'},
                {key: '3', title: '百位'},
                {key: '4', title: '十位'},
                {key: '5', title: '个位'},
                {key: '6', title: '分布'}
            ],
            firstList: [],
            secondList: [],
            thirdList: [],
            fourList: [],
            fiveList: [],
            mixList:[]
        };
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
        <View style={GlobeStyle.appContentView}>
            {resultView}
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    page: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabStyle: {
        //zIndex:0,
        //backgroundColor:"white",
        height: 40,
    },
    labelStyle: {
        color: "black",
    },
    indicatorStyle: {
        backgroundColor: "red",
    },
    tabViewStyle: {
        backgroundColor: "white",
    }
});