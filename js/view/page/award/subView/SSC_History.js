import React,{PropTypes} from 'react';
import {
    View,
    Text
    , StyleSheet,
    TouchableHighlight
} from 'react-native';
import BaseView from "../../../componet/BaseView";
import TFlatList from "../../../componet/TFlatList";
import NumberCircle from "../../../componet/NumberCircle";

export default class SSC_History extends BaseView {

    static propTypes={
        lottery_name:PropTypes.string,
        lottery_id:PropTypes.any
    }

    constructor(props) {
        super(props);
        this.state = {
            dataArray: [],
        };
        this.next_id=0;
    }


    renderBody() {
        return (
            <View style={G_Style.appContentView}>
                <TFlatList dataList={this.state.dataArray} loadMore={this.loadMore} renderRow={this._renderRow}/>
            </View>
        );
    }

    componentDidMount() {
        G_RunAfterInteractions(()=>{
            this.loadMore(null,true);
        })
    }

    loadMore = (callBack, isFlush) => {
        //TLog("this.props.navigation.state.params---",this.props.navigation.state.params)
        const {lottery_id} = this.props.navigation.state.params;
        HTTP_SERVER.notice_Lottery_Hisotry.url= `${HTTP_SERVER.notice_Lottery_Hisotry.formatUrl}/${lottery_id}/${this.next_id}`
        ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.notice_Lottery_Hisotry,(result)=>{
            if(result.isSuccess)
            {
                this.next_id= result.data.next_id;
                this.setState({dataArray:this.state.dataArray.concat(result.data.list)})

                if(callBack) {
                    callBack();
                }
            }
        })
    }

    _renderRow = (rowData) => {
        let itemContentView = [];
        let lotteryList=rowData.win_number.split("");
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
                        <Text style={{fontSize: 12, color: "#666", marginLeft: 10}}>{`第${rowData.issue}期`}</Text>
                        <Text style={{fontSize: 12, color: "#666", marginLeft: 10}}>{rowData.offical_time}</Text>
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
       // TLog("Award----", data)
        // NavUtil.pushToView(G_NavViews.SSC_History({...data,title:data.name}));
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