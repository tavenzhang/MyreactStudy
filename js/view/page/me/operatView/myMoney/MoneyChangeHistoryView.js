import React from 'react';
import {
    View,
    Text, StyleSheet,
    TouchableHighlight,
    LayoutAnimation,
    InteractionManager
} from 'react-native';

import MyListView from "../../../../componet/BaseListView";

export default class MoneyChangeHistoryView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataList: [],
        };
    }

    render() {
        return (
            <View style={G_Style.appContentView}>
                <View style={styles.headRow}>
                    <View style={[styles.itemHeadStyle,{flex:1}]}>
                        <Text style={styles.textHeadStyle}>日期</Text>
                    </View>
                    <View style={[styles.itemHeadStyle,{flex:2}]}>
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
                </View>
                <MyListView dataList={this.state.dataList} loadMore={this._loadMore} renderRow={this._renderRow}/>
            </View>
        );
    }

    componentDidMount() {
        this.onMount=true;
        let {httpService} = this.props
        httpService.body.page = 1;
        httpService.body.pagesize = 15;
        G_RunAfterInteractions(()=>{
            ActDispatch.FetchAct.fetchVoWithResult(httpService, (result) => {
                if (result.data.data) {
                    this.setState({dataList: result.data.data});
                }
            })
        })
    }


    componentDidUnMount() {
        this.onMount=false;
    }

    _loadMore = (callFinishBack) => {
        let {httpService} = this.props;
        httpService.body.page += 1;
        httpService.body.pagesize = 15;
        ActDispatch.FetchAct.fetchVoWithResult(httpService, (result) => {
            if (result.data.data) {
                let arr = this.state.dataList.concat(result.data.data);
                if(this.onMount){
                    this.setState({dataList: arr})
                }
            }
            if(callFinishBack)
            {
                callFinishBack();
            }
        })
    }

    _renderRow = (rowData,section) => {
        let {gameModel,playModel,typesModel}=this.props;
        let gameName= gameModel.getGameNameById(rowData.lottery_id);
         let dateStr=   G_DateUtil.formatSimpleItemDateString(rowData.created_at);
         let playName = playModel.getWayNameById(rowData.way_id);
         let money= rowData.is_income ? `+${ parseInt(rowData.amount)}`:`-${ parseInt(rowData.amount)}`

        return (
                <TouchableHighlight onPress={() => this.itemClick(rowData)} underlayColor='rgba(10,10,10,0.2)'>
                    <View style={styles.row}>
                        <View style={[styles.itemContentStyle,{flex:1}]}>
                            <Text style={styles.textItemStyle}>{dateStr}</Text>
                        </View>
                        <View style={[styles.itemContentStyle,{flex:2}]}>
                            <Text style={[styles.textItemStyle,{color:rowData.is_income ? "green":"red"}]}>{money}</Text>
                        </View>

                        <View style={[styles.itemContentStyle,{flex:2}]}>
                            <Text style={styles.textItemStyle}>{typesModel.getATransactionType(rowData.type_id)}</Text>
                        </View>
                        <View style={[styles.itemContentStyle,{flex:2}]}>
                            <Text style={styles.textItemStyle}>{gameName}</Text>
                            <Text style={{fontSize:12,color:G_Theme.grayDeep, marginTop:5}} >{playName}</Text>
                        </View>
                        <View style={[styles.itemContentStyle,{flex:2}]}>
                            <Text style={styles.textItemStyle}>{parseInt(rowData.available)}</Text>
                        </View>
                    </View>
                </TouchableHighlight>
        );
    }

    itemClick = (data) => {

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
        height: 20,
        borderColor: "gray",
        borderWidth: 0.5,
        margin:5
    },
    row: {
        flexDirection: 'row',
        height: 45,
        borderBottomWidth:0.5,
        borderColor: "gray",
    },
});
