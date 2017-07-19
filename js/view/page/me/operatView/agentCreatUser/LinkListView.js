import React, {PropTypes} from 'react';
import {
    View,
    Text, StyleSheet,
    TouchableOpacity
} from 'react-native';
import TFlatList from "../../../../componet/TFlatList";
import BaseView from "../../../../componet/BaseView";
import AIcon from 'react-native-vector-icons/FontAwesome';

export default class LinkListView extends BaseView {
    static  navigationOptions = {
        title: "开户链接"
    }
    static propTypes = {
        isGentUser: PropTypes.any,
        groupDate: PropTypes.object
    }

    constructor(props) {
        super(props);
        this.state = {
            dataList: [],
            aStatus: [],
            curPage: 1,
            totalPage: 1
        }
    }

    renderBody() {

        return (<View style={G_Style.appContentView}>
            <TFlatList
                curPage={this.state.curPage}
                totalPage={this.state.totalPage}
                dataList={this.state.dataList}
                renderHeader={this.renderHeadView}
                renderRow={this.rendeRow}
            />
        </View>)
    }

    renderHeadView = () => {
        return (<View>
        </View>)
    }

    rendeRow = (data) => {

        return (<View style={[styles.row, {backgroundColor: data.status == 2 || data.status == 1 ? '#ccc' : '#fff'}]}>
            <TouchableOpacity onPress={() => {
                this._onDeleteLink(data)
            }}>
                <View style={[styles.contentView, {flex: 2}]}>
                    <AIcon name={G_EnumFontNames.minusCircle}
                           style={{fontSize: 20, color: "red", marginLeft: 14}}/>
                </View>
            </TouchableOpacity>
            <View style={[styles.contentView, {flex: 3}]}>
                <View>
                    <Text style={[styles.agentText]}>
                        {data.is_agent > 0 ? "代理" : "玩家"}
                    </Text>
                    <Text style={{
                        fontSize: 12,
                        color: G_Theme.grayDeep,
                        lineHeight: 20,
                    }}>有效期:{data.status}</Text>
                </View>
                <Text numberOfLines={1} style={{fontSize: 12, color: G_Theme.grayDeep, lineHeight: 20}}>
                    奖金组:{data.price_group[0].prize_group}
                </Text>
            </View>

            <View style={[styles.contentView, {flex: 5}]}>
                <TouchableOpacity onPress={() => {
                    this._onDetailLink(data)
                }}>
                    <Text numberOfLines={2} style={{lineHeight: 20}}>{data.url}</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity  onPress={() => {
                this._onDetailLink(data)
            }}  style={[styles.contentView, {flex: 2}]}>
            <View>
                <AIcon name={"angle-right"} style={{fontSize: 25, fontWeight: "bold", alignSelf: "center", color: "red"}}/>

            </View>
            </TouchableOpacity>


        </View>)
    }

    componentDidMount() {
        G_RunAfterInteractions(() => {
            ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.AgentUserLinkList, (data) => {
                    if (data.data.datas) {
                        let result = data.data.datas.data;
                        for (let index in result) {
                            const nowDate = Date.parse(new Date());
                            let expirtDate = null;
                            if (result[index].expired_at) {
                                expirtDate = G_DateUtil.datetime2unix(result[index].expired_at);
                                if (nowDate > expirtDate) {
                                    result[index].status = "已过期"; //过期
                                }
                                else {
                                    result[index].status = Math.floor((expirtDate - nowDate) / (1000 * 60 * 60 * 24)) + "天";
                                }
                            } else {
                                result[index].status = "永久"
                            }
                            result[index].price_group = JSON.parse(result[index].prize_group_sets);
                        }
                        this.setState({
                            dataList: G_ArrayUtils.addComapreCopy(this.state.dataList, result),
                            curPage: data.data.datas.current_page,
                            totalPage: data.data.datas.last_page
                        })
                        // this.setState({aStatus: data.data.sources.aStatus})
                    }
                }
            )
        })
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
        G_NavUtil.push(G_RoutConfig.LinkDetailView, {content: data}, "链接详情")
    }
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row", height: 65, borderBottomWidth: 1, borderBottomColor: G_Theme.gray
    },
    agentText: {
        backgroundColor: G_Theme.primary,
        padding: 2,
        borderRadius: 8,
        width: 40,
        height: 16,
        justifyContent: "center",
        alignItems: "center",
        color: '#fff', fontSize: 12, textAlign: 'center',
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
        borderColor: G_Theme.gray,
        alignItems: "center",
        justifyContent: "center"
    }
})