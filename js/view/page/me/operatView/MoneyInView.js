
import React from 'react';
import {
    View
} from 'react-native';
import BaseView from "../../../componet/BaseView";
import BankInView from "./moneyIn/BankInView";
import ThirdInView from "./moneyIn/ThirdInView";
import MySegmentedControlTab from "../../../componet/tcustom/TSegmentedControlTab";


export default class MoneyInView extends BaseView {
    static navigationOptions={
        title:"账户充值"
    }

    constructor(props) {
        super(props)
        this.state = {
            selectedTabIndex: 0,
            platList:[],
        };
    }



    renderBody() {
        return (<View>
            <MySegmentedControlTab selectedTabIndex={this.state.selectedTabIndex} valueList={['第三方充值','银行卡充值']} onTabChange={this.onTabChange}/>
            <ThirdInView platList={this.state.platList} visible={this.state.selectedTabIndex==0}/>
           <BankInView  visible={this.state.selectedTabIndex==1}/>
        </View>)
    }

    onTabChange = (data,index) => {
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
