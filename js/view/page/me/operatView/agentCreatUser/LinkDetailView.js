import React, {PropTypes} from 'react';
import {
    View,
    Text, StyleSheet,
} from 'react-native';


import Button from "react-native-button";
import BaseView from "../../../../componet/BaseView";

export default class LinkDetailView extends BaseView {


    constructor(props) {
        super(props);

    }

    renderBody() {
        let {content,aStatus}=this.props.navigation.state.params;
        let validstr= content.valid_days ? `${content.valid_days}天`:"永久";
        TLog("content-----",content)
        const price_group = JSON.parse(content.prize_group_sets);
        const nowDate = Date.parse(new Date()),
            expirtDate = G_DateUtil.datetime2unix(content.expired_at);
        if (nowDate > expirtDate) {
            content.status = 2; //过期
        }
        return (<View style={G_Style.appContentView}>

            <View style={{height:80 ,borderBottomColor:G_Theme.gray,paddingTop:20}}>
                <Text style={[{textAlign:'center',fontSize:30,color:G_Theme.primary}]}> {content.created_count}</Text>
                <Text style={[{textAlign:'center'}]}>开户数</Text>
            </View>

            <View style={{height:30 ,borderBottomColor:G_Theme.gray,padding:5,flexDirection:'row'}}>
                <Text style={[{flex:1,alignSelf:'center'}]}>  是否代理</Text>
                <Text style={{flex:1,alignSelf:'center'}} >状态</Text>
                <Text style={{flex:1,alignSelf:'center'}}> 有效期</Text>


            </View>
            <View style={{height:30 ,borderBottomColor:G_Theme.gray,padding:5,borderBottomWidth:1,flexDirection:'row'}}>
                <Text style={[{flex:1,alignSelf:'center'}]} numberOfLines={1}>  {content.is_agent ? "代理":"玩家"}</Text>
                <Text style={{flex:1,alignSelf:'center'}} numberOfLines={1}>   {aStatus[content.status]}</Text>
                <Text style={{flex:1,alignSelf:'center'}} numberOfLines={1}>   {validstr}</Text>


            </View>

            <View style={{height:60 ,borderBottomColor:G_Theme.gray,padding:10,borderBottomWidth:1,flexDirection:'row'}}>
                <Text numberOfLines={2}>   {content.url}</Text>

            </View>
            <View style={{height:30 ,borderBottomColor:G_Theme.gray,padding:5,borderBottomWidth:1,flexDirection:'row'}}>
                <Text style={styles.titleStyle}> 渠道:</Text>
                <Text style={styles.descStyle}>  {content.channel}</Text>
            </View>
            <View style={{height:30 ,borderBottomColor:G_Theme.gray,padding:5,borderBottomWidth:1,flexDirection:'row'}}>
                <Text style={styles.titleStyle}> 代理 qq:</Text>
                <Text style={styles.descStyle}>  {content.agent_qqs}</Text>
            </View>
            <View style={{height:30 ,borderBottomColor:G_Theme.gray,padding:5,borderBottomWidth:1,flexDirection:'row'}}>
                <Text style={styles.titleStyle}>过期时期:</Text>
                <Text style={styles.descStyle}>  {content.created_at}</Text>
            </View>
            <View style={{height:30 ,borderBottomColor:G_Theme.gray,padding:5,borderBottomWidth:1,flexDirection:'row'}}>
                <Text style={styles.titleStyle}>创建时期:</Text>
                <Text style={styles.descStyle}>  {content.created_at}</Text>
            </View>
            <View style={{height:30 ,borderBottomColor:G_Theme.gray,padding:5,borderBottomWidth:1,flexDirection:'row'}}>
                <Text style={styles.titleStyle}> 最后更新日期:</Text>
                <Text style={styles.descStyle}>  {content.agent_qqs}</Text>
            </View>

        </View>)
    }

}

const  styles = StyleSheet.create({
    titleStyle:{
        flex:2,
        // color:G_Theme.gray
    },
    descStyle:{
        flex:4,
        // color:G_Theme.gray
    },
    textStyle: {
        paddingVertical:2
    },
})