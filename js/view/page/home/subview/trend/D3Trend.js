import React, {PropTypes}from 'react';
import TrendDetailView from "./TrendDetailView";
import BaseTrend from "./BaseTrend";

export default class D3Trend extends BaseTrend {

    static propTypes = {
        lotteryId: PropTypes.any
    }

    constructor(props) {
        super(props)
        this.state = {
            index: 0,
            routes: [
                {key: '1', title: '百位'},
                {key: '2', title: '十位'},
                {key: '3', title: '个位'},
                {key: '4', title: '分布'}
            ],
            firstList: [],
            secondList: [],
            thirdList: [],
            mixList: []
        };
        this.headData = {title: "期数", ballList: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]}
        this.numSize=10,
            this.type=3;
    }


    _renderScene({route}) {
        switch (route.key) {
            case '1':
                return <TrendDetailView headData={this.headData} dataList={this.state.firstList}/>
            case '2':
                return <TrendDetailView headData={this.headData} dataList={this.state.secondList}/>
            case '3':
                return <TrendDetailView headData={this.headData} dataList={this.state.thirdList}/>
            case '4':
                return <TrendDetailView headData={this.headData} dataList={this.state.mixList}/>
        }
    }

}