
import React ,{PropTypes} from 'react';
import {
    View,
    StyleSheet,
    ListView,
    Text
} from 'react-native';
import BaseView from "../../../../componet/BaseView";
import MySegmentedControlTab from "../../../../componet/tcustom/TSegmentedControlTab";

export  default  class ARankView extends  BaseView{

    static  propTypes={
        data:PropTypes.any
    }

    constructor(props)
    {
        super(props);
        this.state = {
            selectedTabIndex: 0,
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2,
            }),
            dataList:[]
        };
    }
    getNavigationBarProps () {
        return {title:"本月排名"}
    }
    renderBody() {
            let ds= this.state.dataSource.cloneWithRows(this.state.dataList);
        return(<View>
                <MySegmentedControlTab selectedTabIndex={this.state.selectedTabIndex} valueList={['投注额', '开户数',"净盈亏"]} onTabChange={this.onTabChange}/>
                <ListView
                    dataSource={ds}
                    renderHeader={this._rendHeadView}
                    renderRow={this._rendRow}
                    enableEmptySections={true}
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

    onTabChange=(index)=>{
       // 投注额（sale）,开户数（newaccount），净盈亏（profit）
        let typeList = ["sale","newaccount","profit"];
        this.setState({dataList:[],selectedTabIndex:index})
        HTTP_SERVER.AgentInfoMonth.url= HTTP_SERVER.AgentInfoMonth.formatUrl.replace("#type",typeList[index]);
        G_RunAfterInteractions(()=>{
            ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.AgentInfoMonth,(data)=>{
                this.setState({dataList:data})
            })
        })
    }

    componentDidMount() {
        this.onTabChange(0);
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

