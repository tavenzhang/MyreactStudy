import React from 'react';
import {
    View,
    Text
    , StyleSheet,
    TouchableHighlight
} from 'react-native';

import {connect} from 'react-redux';
import AIcon from 'react-native-vector-icons/FontAwesome';
;
import BaseView from "../../componet/BaseView";
import MsgListView from "../../componet/BaseListView";

const mapStateToProps = state => {
    return {
        isLoading: state.get("fetchState").get("requesting") || state.get("appState").get("requesting"),
    }
}

@connect(mapStateToProps)
export default class Notice extends BaseView {
    constructor(props) {
        super(props);
        this.state = {
            dataList: []
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
        if (this.state.dataList.length <= 0) {
            ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.GET_LIST_SYSTEM, (result) => {
                if (result.data.data) {
                    let arr = this.state.dataList.concat(result.data.data);
                    this.setState({dataList: arr});
                }
            });
        }
    }

    _renderRow = (data) => {
       // let dataName = DateUitil.formatItemDateString(data.created_at);
        return (
            <View>
                <TouchableHighlight onPress={() => this.itemClick(data)} underlayColor='rgba(10,10,10,0.2)'>
                    <View style={styles.row}>
                        <View style={[styles.itemContentStyle, {flex: 3, alignItems:"center"}]}>
                            <Text style={styles.textHeadStyle}>{data.title}</Text>
                        </View>
                        {/*<View style={styles.itemContentStyle}>*/}
                          {/**/}
                        {/*</View>*/}
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
        NavUtil.pushToView(NavViews.NoticeDeailView({...data, title: data.title}));
    }
}


const styles = StyleSheet.create({
    itemHeadStyle: {
        alignItems: "center",
        borderRightWidth: 1,
        justifyContent: "center",
        textAlign: "center"
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
