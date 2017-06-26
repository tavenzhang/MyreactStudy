import React from 'react';
import {
    View,
    Text
    , StyleSheet,
    TouchableOpacity
} from 'react-native';

import {connect} from 'react-redux';
import AIcon from 'react-native-vector-icons/FontAwesome';
import NumberCircle from "../../componet/NumberCircle";
import BaseView from "../../componet/BaseView";
import TFlatList from "../../componet/TFlatList";

const mapStateToProps = state => {
    return {
       // noticeList: state.get("noticState").get("noticeList"),
      //  awardMondy: state.get("noticState").get("awardMondy")
    }
}

@connect(mapStateToProps)
export default class Award extends BaseView {

    constructor(props) {
        super(props);
        this.state = {
            dataArray:[]
        };
    }

    renderBody() {

        return (
            <View style={G_Style.appContentView}>
                <TFlatList  dataList={this.state.dataArray}  renderRow={this._renderRow}/>
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


    _renderRow = (rowData,index) => {
        let itemContentView = [];
        let lotteryList=[];
        switch(rowData.series_name) {
            case "SSC":
            case "K3":
                lotteryList=rowData.win_number.split("");
                break;
            case "11-5":
                lotteryList=rowData.win_number.split(" ");
                break;
            default:
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
            <TouchableOpacity onPress={() => this.itemClick(rowData)} >
                <View style={styles.row}>
                    <View style={{flexDirection: "row", paddingTop: 5, alignItems: "center"}}>
                        <Text style={{fontSize: 16, color: "#f00"}}>{rowData.lottery_name}</Text>
                        <Text style={{fontSize: 12, color: "#666", marginLeft: 10}}>{`第${rowData.issue}期`}</Text>
                        <Text style={{fontSize: 12, color: "#666", marginLeft: 10}}>{rowData.offical_time}</Text>
                    </View>
                    <View style={{flexDirection: "row", justifyContent: "space-between", marginVertical:15}}>
                        <View style={{marginTop: 5, marginRight: 30, flexDirection: "row", flexWrap:"wrap"}}>
                            {itemContentView}
                        </View>
                        <AIcon name="angle-right" style={styles.iconNormal}/>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    itemClick = (data) => {
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