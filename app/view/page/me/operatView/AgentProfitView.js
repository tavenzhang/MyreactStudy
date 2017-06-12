import React from 'react';
import {
    View,
    Text, StyleSheet,
    TouchableHighlight,
    LayoutAnimation,
    Picker,
    TextInput
} from 'react-native';

import {connect} from 'react-redux';
import BaseView from "../../../componet/BaseView";
import AgentSearchView from "./agentProfit/AgentSearchView";


const mapStateToProps = state => {
    return {
        // gameModel:state.get("appState").get("gameModel"),
    }
}

@connect(mapStateToProps)
export default class AgentProfitView extends BaseView {

    constructor(props)
    {
        super(props);
        this.state={
            pwdText:"",
            modalVisible:false
        }
        this.dateValidList = [{name: "所有类型", value: 1},{name: "自己", value: 7}, {name: "玩家", value: 7}, {name: "代理", value: 30}]
    }

    getNavigationBarProps() {
        return {
            rightView: this.navRigntView
        };
    }

    navRigntView = () => {
        return (
            <View style={{
                marginLeft: 20,
                paddingHorizontal: 8,
                paddingVertical: 4,
                backgroundColor: "rgb(208,199,160)",
                borderRadius: 5
            }}>
                <Text>搜索</Text>
            </View>
        )
    }
    onRightPressed(){
        this.setState({modalVisible: true});
    }
    renderBody(){
        return (<View style={{justifyContent:"center", alignItems:"center"}}>
            <AgentSearchView visible={this.state.modalVisible} hideViewHandle={(data) => {
                TLog("AgentSearchView----",data);
                this.setState({modalVisible: false});
            }}/>
        </View>)
    }
}

