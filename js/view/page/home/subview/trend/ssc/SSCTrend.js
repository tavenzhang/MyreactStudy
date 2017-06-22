import React, {PropTypes}from 'react';
import {
    StyleSheet,
} from 'react-native';
import BaseView from "../../../../../componet/BaseView";
import {TabViewAnimated, TabBar} from 'react-native-tab-view';
import Game_SSC_TREND from "./Game_SSC_TREND";


export default class SSCTrend extends BaseView {

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
    }

    render() {
        return (
            <TabViewAnimated
                //lazy={true}
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
        HTTP_SERVER.TREND_DATA.url = HTTP_SERVER.TREND_DATA.formatUrl.replace(/{#lid}/, lotteryId).replace(/{#type}/, 5)
        G_RunAfterInteractions(()=>{
            ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.TREND_DATA, (data) => {
                this.setState({
                    firstList: this.getDataByPosition(data, 0),
                    secondList: this.getDataByPosition(data, 1),
                    thirdList: this.getDataByPosition(data, 2),
                    fourList: this.getDataByPosition(data, 3),
                    fiveList: this.getDataByPosition(data, 4),
                    mixList:this.getDataByPosition(data, 5,true)
                })
            })
        })
    }

    _handleChangeTab = (index) => {
        this.setState({index});
    };

    _renderHeader = (props) => {
        return <TabBar style={styles.tabViewStyle} {...props} tabStyle={styles.tabStyle} labelStyle={styles.labelStyle}
                       indicatorStyle={styles.indicatorStyle} pressColor={"#ff4081"} pressOpacity={5}/>;
    };

    _renderScene = ({route}) => {
        switch (route.key) {
            case '1':
                return <Game_SSC_TREND dataList={this.state.firstList}/>
            case '2':
                return <Game_SSC_TREND dataList={this.state.secondList}/>
            case '3':
                return <Game_SSC_TREND dataList={this.state.thirdList}/>
            case '4':
                return <Game_SSC_TREND dataList={this.state.fourList}/>
            case '5':
                return <Game_SSC_TREND dataList={this.state.fiveList}/>
            case '6':
                return <Game_SSC_TREND dataList={this.state.mixList}/>
        }
    };

    getDataByPosition = (data, position) => {
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
        let startIndex=position*10;
        let endIndex= startIndex+10;
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
        // let headData = {title: "期数", ballList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],isHeader:true}
        //resultList.unshift(headData);
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
        //zIndex:0,
        //backgroundColor:"white",
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