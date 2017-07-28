import React,{PropTypes} from 'react';
import {
    View,
    Text, StyleSheet,
    TouchableOpacity
} from 'react-native';

import TFlatList from "../../../../componet/TFlatList";
import {TAIco, TButton} from "../../../../componet/tcustom/button/TButton";
import MyDatePicker from "../../../../componet/tcustom/date/TDatePicker";

export default class MoneyApplyInView extends React.PureComponent {
   static propTypes={
       loadMore:PropTypes.func,
       dataList:PropTypes.any,
       curPage:PropTypes.number,
       totalPage:PropTypes.number
    }

    render() {
        let {dataList,loadMore,curPage,totalPage}=this.props
        return (
            <View style={G_Style.appContentView}>
                {/*<View style={{flexDirection:"row", alignItems:"center", borderBottomWidth:1, justifyContent:"center"}}>*/}
                    {/*<Text>时间：</Text>*/}
                    {/*<MyDatePicker dataFormat={"YYYY-MM-DD hh:mm:ss"} defaultDate={this.state.date_from} onDateSelect={(date_from)=>{this.setState({date_from:date_from})}}/>*/}
                    {/*<Text style={{marginHorizontal: 10}}>至</Text>*/}
                    {/*<MyDatePicker dataFormat={"YYYY-MM-DD hh:mm:ss"}  defaultDate={this.state.date_to}  onDateSelect={(date_to)=>{this.setState({date_to:date_to})}}/>*/}
                    {/*<TButton viewStyle={{marginLeft:20}} btnName={"搜索"}  onPress={this.onPreeSearch}/>*/}
                {/*</View>*/}
                <View style={styles.headRow}>
                    <View style={[styles.itemHeadStyle,{flex:1}]}>
                        <Text style={styles.textHeadStyle}>日期</Text>
                    </View>
                    <View style={[styles.itemHeadStyle,{flex:2}]}>
                        <Text style={styles.textHeadStyle}>编号</Text>
                    </View>
                    <View style={[styles.itemHeadStyle,{flex:1}]}>
                        <Text style={styles.textHeadStyle}>金额</Text>
                    </View>

                    <View style={[styles.itemHeadStyle,{flex:1}]}>
                        <Text style={styles.textHeadStyle}>手续费</Text>
                    </View>
                    <View style={[styles.itemHeadStyle,{flex:1}]}>
                        <Text style={styles.textHeadStyle}>状态</Text>
                    </View>
                </View>
                <TFlatList curPage={curPage} totalPage={totalPage} dataList={dataList} loadMore={loadMore} renderRow={this._renderRow}/>
            </View>
        );
    }


    _renderRow = (rowData) => {
        let {appModel}=this.props

        let dateStr=   G_DateUtil.formatSimpleItemDateString(rowData.pay_time);
        let real_amount = rowData.real_amount ?  rowData.real_amount:0
        return (<View style={styles.row}>
                    <View style={[styles.itemContentStyle,{flex:1}]}>
                        <Text style={styles.textItemStyle}>{dateStr}</Text>
                    </View>
                <View style={[styles.itemContentStyle,{flex:2}]}>
                    <Text style={styles.textItemStyle} numberOfLines={3}>{rowData.deposit_id}</Text>
                </View>
                    <View style={[styles.itemContentStyle,{flex:1}]}>
                        <Text style={[styles.textItemStyle]}>{rowData.amount}</Text>
                    </View>

                    <View style={[styles.itemContentStyle,{flex:1}]}>
                        <Text style={styles.textItemStyle}>{rowData.fee}</Text>
                    </View>
                    <View style={[styles.itemContentStyle,{flex:1, flexDirection:"row", alignItems:"center"}]}>
                        <Text style={[styles.textItemStyle,{color:rowData.status ? "green":"red"}]} >{appModel.getADepositStatus(rowData.status)}</Text>
                        {/*<TAIco name={"angle-right"} style={{fontSize: 20, marginLeft: 10,fontWeight: "bold",color:"red"}}/>*/}
                    </View>
                </View>
        // </TouchableOpacity>     {/*<TouchableOpacity onPress={()=>this.onPress(rowData)}>*/}
        );
    }

    onPress=(data)=>{
       G_NavUtil.push(G_RoutConfig.ApplyInDetailView,{data,...this.props},"充值申请详情")
    }
}



const styles = StyleSheet.create({
    itemHeadStyle: {
        alignItems: "center",
        justifyContent: "center"
    },
    itemContentStyle: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
        // borderWidth: 1
    },
    textHeadStyle: {
        fontSize: 14,
        fontWeight: "bold",
        color:"gray"
    },
    textItemStyle: {
        fontSize: 13,
        textAlign:"center"
    },
    headRow: {
        flexDirection: 'row',
        height: 35,
        borderColor: "gray",
    },
    row: {
        flexDirection: 'row',
        height: 45,
        borderBottomWidth:0.5,
        borderColor: "gray",

    },
});
