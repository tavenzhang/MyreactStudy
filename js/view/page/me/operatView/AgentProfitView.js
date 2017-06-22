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
import ProfitListView from "./agentProfit/ProfitListView";
import TeamListView from "./agentTeam/TeamListView";


const mapStateToProps = state => {
    return {
        // gameModel:state.get("appState").get("gameModel"),
    }
}

@connect(mapStateToProps)
export default class AgentProfitView extends BaseView {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            searchData: {username: '', is_agent: '', date_to: '', date_from: ''},
            oSelfProfit: {},
            oAgentSumPerDay: [],
            dataList: [],
        }
        this.resetData = this.resetData.bind(this);

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

    onRightPressed() {
        this.setState({modalVisible: true});
    }

    componentDidMount() {
        this._getSource(this.state.searchData);
    }
    _getSource(searchData) {
        TLog("HTTP_SERVER------------------------------------", HTTP_SERVER.AgentProfit);

        G_RunAfterInteractions(() => {
            HTTP_SERVER.AgentProfit.body.page = 1;
            HTTP_SERVER.AgentProfit.body.pagesize = 15;
            HTTP_SERVER.AgentProfit.body.username = !!searchData.username ? searchData.username : '';
            HTTP_SERVER.AgentProfit.body.is_agent = !!searchData.is_agent ? searchData.is_agent : '';
            HTTP_SERVER.AgentProfit.body.date_from = !!searchData.date_from ? searchData.date_from : '';
            HTTP_SERVER.AgentProfit.body.date_to = !!searchData.date_to ? searchData.date_to : '';
            ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.AgentProfit, (result) => {
                TLog("rowData------------------------------------", result.data.oSelfProfit);
                if (result.data) {
                    this.setState({dataList: result.data.datas.data});
                    this.setState({oSelfProfit: result.data.oSelfProfit});
                    return this.setState({oAgentSumPerDay: result.data.oAgentSumPerDay});
                }
            })
        });
    }

    resetData(data) {
        TLog('[[[[[[[]]]]]]',data);
        this.setState({modalVisible: false, searchData: data});
        this._getSource(data);
        return true;
    }

    renderBody() {
        let {userData} = this.props.passProps;
        const {searchData} = this.state;
        return (<View>
            <AgentSearchView visible={this.state.modalVisible} username={searchData ? searchData.username : ''}
                             is_agent={searchData ? searchData.is_agent : ''}
                             date_from={searchData ? searchData.date_from : ''}
                             date_to={searchData ? searchData.date_to : ''} hideViewHandle={this.resetData}/>
            <ProfitListView userData={userData}  {...this.state}/>

        </View>)
    }
}

