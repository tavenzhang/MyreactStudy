/**
 * Created by thomas on 2017/6/2.
 */
import React from "react";
import {
    View,
    ScrollView
} from "react-native";

import {connect} from "react-redux";
import BaseView from "../../../componet/BaseView";
import MoneyView from "./agentinfo/MoneyView";
import TeamView from "./agentinfo/TeamView";
import AssignView from "./agentinfo/AssignView";
import {NavRightRank} from "../../../componet/navBarMenu/HeaderMenu";

const mapStateToProps = state => {
    return {
        moneyBalance: state.get("appState").get("moneyBalance"),
        userData: state.get("appState").get("userData").toJS(),
    }
}

@connect(mapStateToProps)
export default class AgentInfoView extends BaseView {

    constructor(props) {
        super(props);
        this.state = {
            agentData: null,
        }
    }

    getNavigationBarProps() {
        return {
            rightView: NavRightRank
        };
    }

    onRightPressed() {
        G_NavUtil.pushToView(G_NavViews.ARankView());
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
                this.setState({agentData: data.data})
            })
        })
    }
}

