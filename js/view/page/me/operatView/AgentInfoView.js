
import React from "react";
import {
    ScrollView
} from "react-native";

import {connect} from "react-redux";
import BaseView from "../../../componet/BaseView";
import MoneyView from "./agentinfo/MoneyView";
import TeamView from "./agentinfo/TeamView";
import AssignView from "./agentinfo/AssignView";
import {NavButtonText} from "../../../componet/navBarMenu/HeaderMenu";

const mapStateToProps = state => {
    return {
        moneyBalance: state.get("appState").get("moneyBalance"),
        userData: state.get("appState").get("userData").toJS(),
    }
}
@connect(mapStateToProps)
export default class AgentInfoView extends BaseView {

    static navigationOptions =     ({navigation})=> ({
        headerRight:<NavButtonText name={"本月排名"} navigation={navigation} isRightButton={true} />
    })


    onRightPressed(){
       G_NavUtil.push(G_RoutConfig.ARankView,null,"本月排名");
    }

    constructor(props) {
        super(props);
        this.state = {
            agentData: null,
        }
    }

    renderBody() {
        return (
            <ScrollView>
                <MoneyView data={this.state.agentData} {...this.props}/>
                <TeamView data={this.state.agentData}/>
                <AssignView data={this.state.agentData}/>
            </ScrollView>
        )
    }

    componentDidMount() {
        G_RunAfterInteractions(() => {
            ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.AgentInfo, (data) => {
                if(data.isSuccess){
                    this.setState({agentData: data.data})
                }
            })
        })

        // let {setParams}=this.props.navigation
        // setParams({onLeftPressed:this.onLeftPressed,onRightPressed:this.onRightPressed,onHeadPressed:this.onHeadPressed})
    }
    componentWillUnmount() {
        ActDispatch.FetchAct.canCelVoFetch(HTTP_SERVER.AgentInfo);
    }
}

