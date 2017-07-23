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

const mapStateToProps = state => {
    return {
        userData: state.get("appState").get("userData").toJS(),
        moneyBalance: state.get("appState").get("moneyBalance"),
    }
}

@connect(mapStateToProps)
export default class AgentTeamView extends BaseView {


    static navigationOptions = ({navigation})=> ({
        title: "团队管理",
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
        this.registOnForceFlush(G_RoutConfig.AgentTeamView,(data)=>{
            //id:data.id,prize_group:HTTP_
            let newList=[];
            for (let item of this.state.dataList)
            {
                if(item.id == data.id){
                    item.prize_group = data.prize_group;
                    newList.push(item);
                    break;
                }
            }
            this.setState({dataList:G_ArrayUtils.addComapreCopy(this.state.dataList,newList)});
        })
    }

    onRightPressed() {
        this.setState({modalVisible: true});
    }

    componentDidMount() {
       this.loadMore(null,1)
    }

    componentWillUnmount() {
        ActDispatch.FetchAct.canCelVoFetch(HTTP_SERVER.AgentTeamUser);
    }

    loadMore = (callBack, isFlush) => {
        let searchData = this.state.searchData;
        if(isFlush)
        {
            HTTP_SERVER.AgentTeamUser.body.page = 1;
        }else{
            HTTP_SERVER.AgentTeamUser.body.page += 1;
        }

        HTTP_SERVER.AgentTeamUser.body.username = !!searchData.username ? searchData.username : '';
        HTTP_SERVER.AgentTeamUser.body.is_agent = !!searchData.is_agent ? searchData.is_agent : '';
        HTTP_SERVER.AgentTeamUser.body.reg_date_from = !!searchData.date_from ? searchData.date_from : '';
        HTTP_SERVER.AgentTeamUser.body.reg_date_to = !!searchData.date_to ? searchData.date_to : '';
        ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.AgentTeamUser, (result) => {
            if (result.data) {
                this.setState({dataList:G_ArrayUtils.addComapreCopy(this.state.dataList,result.data.datas.data),
                    curPage:result.data.datas.currentPage,
                    totalPage:result.data.datas.pages});
            }
            if(callBack)
            {
                callBack();
            }
        },false,false)
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

