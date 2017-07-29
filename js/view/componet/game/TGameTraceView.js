import React, {Component, PropTypes} from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import TModalView from "../tcustom/modal/TModalView";
import {TButton} from "../tcustom/button/TButton";
import MySegmentedControlTab from "../tcustom/TSegmentedControlTab";
import CheckBox from "react-native-check-box";
import {TTextInput} from "../tcustom/textInput/TTextInput";
import TFlatList from "../TFlatList";

export default class TGameTraceView extends Component {
    constructor(props) {
        super(props);
        this.state =
            {
                multiple: 1,
                isShowKeyTrace: false,
                isShowKeyMultiple: false,
                trace: 1,
                selectedTabIndex: 0,
                traceWinStop: true,
                profite: 50,
                timeNum: 10,
                traceList: [],
                startMulty: 1,
                dimMulty: 1,
                lastMulty: 1,

            };
    }


    render() {
        let { orderListNum,isCanChase,traceData,isShow,onCloseModel} = this.props;
        let validMoney = 0;
        let validIssueNum = 0
        this.state.traceList.map((item) => {
            if (item.money > 0) {
                validIssueNum++;
                validMoney += item.money;
            }
        })
        return (
            <TModalView isAutoHide={false} visible={isShow}>
                <View style={{flex: 1, justifyContent: "center", backgroundColor: "rgba(50, 50, 50,0.6)"}}>
                    <View style={{flex: 1, marginTop: 90, marginBottom: 45, backgroundColor: "white"}}>
                        <MySegmentedControlTab selectedTabIndex={this.state.selectedTabIndex}
                                               valueList={['利润追号', '同倍追号', '翻倍追号']} onTabChange={this.onTabChange}/>
                        <View>
                            {this._rendMenuBarView()}
                        </View>
                        <TFlatList styleView={{height: G_PLATFORM_IOS ?280:200, marginVertical: 10, backgroundColor: "#ddd"}}
                                   dataList={this.state.traceList}
                                   renderRow={this._onRenderRow} renderHeader={this._onRenderHeader}/>
                        <View style={{flexDirection: "row", alignItems: "center"}}>
                            <CheckBox
                                style={{padding: 10}}
                                onClick={() => this.setState({traceWinStop: !this.state.traceWinStop})}
                                isChecked={this.state.traceWinStop}
                                rightTextView={<Text>{'中奖后停止追号'}</Text>}
                                />
                            <TButton containerStyle={{backgroundColor: "blue", marginLeft: 20, paddingVertical: 4}}
                                     visible={this.state.traceList.length > 0}
                                     btnName={"清除追号"} onPress={() => this.setState({traceList: []})}/>
                        </View>
                        <View style={{flexDirection: "row", alignItems: "center"}}>
                            <Text>一共追号期数: {validIssueNum} 期, {validIssueNum * orderListNum} 注 总金额: <Text
                                style={{color: "red", fontWeight: "bold"}}>{validMoney} 元</Text></Text>
                        </View>
                        <View style={{flexDirection: "row", flex: 1, alignSelf: "center", marginTop: 20}}>
                            <TButton disable={validIssueNum <= 0} btnName={"确定追号"}
                                     viewStyle={{marginHorizontal: 20}} onPress={this._onConfirmPress}/>
                            <TButton btnName={"取消"}
                                     containerStyle={{backgroundColor: "green", paddingHorizontal: 30}}
                                     onPress={() => onCloseModel()}/>
                        </View>
                    </View>
                </View>
            </TModalView>
        );
    }


