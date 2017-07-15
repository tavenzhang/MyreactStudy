import React from 'react';
import {
    View,
    Text,
} from 'react-native';

import {connect} from 'react-redux';
import BaseView from "../../../componet/BaseView";
import TeamListView from "./agentTeam/TeamListView"
import AgentFindView from "./agentTeam/AgentFindView";
import {NavButtonText} from "../../../componet/navBarMenu/HeaderMenu";


export default class AgentTeamView extends BaseView {

    static navigationOptions = {
        title: "团队管理",
    }

    static navigationOptions = ({navigation})=> ({
        headerRight:<NavButtonText style={{
            marginLeft: 20,
            paddingHorizontal: 8,
            paddingVertical: 4,
            backgroundColor: "rgb(208,199,160)",
            borderRadius: 5
        }} name={"查询"} navigation={navigation} />
    })

    constructor(props) {
        super(props);
        this.state = {
            searchData: {username: '', is_agent: '', date_to: '', date_from: ''},
            dataList:[],
            modalVisible: false
        }
    }

    onRightPressed() {
        this.setState({modalVisible: true});
    }


    componentDidMount() {
        this._getSource(this.state.searchData);
    }
    _getSource(searchData) {

        G_RunAfterInteractions(() => {
            HTTP_SERVER.AgentTeamUser.body.page = 1;
            HTTP_SERVER.AgentTeamUser.body.pagesize = 15;
            HTTP_SERVER.AgentTeamUser.body.username = !!searchData.username ? searchData.username : '';
            HTTP_SERVER.AgentTeamUser.body.is_agent = !!searchData.is_agent ? searchData.is_agent : '';
            HTTP_SERVER.AgentTeamUser.body.date_from = !!searchData.date_from ? searchData.date_from : '';
            HTTP_SERVER.AgentTeamUser.body.date_to = !!searchData.date_to ? searchData.date_to : '';
            ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.AgentTeamUser, (result) => {
                TLog("rowData------------------------------------", result.data);
                if (result.data) {
                    this.setState({dataList: result.data.datas.data});
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
        let {userData} = this.props.navigation.state.params
       // const {searchData}=this.state;
       // TLog('[[[[[[[searchData]]]]]]',searchData);
        return (<View>
            <AgentFindView onFindPress={this.onFindPress} visible={this.state.modalVisible}  hideViewHandle={this.onHideModal}/>
            <TeamListView userData={userData}  dataList={this.state.dataList} {...this.state}/>
        </View>)
    }
}

