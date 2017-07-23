import React, {PropTypes}from 'react';
import {
    View,
} from 'react-native';
import TrendDetailView from "./TrendDetailView";
import BaseTrend from "./BaseTrend";

export default class Happy10Trend extends BaseTrend {

    static propTypes = {
        lotteryId: PropTypes.any
    }

    constructor(props) {
        super(props)
        this.state = {
            index: 0,
            routes: [
                {key: '1', title: '第一位'},
                {key: '2', title: '号码分布'}
            ],
            firstList: [],
            mixList: []
        };
        this.headData = {
            title: "期数", ballList: ["1", "2", "3", "4", "5", "6", "7", '8', "9", "10",
                "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"]
        }
        this.numSize = 20;
        this.type = "1kl1";
    }


    componentDidMount() {
        const {lotteryId} = this.props;
        HTTP_SERVER.TREND_DATA.url = HTTP_SERVER.TREND_DATA.formatUrl.replace(/{#lid}/, lotteryId).replace(/{#type}/, this.type)
        ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.TREND_DATA, (data) => {
            this.setState({
                firstList: this.getDataByPosition(data, 0),
                mixList: this.getDataByPosition(data, 1),
            })
        },false,true)
    }


    _renderScene({route}) {
        switch (route.key) {
            case '1':
                return <TrendDetailView isStartZero={true} headData={this.headData} dataList={this.state.firstList}/>
            case '2':
                return <TrendDetailView isStartZero={true} headData={this.headData} dataList={this.state.mixList}/>
            default:
                return <View/>;
        }
    }
}