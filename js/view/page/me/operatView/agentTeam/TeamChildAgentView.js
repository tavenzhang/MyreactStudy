import React from 'react';
import {
    View,
} from 'react-native';

import {connect} from 'react-redux';

import BaseView from "../../../../componet/BaseView";
import AgentFindView from "./AgentFindView";
import {NavButtonText} from "../../../../componet/navBarMenu/HeaderMenu";
import TeamListView from "./TeamListView";

const mapStateToProps = state => {
    return {
        userData: state.get("appState").get("userData").toJS(),
        moneyBalance: state.get("appState").get("moneyBalance"),
    }
}

@connect(mapStateToProps)
export default class TeamChildAgentView extends BaseView {


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
            curPage:1,
            totalPage:1,
            modalVisible: false
        }
    }

    onRightPressed() {
        this.setState({modalVisible: true});
    }

    componentDidMount() {
        this.loadMore(null,1)
    }

    loadMore = (callBack, isFlush) => {
        let {agentId}=this.props.navigation.state.params;
        let searchData = this.state.searchData;
        if(isFlush)
        {
            HTTP_SERVER.AgentTeamChildUser.body.page = 1;
        }else{
            HTTP_SERVER.AgentTeamChildUser.body.page += 1;
        }
        HTTP_SERVER.AgentTeamChildUser.url = HTTP_SERVER.AgentTeamChildUser.formatUrl.replace(/#id/g,agentId);

        HTTP_SERVER.AgentTeamChildUser.body.username = !!searchData.username ? searchData.username : '';
        HTTP_SERVER.AgentTeamChildUser.body.is_agent = !!searchData.is_agent ? searchData.is_agent : '';
        HTTP_SERVER.AgentTeamChildUser.body.reg_date_from = !!searchData.date_from ? searchData.date_from : '';
        HTTP_SERVER.AgentTeamChildUser.body.reg_date_to = !!searchData.date_to ? searchData.date_to : '';
        ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.AgentTeamChildUser, (result) => {
            if (result.data) {
                this.setState({dataList:G_ArrayUtils.addComapreCopy(this.state.dataList,result.data.datas.data),
                    curPage:result.data.datas.currentPage,
                    totalPage:result.data.datas.pages});
            }
            if(callBack)
            {
                callBack();
            }
        },false,true)
    }


    onHideModal=()=> {
        this.setState({modalVisible: false});
    }

    onFindPress=(data)=>{
        this.setState({modalVisible: false,dataList:[], searchData: data},()=>{
            this.loadMore(null,1)
        });
    }


    renderBody() {
        let {userData} = this.props
        // const {searchData}=this.state;
        // TLog('[[[[[[[searchData]]]]]]',searchData);
        return (<View style={G_Style.appContentView}>
            <AgentFindView onFindPress={this.onFindPress} visible={this.state.modalVisible}  hideViewHandle={this.onHideModal}/>
            <TeamListView loadMore={this.loadMore} curPage={this.state.curPage} totalPage={this.state.totalPage} userData={userData}  dataList={this.state.dataList} {...this.state}/>
        </View>)
    }
}

