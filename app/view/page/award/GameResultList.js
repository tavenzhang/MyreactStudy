import React from 'react';
import {
    View,
    Text
    , StyleSheet,
    ListView,
    TouchableHighlight
} from 'react-native';

import {connect} from 'react-redux';
import AIcon from 'react-native-vector-icons/FontAwesome';
import NumberCircle from "../../componet/NumberCircle";
import BaseView from "../../componet/BaseView";

const mapStateToProps = state => {
    return {
       // noticeList: state.get("noticState").get("noticeList"),
      //  awardMondy: state.get("noticState").get("awardMondy")
    }
}

@connect(mapStateToProps)
export default class GameResultList extends BaseView {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            dataArray:[]
        };
    }

    renderBody() {
        let ds = this.state.dataSource.cloneWithRows(this.state.dataArray);
        return (
            <View style={G_Style.appContentView}>
                <ListView
                    dataSource={ds}
                    renderRow={this._renderRow}
                    enableEmptySections={true}
                />
            </View>
        );
    }

    componentDidMount() {
        G_RunAfterInteractions(()=>{
            ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.notice_ALL_Lottery,(data)=>{
                if(data.isSuccess)
                {
                    this.setState({dataArray:data.data});
                }
            })
        })
    }



    _renderRow = (rowData) => {
        let itemContentView = [];
        let lotteryList=[];
        switch(rowData.series_name)
        {
            case "SSC":
                lotteryList=rowData.win_number.split("");
                break;
            case "11-5":
                lotteryList=rowData.win_number.split(" ");
                break;
        }

        if (lotteryList.length>0) {
            lotteryList.map((item, index) => {
                itemContentView.push(<NumberCircle key={`${index}w`} data={item} color="#f00" radius={16}
                                                   dim={index == 0 ? 0 : 4}/>);
            })
        }
        return (
            <TouchableHighlight onPress={() => this.itemClick(rowData)} underlayColor='rgba(0,0,0,0)'>
                <View style={styles.row}>
                    <View style={{flexDirection: "row", paddingTop: 5, alignItems: "center"}}>
                        <Text style={{fontSize: 16, color: "#f00"}}>{rowData.lottery_name}</Text>
                        <Text style={{fontSize: 12, color: "#666", marginLeft: 10}}>{`第${rowData.issue}期`}</Text>
                        <Text style={{fontSize: 12, color: "#666", marginLeft: 10}}>{rowData.offical_time}</Text>
                    </View>
                    <View style={{flexDirection: "row", justifyContent: "space-between", marginVertical:15}}>
                        <View style={{marginTop: 5, justifyContent: "center", flexDirection: "row"}}>
                            {itemContentView}
                        </View>
                        <AIcon name="angle-right" style={styles.iconNormal}/>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }

    itemClick = (data) => {
       TLog("itemClick-----",data)
        switch(data.series_name)
        {
            case "SSC":
                G_NavUtil.pushToView(G_NavViews.SSC_History({...data}));
                break;
            case "11-5":
                G_NavUtil.pushToView(G_NavViews.G_11_5_History({...data}));
                break;
        }
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
        color: G_Theme.grayDeep,
        fontSize: 30,
        right: 20,
        alignSelf: "center",
    },

});