    _rendMenuBarView = () => {
        let contentView = null
        switch (this.state.selectedTabIndex) {
            case 0:
                contentView = (<View style={[{flexDirection: "row", alignItems: "center"}]}>
                    <Text>最低收益率:</Text>
                    <TTextInput style={styles.traceInput}
                                onChangeText={(profite) => this.setState({profite})}
                                value={this.state.profite.toString()} keyboardType={ 'numeric'}/>
                    <Text>% </Text>
                </View>)
                break;
            case 1:
                contentView = (<View style={[{flexDirection: "row", alignItems: "center"}]}>
                    <Text>起始倍数:</Text>
                    <TTextInput style={styles.traceInput}
                                onChangeText={(startMulty) => this.setState({startMulty})}
                                value={this.state.startMulty.toString()} keyboardType={ 'numeric'}/>
                </View>)

                break;
            case 2:
                contentView = (<View style={[{flexDirection: "row", alignItems: "center"}]}>
                    <Text>起始倍数:</Text>
                    <TTextInput style={styles.traceInput}
                                onChangeText={(startMulty) => this.setState({startMulty})}
                                value={this.state.startMulty.toString()} keyboardType={ 'numeric'}/>
                    <Text>隔</Text>
                    <TTextInput style={styles.traceInput}
                                onChangeText={(dimMulty) => this.setState({dimMulty})}
                                value={this.state.dimMulty.toString()} keyboardType={ 'numeric'}/>
                    <Text> 倍x</Text>
                    <TTextInput style={styles.traceInput}
                                onChangeText={(lastMulty) => this.setState({lastMulty})}
                                value={this.state.lastMulty.toString()} keyboardType={ 'numeric'}/>
                </View>)
                break;
        }

        return (<View style={{flexDirection: "row", flexWrap: "wrap", alignItems: "center", marginTop: 10}}>
            {contentView}
            <Text>追号期数:</Text>
            <TTextInput style={[styles.traceInput, {width: 35}]}
                        onChangeText={(timeNum) => {
                            timeNum=parseInt(timeNum)
                            timeNum = timeNum > 200 ? 200 : timeNum;
                            this.setState({timeNum})
                        }}
                        value={this.state.timeNum.toString()}
                        keyboardType={ 'numeric'}/>
            <TButton containerStyle={{backgroundColor: "green", paddingVertical: 5, marginVertical: 2}}
                     btnName={"生成追号计划"} onPress={this._onProduceTrace}/>
        </View>)
    }

    _onRenderHeader = () => {
        return (<View style={{flexDirection: "row"}}>
            <View style={[styles.listViewHeadSp, {flex: 2}]}>
                <Text> 追号期次</Text>
            </View>
            <View style={[styles.listViewHeadSp]}>
                <Text>倍数</Text>
            </View>
            <View style={[styles.listViewHeadSp]}>
                <Text>金额</Text>
            </View>
            <View style={[styles.listViewHeadSp]}>
                <Text>奖金</Text>
            </View>
            <View style={[styles.listViewHeadSp, {flex: 2}]}>
                {
                    this.state.selectedTabIndex ==0 ?<Text>盈利金额</Text>:<Text>开奖时间</Text>
                }
            </View>
        </View>)
    }

    _onRenderRow = (data) => {
        // TLog("_onRenderRow-----"+data.mulity,data)
        return (
            <View style={{flexDirection: "row", paddingVertical: 5, borderBottomWidth: 1, borderBottomColor: "gray"}}>
                <View style={[styles.listViewSp, {flex: 2}]}>
                    <CheckBox
                        style={{}}
                        onClick={() => this._onChangeChectIssu(data)}
                        isChecked={data.used}
                        rightTextView={ <Text>{data.gameNumbers}</Text>}
                    />
                </View>
                <View style={[styles.listViewSp]}>
                    <TTextInput value={data.mulity.toString()} style={{
                        textAlign: "center", width: 30, borderWidth: 1,
                        borderColor: "gray"
                    }} keyboardType={"numeric"} onChangeText={(value) => {
                        value=value==""? 1:value
                        value=parseInt(value)
                        value=value <=0 ? 1:value;
                        this._onChangeMulity(data, value)}}/>
                </View>
                <View style={[styles.listViewSp]}>
                    <Text style={{color: "red"}}>{G_DateUtil.formatMoney(data.money)}</Text>
                </View>
                <View style={[styles.listViewSp]}>
                    <Text>{data.group} </Text>
                </View>
                <View style={[styles.listViewSp, {flex: 2}]}>
                    {
                        this.state.selectedTabIndex ==0 ?   <View style={styles.listViewSp}>
                            <Text>{data.money > 0 ? G_DateUtil.formatMoney(data.profit) : 0}</Text>
                            <Text>({data.money > 0 ? ((data.profit / data.money) * 100).toFixed(2) : 0}%)</Text>
                        </View>:<Text>{data.time}</Text>
                    }

                </View>
            </View>)
    }

    _onChangeChectIssu = (itemData) => {
        let changeList = []
        let {totalMoney,prize} = this.props
        itemData.used = !itemData.used;
        itemData.group = itemData.used ? itemData.mulity * prize: 0
        itemData.money = itemData.used ? itemData.mulity * totalMoney : 0;
        changeList.push(itemData);
        this.setState({traceList: G_ArrayUtils.addComapreCopy(this.state.traceList, changeList, "gameNumbers")})
    }


    _onChangeMulity = (itemData, value) => {
        let {totalMoney, prize} = this.props
        let changeList = []
        let consume=0;
        for (let item of this.state.traceList) {
            if (item.gameNumbers == itemData.gameNumbers) {
                item.mulity = value;
                item.money = item.mulity * totalMoney;
                item.group = item.mulity * prize;
                changeList.push(item);
            }
            consume += item.money
            item.profit=  item.group-consume;
        }
        this.setState({traceList: G_ArrayUtils.addComapreCopy(this.state.traceList, changeList, "gameNumbers")})
    }

