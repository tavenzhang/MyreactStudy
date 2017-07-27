import React from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Text
} from 'react-native';

import {connect} from 'react-redux';
import BaseView from "../../../componet/BaseView";
import RecordMenuView, {MenuListType} from "./record/RecordMenuView";
import TFlatList from "../../../componet/TFlatList";
import {TAIco} from "../../../componet/tcustom/button/TButton";
import {NavButtonText} from "../../../componet/navBarMenu/HeaderMenu";
import RecordMoneySearchView from "./record/RecordMoneySearchView";


const mapStateToProps = state => {
    return {
        gameModel: state.get("appState").get("gameModel"),
        playModel: state.get("appState").get("playModel"),
        appModel: state.get("appState").get("appModel"),
        userData: state.get("appState").get("userData").toJS(),
    }
}

@connect(mapStateToProps)
export default class RecordMoneyView extends BaseView {
    static navigationOptions=({navigation, screenProps}) =>({
        title:"账变列表",
        headerRight: <NavButtonText style={{
            paddingHorizontal: 5,
            paddingVertical: 5,
            backgroundColor: "rgb(208,199,160)",
            borderRadius: 5}} textStyle={{fontSize:14}} name={"更多查询"} navigation={navigation}/>
    })

    constructor(props) {
        super(props);
        let {params}=this.props.navigation.state
          let  serial_number = params.serial_number ?  params.serial_number:"";
           let type_id=params.type_id ?  params.serial_number:"";
           let username=params.username ? params.username:"";
        this.state = {
            curGame: null,
            curPlay: null,
            curTime: null,
            dataList: [],
            curPage:1,
            totalPage:1,
            modelShow:false,
            serial_number,
            type_id,
            username
        }
    }

    render() {
        let {appModel,userData}=this.props;
        return (
            <View style={G_Style.appContentView}>
                <RecordMenuView clickMenuItem={this.clickMenuItem} {...this.props}/>
                <TFlatList renderHeader={this._renderHeader}  curPage={this.state.curPage} totalPage={this.state.totalPage} styleView={{flex: 1, marginTop: 35}} renderRow={this._renderRow} dataList={this.state.dataList} loadMore={this.loadMore}/>
                <RecordMoneySearchView userData={userData} username={this.state.username} appModel={appModel} visible={this.state.modelShow} onHideHandle={()=>this.setState({modelShow:false})} onConfirmPress={this.onConfirmPress} />
            </View>
        );
    }



    onRightPressed(){
        this.setState({modelShow:true});
     }

    componentDidMount() {
        this.loadMore(null, true);
    }

    _renderHeader =()=>{
        return (<View style={styles.headRow}>
            <View style={[styles.itemHeadStyle,{flex:1}]}>
                <Text style={styles.textHeadStyle}>日期</Text>
            </View>
            <View style={[styles.itemHeadStyle,{flex:1}]}>
                <Text style={styles.textHeadStyle}>金额</Text>
            </View>
            <View style={[styles.itemHeadStyle,{flex:2}]}>
                <Text style={styles.textHeadStyle}>类型</Text>
            </View>
            <View style={[styles.itemHeadStyle,{flex:2}]}>
                <Text style={styles.textHeadStyle}>彩种</Text>
            </View>
            <View style={[styles.itemHeadStyle,{flex:2}]}>
                <Text style={styles.textHeadStyle}>余额</Text>
            </View>
            <View style={[styles.itemHeadStyle,{flex:0.5}]}>
            </View>
        </View>)
    }

    _renderRow = (rowData) => {
        let {gameModel,playModel,appModel}=this.props;
        let gameName= gameModel.getGameNameById(rowData.lottery_id);
        let dateStr=   G_DateUtil.formatSimpleItemDateString(rowData.created_at);
        let playName = playModel.getWayNameById(rowData.way_id);
        let money= rowData.is_income ? `+${parseFloat(rowData.amount).toFixed(4)}`:`-${parseFloat(rowData.amount).toFixed(4)}`

        return (
            <TouchableOpacity onPress={() => this.itemClick(rowData)}>
                <View style={styles.row}>
                <View style={[styles.itemContentStyle,{flex:1}]}>
                    <Text style={styles.textItemStyle}>{dateStr}</Text>
                </View>
                <View style={[styles.itemContentStyle,{flex:1}]}>
                    <Text style={[styles.textItemStyle,{color:rowData.is_income ? "green":"red"}]}>{money}</Text>
                </View>
                <View style={[styles.itemContentStyle,{flex:2}]}>
                    <Text style={styles.textItemStyle}>{appModel.getATransactionType(rowData.type_id)}</Text>
                </View>
                <View style={[styles.itemContentStyle,{flex:2}]}>
                    <Text style={styles.textItemStyle}>{gameName}</Text>
                    <Text style={{fontSize:12,color:G_Theme.grayDeep, marginTop:5}} >{playName}</Text>
                </View>
                <View style={[styles.itemContentStyle,{flex:2}]}>
                    <Text style={styles.textItemStyle}  numberOfLines={2}>{rowData.available}</Text>
                </View>
                <View style={[styles.itemContentStyle,{flex: 0.5}]}>
                    <TAIco name={"angle-right"}
                           style={{fontSize: 25, paddingTop:2, alignSelf: "center", color: "gray"}}/>
                </View>
            </View>
            </TouchableOpacity>
        );
    }

