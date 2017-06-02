import React from 'react';
import {
    View,
    Text, StyleSheet,
    TouchableOpacity
} from 'react-native';
import {connect} from 'react-redux';
import BaseView from "../../../componet/BaseView";
import {HeaderPlusRightMenu} from "../../../componet/navBarMenu/HeaderMenu";
import MyListView from "../../../componet/BaseListView";

const mapStateToProps = state => {
    return {
        cardList:state.get("appState").get("cardList").toJS(),
    }
}

@connect(mapStateToProps)
export default class MoneyCardView extends BaseView {
    constructor(props) {
        super(props);
    }

    getNavigationBarProps() {
        return {rightView: HeaderPlusRightMenu}
    }



    renderBody() {
       // TLog("cardList----------------------------");
        return (
            <MyListView dataList={this.props.cardList} loadMore={this._loadMore} renderRow={this._renderRow}/>
        );
    }

    componentDidMount() {
        G_RunAfterInteractions(()=>{
            HTTP_SERVER.LIST_BANGK_CARDS.body.page = 1;
            HTTP_SERVER.LIST_BANGK_CARDS.body.pagesize = 15;
            ActDispatch.FetchAct.fetchVoWithAction(HTTP_SERVER.LIST_BANGK_CARDS, ActionType.AppType.CARD_LIST_GET);
        })
    }


    _loadMore = (callFinishBack) => {
        HTTP_SERVER.LIST_BANGK_CARDS.body.page += 1;
        HTTP_SERVER.LIST_BANGK_CARDS.body.pagesize = 15;
        ActDispatch.FetchAct.fetchVoWithAction(HTTP_SERVER.LIST_BANGK_CARDS,ActionType.AppType.CARD_LIST_GET, (result) => {
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
        G_NavUtil.pushToView(G_NavViews.EditCardView({title: "1. 验证银行卡",...data}));
    }

    itemDeleteClcik=(data)=> {
        G_NavUtil.pushToView(G_NavViews.DelCardView({title: "删除银行卡",...data}));
    }

    onRightPressed() {
        TLog("this.props.cardList---"+this.props.cardList.length)
        if(this.props.cardList.length<=0) {
            G_NavUtil.pushToView(G_NavViews.AddCardView({title: "添加银行卡"}));
        }else {
            G_NavUtil.pushToView(G_NavViews.AddValidView({title: "1. 验证银行卡",cardList:this.props.cardList}));
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
