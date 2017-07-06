import React from 'react';
import {
    View,
    Text, StyleSheet,
    TouchableHighlight,
} from 'react-native';
import TFlatList from "../../../../componet/TFlatList";
import AIcon from 'react-native-vector-icons/FontAwesome';

export default class ChaseRecodListView extends React.Component {

    constructor(props) {
        super(props);
        this.itemClick=this.itemClick.bind(this);
    }

    render() {
        let {pageSize,dataList}=this.props
        return (
            <View style={G_Style.appContentView}>
                <TFlatList pageSize={pageSize} dataList={dataList} loadMore={this.props.loadMore} renderRow={this._renderRow}/>
            </View>
        )
    }

    _renderRow = (rowData) => {
        let {gameModel,appModel} = this.props;
        let gameName = gameModel.getGameNameById(rowData.lottery_id);

        TLog('rowData',rowData);
        let statusColor=rowData.status==1?G_Theme.grayDeep:G_Theme.primary;

        return (
            <View>
                <TouchableHighlight onPress={() => this.itemClick(rowData)} underlayColor='rgba(10,10,10,0.2)'>
                    <View style={styles.row}>
                        <View style={[styles.itemContentStyle,{flex:2}]}>
                            <Text style={styles.textItemStyle}>{gameName}</Text>
                            <Text style={[styles.textItemStyle,styles.desc]}>{rowData.title}</Text>
                        </View>
                        <View style={[styles.itemContentStyle,{flex:3}]}>
                            <Text style={styles.textItemStyle} numberOfLines={1}>已完成:2</Text>

                            <Text style={[styles.desc]}>总追号:1</Text>

                        </View>
                        <View style={[styles.itemContentStyle,{flex:2}]}>
                            <Text style={[styles.textItemStyle,{fontSize:16,
                                fontWeight: 'bold',
                                color: statusColor,
                                paddingRight:3}]} >{appModel.getATraceStatus(rowData.status)}</Text>

                        </View>

                        <View style={[styles.itemContentStyle,{flex: 1 }]}>

                            <AIcon name={"angle-right"}
                                   style={{fontSize: 25, paddingTop:2, alignSelf: "center", color: "gray"}}/>
                        </View>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }

    itemClick = (data) => {
        G_NavUtil.pushToView(G_NavViews.ChaseDeatilView({...data,title:"追号详情",...this.props}));
    }
}

const styles = StyleSheet.create({
    itemHeadStyle: {
        alignItems: "center",
        borderRightWidth: 1,
        justifyContent: "center"
    },
    itemContentStyle: {
        flex: 1,
        justifyContent: "center"
    },
    desc:{
        fontSize: 12,color:"gray", marginTop:5    },
    textHeadStyle: {
        fontSize: 14,
        fontWeight: "bold",
        color:"gray"
    },
    textItemStyle: {
        fontSize: 13,
    },
    headRow: {
        flexDirection: 'row',
        height: 20,
        borderBottomColor: "#ddd",
        borderBottomWidth: 1,
    },
    row: {
        flexDirection: 'row',
        height: 50,
        borderBottomWidth:0.5,
        marginLeft:10,
        borderColor: "gray",
    },
});
