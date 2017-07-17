import React from 'react';
import {
    View,
    Text,
} from 'react-native';

import BaseView from "../../../componet/BaseView";
import AgentSearchView from "./agentProfit/AgentSearchView";
import ProfitListView from "./agentProfit/ProfitListView";
import {NavButtonText} from "../../../componet/navBarMenu/HeaderMenu";


export default class AgentProfitView extends BaseView {

    static navigationOptions = ({navigation})=> ({
        title: "盈亏报表",
        headerRight:<NavButtonText style={{
            marginLeft: 20,
            paddingHorizontal: 8,
            paddingVertical: 4,
            backgroundColor: "rgb(208,199,160)",
            borderRadius: 5
        }} name={"搜索"} navigation={navigation} />
    })


    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            searchData: {username: '', is_agent: '', date_to: '', date_from: ''},
            oSelfProfit: {},
            oAgentSumPerDay: [],
            dataList: [],
            curPage:1,
            totalPage:1,

        }
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

    onHideModal=()=> {
        this.setState({modalVisible: false});
    }

    onFindPress=(data)=>{
        TLog('onFindPress---------',data);
        this.setState({modalVisible: false, searchData: data});
        this._getSource(data);
    }



    renderBody() {
        let {userData} = this.props.navigation.state.params;
        const {searchData} = this.state;
        return (<View>
            <AgentSearchView onFindPress={this.onFindPress} visible={this.state.modalVisible} username={searchData ? searchData.username : ''}
                             is_agent={searchData ? searchData.is_agent : ''}
                             date_from={searchData ? searchData.date_from : ''}
                             date_to={searchData ? searchData.date_to : ''} hideViewHandle={this.onHideModal}/>
            <ProfitListView curPage={this.state.curPage} totalPage={this.state.totalPage} userData={userData}  {...this.state}/>

        </View>)
    }
}

