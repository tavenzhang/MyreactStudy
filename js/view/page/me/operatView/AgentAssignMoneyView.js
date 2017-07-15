import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight
} from 'react-native';
import TFlatList from "../../../componet/TFlatList";
import {connect} from 'react-redux';
import BaseView from "../../../componet/BaseView";
import Button from "react-native-button";
import AIcon from 'react-native-vector-icons/FontAwesome';


const mapStateToProps = state => {
    return {
        userData: state.get("appState").get("userData").toJS(),
    }
}

@connect(mapStateToProps)
export default class AgentAssignMoneyView extends BaseView {
    static navigationOptions = {
        title: "高点配额",
    }

    constructor(props) {
        super(props);
        this.state = {
            dataList: [],
        }
    }

    renderBody() {
        return (<View style={G_Style.appContentView}>
            <TFlatList
                dataList={this.state.dataList}
                renderHeader={this.renderHeadView}
                renderRow={this.rendeRow}
            />
        </View>)
    }

    componentDidMount() {
        G_RunAfterInteractions(() => {
            HTTP_SERVER.AgentAssinList.body.username = "";
            ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.AgentAssinList, (data) => {
                let dataList = [];
                let obj = data.data.quotas;
                for (let key in obj) {
                    let temp = obj[key];
                    dataList.push(temp);
                }
                this.setState({dataList: dataList})
            })
        })
    }

    renderHeadView = () => {
        return (
            <View style={{flexDirection: "row"}}>
                {/*<Text style={[styles.headView, {flex: 2}]}>我的高点配额</Text>*/}
                {/*<Text style={[styles.headView, {borderLeftWidth: 0}]}>已用</Text>*/}
                {/*<Text style={[styles.headView, {borderLeftWidth: 0}]}>未用</Text>*/}
                {/*<Text style={styles.headView}>总量</Text>*/}
                {/*<Button style={[styles.btnText,{fontWeight:"bold"}]} containerStyle={[styles.btnCpStyle,{paddingVertical: 15}]} onPress={() => {*/}
                {/*this.clickDetailBtn({prize_group:""})*/}
                {/*}}>全配</Button>*/}
            </View>
        )
    }

    rendeRow = (data) => {
        return (
            <TouchableHighlight onPress={() => this.clickDetailBtn(data)} underlayColor='rgba(10,10,10,0.2)'>
                <View style={styles.Pannel}>
                    <View style={{flex: 2, alignItems: 'center', padding: 10}}>
                        <Text style={styles.prizeGroup}>{data.prize_group}</Text>
                        <Text style={styles.limitNum}>总计:{data.limit_num}</Text>
                    </View>
                    <View style={{flex: 2, alignItems: 'center', padding: 10}}>
                        <Text style={styles.Num}>{data.used_num}</Text>
                        <Text style={styles.limitNum}>已用</Text>
                    </View>
                    <View style={{flex: 1, alignItems: 'center', padding: 10}}>
                        <Text style={[styles.Num, {color: 'red'}]}>{data.limit_num - data.used_num}</Text>
                        <Text style={styles.limitNum}>可用</Text>
                    </View>
                    <View style={{flex: 1, alignItems: 'center', padding: 10}}>
                        <AIcon name={"angle-right"}
                               style={{fontSize: 25, alignSelf: "center", color: "gray"}}/>
                    </View>
                </View>
            </TouchableHighlight>)
    }

    clickDetailBtn = (data) => {
        G_NavUtil.push(G_RoutConfig.AssignDetilView,data,"配额详情");
    }
}

const styles = StyleSheet.create({
    limitNum: {
        color: G_Theme.grayDeep

    },
    Num: {
        color: G_Theme.grayDeep,
        fontSize: 16,
        fontWeight: 'bold'
    },
    Pannel: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderColor: G_Theme.gray,
    },
    prizeGroup: {
        fontSize: 18,
        fontWeight: 'bold'
    },


})