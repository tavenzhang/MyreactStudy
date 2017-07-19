import React from 'react';
import {
    View,
    Text,
    StyleSheet,

} from 'react-native';
import TFlatList from "../../../../componet/TFlatList";
import {TButton} from "../../../../componet/tcustom/button/TButton";


export  default class ChaseHistoryView extends React.PureComponent {

    constructor(props) {
        super(props)
        let {gameModel, appModel, data} = this.props.navigation.state.params;
        let curPage = data.detail_list.current_page;
        let totaolPage = data.detail_list.last_page;
        let dataList=[];
        for (let item of data.detail_list.data)
        {
            if(item.project)
            {
                dataList.push(item);
            }
        }
        this.state = {
            curPage,
            totaolPage,
            dataList
        }
    }


    render() {
        let {gameModel, appModel, data} = this.props.navigation.state.params;
        // let gameName = gameModel.getGameNameById(this.state.data.lottery_id)
        // this.gameName = gameName;
        // let dataList = this.state.data.detail_list ? this.state.data.detail_list.data : [];
        // const {data} = this.state;
        // let series_id = gameModel.getSeriesIdById(data.lottery_id)
        // let coefficient = appModel.getACoefficients(data.coefficient);
        // let isFinish = data.status == 1 ? true : false;
        return (<View style={[G_Style.appContentView]}>
                {this.renderHeadView()}
                <TFlatList curPage={this.state.curPage} totalPage={this.state.totaolPage} dataList={this.state.dataList}
                           loadMore={this.loadMore} renderRow={this._renderRow}/>
            </View>
        );
    }


    renderHeadView = () => {

        return (<View style={styles.row}>
            <View style={[styles.containView]}>
                <Text style={styles.headText}>奖期</Text>
            </View>
            {/*<View style={[styles.containView, {flex: 1}]}>*/}
                {/*<Text style={styles.headText}>倍数</Text>*/}
            {/*</View>*/}
            <View style={[styles.containView]}>
                <Text stle={styles.headText}>金额</Text>
            </View>
            <View style={[styles.containView]}>
                <Text style={styles.headText}>追号状态</Text>
            </View>
            <View style={[styles.containView,{flex: 1}]}>
                <Text style={styles.headText}>中奖</Text>
            </View>
            <View style={[styles.containView]}>
                <Text style={styles.headText}>详情</Text>
            </View>
        </View>)
    }

    _renderRow = (data) => {
        let {gameModel, appModel} = this.props.navigation.state.params;
        TLog("_renderRow==data-----data.project", data);
        let traceState= data.project ? appModel.getATraceStatus(data.project.status_commission):""
        let amount = data.project ?  parseFloat(data.project.amount):0;
        return (<View style={styles.row}>
                <View style={styles.containView}>
                    <Text style={[styles.contentText]}>{data.project.issue}</Text>
                </View>
                {/*<View style={[styles.containView,{flex: 1}]}>*/}
                    {/*<Text style={[styles.contentText]}>{data.project.multiple} 倍</Text>*/}
                {/*</View>*/}
                <View style={[styles.containView]}>
                    <Text style={[styles.contentText,{fontWeight:"bold", fontSize:14}]}>{amount.toFixed(2)}</Text>
                    <Text style={[styles.contentText,{fontWeight:"bold", fontSize:10}]}>{data.project.multiple} 倍</Text>
                </View>
                <View style={[styles.containView]}>
                    <Text style={[styles.contentText, {color:G_Theme.primary}]}>{traceState}</Text>
                </View>
                <View style={[styles.containView,{flex: 1}]}>
                    <Text style={[styles.contentText, {color: 'red'}]}>{appModel.getAProjectStatus(data.project.status)}</Text>
                </View>
                <View style={[styles.containView]}>
                    <TButton containerStyle={{paddingVertical: 5, paddingHorizontal: 10}} btnName="详情"
                             onPress={() => {
                                 this.onPressDetial(data)
                             }}/>
                </View>
            </View>
        )
    }

    onPressDetial = (data) => {
      G_NavUtil.push(G_RoutConfig.BetDetailView,{id:data.project_id},"投注详情")
    }
}
const styles = StyleSheet.create({
    containView: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center"
    },
    row: {
        borderBottomWidth: 1,
        borderColor: '#ccc',
        flexDirection: "row",
        height: 40,
        justifyContent: "center",
        alignItems: "center"

    },
    textStyle: {
        justifyContent: "center",
        textAlign: 'center',
        width: 150,
        left: 10,
        fontSize: 14,
        height: G_Theme.textInpuntH,
    },
    headText: {
        fontWeight: "bold"
    },
    contentText: {
        fontSize: 12,
    },
    contentButton: {
        fontSize: 12,
        color: '#fff',
        textAlign: "center"
    }

})