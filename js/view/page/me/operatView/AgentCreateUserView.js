
import React from 'react';
import {
    View,
    Text, StyleSheet,
    Switch,
} from 'react-native';

import {connect} from 'react-redux';
import BaseView from "../../../componet/BaseView";
import CreateHumanView from "./agentCreatUser/CreateHumanView";
import CreateLinkView from "./agentCreatUser/CreateLinkView";
import {NavRightLink} from "../../../componet/navBarMenu/HeaderMenu";
import MySegmentedControlTab from "../../../componet/tcustom/TSegmentedControlTab";

const mapStateToProps = state => {
    return {
        // gameModel:state.get("appState").get("gameModel"),
    }
}

@connect(mapStateToProps)
export default class AgentCreateUserView extends BaseView {
    constructor(props) {
        super(props)
        this.state = {
            selectedTabIndex: 0,
            switchValue:false,
            groupDate:null,
            linkGroupDate:null,
        };
    }

    getNavigationBarProps() {
        return {
            rightView: NavRightLink
        };
    }

    onRightPressed(){
        G_NavUtil.pushToView(G_NavViews.LinkListView());
    }

    renderBody() {
        return (<View>
            <MySegmentedControlTab selectedTabIndex={this.state.selectedTabIndex} valueList={['人工开户', '链接开户']} onTabChange={this.onTabChange}/>
            <View style={{marginHorizontal: 30, alignSelf: "center"}}>
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginVertical: 5,
                    justifyContent: "space-between"
                }}>
                    <Text style={{textAlign: "right"}}>账户类型</Text>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <Text style={{textAlign: "right"}}>代理账号</Text>
                        <Switch style={{marginLeft: 20}} value={this.state.switchValue}
                                onValueChange={(switchValue) => {
                                    this.setState({switchValue})
                                }}/>
                    </View>
                </View>
                {this.state.selectedTabIndex ? <CreateLinkView groupDate={this.state.linkGroupDate} isGentUser={this.state.switchValue}/>:<CreateHumanView groupDate={this.state.groupDate} isGentUser={this.state.switchValue}/> }
            </View>

        </View>)
    }

    onTabChange = (index) => {
        this.setState({selectedTabIndex: index});
    }

    componentDidMount() {
        G_RunAfterInteractions(() => {
            ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.AgentUserGetInfo, (data) => {
                this.setState({groupDate: data.data})
            }, false);
            ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.AgentPrizeGroup, (data) => {
                this.setState({linkGroupDate: data.data})
            }, false);
        })
    }
}
const styles = StyleSheet.create({
    textStyle: {
        width: 200,
        left: 10,
        fontSize: 14,
        height: 30,
        borderWidth: 1,
        borderRadius: 5,
        textAlign: "center"
    },
    itemSp: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical:10
    },
    icoPwd: {
        color: G_Theme.grayDeep,
        fontSize: 20,
    },
    inputContain: {
        paddingBottom: 5,
        marginTop: 15,
        paddingLeft: 5,
        flexDirection: "row",
        height: 40,
        justifyContent: "flex-start",
        alignItems: "center",
        borderColor: 'gray',
        borderBottomWidth: 0.5,
    }
});