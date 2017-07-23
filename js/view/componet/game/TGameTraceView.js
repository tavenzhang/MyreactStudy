import React, {Component, PropTypes} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import {connect} from 'react-redux';

import GameTraceKeyBorad from "./GameTraceKeyBorad";
import GameTracemMultipleKeyBorad from "./GameTracemMultipleKeyBorad";
import TModalView from "../tcustom/modal/TModalView";
import {TButton, TButtonView} from "../tcustom/button/TButton";
import MySegmentedControlTab from "../tcustom/TSegmentedControlTab";
import CheckBox from "react-native-check-box";
import {TTextInput} from "../tcustom/textInput/TTextInput";
import TFlatList from "../TFlatList";

// const mapStateToProps = state => {
//     return {
//         isTrace: state.get("gameState").get("isTrace"),
//         traceTimes: state.get("gameState").get("traceTimes"),
//         traceMultiple: state.get("gameState").get("traceMultiple"),
//         gameNumbers: state.get("gameState").get("gameNumbers"),
//     }
// }
// @connect(mapStateToProps)
export default class TGameTraceView extends Component {
    constructor(props) {
        super(props);
        this.state =
            {
                multiple: 1,
                isShowKeyTrace: false,
                isShowKeyMultiple: false,
                trace: 1,
                showModel: false,
                selectedTabIndex: 0,
                checkSelect: true,
                profite: 50,
                timeNum: 10,
                traceList: []
            };
        // this.inputMultiple = this.inputMultiple.bind(this);
        // this.setMultiple = this.setMultiple.bind(this);
        // this.setTrace = this.setTrace.bind(this);
        // this.inputTrace = this.inputTrace.bind(this);
        // this.setIsShowKeyMultiple = this.setIsShowKeyMultiple.bind(this);
        // this.setIsShowKeyTrace = this.setIsShowKeyTrace.bind(this);
        // this.serTraceInfo = this.serTraceInfo.bind(this);
    }


    render() {
        let {orderList, isTrace, traceTimes, gameNumbers, orderListNum, traceMultiple, userData} = this.props
        //userData.data.user_prize_group
        return (
            <View >
                <View style={styles.tracePanel}>
                    <View style={{
                        flexDirection: 'row',
                        flex: 1,
                        borderRightWidth: 0.5,
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <TButton disable={orderListNum <= 0} btnName={" 我要追号"}
                                 onPress={() => this.setState({showModel: true})}/>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        flex: 1,
                        paddingLeft: 20,
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <TButton disable={!isTrace} btnName={" 取消追号"}/>
                    </View>
                </View>
                <TModalView visible={this.state.showModel}>
                    <View style={{flex: 1, justifyContent: "center", backgroundColor: "rgba(50, 50, 50,0.6)"}}>
                        <View style={{flex: 1, marginTop: 90, marginBottom: 45, backgroundColor: "white"}}>
                            <MySegmentedControlTab selectedTabIndex={this.state.selectedTabIndex}
                                                   valueList={['利润追号', '同倍追号', '翻倍追号']} onTabChange={this.onTabChange}/>
                            <View>
                                <View style={{flexDirection: "row", alignItems: "center"}}>
                                    <Text>最低收益率:</Text>
                                    <TTextInput viewStyle={styles.traceInput}
                                                onChangeText={(profite) => this.setState({profite})}
                                                value={this.state.profite.toString()} keyboardType={ 'numeric'}/>
                                    <Text>% </Text>
                                    <Text>追号期数:</Text>
                                    <TTextInput viewStyle={styles.traceInput}
                                                onChangeText={(timeNum) => this.setState({timeNum})}
                                                value={this.state.timeNum.toString()} keyboardType={ 'numeric'}/>
                                    <TButton btnName={"生成追号计划"} onPress={this._onProduceTrace}/>
                                </View>
                            </View>
                            <TFlatList styleView={{height: 250}} dataList={this.state.traceList}
                                       renderRow={this._onRenderRow} renderHeader={this._onRenderHeader}/>
                            <CheckBox
                                style={{padding: 10}}
                                onClick={() => this.setState({checkSelect: !this.state.checkSelect})}
                                isChecked={this.state.checkSelect}
                                rightText={'中奖后停止追号'}
                            />
                            <View style={{flexDirection: "row"}}>
                                <Text>一共追号期数:111</Text>
                            </View>
                            <View style={{flexDirection: "row", flex: 1, alignSelf: "center", marginTop: 20}}>
                                <TButton btnName={"确定追号"} viewStyle={{marginHorizontal: 10}}/>
                                <TButton btnName={"取消追号"} onPress={() => this.setState({showModel: false})}/>
                            </View>
                        </View>
                    </View>
                </TModalView>
            </View>
        );
    }
    _onRenderHeader = (data) => {
        return (<View style={{flexDirection: "row"}}>
            <View style={{flex: 2}}>
                <Text> 追号期次</Text>
            </View>
            <View style={{flex: 1}}>
                <Text>倍数</Text>
            </View>
            <View style={{flex: 1}}>
                <Text>金额</Text>
            </View>
            <View style={{flex: 1}}>
                <Text>奖金</Text>
            </View>
            <View style={{flex: 1}}>
                <Text>盈利金额</Text>
            </View>
        </View>)
    }

    _onRenderRow = (data) => {
        return (<View style={{flexDirection: "row"}}>
            <View style={{flex: 2}}>
                <Text>{data.gameNumbers}</Text>
            </View>
            <View style={{flex: 1}}>
                <Text>{data.mulity} 倍</Text>
            </View>
            <View style={{flex: 1}}>
                <Text>{data.money}</Text>
            </View>
            <View style={{flex: 1}}>
                <Text>{data.group} </Text>
            </View>
            <View style={{flex: 1}}>
                <Text>{data.profit} </Text>
            </View>
        </View>)
    }

    onTabChange = (data, selected) => {
        TLog("onTabChange---------" + selected, data)
        this.setState({selectedTabIndex: selected});
    }

    _onProduceTrace = () => {
        TLog("onTabChange---_onProduceTrace------"+ this.state.timeNum,orderListNum)
        let {orderList, isTrace, traceTimes, gameNumbers, orderListNum, traceMultiple, userData} = this.props
        if (this.state.selectedTabIndex == 0) {
            // let number = newTraceInfo[j].traceNumber,
            // multiple = newTraceInfo[j].traceMultiple;
            let traceList = []
            for (let i = 0; i < this.state.timeNum; i++) {
                let item = {}
                item.gameNumbers = gameNumbers[i].number;
                item.mulity = 1;
                item.money = 1,
                    item.group =  userData.data.user_prize_group;
                item.profit =parseInt(item.group) -  (i + 1) * item.money;
                TLog("traceList----item.group=="+item.group,(i + 1) * item.money)
                traceList.push(item)
            }

            this.setState({traceList: traceList})
        }
    }
}


const styles = StyleSheet.create({
    listViewSp:{
        justifyContent:"center",
        alignItems:"center",
        flex:1
    },
    traceInput: {
        width: 30,
        borderWidth: 1,
        padding: 0,
        marginHorizontal: 5,
        borderColor: "gray",
        paddingHorizontal: 5
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