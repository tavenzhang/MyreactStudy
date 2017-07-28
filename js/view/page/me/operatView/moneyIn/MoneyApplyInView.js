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
                    <View style={[styles.itemHeadStyle]}>
                        <Text style={styles.textHeadStyle}>日期</Text>
                    </View>
                    <View style={[styles.itemHeadStyle]}>
                        <Text style={styles.textHeadStyle}>姓名</Text>
                    </View>
                    <View style={[styles.itemHeadStyle]}>
                        <Text style={styles.textHeadStyle}>金额</Text>
                    </View>
                    <View style={[styles.itemHeadStyle]}>
                        <Text style={styles.textHeadStyle}>实际充值</Text>
                    </View>
                    <View style={[styles.itemHeadStyle]}>
                        <Text style={styles.textHeadStyle}>手续费</Text>
                    </View>
                    <View style={[styles.itemHeadStyle]}>
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
        return (
            <TouchableOpacity onPress={()=>this.onPress(rowData)}>
            <View style={styles.row}>
                <View style={[styles.itemContentStyle]}>
                        <Text style={styles.textItemStyle}>{dateStr}</Text>
                    </View>
                <View style={[styles.itemContentStyle]}>
                    <Text style={styles.textItemStyle} >{rowData.username}</Text>
                </View>
                <View style={[styles.itemContentStyle]}>
                        <Text style={[styles.textItemStyle]}>{rowData.amount}</Text>
                    </View>
                <View style={[styles.itemContentStyle]}>
                    <Text style={[styles.textItemStyle]}>{rowData.real_amount ? rowData.real_amount:"0.00"}</Text>
                </View>

                <View style={[styles.itemContentStyle]}>
                        <Text style={styles.textItemStyle}>{rowData.fee}</Text>
                    <Text style={[styles.textItemStyle,{fontSize:10}]}>({rowData.deposit_mode==2 ? "第三方":" 银行卡"})</Text>
                    </View>
                    <View style={[styles.itemContentStyle,{flex:1, flexDirection:"row", alignItems:"center"}]}>
                        <Text style={[styles.textItemStyle,{color:rowData.status ? "green":"red"}]} >{appModel.getADepositStatus(rowData.status)}</Text>
                        <TAIco name={"angle-right"} style={{fontSize: 24, marginLeft: 10,fontWeight: "bold",color:"red"}}/>
                    </View>
                </View>
          </TouchableOpacity>
        );
    }

    onPress=(data)=>{
       G_NavUtil.push(G_RoutConfig.ApplyInDetailView,{data,...this.props},"充值详情")
    }
}



const styles = StyleSheet.create({
    itemHeadStyle: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,

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
