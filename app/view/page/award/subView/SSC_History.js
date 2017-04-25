import React from 'react';
import {
    View,
    Text
    , StyleSheet,
    ListView,
    TouchableHighlight
} from 'react-native';
import AIcon from 'react-native-vector-icons/FontAwesome';
import BaseView from "../../../componet/BaseView";
import HistoryList from "../../../componet/BaseListView";
import NumberCircle from "../../../componet/NumberCircle";


export default class SSC_History extends BaseView {

    constructor(props) {
        super(props);
        this.state = {
            dataArray: []
        };
    }

    renderBody() {
        const {passProps} = this.props;
        TLog("this.state.datalist---",this.state.dataArray)
        return (
            <View style={GlobeStyle.appContentView}>
                <HistoryList dataList={this.state.dataArray} loadMore={this.loadMore} renderRow={this._renderRow}/>
            </View>
        );
    }

    componentDidMount() {
        let dataListT = [];
        let i = 0;
        while (i < 20) {
            dataListT.push({
                name: "山东11选5" + i,
                title: `第${i}099998677767期`,
                date: "2017-12-11 22:10:15",
                type: 1,
                history: ["01", "02", "03", "09", "08", "13"],
                specil: [i * 1 + 10]
            });
            i++;
        }
        this.setState({dataArray:dataListT});
       // TLog("componentDidMount",dataListT)
    }

    componentWillUnmount() {

    }

    loadMore = (callBack, forcePage = 0) => {
        if (callBack) {
            callBack();
        }
        //     HTTP_SERVER.BET_RECODE.body.bought_at_from = this.state.curTime ? this.state.curTime.date : "";
        //     HTTP_SERVER.BET_RECODE.body.bought_at_to = DateUtil.formatRecodData(new Date());
        //     HTTP_SERVER.BET_RECODE.body.lottery_id = this.state.curGame ? this.state.curGame.id : "";
        //     HTTP_SERVER.BET_RECODE.body.way_id = this.state.curPlay ? this.state.curPlay.id : "";
        //     if (forcePage > 0) {
        //         HTTP_SERVER.BET_RECODE.body.page = forcePage;
        //         this.setState({dataList: []});
        //     }
        //     else {
        //         HTTP_SERVER.BET_RECODE.body.page += 1;
        //     }
        //     HTTP_SERVER.BET_RECODE.body.pagesize = 20;
        //     ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.BET_RECODE, (result) => {
        //         if (callBack) {
        //             callBack()
        //         }
        //         let arr = this.state.dataList.concat(result.data.data);
        //         this.setState({dataList: arr});
        //     }, false);
        // }
    }


    _renderRow = (rowData) => {
        let itemContentView = [];
        switch (rowData.type) {
            case 1:
                if (rowData.history) {
                    rowData.history.map((item, index) => {
                        itemContentView.push(<NumberCircle key={`${index}w`} data={item} color="#f00" radius={12}
                                                           dim={index == 0 ? 0 : 4}/>);
                    })
                }
                // if (rowData.specil) {
                //     rowData.specil.map((item, index) => {
                //         itemContentView.push(<NumberCircle key={`${index}s`} data={item} color="#0f0" radius={14}
                //                                            dim={8}/>);
                //     })
                // }
                break;
        }
        return (
            <TouchableHighlight onPress={() => this.itemClick(rowData)} underlayColor='rgba(0,0,0,0)'>
                <View style={styles.row}>
                    <View style={{flexDirection: "row", paddingTop: 5, alignItems: "center"}}>
                        <Text style={{fontSize: 12, color: "#666", marginLeft: 10}}>{rowData.title}</Text>
                        <Text style={{fontSize: 12, color: "#666", marginLeft: 10}}>{rowData.date}</Text>
                    </View>
                    <View style={{flexDirection: "row", justifyContent: "space-between", marginVertical: 5}}>
                        <View style={{marginTop: 5, justifyContent: "center", flexDirection: "row"}}>
                            {itemContentView}
                        </View>
                        {/*<AIcon name="angle-right" style={styles.iconNormal}/>*/}
                    </View>
                </View>
            </TouchableHighlight>
        );
    }

    itemClick = (data) => {
       // TLog("GameResultList----", data)
        // NavUtil.pushToView(NavViews.SSC_History({...data,title:data.name}));
    }

}


var styles = StyleSheet.create({
    row: {
        borderBottomColor: "#ddd",
        borderBottomWidth: 1,
        marginLeft: 10,

    },
    text: {
        flex: 1,
        marginTop: 5,
        fontWeight: 'bold'
    },
    iconNormal: {
        color: GlobelTheme.grayDeep,
        fontSize: 30,
        right: 20,
        alignSelf: "center",
    },

});