
import React ,{PropTypes} from 'react';
import {
    View,
    StyleSheet,
    Text
} from 'react-native';
import BaseView from "../../../../componet/BaseView";
import MySegmentedControlTab from "../../../../componet/tcustom/TSegmentedControlTab";
import TFlatList from "../../../../componet/TFlatList";


export  default  class ARankView extends  BaseView{

    static  propTypes={
        data:PropTypes.any
    }

    constructor(props)
    {
        super(props);
        this.state = {
            selectedTabIndex: 0,
            saleList:[],
            accountList:[],
            profitList:[]
        };
    }
    renderBody() {
        return(<View style={G_Style.appContentView}>
                <MySegmentedControlTab selectedTabIndex={this.state.selectedTabIndex} valueList={['投注额', '开户数',"净盈亏"]} onTabChange={this.onTabChange}/>
                <TFlatList
                    dataList={this.state.dataList}
                    renderHeader={this._rendHeadView}
                    renderRow={this._rendRow}
                />
            </View>
        );
    }

    _rendHeadView=()=>{
        let titleList=["投注额","开户数","净盈亏"]
        return (<View style={{flexDirection: "row", borderWidth:1, backgroundColor:G_Theme.gray}}>
            <Text style={styles.headView}>用户名</Text>
            <Text style={styles.headView}>属性</Text>
            <Text style={styles.headView}>奖金组</Text>
            <Text style={styles.headView}>团人数</Text>
            <Text style={[styles.headView, {flex:2}]}>团队余额</Text>
            <Text style={[styles.headView]}>{titleList[this.state.selectedTabIndex]}</Text>
        </View>)
    }

    _rendRow=(data,section)=>{
        return (<View style={{flexDirection: "row", borderWidth:1}}>
            <Text style={styles.contentView}>{data.username}</Text>
            <Text style={styles.contentView}>{data.user_level_txt}</Text>
            <Text style={styles.contentView} numberOfLines={2}>{data.prize_group}</Text>
            <Text style={styles.contentView} numberOfLines={2}>{data.direct_child_num}</Text>
            <Text style={[styles.contentView,{flex:2}]} numberOfLines={3}>{data.group_balance_sum}</Text>
            <Text style={[styles.contentView]}>{data.data}</Text>
        </View>)
    }

    onTabChange=(item,index)=>{
       // 投注额（sale）,开户数（newaccount），净盈亏（profit）
        let result=this.state.saleList;
        switch (parseInt(index)) {
            case 0:
                result= this.state.saleList
                break;
            case 1:
                result= this.state.accountList
                break;
            case 2:
                result= this.state.profitList
                break;
        }
        this.setState({dataList:result,selectedTabIndex:index});
    }

    componentDidMount() {
        this.onTabChange(null,0);
       // let typeList = ["sale","newaccount","profit"];
        HTTP_SERVER.AgentInfoMonth.url= HTTP_SERVER.AgentInfoMonth.formatUrl.replace("#type","sale");
        ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.AgentInfoMonth,(data)=>{
            this.setState({saleList:data,dataList:data})
        })
        HTTP_SERVER.AgentInfoMonth.url= HTTP_SERVER.AgentInfoMonth.formatUrl.replace("#type","newaccount");
        ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.AgentInfoMonth,(data)=>{
            this.setState({accountList:data})
        },true)
        HTTP_SERVER.AgentInfoMonth.url= HTTP_SERVER.AgentInfoMonth.formatUrl.replace("#type","profit");
        ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.AgentInfoMonth,(data)=>{
            this.setState({profitList:data})
        },true)
    }

}

const styles = StyleSheet.create({
    headView:{
        flex:1,
        textAlign:'center',
        paddingVertical:10
    },
    contentView:{
        flex:1,
        paddingHorizontal: 2,
        textAlign:'center',
        alignSelf:"center",
        paddingVertical:5
    }
});

