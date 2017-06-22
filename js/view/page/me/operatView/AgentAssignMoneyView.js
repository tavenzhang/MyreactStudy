import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ListView
} from 'react-native';

import {connect} from 'react-redux';
import BaseView from "../../../componet/BaseView";
import Button from "react-native-button";

const mapStateToProps = state => {
    return {
        userData: state.get("appState").get("userData").toJS(),
    }
}

@connect(mapStateToProps)
export default class AgentAssignMoneyView extends BaseView {

    constructor(props) {
        super(props);
        this.state = {
            dataList:[],
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2,
                },
            ),
        }
    }

    renderBody() {
        let ds = this.state.dataSource.cloneWithRows(this.state.dataList)
        return (<View style={G_Style.appContentView}>
            <ListView
                dataSource={ds}
                renderHeader={this.renderHeadView}
                renderRow={this.rendeRow}
                enableEmptySections={true}
            />
        </View>)
    }

    componentDidMount() {
        G_RunAfterInteractions(()=>{
            HTTP_SERVER.AgentAssinList.body.username = "";
            ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.AgentAssinList,(data)=>{
                let dataList=[];
                let obj = data.data.quotas;
                for(let key in obj){
                    let temp = obj[key];
                    dataList.push(temp);
                }
                this.setState({dataList:dataList})
            })
        })
    }

    renderHeadView = () => {
        return (<View style={{flexDirection: "row"}}>
            <Text style={[styles.headView, {flex: 2}]}>我的高点配额</Text>
            <Text style={[styles.headView, {borderLeftWidth: 0}]}>已用</Text>
            <Text style={[styles.headView, {borderLeftWidth: 0}]}>未用</Text>
            <Text style={styles.headView}>总量</Text>
            <Button style={[styles.btnText,{fontWeight:"bold"}]} containerStyle={[styles.btnCpStyle,{paddingVertical: 15}]} onPress={() => {
                this.clickDetailBtn({prize_group:""})
            }}>全配</Button>
        </View>)
    }

    rendeRow = (data) => {
        return (<View style={{flexDirection: "row"}}>
            <Text style={[styles.contentView, {flex: 2}]}>{data.prize_group}</Text>
            <Text style={[styles.contentView, {borderLeftWidth: 0}]}>{data.used_num}</Text>
            <Text style={[styles.contentView, {borderLeftWidth: 0}]}>{data.limit_num - data.used_num}</Text>
            <Text style={styles.contentView}>{data.limit_num}</Text>
            <Button style={styles.btnText} containerStyle={styles.btnCpStyle} onPress={() => {
                this.clickDetailBtn(data)
            }}>配额</Button>
        </View>)
    }

    clickDetailBtn = (data) => {
        G_NavUtil.pushToView(G_NavViews.AssignDetilView(data));
    }
}

const styles = StyleSheet.create({
    headView: {
        padding: 10,
        paddingVertical: 15,
        backgroundColor: "rgb(241, 241, 241)",
        flex: 1,
        borderWidth: 1,
        borderColor: "gray",
        textAlign: "center",
        fontWeight: "bold"
    },
    contentView: {
        padding: 10,
        flex: 1,
       borderWidth: 1,
        borderColor: "gray",
        textAlign: "center"
    },
    btnCpStyle:{
        padding:10,
        flex: 1,
        borderWidth: 1,
        borderColor: "gray",

    },
    btnText:{
        color:"blue",
        textAlign: "center",
        borderBottomWidth:1,
        fontSize:14
    }
})