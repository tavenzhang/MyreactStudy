import React from 'react';
import {
    Image,
    View,
    Text
    , StyleSheet,
    ListView,
    TouchableHighlight
} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import AIcon from 'react-native-vector-icons/FontAwesome';
import NumberCircle from "../../componet/NumberCircle";
import BaseView from "../../componet/BaseView";

const mapStateToProps = state => {
    return {
        noticeList: state.get("noticState").get("noticeList"),
        awardMondy: state.get("noticState").get("awardMondy")
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchtAct:bindActionCreators(ActionEnum.FetchAct, dispatch),
        actions: bindActionCreators(ActionEnum.NoticeAct, dispatch),
    }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class GameResultView extends BaseView {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        };
    }
    componentDidMount() {
        let {actions, fetchtAct}= this.props;
        // fetchtAct.fetchWithResult("", (data) => {
        //     actions.flushNoticeListView(data)
        // });
    }

    componentWillUnmount() {

    }

    renderBody() {
        let {dataList, actions}= this.props;
        dataList = [];
        let i = 0;
        while (i < 20) {
            dataList.push({
                name: "游戏" + i,
                title: `第${i}期`,
                date: "2017-12-11 22:10:15",
                type: 1,
                history: ["01", "02", "03", "09", "08", "13"],
                specil: [i*1+10]
            });
            i++;
        }
        let ds = this.state.dataSource.cloneWithRows(dataList);
        return (
            <View style={GlobeStyle.appContentView}>
                <ListView
                    dataSource={ds}
                    renderRow={this._renderRow}
                />
            </View>
        );
    }


    _renderRow = (rowData) => {
        let itemContentView = [];
        switch (rowData.type) {
            case 1:
                if(rowData.history)
                {
                    rowData.history.map((item,index) => {
                        itemContentView.push(<NumberCircle key={`${index}w`} data={item} color="#f00" radius={13} dim={index==0 ? 0:4}/>);
                    })
                }
                if(rowData.specil)
                {
                    rowData.specil.map((item,index) => {
                        itemContentView.push(<NumberCircle key={`${index}s`} data={item} color="#0f0" radius={13} dim={8}/>);
                    })
                }
                break;
        }
        return (
            <TouchableHighlight onPress={() => this.itemClick(rowData)} underlayColor='rgba(0,0,0,0)'>
            <View style={styles.row} >
                <View>
                    <View style={{flexDirection: "row",paddingTop: 10,alignItems:"center"}}>
                        <Text style={{fontSize: 14}}>{rowData.name}</Text>
                        <Text style={{fontSize: 12,color:"#666" ,marginLeft: 10}}>{rowData.title}</Text>
                        <Text style={{fontSize: 12,color:"#666",marginLeft: 10 }}>{rowData.date}</Text>
                    </View>
                    <View style={{marginTop:5,justifyContent:"center",flexDirection:"row"}}>
                        {itemContentView}
                    </View>
                </View>
                <AIcon name="angle-right" style={styles.iconNormal}/>
            </View>
            </TouchableHighlight>
        );
    }

    itemClick=(data)=>{
        NavUtil.pushToView(NavViews.Fast3Notice(data));
    }
}

const gridSize = 100;
const gridMargin = 10;
const listWidth = Math.floor(GlobelTheme.screenWidth/(gridSize + gridMargin * 2)) * (gridSize + gridMargin * 2);
var styles = StyleSheet.create({
    list: {
        //justifyContent: 'flex-start',
        // flexDirection: 'row',
        //flexWrap: 'wrap',
        //alignItems: 'flex-start',
        width: listWidth,
        alignSelf: "center",
        marginTop: 31,
    },
    row: {
        flexDirection: 'row',
        justifyContent: "space-between",
        // alignItems: "center",
        height: 70,
        borderBottomColor: "#ddd",
        borderBottomWidth: 1,
        marginLeft: 10
    },
    text: {
        flex: 1,
        marginTop: 5,
        fontWeight: 'bold'
    },
    iconNormal: {
        color: GlobelTheme.gray,
        fontSize: 20,
        right: 20,
        alignSelf: "center",
    },

});