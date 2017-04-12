import React from 'react';
import {
    View,
    Text
    , StyleSheet,
    TouchableHighlight
} from 'react-native';

import AIcon from 'react-native-vector-icons/FontAwesome';
import BaseView from "../../../componet/BaseView";
import MsgListView from "../../../componet/BaseListView";


export default class MailView extends BaseView {
    constructor(props) {
        super(props);
        this.state = {
            dataList:[]
        };
    }

    renderBody() {
        return (
            <View style={GlobeStyle.appContentView}>
                <MsgListView dataList={this.state.dataList} loadMore={this.props.loadMore} renderRow={this._renderRow}/>
            </View>
        );
    }


    componentDidMount() {
        if(this.state.dataList.length<=0)
        {
            ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.LETTER_LIST, (result) => {
                if(result.data.data)
                {
                    let  arr=this.state.dataList.concat(result.data.data);
                    this.setState({dataList:arr});
                }
            });
        }
    }

    _renderRow=(data)=>{
        let dataName =  DateUtil.formatItemDateString(data.updated_at);
        return (
            <View>
                <TouchableHighlight onPress={() => this.itemClick(data)} underlayColor='rgba(10,10,10,0.2)'>
                    <View style={styles.row}>
                        <View style={[styles.itemContentStyle,{flex:3}]}>
                            <Text style={styles.textHeadStyle}>{data.msg_title}</Text>
                            <Text style={[styles.textItemStyle,{marginTop:5}]} numberOfLines={1}>{dataName}</Text>
                        </View>
                        <View style={styles.itemContentStyle}>
                            <Text style={[styles.textItemStyle,{fontWeight: "bold",color:data.is_readed ? "gray":GlobelTheme.primary}]} >{data.is_readed ? "已读":"未读"}</Text>
                        </View>
                        <View style={styles.itemContentStyle}>
                            <AIcon name={"angle-right"}
                                   style={{fontSize: 25, alignSelf:"center",color:"gray"}}/>
                        </View>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }

    itemClick=(data)=>{
        NavUtil.pushToView(NavViews.MessageDetail({...data,title:"信件详情"}));
    }

}


const styles = StyleSheet.create({
    itemHeadStyle: {
        alignItems: "center",
        borderRightWidth: 1,
        justifyContent: "center"
        // borderWidth: 1
    },
    itemContentStyle: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
        // borderWidth: 1
    },
    textHeadStyle: {
        fontSize: 14,
        fontWeight: "bold",

    },
    textItemStyle: {
        fontSize: 12,
        color:"gray"
    },
    row: {
        flexDirection: 'row',
        height: 45,
        borderBottomWidth:0.5,
        marginLeft:10,
        borderColor: "gray",
        // borderWidth: 1,
    },

});
