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
            pwdText: "",
            modalVisible: false
        }
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

    renderBody() {
        return (<View>
            <AgentFindView visible={this.state.modalVisible} hideViewHandle={(data) => {
                TLog("AgentFindView-----",data);
                this.setState({modalVisible: false});
            }}/>
            <TeamListView/>
        </View>)
    }
}

