import React from 'react';
import {
    View,
    Text, StyleSheet,
    TouchableHighlight,
    LayoutAnimation,
    ListView
} from 'react-native';

import {connect} from 'react-redux';
import BaseView from "../../../componet/BaseView";
import AwardListView from "../../../componet/BaseListView";
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
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2,
            }),
            dataList: [{money: 1950, use: 10, unuse: 100, total: 888}, {
                money: 1951,
                use: 10,
                unuse: 100,
                total: 888
            }, {money: 1952, use: 10, unuse: 100, total: 888}, {money: 1953, use: 10, unuse: 100, total: 888}]
        }
    }

    renderBody() {
        let ds = this.state.dataSource.cloneWithRows(this.state.dataList)
        return (<View style={G_Style.appContentView}>
            <ListView
                dataSource={ds}
                renderHeader={this.renderHeadView}
                renderRow={this.rendeRow}
                //renderSeparator={this.renderSeparator}
            />
        </View>)
    }

    componentDidMount() {
        G_RunAfterInteractions(()=>{
            HTTP_SERVER.AgentAssinList.body.username = this.props.userData.data.username;
            ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.AgentAssinList)
        })
    }

    // renderSeparator=()=>{
    //     return (<View style={{backgroundColor:'red', height:1}}>
    //             </View>)
    // }
    renderHeadView = () => {
        return (<View style={{flexDirection: "row"}}>
            <Text style={[styles.headText, {flex: 2}]}>我的高点配额</Text>
            <Text style={[styles.headText, {borderLeftWidth: 0}]}>已用</Text>
            <Text style={[styles.headText, {borderLeftWidth: 0}]}>未用</Text>
            <Text style={styles.headText}>总量</Text>
            <Button containerStyle={[styles.btnCpStyle,{paddingVertical: 15}]} onPress={() => {
                this.clickDetailBtn({name:"全情"})
            }}><Text style={[styles.btnText,{fontWeight:"bold",}]}>全配</Text></Button>
        </View>)
    }

    rendeRow = (data) => {
        return (<View style={{flexDirection: "row"}}>
            <Text style={[styles.contentText, {flex: 2}]}>{data.money}</Text>
            <Text style={[styles.contentText, {borderLeftWidth: 0}]}>{data.use}</Text>
            <Text style={[styles.contentText, {borderLeftWidth: 0}]}>{data.unuse}</Text>
            <Text style={styles.contentText}>{data.total}</Text>
            <Button containerStyle={styles.btnCpStyle} onPress={() => {
                this.clickDetailBtn(data)
            }}><Text style={styles.btnText}>配额</Text></Button>
        </View>)
    }


    clickDetailBtn = (data) => {
        G_NavUtil.pushToView(G_NavViews.AssignDetilView(data));
    }

}
const styles = StyleSheet.create({
    headText: {
        padding: 10,
        paddingVertical: 15,
        backgroundColor: "rgb(241, 241, 241)",
        flex: 1,
        borderWidth: 1,
        borderColor: "gray",
        textAlign: "center",
        fontWeight: "bold"
    },
    contentText: {
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
        borderBottomWidth:1
    }
})