    onTabChange = (data, selected) => {
        TLog("onTabChange---------" + selected, data)
        this.setState({selectedTabIndex: selected, traceList: []});
    }

    _onProduceTrace = () => {
        let {totalMoney} = this.props
      //  TLog("onTabChange---_onProduceTrace------" + this.state.timeNum)
        let {gameNumbers, prize} = this.props
        let traceList = []
        switch (this.state.selectedTabIndex) {
            case 0:
                let consume=0
                for (let i = 0; i <  this.state.timeNum; i++) {
                    TLog("this.state.timeNum--"+prize,gameNumbers)
                    let item = {}
                    item.gameNumbers = gameNumbers[i].number;
                    item.time=gameNumbers[i].time
                    item.mulity = 1;
                    item.money = item.mulity * totalMoney;
                    consume+=item.money
                    item.group = item.mulity*prize;
                    item.profit = item.group - consume;
                    item.used = true;
                    if ((item.profit / item.money) * 100 >= this.state.profite) {
                        traceList.push(item)
                    } else {
                        break;
                    }
                    TLog("this.state.timeNum--end--traceList",traceList)
                }
                break;
            case 1:
                for (let i = 0; i < this.state.timeNum; i++) {
                    let item = {}
                    item.gameNumbers = gameNumbers[i].number;
                    item.time=gameNumbers[i].time
                    item.mulity = this.state.startMulty;
                    ;
                    item.money = item.mulity * totalMoney
                    item.group = item.mulity*prize;
                    item.profit = parseInt(item.group) - (i + 1) * item.money;
                    item.used = true;
                    traceList.push(item)
                }
                break;
            case 2:
                let tempCount = 0;
                let dim = parseInt(this.state.dimMulty) + 1;
                for (let i = 0; i < this.state.timeNum; i++) {
                    let item = {}
                    tempCount++;
                    TLog("tempCount=====" + tempCount, dim);
                    if (tempCount % dim == 0) {
                        item.mulity = this.state.lastMulty;
                    }
                    else {
                        item.mulity = this.state.startMulty;
                    }
                    item.gameNumbers = gameNumbers[i].number;
                    item.time=gameNumbers[i].time
                    item.money = item.mulity * totalMoney
                    item.group = item.mulity*prize;
                    item.profit = parseInt(item.group) - (i + 1) * item.money;
                    item.used = true;
                    traceList.push(item)
                }
                break;
        }
        this.setState({traceList: traceList})
    }

    _onConfirmPress = () => {
        let {wayId,onCloseModel}=this.props;
        let validMoney = 0;
        let validIssueNum = 0
        let traceList = []
        this.state.traceList.map((item) => {
            if (item.money > 0) {
                validIssueNum++;
                validMoney += item.money;
                traceList.push({issue: item.gameNumbers, mulity: item.mulity})
            }
        })
        let data = {};
        data.isTrace = 1;
        data.traceTimes = validIssueNum;
        data.traceWinStop = this.state.traceWinStop;
        data.traceList = traceList;
        data.traceTotalMoney = validMoney;
        data.traceWayId=wayId;
        ActDispatch.GameAct.setTrace(data);
        onCloseModel()
    }

}


const styles = StyleSheet.create({
    listViewHeadSp: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        backgroundColor: "yellow",
        paddingVertical: 5
    },
    listViewSp: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },
    traceInput: {
        width: 25,
        borderWidth: 1,
        padding: 0,
        marginHorizontal: 5,
        borderColor: "gray",
        textAlign: "center",
    },
    tracePanel: {
        flex: 1,
        flexDirection: 'row',
        position: 'absolute',
        bottom: 48,
        width: G_Theme.windowWidth,
        height: 45,
        borderTopWidth: 0.5,
        borderColor: G_Theme.grayDeep,
        backgroundColor: '#fff',
        padding: 10,
        // justifyContent: 'space-between'
    },
    traceKeyBoardPanel: {
        flex: 1,
        flexDirection: 'row',
        position: 'absolute',
        bottom: 100,
        width: G_Theme.windowWidth,
        height: 40,
        borderTopWidth: 0.5,
        borderColor: G_Theme.grayDeep,

        padding: 10,
        // justifyContent: 'space-between'
    },

    lotterys: {
        fontSize: 12,

    },
    textInput: {
        borderWidth: 0.5,
        borderColor: G_Theme.grayDeep,
        borderRadius: 5,
        marginHorizontal: 5,
        height: 22,
        width: 80,
        textAlign: 'center',
        marginHorizontal: 10,
    }
});