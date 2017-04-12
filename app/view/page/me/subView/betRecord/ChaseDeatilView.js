/**
 * Created by thomas on 2017/3/10.
 */
import React from 'react';
import {
    View,
    Text,
} from 'react-native';
import BaseView from "../../../../componet/BaseView";
import DetailListView from "../../../../componet/BaseListView";

export  default class BetDetailView extends BaseView {

    constructor(props) {
        super(props)
        this.state = {
            data: {}
        }
    }

    renderBody() {
        let {gameModel,typesModel} = this.props.passProps
        let  gameName = gameModel.getGameNameById(this.state.data.lottery_id)
        let dataList= this.state.data.detail_list ? this.state.data.detail_list.data:[];
        return (<View style={[GlobeStyle.appContentView]}>
            <View>
                <Text>游戏名称:   {gameName}</Text>
            </View>
            <View>
                <Text>序列号:   {this.state.data.serial_number}</Text>
            </View>
            <View>
                <Text>奖期:   {this.state.data.start_issue}</Text>
            </View>
            <View>
                <Text>追号号码:  {this.state.data.bet_number}</Text>
            </View>
            <View>
                <Text>模式:   {typesModel.getACoefficients(this.state.data.coefficient)}</Text>
            </View>
            <View>
                <Text>金额:   {this.state.data.amount}元</Text>
            </View>
            <View>
                <Text>奖金:   {this.state.data.prize ? this.state.data.prize:0}元</Text>
            </View>
            <View>
                <Text>中奖号码:   {this.state.data.winning_number}</Text>
            </View>
            <View>
                <Text>追号状态:   {typesModel.getATraceStatuss(this.state.data.status)}</Text>
            </View>
            <View>
                <Text>购彩时间:  {this.state.data.bought_at}</Text>
            </View>
             <DetailListView dataList={dataList} loadMore={this.loadMore} renderRow={this._renderRow}/>
        </View>
        );
    }

    componentDidMount() {
        let {id} = this.props.passProps
        HTTP_SERVER.CHASE_DETAIL.url = HTTP_SERVER.CHASE_DETAIL.formatUrl.replace(/#id/g, id);
        ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.CHASE_DETAIL, (result) => {
            if (result.data) {
                // let arr = this.state.dataList.concat(result.data.data);
                this.setState({data: result.data})
            }
        })
    }

    loadMore = (callBack, forcePage = 0) => {

    }

    _renderRow = (rowData) => {
        TLog("rowData----",rowData);
        //let {gameModel} = this.props;
        //let gameName = gameModel.getGameNameById(rowData.lottery_id);
        return (
            <View>
                {/*<TouchableHighlight onPress={() => this.itemClick(rowData)} underlayColor='rgba(10,10,10,0.2)'>*/}
                    {/*<View style={styles.row}>*/}
                        {/*<View style={[styles.itemContentStyle,{flex:2}]}>*/}
                            {/*<Text style={styles.textItemStyle}>{gameName}</Text>*/}
                        {/*</View>*/}
                        {/*<View style={[styles.itemContentStyle,{flex:2}]}>*/}
                            {/*<Text style={styles.textItemStyle}>{rowData.title}</Text>*/}
                            {/*<Text style={{fontSize: 12,color:"gray", marginTop:5}} numberOfLines={1}>{`投注号码:${rowData.bet_number}`}</Text>*/}
                        {/*</View>*/}
                        {/*<View style={styles.itemContentStyle}>*/}
                            {/*<Text style={styles.textItemStyle} >{rowData.status}</Text>*/}
                        {/*</View>*/}
                        {/*<View style={styles.itemContentStyle}>*/}
                            {/*<AIcon name={"angle-right"}*/}
                                   {/*style={{fontSize: 25, alignSelf:"center",color:"gray"}}/>*/}
                        {/*</View>*/}
                    {/*</View>*/}
                {/*</TouchableHighlight>*/}
            </View>
        );
    }



}