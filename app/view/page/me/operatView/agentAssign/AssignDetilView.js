import React from 'react';
import {
    View,
    Text, StyleSheet,
    ListView
} from 'react-native';

import BaseView from "../../../../componet/BaseView";
import {TButtonProxy} from "../../../../componet/tcustom/button/TButton";
import {TTextInput} from "../../../../componet/tcustom/textInput/TTextInput";


export default class AssignDetilView extends BaseView {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2,
            }),
            dataObj: null,
            userName:"",
        }
    }

    componentWillReceiveProps(nextProps) {
        G_MyStorage.getItem(G_EnumStroeKeys.FORCE_FLUSH_PROXY_MEONY, (data) => {
            if (data&&data!="false") {
                G_MyStorage.setItem(G_EnumStroeKeys.FORCE_FLUSH_PROXY_MEONY, "false", () => {
                    this.flushData(true);
                    TLog("componentWillReceiveProps----G_EnumStroeKeys.FORCE_FLUSH_PROXY_MEONY");
                })
            }else {
                TLog("componentWillReceiveProps----");
            }
        })
    }


    renderBody() {
        let dataList = this.state.dataObj ? this.state.dataObj.dataList : []
        let ds = this.state.dataSource.cloneWithRows(dataList);
        return (this.state.dataObj ? <View style={G_Style.appContentView}>
            <View style={{
                flexDirection: "row", alignItems: "center", margin: 10,
            }}>
                <Text>用户名:</Text>
                <TTextInput value={this.state.userName}
                            viewStyle={{borderBottomWidth:1, marginHorizontal:10, borderColor:"gray"}}
                            style={styles.textStyle}
                            placeholder={"检索用户名"} onChangeText={(userName) => this.setState({userName})} />
                <TButtonProxy btnName='搜索'
                              containerStyle={{paddingHorizontal: 10, borderRadius: 5}}
                              onPress={this._onSearchBtn}/>
            </View>
            <View style={{flexDirection: "row"}}>
                <View style={[styles.headView, {flex: 2}]}>
                    <Text style={styles.headText}>下级代理</Text>
                </View>
                <View style={[styles.headView, {flex: 2}]}>
                    <Text style={styles.headText}>奖金组</Text>
                </View>
                {
                    this.state.dataObj.headList.map((item, index) => {
                        return ( <View style={[styles.headView]} key={index}>
                            <Text style={styles.headText}>{item.prize_group}</Text>
                        </View>)
                    })
                }
            </View>
            <ListView
                dataSource={ds}
                renderRow={this.rendeRow}
                enableEmptySections={true}
            />
        </View> : null)
    }


    rendeRow = (data) => {
        return (<View style={{flexDirection: "row"}}>
            <View style={[styles.contentView, {flex: 2}]}>
                <Text style={styles.contentText}> {data.info.username}</Text>
            </View>
            <View style={[styles.contentView, {flex: 2}]}>
                <Text style={[styles.contentText, {fontSize: 12}]}>{`临时:${data.info.prize_group}`}</Text>
                <Text style={[styles.contentText, {fontSize: 12}]}>{`永久:${data.info.forever_prize_group}`}</Text>
            </View>
            {
                data.groupList.map((item, index) => {
                    return (<View style={[styles.contentView]} key={index}>
                        {item.editable ? <TButtonProxy containerStyle={{paddingHorizontal: 8, borderRadius: 5}}
                                                       onPress={() => this._onClikGroupBtn(item, data)}
                                                       textStyle={styles.contentText} btnName={item.value}/>
                            : <Text style={styles.contentText}>{item.value}</Text> }
                    </View>)
                })
            }
        </View>)
    }


    componentDidMount() {
        this.flushData(false);
    }

    flushData = (isHideLoading,username="") => {
        G_RunAfterInteractions(()=>{
            HTTP_SERVER.AgentAssinList.body.username=username
            HTTP_SERVER.AgentAssinList.body.prize_group = this.props.passProps.prize_group
            ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.AgentAssinList, (data) => {
                let dataObj = {}
                let headList = [];
                obj = data.data.quotas;
                for (let index in obj) {
                    let temp = obj[index];
                    headList.push(temp);
                }
                dataObj.headList = headList;
                let dataList = [];
                let obj = data.data.aSubUsers;
                for (let key in obj) {
                    let temp = obj[key];
                    obj[key].groupList = []
                    let quotas = temp.quotas
                    for (let qindex in quotas) {
                        for (let item of headList) {
                            if (item.prize_group == qindex) {
                                quotas[qindex].group = item;
                                quotas[qindex].curGroup = qindex;
                                temp.groupList.push(quotas[qindex])
                            }
                        }
                    }
                    dataList.push(temp);
                }
                dataObj.dataList = dataList;
                this.setState({dataObj})
            },isHideLoading)
        })
    }

    _onClikGroupBtn = (groupData, data) => {
        G_NavUtil.pushToView(G_NavViews.AssignChangeView({groupData, data}))
    }

    _onSearchBtn=()=>{
        this.flushData(false,this.state.userName);
    }
}

const styles = StyleSheet.create({
    textStyle: {
        width: 150,
        fontSize: 14,
        height: 30,
        paddingLeft: 5,
    },
    headText: {
        fontSize: 15,
        fontWeight: "bold"
    },
    headView: {
        paddingVertical: 20,
        paddingHorizontal: 1,
        backgroundColor: "rgb(241, 241, 241)",
        flex: 1,
        borderWidth: 1,
        borderColor: "gray",
        justifyContent: "center",
        alignItems: "center",
        borderRightWidth: 0,
    },
    contentView: {
        paddingVertical: 5,
        paddingHorizontal: 1,
        flex: 1,
        borderWidth: 1,
        borderColor: "gray",
        justifyContent: "center",
        alignItems: "center",
        borderRightWidth: 0,
        borderTopWidth: 0
        //textAlign: "center"
    },
    contentText: {
        fontSize: 13
    }
})