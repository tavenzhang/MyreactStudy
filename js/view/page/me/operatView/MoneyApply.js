import React from 'react';
import {StyleSheet,View } from 'react-native';
import {TabViewAnimated, TabBar } from 'react-native-tab-view';
import BaseView from "../../../componet/BaseView";

import connect from "react-redux/src/components/connect";
import MoneyApplyInView from "./moneyIn/MoneyApplyInView";
import MoneyApplyOutView from "./moneyIn/MoneyApplyOutView";
import {NavButtonText} from "../../../componet/navBarMenu/HeaderMenu";
import MoneySearchView from "./moneyIn/MoneySearchView";

const mapStateToProps = state => {
    return {
        appModel:state.get("appState").get("appModel"),
        userData: state.get("appState").get("userData").toJS(),
    }
}
@connect(mapStateToProps)
export default class MoneyApply extends BaseView {
    static navigationOptions=({navigation, screenProps}) =>({
        headerRight: <NavButtonText style={{
            paddingHorizontal: 5,
            paddingVertical: 5,
            backgroundColor: "rgb(208,199,160)",
            borderRadius: 5}} textStyle={{fontSize:14}} name={"查询"} navigation={navigation}/>
    })

    constructor(props)
    {
        super(props)
        this.state = {
            index:0,
            routes: [
                { key: '1', title: '充值' },
                { key: '2', title: '提现' }
            ],
            dataListIn:[],
            inCurPage:1,
            inTotalPage:1,
            dataListOut:[],
            outCurPage:1,
            outTotalPage:1,
            modelShow:false
        };
    }

    onRightPressed(){
        this.setState({modelShow:!this.state.modelShow})
    }

    _handleChangeTab = (index) => {
        this.setState({index});
    };

    _renderHeader = (props) => {
        return <TabBar style={styles.tabViewStyle} {...props} tabStyle={styles.tabStyle} labelStyle={styles.labelStyle} indicatorStyle={styles.indicatorStyle} pressColor={"#ff4081"} pressOpacity={5} />;
    };

    _renderScene = ({ route }) => {
        switch (route.key) {
            case '1':
                return <MoneyApplyInView curPage={this.state.inCurPage} totalPage={this.state.inTotalPage} appModel={this.props.appModel}  dataList={this.state.dataListIn} style={styles.page} loadMore={this._loadMoreInView} />;
            case '2':
                return <MoneyApplyOutView curPage={this.state.outCurPage} totalPage={this.state.outTotalPage}  appModel={this.props.appModel} dataList={this.state.dataListOut} style={styles.page} loadMore={this._loadMoreOutView} />;
            default:
                return null;
        }
    };

    renderBody() {
        return (
        <View style={G_Style.appContentView}>
            <TabViewAnimated
                lazy={false}
                style={styles.container}
                navigationState={this.state}
                renderScene={this._renderScene}
                renderHeader={this._renderHeader}
                onRequestChangeTab={this._handleChangeTab}
                />
          <MoneySearchView isInMoney={this.state.index==0} {...this.props} hideViewHandle={()=>this.setState({modelShow:false})} onFindPress={this._onInFindPress} visible={this.state.modelShow}/>
         </View>

        );
    }

    componentDidMount(){
        this._loadMoreInView(null,1);
        this._loadMoreOutView(null,1)
    }


    _onInFindPress=(data)=>{
        TLog("_onInFindPress----this.state.index==="+this.state.index,data);
        //{"username":"","date_from":"2017-07-28 01:51:15","date_to":null,"dataNumer":"","pickValue":"6","userPicker":"1",deposit_mode}
        switch (this.state.index){
            case 0:
                HTTP_SERVER.MONEY_IN_APPLY.body.deposit_id=data.dataNumer;
                HTTP_SERVER.MONEY_IN_APPLY.body.status=data.pickValue;
                HTTP_SERVER.MONEY_IN_APPLY.body.user_search_type=data.userPicker;
                HTTP_SERVER.MONEY_IN_APPLY.body.username=data.userName;
                HTTP_SERVER.MONEY_IN_APPLY.body.create_at_from=data.date_from;
                HTTP_SERVER.MONEY_IN_APPLY.body.create_at_to=data.date_to;
                HTTP_SERVER.MONEY_IN_APPLY.body.deposit_mode =data.deposit_mode
                this.setState({dataListIn:[]},()=>{
                    this._loadMoreInView(null,1)
                })
                break;
            case 1:
                HTTP_SERVER.MONEY_OUTER_APPLY.body.serial_number=HTTP_SERVER.MONEY_OTER_TEAM_APPLY.body.serial_number=data.dataNumer;
                HTTP_SERVER.MONEY_OUTER_APPLY.body.status=HTTP_SERVER.MONEY_OTER_TEAM_APPLY.body.status=data.pickValue;
                HTTP_SERVER.MONEY_OUTER_APPLY.body.user_search_type=HTTP_SERVER.MONEY_OTER_TEAM_APPLY.body.user_search_type=data.userPicker;
                HTTP_SERVER.MONEY_OUTER_APPLY.body.username=HTTP_SERVER.MONEY_OTER_TEAM_APPLY.body.username=data.userName;
                HTTP_SERVER.MONEY_OUTER_APPLY.body.create_at_from=HTTP_SERVER.MONEY_OTER_TEAM_APPLY.body.create_at_from=data.date_from;
                HTTP_SERVER.MONEY_OUTER_APPLY.body.date_to=HTTP_SERVER.MONEY_OTER_TEAM_APPLY.body.create_at_to=data.date_to
                this.setState({dataListOut:[]},()=> {
                    this._loadMoreOutView(null, 1)
                })
                break;

        }
    }

    _loadMoreInView = (callFinishBack,isFlush) => {
        if(isFlush) {
            HTTP_SERVER.MONEY_IN_APPLY.body.page = 1;
            HTTP_SERVER.MONEY_IN_APPLY.body.pagesize = 15;
        }
        else{
            HTTP_SERVER.MONEY_IN_APPLY.body.page += 1;
            HTTP_SERVER.MONEY_IN_APPLY.body.pagesize = 15;
        }
        ActDispatch.FetchAct.fetchVoWithResult( HTTP_SERVER.MONEY_IN_APPLY, (result) => {
            if (result.data.data) {
                let arr =  G_ArrayUtils.addComapreCopy(this.state.dataListIn,result.data.data)
                    this.setState({dataListIn: arr,inCurPage:result.data.current_page,inTotalPage:result.data.last_page})
            }
            if(callFinishBack)
            {
                callFinishBack();
            }
        })
    }

    _loadMoreOutView = (callFinishBack,isFlush) => {
        let {userData}=this.props
       let httpServer= userData.isAgent ?  HTTP_SERVER.MONEY_OTER_TEAM_APPLY:HTTP_SERVER.MONEY_OUTER_APPLY
        if(isFlush) {
            httpServer.body.page = 1;
        }
        else{
            httpServer.body.page += 1;
        }
        ActDispatch.FetchAct.fetchVoWithResult(httpServer, (result) => {
            if (result.data.datas.data) {
                let arr =  G_ArrayUtils.addComapreCopy(this.state.dataListOut,result.data.datas.data)
                this.setState({dataListOut: arr,outCurPage:result.data.datas.current_page,outTotalPage:result.data.datas.last_page})
            }
            if(callFinishBack)
            {
                callFinishBack();
            }
        })
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    page: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabStyle:{
        //zIndex:0,
        height:40,
    },
    labelStyle:{
        color:"black",
    },
    indicatorStyle:{
        backgroundColor:"red",
    },
    tabViewStyle:{
        backgroundColor:"white",
    }
});
