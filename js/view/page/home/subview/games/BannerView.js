import React, {PropTypes}from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    LayoutAnimation
} from 'react-native';
import TFlatList from "../../../../componet/TFlatList";
import AIcon from 'react-native-vector-icons/FontAwesome';
import Ball from "../../../../componet/game/Ball";

export default class BannerView extends React.Component {
    static propTypes = {
        dateHistoryList: PropTypes.array,
        showHistory: PropTypes.bool,
        time: PropTypes.number,
        prize: PropTypes.any,
        currentNumber: PropTypes.any,
        series_id: PropTypes.any,
        leftTime: PropTypes.number,
        onTimeHanlde: PropTypes.func,
    }

    constructor(props) {
        super(props);
        this.state = {
            showHistory: false,
            currentTime: 0
        }
        this.count = 1
    }

    componentWillUpdate(nextProps, nextState) {
        let {currentNumberTime, currentTime} = nextProps;
        G_PLATFORM_IOS ? LayoutAnimation.configureNext(G_LayoutAnimationHelp.springNoDelete):LayoutAnimation.configureNext(G_LayoutAnimationHelp.springNoCreate);
       // TLog("componentWillUpdate----currentNumberTime11==" + this.nowTime+"--"+this.currentNumberTime != currentNumberTime, currentTime)
        if (currentNumberTime &&(this.currentNumberTime != currentNumberTime||this.nowTime!=currentTime)) {
            TLog("currentNumberTime11----" + currentNumberTime, currentTime)
            this.currentNumberTime = currentNumberTime;
            this.nowTime=currentTime;
            this.setState({currentTime}, () => {
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
        let {onTimeHanlde} = this.props

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
        let {series_id} = this.props
        let height = series_id == 4 ? 260 : 150;
        if (this.state.showHistory && dateHistoryList && dateHistoryList[0] != "") {
            historyView =
                <View style={{height: height,width: G_Theme.windowWidth, borderWidth: 0.5, justifyContent: "center",borderColor: G_Theme.gray}}>
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
                            style={styles.timeBannerText}>玩法奖金:<Text
                            style={{color: "red", fontWeight: "bold"}}>{G_moneyFormat(prize)}</Text>元</Text></View>
                    </View>
                    {historyView}
                    {!this.state.showHistory ? <AIcon color="gray" style={{
                        marginTop: -10,
                        alignSelf: "center",
                        backgroundColor: "transparent"
                    }} size={16}name={G_EnumFontNames.list_arrow_desc}/> : null}
                </View>
            </TouchableWithoutFeedback>
        )
    }

    _renderRow = (rowData, index) => {
        const me = this;
        let rowDataArr = rowData.split("=");
        // let bgColor = G_Theme.gray;

        let {series_id} = this.props
        let height = series_id == 4 ? 48 : 26;//基诺  20个球
        let marginTop = series_id == 4 ? 17 : 5;//基诺  20个球
        let ballText = this.getFormatBallText(series_id, rowDataArr[1], index);
        let timeIssue=rowDataArr[0];
      //  timeIssue=timeIssue ? timeIssue.substring(4,timeIssue.length-1):"";

        return (
            <View style={{
                flexDirection: "row",
                paddingVertical: 1,
                height: height,
                paddingLeft: 10,
                alignItems:"center",
                marginTop:2
            }}>
                <Text style={{
                    fontSize: 12,
                    color: G_Theme.grayDeep,
                    width: series_id ==7 ? 100:120
                }}>{`${timeIssue}期号码`}</Text>
                {ballText}
            </View>
        );
    }

    //根据游戏类型格式化某些显示
    getFormatBallText = (sid, stext, index) => {
        let arr = []
        if (!stext) {
            return null;
        }
        switch (sid) {
            case 1:
                arr = stext.split("");
                break;
            case 7:
            case 8:
            case 2:
                arr = stext.split(" ");
                break;
            case 4:
                arr = stext.split(",");
                return this.buildKenoBall(arr, index);
                break;
            default:
                arr = stext.split("");
                break;

        }
        return this.buildBall(arr, index, sid);
    }
    //吉诺选球
    buildKenoBall(ballText, index) {
        const me = this;
        let ballWidth = 24;
        let j = 0;
        let k = 0;
        return <View style={{flex: 7}}>

            <View style={styles.ballBox}>
                {ballText.map((v, i) => {
                    j++;
                    if (j > 10) {
                        return false;
                    }
                    if (index == 0) {
                        return me._firstRow(ballWidth, i, v);
                    }
                    return me._ballRow(ballWidth, i, v);
                })}
            </View>
            <View style={[styles.ballBox, {marginTop: 2}]}>
                {ballText.map((v, i) => {
                    k++;
                    if (k <= 10) {
                        return;
                    }
                    if (index == 0) {
                        return me._firstRow(ballWidth, i, v);
                    }
                    return me._ballRow(ballWidth, i, v);
                })}
            </View>
        </View>
    }


//近期开奖记录的选球
    buildBall(ballText, index) {
        const me = this;
        let ballWidth = 25;
        let radios = 11;

        return <View style={[styles.ballBox, {flex: 7}]}>
            {ballText.map((v, i) => {
                if (index > 0) {
                    return me._ballRow(ballWidth, i, v);
                } else {
                    return me._firstRow(ballWidth, i, v);
                }
            })}
        </View>
    }

    _ballRow(ballWidth, i, v) {
        return <View style={[styles.ballBtnBox, {width: ballWidth}]} key={i}>
            <Text style={{color: G_Theme.primary}}>{v}</Text>
        </View>
    }

    _firstRow(ballWidth, i, v) {

        let radios =11;
        return <View style={[styles.ballBtnBox, {width: ballWidth, marginTop:3}]} key={i}>
            <Ball
                radius={radios}
                text={v}
                row='1'
                value={i}
                textStyle={styles.ballText}
                status='1'
                onPress={(x, y, v) => {
                    return false
                }}
            />
        </View>
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
    moneyText: {
        fontSize: 12,
        color: G_Theme.primary
    },
    ballBtnBox: {
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        height: 30
    },
    ballBox: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    ball: {
        backgroundColor: G_Theme.gray,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 2,
    },
    ballText: {
        color: "#fff",
        fontWeight: 'normal',
        fontSize: 12
    },
    balldesc: {
        color: G_Theme.grayDeep,
        fontWeight: 'normal',
        fontSize: 12
    },
});