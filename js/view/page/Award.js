import React from 'react';
import {
    View,
    Text
    , StyleSheet,
    TouchableOpacity
} from 'react-native';
import AIcon from 'react-native-vector-icons/FontAwesome';
import NumberCircle from "../componet/NumberCircle";
import BaseView from "../componet/BaseView";
import TFlatList from "../componet/TFlatList";
import connect from "react-redux/src/components/connect";

const mapStateToProps = state => {
    return {
        gameModel: state.get("appState").get("gameModel"),
    }
}
@connect(mapStateToProps)
export default class Award extends BaseView {
    static navigationOptions = ({navigation})=> ({
        title: '开奖',
        tabBarIcon: ({focused}) => {
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
            setTimeout(this.onRequest,500)
        }
        else{
            setTimeout(this.onRequest,500)
        }
    }

    onRequest=()=>{
      ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.notice_ALL_Lottery,(data)=>{
            if(data.isSuccess)
            {
                this.setState({dataArray:data.data});
            }
        },true)
    }

    _renderRow = (rowData) => {
        let {gameModel}=this.props
        let itemContentView = [];
        let lotteryList = G_GAME_OnHandleWinnerNum(gameModel.getSeriesIdById(rowData.lottery_id),rowData.win_number);
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
        TLog("itemClick--------",data);
        switch(data.series_name)
        {
            default:
                G_NavUtil.pushToView(G_NavViews.SSC_History({...data,...this.props}));
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