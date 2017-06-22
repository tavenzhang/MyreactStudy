
import React from 'react';
import {
    View,
    StyleSheet,

} from 'react-native';

import {connect} from 'react-redux';
import BaseView from "../../../componet/BaseView";
import {NavRightLink} from "../../../componet/navBarMenu/HeaderMenu";
import BankInView from "./moneyIn/BankInView";
import ThirdInView from "./moneyIn/ThirdInView";
import MySegmentedControlTab from "../../../componet/tcustom/TSegmentedControlTab";


const mapStateToProps = state => {
    return {
        // gameModel:state.get("appState").get("gameModel"),
    }
}

@connect(mapStateToProps)
export default class MoneyInView extends BaseView {
    constructor(props) {
        super(props)
        this.state = {
            selectedTabIndex: 0,
            platList:[],
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
            <MySegmentedControlTab selectedTabIndex={this.state.selectedTabIndex} valueList={['第三方充值','银行卡充值']} onTabChange={this.onTabChange}/>
            <ThirdInView platList={this.state.platList} visible={this.state.selectedTabIndex==0}/>
           <BankInView  visible={this.state.selectedTabIndex==1}/>
        </View>)
    }

    onTabChange = (index) => {
        this.setState({selectedTabIndex: index});
    }

    componentDidMount() {
        G_RunAfterInteractions(() => {
            ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.MoneyBankPlatList, (data) => {
                    this.setState({platList:data.data})
            }, false);
            ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.MoneyBankList, (data) => {

            }, false);
        })
    }
}
