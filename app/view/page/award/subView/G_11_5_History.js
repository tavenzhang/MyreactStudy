import React ,{PropTypes}from 'react';
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


export default class G_11_5_History extends BaseView {

    static propTypes = {
        lottery_name: PropTypes.string,
    }

    constructor(props) {
        super(props);
        this.state = {
            dataArray: [],
        };
        this.next_id=0
    }

   getNavigationBarProps(){
        return {title:this.props.passProps.lottery_name}
    }

    renderBody() {
        const {passProps} = this.props;
        //TLog("SSC_History----",passProps)
        return (
            <View style={G_Style.appContentView}>
                <HistoryList dataList={this.state.dataArray} loadMore={this.loadMore} renderRow={this._renderRow}/>
            </View>
        );
    }

    componentDidMount() {
        this.loadMore(null,0);
    }


    loadMore = (callBack, forcePage = 1) => {
       G_RunAfterInteractions(()=>{
           const {lottery_id} = this.props.passProps;
           HTTP_SERVER.notice_Lottery_Hisotry.url= `${HTTP_SERVER.notice_Lottery_Hisotry.formatUrl}/${lottery_id}/${this.next_id}`
           ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.notice_Lottery_Hisotry,(result)=>{
               if(result.isSuccess)
               {
                   this.next_id = result.data.next_id;
                   if(forcePage==0)
                   {

                       this.setState({dataArray:result.data.list})
                   }
                   else{
                       if(result.data.list.length>0)
                       {
                           this.setState({dataArray:this.state.dataArray.concat(result.data.list)})
                       }
                   }
                   if (callBack) {
                       callBack();
                   }
               }
           })
       })
    }


    _renderRow = (rowData) => {
        let itemContentView = [];
        let lotteryList=rowData.win_number.split(" ");
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
       // TLog("GameResultList----", data)
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