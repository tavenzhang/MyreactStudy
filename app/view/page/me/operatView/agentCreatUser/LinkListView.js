import React, {PropTypes} from 'react';
import {
    View,
    Text, StyleSheet,
    ListView,
    Clipboard
} from 'react-native';


import Button from "react-native-button";
import BaseView from "../../../../componet/BaseView";

export default class LinkListView extends BaseView {
    static propTypes = {
        isGentUser: PropTypes.any,
        groupDate: PropTypes.object
    }

    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2,
            }),
            dataList:[]
        }
    }

    renderBody() {
        let ds = this.state.dataSource.cloneWithRows(this.state.dataList)
        return (<View style={G_Style.appContentView}>
            <ListView
                dataSource={ds}
                renderHeader={this.renderHeadView}
                renderRow={this.rendeRow}
                enableEmptySections={true}
            />
        </View>)
    }

    renderHeadView = () => {
        return (<View style={{flexDirection: "row"}}>
            <Text style={[styles.headView,]}>渠道</Text>
            <Text style={[styles.headView]}>类型</Text>
            <Text style={[styles.headView,{flex:4}]}>复制链接</Text>
            <Text style={[styles.headView,{flex:2}]}>操作</Text>
        </View>)
    }

    rendeRow=(data,section)=>{
        return (<View style={{flexDirection: "row"}}>
            <View style={[styles.contentView]}>
                    <Text>{data.channel}</Text>
            </View>
            <View style={[styles.contentView]}>
                <Text >{data.is_agent ? "代理":"玩家"}</Text>
            </View>
            <View style={[styles.contentView,{flex:4}]}>
                <Button style={{fontSize:14, color:"red"}} onPress={()=>{this._onClicpLink(data.url)}}>{data.url}</Button>
            </View>
            <View style={[styles.contentView,{flex:2, flexDirection:"row"}]}>
               <Button style={{fontSize:14}}  onPress={()=>{this._onDetailLink(data)}}>
                   查看
               </Button>
                <Text style={{marginHorizontal:5}}>|</Text>
                <Button style={{fontSize:14}} onPress={()=>{this._onDeleteLink(data)}}>
                    删除
                </Button>
            </View>

        </View>)
    }

    componentDidMount() {
        G_RunAfterInteractions(()=>{
            ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.AgentUserLinkList,(data)=>{
                this.setState({dataList:data.data.datas.data})
            })
        })
    }

    _onClicpLink=(data)=>{
        Clipboard.setString(data);
        G_AlertUtil.show("","复制成功！")
    }

    _onDeleteLink=(data)=>{

        G_RunAfterInteractions(()=>{
            HTTP_SERVER.AgentUserDelLink.url=HTTP_SERVER.AgentUserDelLink.formatUrl.replace("#id",data.id);
            ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.AgentUserDelLink,(result)=>{
                if(result.isSuccess)
                {
                    TLog("G_RunAfterInteractions");
                    let list=this.state.dataList.concat();
                    for (let index in list)
                    {
                        let item = list[index];
                        if(item&&(item.id==data.id)){
                            list.splice(index,1);
                            this.setState({dataList:list})
                            break;
                        }
                    }
                }
            })
        })
    }

    _onDetailLink=(data)=>{
        G_NavUtil.pushToView(G_NavViews.LinkDetailView({content:data}))
    }

}

const  styles = StyleSheet.create({
    textStyle: {
        width: 150,
        left: 10,
        fontSize: 14,
        height:G_Theme.textInpuntH,
        borderWidth:0.5,
        marginRight:15,
        paddingLeft:5
    },
    headView: {
        padding: 2,
        paddingVertical: 5,
        backgroundColor: "rgb(241, 241, 241)",
        flex: 1,
        borderWidth: 1,
        borderColor: "gray",
        textAlign: "center",
        fontWeight:"bold"
    },
    contentView:{
        flex: 1,
        padding: 2,
        borderWidth: 1,
        borderColor: "gray",
        alignItems:"center",
        justifyContent:"center"
    }
})