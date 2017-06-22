import React from 'react';
import {
    View,
    Text,
} from 'react-native';

import {connect} from 'react-redux';
import BaseView from "../../../componet/BaseView";
import TeamListView from "./agentTeam/TeamListView"
import AgentFindView from "./agentTeam/AgentFindView";

const mapStateToProps = state => {
    return {
        // gameModel:state.get("appState").get("gameModel"),
    }
}

@connect(mapStateToProps)
export default class AgentTeamView extends BaseView {

    constructor(props) {
        super(props);
        this.state = {
            searchData: {username: '', is_agent: '', date_to: '', date_from: ''},
            dataList:[],
            modalVisible: false
        }
        this.resetData=this.resetData.bind(this);
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
                <Text>查询</Text>
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

    resetData(data) {
        TLog('[[[[[[[]]]]]]',data);
        this.setState({modalVisible: false, searchData: data});
        this._getSource(data);
        return true;
    }



    renderBody() {
        let {userData} = this.props.passProps;
        const {searchData}=this.state;
        TLog('[[[[[[[searchData]]]]]]',searchData);


        return (<View>
            <AgentFindView visible={this.state.modalVisible}  hideViewHandle={this.resetData}/>
            <TeamListView userData={userData}  dataList={this.state.dataList} {...this.state}/>
        </View>)
    }
}

