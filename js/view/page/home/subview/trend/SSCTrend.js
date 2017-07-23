import React, {PropTypes}from 'react';
import TrendDetailView from "./TrendDetailView";
import BaseTrend from "./BaseTrend";


export default class SSCTrend extends BaseTrend {

    static propTypes={
        lotteryId:PropTypes.any
    }

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
        this.headData={title: "期数", ballList: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]}
        this.numSize=10;
        this.type = 5;
    }



    componentDidMount() {
        const {lotteryId} = this.props;
        HTTP_SERVER.TREND_DATA.url = HTTP_SERVER.TREND_DATA.formatUrl.replace(/{#lid}/, lotteryId).replace(/{#type}/, this.type)
        ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.TREND_DATA, (data) => {
            this.setState({
                firstList: this.getDataByPosition(data, 0),
                secondList: this.getDataByPosition(data, 1),
                thirdList: this.getDataByPosition(data, 2),
                fourList: this.getDataByPosition(data, 3),
                fiveList: this.getDataByPosition(data, 4),
                mixList: this.getDataByPosition(data, 5)
            })
        },false,true)
    }



    _renderScene({route}){
        switch (route.key) {
            case '1':
                return <TrendDetailView isStartZero={true} headData={this.headData} dataList={this.state.firstList}/>
            case '2':
                return <TrendDetailView isStartZero={true} eadData={this.headData}  dataList={this.state.secondList}/>
            case '3':
                return <TrendDetailView isStartZero={true} headData={this.headData} dataList={this.state.thirdList}/>
            case '4':
                return <TrendDetailView isStartZero={true} headData={this.headData} dataList={this.state.fourList}/>
            case '5':
                return <TrendDetailView isStartZero={true} headData={this.headData} dataList={this.state.fiveList}/>
            case '6':
                return <TrendDetailView isStartZero={true} headData={this.headData} dataList={this.state.mixList}/>
        }
    };
}
