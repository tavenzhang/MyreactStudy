import React from 'react';
import {
    View,
    Text, StyleSheet,
    TouchableHighlight
} from 'react-native';

import BaseView from "../../../../componet/BaseView";
import {TButtonProxy} from "../../../../componet/tcustom/button/TButton";
import {TTextInput} from "../../../../componet/tcustom/textInput/TTextInput";
import TFlatList from "../../../../componet/TFlatList";


export default class AssignDetilView extends BaseView {

    constructor(props) {
        super(props);
        this.state = {
            dataObj: null,
            userName: "",
        }
    }



    renderBody() {
        let dataList = this.state.dataObj ? this.state.dataObj.dataList : []
        return (this.state.dataObj ? <View style={G_Style.appView}>
            <View style={{
                flexDirection: "row", alignItems: "center", margin: 5, alignSelf: "center",marginBottom:20
            }}>
                <Text>用户名:</Text>
                <TTextInput value={this.state.userName}
                            viewStyle={{borderBottomWidth: 1, marginHorizontal: 10,borderColor: "gray"}}
                            style={styles.textStyle}
                            placeholder={"检索用户名"} onChangeText={(userName) => this.setState({userName})}/>
                <TButtonProxy btnName='搜索'
                              containerStyle={{paddingHorizontal: 10, borderRadius: 5}}
                              onPress={this._onSearchBtn}/>
            </View>
            {/*<View style={{flexDirection: "row"}}>*/}
            {/*<View style={[styles.headView, {flex: 2}]}>*/}
            {/*<Text style={styles.headText}>下级代理</Text>*/}
            {/*</View>*/}
            {/*/!*<View style={[styles.headView, {flex: 2}]}>*!/*/}
            {/*/!*<Text style={styles.headText}>奖金组</Text>*!/*/}
            {/*/!*</View>*!/*/}
            {/*{*/}
            {/*this.state.dataObj.headList.map((item, index) => {*/}
            {/*return ( <View style={[styles.headView]} key={index}>*/}
            {/*<Text style={styles.headText}>{item.prize_group}</Text>*/}
            {/*</View>)*/}
            {/*})*/}
            {/*}*/}
            {/*/!*</View>*!/*/}
            <TFlatList styleView={{flex:1, borderTopWidth: 1,borderColor:G_Theme.gray}} dataList={dataList}   renderRow={this.rendeRow}/>
        </View> : null)
    }


    rendeRow = (data) => {
      //  TLog('data', data);
        return (<View style={{flexDirection: "row",borderBottomWidth:1,borderColor:G_Theme.gray,}}>
            <View style={[styles.contentView, {flex: 2}]}>
                <Text style={[styles.contentText, {fontSize: 16,paddingLeft:5}]}> {data.info.username}</Text>
                { data.info.prize_group!=data.info.forever_prize_group?<Text style={[styles.contentText, {
                    fontSize: 12,
                    color: G_Theme.primary,paddingLeft:5
                }]}>{`${data.info.prize_group}(临时)`}</Text>:null
                }
                <Text style={[styles.contentText, {
                    fontSize: 12,
                    color: G_Theme.grayDeep,paddingLeft:5
                }]}>{`${data.info.forever_prize_group}(永久)`}</Text>

            </View>

            <View style={[styles.contentView, {
                flex: 5,
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent:"flex-start",
                alignItems:"center"
            }]}>
                { data.groupList.map((item, index) => {
                    return item.editable ?
                        <TouchableHighlight
                            style={[{
                                borderRadius: 20,
                                height: 30,
                                padding: 5,
                                paddingHorizontal: 10,
                                margin: 3,
                                backgroundColor: G_Theme.primary
                            }]}
                            onPress={() => this._onClikGroupBtn(item, data)}
                            key={index}
                            underlayColor={G_Theme.primary}
                        >
                            <Text style={[styles.ballText, {lineHeight: 20, color: '#fff'}]}>{item.group.prize_group}
                                / {item.value}</Text>
                        </TouchableHighlight>
                        :  <TouchableHighlight
                            style={[{
                                borderRadius: 20,
                                height: 30,
                                paddingHorizontal: 10,
                                padding: 5,
                                margin: 3,
                                backgroundColor: G_Theme.gray
                            }]}
                            onPress={() => {return false}}
                            key={index}
                            underlayColor={G_Theme.gray}
                        >
                            <Text style={[styles.ballText, {lineHeight: 20, color: '#fff'}]}>{item.group.prize_group}
                                / {item.value}</Text>
                        </TouchableHighlight>
                })
                }
            </View>
        </View>)
    }


    componentDidMount() {
        this.flushData(false);
    }

    onForceFlushData(data){
        this.flushData(true);
        TLog("onForceFlushData--asssDeatl");
    }

    flushData = (isHideLoading, username = "") => {
        G_RunAfterInteractions(() => {
            HTTP_SERVER.AgentAssinList.body.username = username
            HTTP_SERVER.AgentAssinList.body.prize_group = this.props.navigation.state.params.prize_group
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
                TLog("dataObj.headList ----",dataObj.headList )
                TLog("dataObj.aSubUsers ------", data.data.aSubUsers)
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
            }, isHideLoading)
        })
    }

    _onClikGroupBtn = (groupData, data) => {
        G_NavUtil.push(G_RoutConfig.AssignChangeView,data,"修改配额")
    }

    _onSearchBtn = () => {
        this.flushData(false, this.state.userName);
    }
}

const styles = StyleSheet.create({
    textStyle: {
        width: 150,
        fontSize: 14,
        paddingLeft: 5,
        height:G_PLATFORM_IOS ? 30 : 40
    },
    headText: {
        fontSize: 15,
        fontWeight: "bold"
    },
    headView: {
        paddingVertical: 20,
        paddingHorizontal: 1,
        // backgroundColor: ,
        flex: 1,
        borderWidth: 1,
        borderColor: G_Theme.gray,
        justifyContent: "center",
        alignItems: "center",
        borderRightWidth: 0,
    },
    contentView: {
        paddingVertical: 5,
        paddingHorizontal: 1,
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",// borderWidth: 1,
        borderColor: G_Theme.gray,
        // justifyContent: "center",
        // alignItems: "center",
        borderRightWidth: 0,
        borderTopWidth: 0
        //textAlign: "center"
    },
    contentText: {
        fontSize: 13
    }
})