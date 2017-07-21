import React,{PropTypes} from 'react';
import {
    View,
    Text, StyleSheet,
    TouchableOpacity
} from 'react-native';
import TFlatList from "../../../../componet/TFlatList";
import AIcon from 'react-native-vector-icons/FontAwesome';

export default class ChaseRecodListView extends React.Component {

    static propTypes={
        dataList:PropTypes.any,
        curPage:PropTypes.number,
        totalPage:PropTypes.number,
    }

    render() {
        let {pageSize,dataList,curPage,totalPage}=this.props
        return (
            <View style={G_Style.appContentView}>
                <TFlatList  curPage={curPage} totalPage={totalPage} pageSize={pageSize} dataList={dataList} loadMore={this.props.loadMore} renderRow={this._renderRow}/>
            </View>
        )
    }

    _renderRow = (rowData) => {
        let {gameModel,appModel} = this.props;
        let gameName = gameModel.getGameNameById(rowData.lottery_id);
        let statusColor=rowData.status==1?G_Theme.grayDeep:G_Theme.primary;
        return (
                <TouchableOpacity onPress={() => this.itemClick(rowData)}>
                    <View style={styles.row}>
                        <View style={[styles.itemContentStyle,{flex:3}]}>
                            <Text style={styles.textItemStyle}>{gameName}</Text>
                            <Text style={[styles.textItemStyle,styles.desc]}>{rowData.title}</Text>
                        </View>
                        <View style={[styles.itemContentStyle,{flex:4, alignItems:"center", justifyContent:"center"}]}>
                            <Text style={styles.textItemStyle} numberOfLines={1}>{`完成度:${rowData.finished_issues}/${rowData.total_issues}`}</Text>
                            <Text style={[styles.textItemStyle,{fontSize:12,
                            }]} >({rowData.username})</Text>
                        </View>
                        <View style={[styles.itemContentStyle,{flex:2}]}>
                            <Text style={[styles.textItemStyle,{fontSize:12,
                              }]} >{rowData.bet_number}</Text>

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
                </TouchableOpacity>
        );
    }

    itemClick = (data) => {
        G_NavUtil.push(G_RoutConfig.ChaseDeatilView,{...data,title:"追号详情",...this.props});
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
