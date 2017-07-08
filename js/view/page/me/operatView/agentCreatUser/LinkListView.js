import React, {PropTypes} from 'react';
import {
    View,
    Text, StyleSheet,
    Clipboard,
    TouchableHighlight,
} from 'react-native';
import TFlatList from "../../../../componet/TFlatList";
import Button from "react-native-button";
import BaseView from "../../../../componet/BaseView";
import AIcon from 'react-native-vector-icons/FontAwesome';

export default class LinkListView extends BaseView {
    static propTypes = {
        isGentUser: PropTypes.any,
        groupDate: PropTypes.object
    }

    constructor(props) {
        super(props);
        this.state = {
            dataList: [],
            aStatus: [],
        }
    }

    renderBody() {

        return (<View style={G_Style.appContentView}>
            <TFlatList
                dataList={this.state.dataList}
                renderHeader={this.renderHeadView}
                renderRow={this.rendeRow}
            />
        </View>)
    }

    renderHeadView = () => {
        return (<View style={{flexDirection: "row"}}>
            {/*<Text style={[styles.headView]}>类型</Text>*/}
            {/*<Text style={[styles.headView,{flex:4}]}>复制链接</Text>*/}
            {/*<Text style={[styles.headView,{flex:2}]}>操作</Text>*/}
        </View>)
    }

    rendeRow = (data) => {

        // const price_group = JSON.parse(data.prize_group_sets);
        // const nowDate = Date.parse(new Date()),
        //     expirtDate = G_DateUtil.datetime2unix(data.expired_at);
        // if (nowDate > expirtDate) {
        //     data.status = 2; //过期
        // }
        // TLog('this.state.aStatus',this.state.aStatus);
        return (<View style={[styles.row, {backgroundColor: data.status == 2 || data.status == 1 ? '#ccc' : '#fff'}]}>
            <TouchableHighlight onPress={() => {
                this._onDeleteLink(data)
            }}>
                <View style={[styles.contentView, {flex: 1,}]}>
                    <AIcon name={'minus-circle'}
                           style={{fontSize: 20, color: G_Theme.grayDeep,}}/>
                </View>
            </TouchableHighlight>
            <View style={[styles.contentView, {flex: 2}]}>
                <View style={{flexDirection: "row",}}>
                    <Text style={[styles.agentText]}>
                        {data.is_agent > 0 ? "代理" : "玩家"}
                    </Text>
                    <Text style={{
                        fontSize: 12,
                        color: G_Theme.grayDeep,
                        lineHeight: 20,
                        marginLeft: 3
                    }}>{this.state.aStatus[data.status]}</Text>

                </View>

                <Text numberOfLines={1} style={{fontSize: 12, color: G_Theme.grayDeep, lineHeight: 20}}>
                    奖金组:{data.price_group[0].prize_group}
                </Text>
            </View>

            <View style={[styles.contentView, {flex: 5,}]}>
                <Text numberOfLines={2} style={{lineHeight: 20}} onPress={() => {
                    this._onClicpLink(data.url)
                }}>{data.url}</Text>
            </View>
            <TouchableHighlight onPress={() => {
                this._onDetailLink(data)
            }}>
                <View style={[styles.contentView, {flex: 2}]}>
                    <AIcon name={"angle-right"}
                           style={{fontSize: 25, alignSelf: "center", color: G_Theme.primary}}/>
                </View>
            </TouchableHighlight>

        </View>)
    }

    componentDidMount() {
        G_RunAfterInteractions(() => {
            ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.AgentUserLinkList, (data) => {
                let result = data.data.datas.data;

                for (let index in result) {
                    const nowDate = Date.parse(new Date()),
                        expirtDate = G_DateUtil.datetime2unix(result[index].expired_at);
                    if (nowDate > expirtDate) {
                        result[index].status = 2; //过期
                    }
                    result[index].price_group = JSON.parse(result[index].prize_group_sets);
                }


                this.setState({dataList: result})
                this.setState({aStatus: data.data.sources.aStatus})
            })
        })
    }

    _onClicpLink = (data) => {
        Clipboard.setString(data);
        G_AlertUtil.show("", "复制成功！")
    }
    _onDeleteLink = (data) => {
        G_RunAfterInteractions(() => {
            HTTP_SERVER.AgentUserDelLink.url = HTTP_SERVER.AgentUserDelLink.formatUrl.replace("#id", data.id);
            ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.AgentUserDelLink, (result) => {
                if (result.isSuccess) {
                    TLog("G_RunAfterInteractions");
                    let list = this.state.dataList.concat();
                    for (let index in list) {
                        let item = list[index];
                        if (item && (item.id == data.id)) {
                            list.splice(index, 1);
                            this.setState({dataList: list})
                            break;
                        }
                    }
                }
            })
        })
    }

    _onDetailLink = (data) => {
        G_NavUtil.pushToView(G_NavViews.LinkDetailView({content: data, aStatus: this.state.aStatus}))
    }
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row", height: 60, borderBottomWidth: 1, borderBottomColor: G_Theme.gray
    },
    agentText: {
        backgroundColor: G_Theme.primary,
        paddingTop: 2,
        borderRadius: 8,
        width: 40,
        height: 16,
        overflow: 'hidden',
        color: '#fff', fontSize: 12, textAlign: 'center', width: 40
    },


    textStyle: {
        width: 150,
        left: 10,
        fontSize: 14,
        height: G_Theme.textInpuntH,
        // borderWidth:0.5,
        marginRight: 15,
        paddingLeft: 5
    },
    headView: {
        padding: 2,
        paddingVertical: 5,
        backgroundColor: "rgb(241, 241, 241)",
        flex: 1,
        // borderWidth: 1,
        borderColor: G_Theme.gray,
        textAlign: "center",
    },
    contentView: {
        flex: 1,
        padding: 5,
        // borderWidth: 1,
        borderColor: G_Theme.gray,
        // alignItems:"center",
        justifyContent: "center"
    }
})