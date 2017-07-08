import React from 'react';
import {
    View,
    Text
    , StyleSheet,
    TouchableOpacity
} from 'react-native';
import {connect} from 'react-redux';
import AIcon from 'react-native-vector-icons/FontAwesome';
import NumberCircle from "../componet/NumberCircle";
import BaseView from "../componet/BaseView";
import TFlatList from "../componet/TFlatList";

const mapStateToProps = state => {
    return {
       // noticeList: state.get("noticState").get("noticeList"),
      //  awardMondy: state.get("noticState").get("awardMondy")
    }
}

@connect(mapStateToProps)
export default class Award extends BaseView {
    static navigationOptions = ({navigation})=> ({
        title: '开奖',
        tabBarIcon: ({tintColor, focused}) => {
            return <AIcon name='gift' style={{ fontSize: 25, color:focused ? G_Theme.selectColor:G_Theme.gray}}/>
        },
    })

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
        if(G_PLATFORM_IOS)
        {
            this.onRequest();
        }
        else{
            setTimeout(this.onRequest,300)
        }
    }

    onRequest=()=>{
      ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.notice_ALL_Lottery,(data)=>{
            if(data.isSuccess)
            {
                this.setState({dataArray:data.data});
            }
        })
    }

    _renderRow = (rowData) => {
        let itemContentView = [];
        let lotteryList = this.onHandleWinner(rowData.series_name,rowData.win_number);
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

    onHandleWinner=(series_name,numStr)=>{
        let lotteryList=[];
        switch(series_name) {
            case "SSC":
            case "K3":
            case "LUCKY":
            case "3D":
                lotteryList=numStr.split("");
                break;
            case "11-5":
                lotteryList=numStr.split(" ");
                break;
            case  "KENO":
                lotteryList=numStr.split(",")
                break;
            default:
                lotteryList=numStr.split(" ");
                break;
        }
        return lotteryList;
    }

    itemClick = (data) => {
        TLog("itemClick--------",data);
        switch(data.series_name)
        {
             case "11-5":
                G_NavUtil.pushToView(G_NavViews.G_11_5_History({...data,onHandleWinner:this.onHandleWinner}));
                break;
            default:
                G_NavUtil.pushToView(G_NavViews.SSC_History({...data,onHandleWinner:this.onHandleWinner}));
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