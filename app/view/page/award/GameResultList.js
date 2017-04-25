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
        noticeList: state.get("noticState").get("noticeList"),
        awardMondy: state.get("noticState").get("awardMondy")
    }
}

@connect(mapStateToProps)
export default class GameResultList extends BaseView {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        };
    }

    renderBody() {
        let {dataList, actions} = this.props;
        dataList = [];
        let i = 0;
        while (i < 20) {
            dataList.push({
                name: "山东11选5" + i,
                title: `第${i}099998677767期`,
                date: "2017-12-11 22:10:15",
                type: 1,
                history: ["01", "02", "03", "09", "08", "13"],
                specil: [i * 1 + 10]
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

    componentDidMount() {
    }

    componentWillUnmount() {

    }

    _renderRow = (rowData) => {
        let itemContentView = [];
        switch (rowData.type) {
            case 1:
                if (rowData.history) {
                    rowData.history.map((item, index) => {
                        itemContentView.push(<NumberCircle key={`${index}w`} data={item} color="#f00" radius={16}
                                                           dim={index == 0 ? 0 : 4}/>);
                    })
                }
                if (rowData.specil) {
                    rowData.specil.map((item, index) => {
                        itemContentView.push(<NumberCircle key={`${index}s`} data={item} color="#0f0" radius={16}
                                                           dim={8}/>);
                    })
                }
                break;
        }
        return (
            <TouchableHighlight onPress={() => this.itemClick(rowData)} underlayColor='rgba(0,0,0,0)'>
                <View style={styles.row}>
                    <View style={{flexDirection: "row", paddingTop: 5, alignItems: "center"}}>
                        <Text style={{fontSize: 16, color: "#f00"}}>{rowData.name}</Text>
                        <Text style={{fontSize: 12, color: "#666", marginLeft: 10}}>{rowData.title}</Text>
                        <Text style={{fontSize: 12, color: "#666", marginLeft: 10}}>{rowData.date}</Text>
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
        TLog("GameResultList----",data)
        NavUtil.pushToView(NavViews.SSC_History({...data,title:data.name}));
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