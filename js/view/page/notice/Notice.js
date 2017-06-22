import React from 'react';
import {
    View,
    Text
    , StyleSheet,
    TouchableHighlight
} from 'react-native'
import AIcon from 'react-native-vector-icons/FontAwesome';
import BaseView from "../../componet/BaseView";
import MsgListView from "../../componet/BaseListView";

export default class Notice extends BaseView {
    constructor(props) {
        super(props);
        this.state = {
            dataList: []
        };
    }

    renderBody() {
        return (
            <View style={G_Style.appContentView}>
                <MsgListView dataList={this.state.dataList} loadMore={this.props.loadMore} renderRow={this._renderRow}/>
            </View>
        );
    }

    componentDidMount() {
        if (this.state.dataList.length <= 0) {
            G_RunAfterInteractions(()=>{
                ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.GET_LIST_SYSTEM, (result) => {
                    if (result.data.data) {
                        let arr = this.state.dataList.concat(result.data.data);
                        this.setState({dataList: arr});
                    }
                });
            })
        }
    }

    _renderRow = (data) => {
        return (
            <View>
                <TouchableHighlight onPress={() => this.itemClick(data)} underlayColor='rgba(10,10,10,0.2)'>
                    <View style={styles.row}>
                        <View style={[styles.itemContentStyle, {flex: 3, alignItems:"center"}]}>
                            <Text style={styles.textHeadStyle}>{data.title}</Text>
                        </View>
                        <View style={styles.itemContentStyle}>
                            <AIcon name={G_EnumFontNames.angleRight}
                                   style={{fontSize: 25, alignSelf: "center", color: "gray"}}/>
                        </View>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
    itemClick = (data) => {
        G_NavUtil.pushToView(G_NavViews.NoticeDeailView({...data, title: data.title}));
    }
}


const styles = StyleSheet.create({
    itemHeadStyle: {
        alignItems: "center",
        borderRightWidth: 1,
        justifyContent: "center",
        textAlign: "center"
    },
    itemContentStyle: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    textHeadStyle: {
        fontSize: 14,
        fontWeight: "bold",

    },
    textItemStyle: {
        fontSize: 12,
        color: "gray"
    },
    row: {
        flexDirection: 'row',
        height: 50,
        borderBottomWidth: 0.5,
        marginLeft: 10,
        borderColor: "gray",
        // borderWidth: 1,
    },

});
