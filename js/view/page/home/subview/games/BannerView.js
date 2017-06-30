import React, {PropTypes}from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback
} from 'react-native';
import BaseView from "../../../../componet/BaseView";
import TFlatList from "../../../../componet/TFlatList";
import AIcon from 'react-native-vector-icons/FontAwesome';

export default class BannerView extends BaseView {
    static propTypes = {
        dateHistoryList: PropTypes.array,
        showHistory: PropTypes.bool,
        time: PropTypes.number,
        prize: PropTypes.any,
        currentNumber: PropTypes.any,
        series_id: PropTypes.any,
        leftTime:PropTypes.number,
        onTimeHanlde: PropTypes.func,
    }

    constructor(props) {
        super(props);
        this.state = {
            showHistory: false,
            currentTime:0
        }
        this.count=1
    }

    componentWillUpdate(nextProps, nextState)
    {
        super.componentWillUpdate()
        let {currentNumberTime,currentTime}=nextProps;
        if(currentNumberTime&&this.currentNumberTime!=currentNumberTime)
        {
            TLog("currentNumberTime----"+currentNumberTime,currentTime)
            this.currentNumberTime=currentNumberTime;
            this.setState({currentTime},()=>{
                let dim = (this.currentNumberTime - this.state.currentTime);
                clearInterval(this.timeId);
                if (dim > 0) {
                    this.timeId = setInterval(this.countTime, 1000);
                }
            })
        }
    }

    //倒计时显示
    countTime = () => {
        let {onTimeHanlde}=this.props

        let dim = (this.currentNumberTime - this.state.currentTime);
        if (dim > 0) {
            this.setState({currentTime: this.state.currentTime + 1})
        }
        else {
            clearInterval(this.timeId);
            ActDispatch.AppAct.showBox(`当前第${this.props.currentNumber}期已经结束，新一期即将开始!`);
            onTimeHanlde();
        }
    }

    render() {
        let {dateHistoryList, currentNumber, prize} = this.props
        let historyView = null;
        let dim = (this.currentNumberTime - this.state.currentTime) * 1000;
         dim = dim > 0 ? dim : 0;
         //TLog("dateHistoryList---",dateHistoryList)
        if (this.state.showHistory&&dateHistoryList&&dateHistoryList[0]!="") {
            historyView =
                <View style={{height:100, width:G_Theme.windowWidth}}>
                <TFlatList
                     dataList={dateHistoryList}
                    renderRow={this._renderRow}
                />
                </View>
        }
        return (
            <TouchableWithoutFeedback onPress={() => {
                this.setState({showHistory: !this.state.showHistory});
            }}>
                <View>
                    <View style={styles.timeBanner}>
                        <View><Text style={styles.timeBannerText}>距第{currentNumber}期开奖:<Text style={{
                            color: "red",
                            fontWeight: "bold"
                        }}>{G_DateUtil.formatSecondDate(dim)}</Text></Text></View>
                        <View ref="moreMenuButton" style={{flexDirection: "row"}}><Text
                            style={styles.timeBannerText}>玩法奖金:<Text style={{color: "red",fontWeight: "bold"}}>{G_moneyFormat(prize)}</Text>元</Text></View>
                    </View>
                    {historyView}
                    {!this.state.showHistory ?<AIcon color="gray" style={{marginTop: -10,alignSelf:"center", backgroundColor:"transparent"}} size={16}
                           name={G_EnumFontNames.list_arrow_desc}/>:null}
                </View>
            </TouchableWithoutFeedback>
        )
    }

    _renderRow = (rowData, index) => {
        let rowDataArr = rowData.split("=");
        let bgColor = index % 2 == 0 ? "gray" : "white";
        let {series_id} = this.props
        let ballText = this.getFormatBallText(series_id,rowDataArr[1]);
        return (
            <View   style={{flexDirection: "row", backgroundColor: bgColor, paddingVertical:1}}>
                <Text>{`${rowDataArr[0]}期号码    ${ballText}`}</Text>
            </View>
        );
    }

    //根据游戏类型格式化某些显示
    getFormatBallText=(sid, stext)=>{
        let result="";
        let arr=null
        switch (sid)
        {
           case "1":
               arr=stext.split("");
               result=arr.join(" ");
               break;
           case "2":
               result=stext;
               break;
            default:
                arr=stext.split("");
                result=arr.join(" ");
                break;

        }
        return result;
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        clearInterval(this.timeId);
    }

}


const styles = StyleSheet.create({
    timeBanner: {
        flexDirection: 'row',
        justifyContent: "space-between",
        backgroundColor: '#ddd',
        padding: 5
    },
    timeBannerText: {
        fontSize: 12
    },
    row: {
        flexDirection: 'row',
        height: 40,
        borderBottomColor: "#ddd",
        borderBottomWidth: 1,
    },
    moneyText:{
        fontSize: 12,
        color:G_Theme.primary
    }
});