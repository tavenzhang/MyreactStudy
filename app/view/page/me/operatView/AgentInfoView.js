/**
 * Created by thomas on 2017/6/2.
 */
import React from "react";
import {View} from "react-native";

import {connect} from "react-redux";
import BaseView from "../../../componet/BaseView";
import MoneyView from "./agentinfo/MoneyView";
import TeamView from "./agentinfo/TeamView";
import AssignView from "./agentinfo/AssignView";
import { NavRightRank} from "../../../componet/navBarMenu/HeaderMenu";

const mapStateToProps = state => {
    return {
        // gameModel:state.get("appState").get("gameModel"),
    }
}

@connect(mapStateToProps)
export default class AgentInfoView extends BaseView {

    getNavigationBarProps() {
        return {
            rightView: NavRightRank
        };
    }

    onRightPressed(){
         G_NavUtil.pushToView(G_NavViews.ARankView());
    }

    renderBody() {
        return (
            <View>
                <MoneyView data={null}/>
                <TeamView data={null}/>
                <AssignView data={null}/>
            </View>
        )
    }
}

