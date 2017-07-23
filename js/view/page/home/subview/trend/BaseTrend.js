import React, {PropTypes}from 'react';
import {
    StyleSheet,
} from 'react-native';
import {TabViewAnimated, TabBar} from 'react-native-tab-view';
import TrendDetailView from "./TrendDetailView";

export default class BaseTrend extends React.Component {

    static propTypes={
        lotteryId:PropTypes.any
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
            mixList:[]
        };

        this.headData={title: "期数", ballList: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]}
        this._renderScene=this._renderScene.bind(this);
        this.getDataByPosition=this.getDataByPosition.bind(this)
        this.numSize=10;
        this.type=3
    }


    render() {
        return (
            <TabViewAnimated
                lazy={true}
                style={styles.container}
                navigationState={this.state}
                renderScene={this._renderScene}
                renderHeader={this._renderHeader}
                onRequestChangeTab={this._handleChangeTab}
            />
        );
    }

    componentDidMount() {
        const {lotteryId} = this.props;
        HTTP_SERVER.TREND_DATA.url = HTTP_SERVER.TREND_DATA.formatUrl.replace(/{#lid}/, lotteryId).replace(/{#type}/, this.type)
        ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.TREND_DATA, (data) => {
            this.setState({
                firstList: this.getDataByPosition(data, 0),
                secondList: this.getDataByPosition(data, 1),
                thirdList: this.getDataByPosition(data, 2),
                mixList:this.getDataByPosition(data, 3),
            })
        },false,true)
    }

    componentWillUnmount() {
        ActDispatch.FetchAct.canCelVoFetch (HTTP_SERVER.TREND_DATA)
    }

    _handleChangeTab = (index) => {
        this.setState({index});
    };

    _renderHeader = (props) => {
        return <TabBar style={styles.tabViewStyle} {...props} tabStyle={styles.tabStyle} labelStyle={styles.labelStyle}
                       indicatorStyle={styles.indicatorStyle} pressColor={"#ff4081"} pressOpacity={5}/>;
    };

    _renderScene ({route}) {
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
    };


    getDataByPosition  (data, position,isMix=false) {
        let sList = data.data.data;
        let resultList = [];
        sList.map((item) => {
            let tempData = {};
            tempData.title = item[0];
            tempData.awardNums = item[1];
            let ballList = []
            let lastPosition = 2 + position;
            if (item[lastPosition]) {
                for (let i = 0; i < item[lastPosition].length; i++) {
                    ballList.push(item[lastPosition][i]);
                }
            }
            tempData.ballList = ballList;
            resultList.push(tempData);
        })
        let statistics = data.data.statistics;
        let leakItem = {};
        leakItem.title = "出现总次数"
        let startIndex=position*this.numSize;
        let endIndex= startIndex+ this.numSize;
        leakItem.ballList = statistics[0].slice(startIndex, endIndex);
        resultList.push(leakItem);
        leakItem.bgColor="blue"
        let maxLeak = {};
        maxLeak.title = "平均遗漏值"
        maxLeak.ballList = statistics[1].slice(startIndex, endIndex);
        maxLeak.bgColor="yellow"
        resultList.push(maxLeak);
        let minLeak = {};
        minLeak.title = "最大遗漏值"
        minLeak.ballList = statistics[2].slice(startIndex, endIndex);
        minLeak.bgColor="blue"
        resultList.push(minLeak);
        let totalLeak = {};
        totalLeak.title = "最大连出值"
        totalLeak.bgColor="yellow"
        totalLeak.ballList = statistics[3].slice(startIndex, endIndex);
        resultList.push(totalLeak);
        return resultList;
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
        height: 40,
    },
    labelStyle: {
        color: "black",
        fontWeight:"bold"
    },
    indicatorStyle: {
        backgroundColor: "red",
    },
    tabViewStyle: {
        backgroundColor: "white",
    }
});