import React, {PropTypes}from 'react';
import TrendDetailView from "./TrendDetailView";
import BaseTrend from "./BaseTrend";

export default class Pk10Trend extends BaseTrend {

    static propTypes={
        lotteryId:PropTypes.any
    }

    constructor(props) {
        super(props)
        this.state = {
            index: 0,
            routes: [
                {key: '1', title: '冠军'},
                {key: '2', title: '亚军'},
                {key: '3', title: '号码分布'}
            ],
            firstList: [],
            secondList: [],
            mixList:[]
        };
        this.headData={title: "期数", ballList: ["1", "2", "3", "4", "5", "6","7","8","9","10"]}
        this.numSize=10;
        this.type = 2;
    }


    componentDidMount() {
        const {lotteryId} = this.props;
        HTTP_SERVER.TREND_DATA.url = HTTP_SERVER.TREND_DATA.formatUrl.replace(/{#lid}/, lotteryId).replace(/{#type}/, this.type)
        ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.TREND_DATA, (data) => {
            this.setState({
                firstList: this.getDataByPosition(data, 0),
                secondList: this.getDataByPosition(data, 1),
                mixList: this.getDataByPosition(data, 2)
            })
        },false,true)
    }



    _renderScene = ({route}) => {
        switch (route.key) {
            case '1':
                return <TrendDetailView  headData={this.headData} dataList={this.state.firstList}/>
            case '2':
                return <TrendDetailView  headData={this.headData} dataList={this.state.secondList}/>
            case '3':
                return <TrendDetailView  headData={this.headData} dataList={this.state.mixList}/>
        }
    };

}
