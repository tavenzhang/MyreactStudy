import React from 'react';
import {
    View,
    Text, StyleSheet,
    TouchableOpacity
} from 'react-native';
import BaseView from "../../../componet/BaseView";
import {NavButtonAIco} from "../../../componet/navBarMenu/HeaderMenu";
import TFlatList from "../../../componet/TFlatList";
export default class MoneyCardView extends BaseView {

    static navigationOptions = ({navigation})=> ({
        title: "大厅",
        headerRight:<NavButtonAIco navigation={navigation} icoName={G_EnumFontNames.plus}/> ,
    })


    constructor(props) {
        super(props);
        this.state={
            curPage:1,
            totalPage:1,
            cardList:[]
        }
    }


    renderBody() {
        return (
            <TFlatList totalPage={this.state.totalPage} curPage={this.state.curPage} dataList={this.state.cardList} loadMore={this._loadMore} renderRow={this._renderRow}/>
        );
    }

    componentDidMount() {
        this._loadMore(null,1)
    }

    onForceFlushData(data){
        this.setState({curPage:1,totalPage:1,cardList:[]},()=>{
            this._loadMore(null,1);
        })
    }

    _loadMore = (callFinishBack,isFlush) => {
        HTTP_SERVER.LIST_BANGK_CARDS.body.page  = isFlush ? 1: HTTP_SERVER.LIST_BANGK_CARDS.body.page+1;
        HTTP_SERVER.LIST_BANGK_CARDS.body.pagesize = this.state.pageSize;
        ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.LIST_BANGK_CARDS, (result) => {
            if(result.data)
            {
                this.setState({
                    curPage:result.data.current_page,
                    totalPage:result.data.last_page,
                    cardList: G_ArrayUtils.addComapreCopy(this.state.cardList,result.data.data)
                })
            }
            if (callFinishBack) {
                callFinishBack();
            }
        })
    }


    _renderRow = (rowData, section) => {
       if(!rowData)
       {
           return null;
       }

        rowData.accountEny=G_StringUtil.formatBankCard(rowData.account);
        let countName = rowData.account_name.replace(/./g, "*");
        let lockSate = rowData.islock ? "被锁定" : "使用中"

        return (
            <View style={styles.row}>
                <View style={{flex: 2}}>
                    <Text style={{color: "white"}}>{rowData.bank}</Text>
                    <Text style={{color: "white", fontSize: 12, marginTop: 3, letterSpacing: 2}}>卡号:{rowData.accountEny}</Text>
                    <Text style={{color: "white", fontSize: 12, marginTop: 3, letterSpacing: 2}}>账户:{countName}</Text>
                    <Text style={{color: "white", fontSize: 12, marginTop: 3,}}>银行卡状态:{lockSate}</Text>
                </View>
                <View style={{flex: 1, justifyContent: "center", alignItems: "center", flexDirection: "row"}}>
                    <TouchableOpacity onPress={()=>{this.itemEditClcik(rowData)}}>
                        <Text style={{color: "yellow",}}>编辑</Text>
                    </TouchableOpacity>
                    <Text style={{color: "white", marginHorizontal:3}}>|</Text>
                    <TouchableOpacity onPress={()=>{this.itemDeleteClcik(rowData)}}>
                        <Text style={{color: "red"}}>删除</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }

    itemEditClcik=(data)=> {
        G_NavUtil.push(G_RoutConfig.EditCardView,{title: "1. 验证银行卡",...data});
    }

    itemDeleteClcik=(data)=> {
        G_NavUtil.push(G_RoutConfig.DelCardView,{title: "删除银行卡",...data});
    }

    onRightPressed() {

        if(this.props.cardList.length<=0) {
            G_NavUtil.push(G_RoutConfig.AddCardView,{title: "添加银行卡"});
        }else {
            G_NavUtil.push(G_RoutConfig.AddValidView,{title: "1. 验证银行卡",cardList:this.props.cardList});
        }
    }
}


const styles = StyleSheet.create({
    touchTabButton: {
        flex: 1, alignItems: "center", justifyContent: "center",
    },
    row: {
        flexDirection: "row",
        height: 100,
        backgroundColor: "green",
        borderColor: "green",
        borderWidth: 1,
        borderRadius: 8,
        marginHorizontal: 5,
        marginVertical: 3,
        paddingLeft: 30,
        alignItems: "center"
    },
    scrollView: {
        flex: 1
    }

});
