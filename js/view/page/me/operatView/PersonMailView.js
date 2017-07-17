import React from 'react';
import {
    View,
    Text
    , StyleSheet,
    TouchableHighlight
} from 'react-native';

import AIcon from 'react-native-vector-icons/FontAwesome';
import BaseView from "../../../componet/BaseView";
import TFlatList from "../../../componet/TFlatList";


export default class PersonMailView extends BaseView {
    constructor(props) {
        super(props);
        this.state = {
            dataList: [],
            msgList:[],
            curPage:1,
            totalPage:1,
        };
    }

    renderBody() {
        return (
            <View style={G_Style.appContentView}>
                <TFlatList curPage={this.state.curPage} totalPage={this.state.totalPage} dataList={this.state.dataList} renderRow={this._renderRow}/>
            </View>
        );
    }


    componentDidMount() {
        G_RunAfterInteractions(() => {
            if (this.state.dataList.length <= 0) {
                ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.LETTER_LIST, (result) => {
                    if (result.data.data) {
                        let arr = this.state.dataList.concat(result.data.data);
                        this.setState({dataList: arr, curPage:result.data.current_page,
                            totalPage:last_page});
                        this.setState({msgList: result.data.msg_type});
                    }
                });
            }
        })
    }

    _renderRow = (data) => {
        let dataName = G_DateUtil.formatFrendlyDateString(data.updated_at);
        let typeInfo = this.state.msgList;
        let typeName = typeInfo[data.type_id];
        return (
            <View>
                <TouchableHighlight onPress={() => this.itemClick(data)} underlayColor='rgba(10,10,10,0.2)'>
                    <View style={styles.row}>
                        <View style={[styles.itemContentStyle, {flex: 3}]}>
                            <Text style={styles.textHeadStyle}>
                                {data.msg_title} {data.is_readed ? <AIcon name={"envelope-open-o"}
                                                                          style={styles.Icon}/> :
                                <AIcon name={"envelope-o"} style={styles.IconU}/>
                            }</Text>
                            <Text style={[styles.textItemStyle, {marginTop: 5}]} numberOfLines={1}>
                                <Text style={{color:G_Theme.primary,marginRight:5}}>【{typeName}】</Text>
                                {dataName}</Text>
                        </View>
                        <View style={styles.itemContentStyle}>
                            <AIcon name={"angle-right"}
                                   style={{fontSize: 25, alignSelf: "center", color: "gray"}}/>
                        </View>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }

    itemClick = (data) => {
        G_NavUtil.push(G_RoutConfig.MessageDetail,{...data, title: "信件详情"});
    }

}


const styles = StyleSheet.create({
    itemHeadStyle: {
        // alignItems: "center",
        borderRightWidth: 1,
        justifyContent: "center"
        // borderWidth: 1
    },
    itemContentStyle: {
        flex: 1,
        // alignItems: "center",
        justifyContent: "center"
        // borderWidth: 1
    },
    textHeadStyle: {
        fontSize: 14,
        // fontWeight: "bold",

    },
    textItemStyle: {
        fontSize: 12,
        color: "gray"
    },
    Icon:{
        fontSize: 15,
        alignSelf: "center",
        color: G_Theme.gray
    },
    IconU:{
        fontSize: 15,
        alignSelf: "center",
        color: G_Theme.primary
    },
    row: {
        padding: 10,
        flexDirection: 'row',
        height: 60,
        borderBottomWidth: 1,
        paddingLeft: 15,
        borderColor: G_Theme.gray,
        // borderWidth: 1,
    },

});