    onConfirmPress=(data)=>{
        //{"modalVisible":true,"serialNumer":"","userName":"","pickValue":""}
        //G_NavUtil.push(G_RoutConfig.BackDetailView,{data,...this.props},"返点详情");
        HTTP_SERVER.LIST_REANSACTON.body.serial_number=this.state.serial_number;
        HTTP_SERVER.LIST_REANSACTON.body.type_id =this.state.type_id;
        HTTP_SERVER.LIST_REANSACTON.body.username=this.state.username;
        this.setState({dataList:[],serial_number:data.serialNumer,type_id:data.pickValue,username:data.userName},()=>{
            this.loadMore(null,1);
        })
    }

    itemClick = (data) => {
        G_NavUtil.push(G_RoutConfig.RecordMoneyDetailView,{data,title:"帐变详情"});
    }

    clickMenuItem = (data, listType) => {
        switch (listType) {
            case MenuListType.TimeList:
                this.setState({curTime: data, dataList: []}, () => {
                    this.loadMore(null, 1)
                });
                break;
            case MenuListType.GameList: //重新选择了游戏 需要重制游戏类型
                this.setState({curGame: data, curPlay: null, dataList: []}, () => {
                    this.loadMore(null, 1)
                });
                break;
            case MenuListType.PlayList:
                this.setState({curPlay: data, dataList: []}, () => {
                    this.loadMore(null, 1)
                });
                break;
        }
    }

    loadMore = (callBack, isFlush) => {
        HTTP_SERVER.LIST_REANSACTON.body.bought_at_from = this.state.curTime ? this.state.curTime.date : "";
        HTTP_SERVER.LIST_REANSACTON.body.bought_at_to = ""
        HTTP_SERVER.LIST_REANSACTON.body.lottery_id = this.state.curGame ? this.state.curGame.id : "";
        HTTP_SERVER.LIST_REANSACTON.body.way_group_id = this.state.curPlay ? this.state.curPlay.id : "";
        HTTP_SERVER.LIST_REANSACTON.body.serial_number=this.state.serial_number;
        HTTP_SERVER.LIST_REANSACTON.body.type_id =this.state.type_id;
        HTTP_SERVER.LIST_REANSACTON.body.username=this.state.username;
        if (isFlush) {
            HTTP_SERVER.LIST_REANSACTON.body.page = 1;
        }
        else {
            HTTP_SERVER.LIST_REANSACTON.body.page += 1;
        }
        ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.LIST_REANSACTON, (result) => {
            if (callBack) {
                callBack()
            }
            if(result.isSuccess)
            {
                let arr = G_ArrayUtils.addComapreCopy(this.state.dataList, result.data.data)
                this.setState({dataList: arr, curPage:result.data.current_page,
                    totalPage:result.data.last_page,});
            }
        }, false);

    }
}
const styles = StyleSheet.create({
    itemHeadStyle: {
        alignItems: "center",
        justifyContent: "center"
    },
    textHeadStyle: {
        fontSize: 14,
        fontWeight: "bold",
        color:"gray"
    },
    headRow: {
        flexDirection: 'row',
        height: 32,
        borderColor: "gray",
    },
    itemContentStyle: {
        flex: 1,
        justifyContent: "center",
        alignItems:"center"
    },
    desc:{
        fontSize: 12,color:"gray", marginTop:5    },
    textItemStyle: {
        fontSize: 13,
    },
    row: {
        flexDirection: 'row',
        height: 50,
        borderBottomWidth:0.5,
        marginLeft:10,
        borderColor: "gray",
    },
});
