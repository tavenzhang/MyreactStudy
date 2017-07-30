import React, {PropTypes} from 'react';
import {
    View,
    Text, StyleSheet,
    Clipboard,
    TouchableHighlight,
} from 'react-native';

import BaseView from "../../../../componet/BaseView";

export default class LinkDetailView extends BaseView {


    constructor(props) {
        super(props);

    }

    _onClicpLink = (data) => {
        Clipboard.setString(data);
        G_AlertUtil.show("", "复制成功！")
    }
    renderBody() {
        let {content}=this.props.navigation.state.params;
        let validstr= content.valid_days ? `${content.valid_days}天`:"永久";
        TLog("content-----",content)
        return (<View style={G_Style.appContentView}>

            <View style={{height:100 ,borderBottomColor:G_Theme.gray,paddingTop:20,paddingBottom:20,}}>
                <Text style={[{textAlign:'center',fontSize:30,color:G_Theme.primary}]}> {content.created_count}</Text>
                <Text style={[{textAlign:'center',fontSize:12,color:G_Theme.grayDeep}]}>开户数</Text>
            </View>

            <View style={{height:25 ,borderBottomColor:G_Theme.gray,flexDirection:'row'}}>
                <Text style={[{flex:1,textAlign:'center'}]} numberOfLines={1}>{content.is_agent ? "代理":"玩家"}</Text>
                <Text style={[{flex:1,textAlign:'center'}]} numberOfLines={1}>{content.price_group[0].prize_group}</Text>
                <Text style={{flex:1,textAlign:'center',fontSize:16,color:content.status == 2 || content.status == 1 ? G_Theme.grayDeep : G_Theme.primary}} numberOfLines={1}>{content.status}</Text>
                <Text style={{flex:1,textAlign:'center'}} numberOfLines={1}>{validstr}</Text>

            </View>
            <View style={{height:25 ,borderBottomColor:G_Theme.gray,borderBottomWidth:1,flexDirection:'row'}}>

                <Text style={[{flex:1,textAlign:'center',fontSize:12,color:G_Theme.grayDeep}]}>是否代理</Text>
                <Text style={[{flex:1,textAlign:'center',fontSize:12,color:G_Theme.grayDeep}]}>奖金组</Text>
                <Text style={{flex:1,textAlign:'center',fontSize:12,color:G_Theme.grayDeep}} >状态</Text>
                <Text style={{flex:1,textAlign:'center',fontSize:12,color:G_Theme.grayDeep}}> 有效期</Text>


            </View>
            <TouchableHighlight   onPress={() => {
                this._onClicpLink(content.url)
            }}>

            <View style={{height:70 ,borderColor:G_Theme.primary,backgroundColor:G_Theme.primary,padding:10,borderWidth:1,flexDirection:'row'}}>
                <Text style={{color:'#fff',}}numberOfLines={2}>{content.url}</Text>

            </View>
            </TouchableHighlight>
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
                <Text style={styles.descStyle}>  {content.expired_at}</Text>
            </View>
            <View style={{height:30 ,borderBottomColor:G_Theme.gray,padding:5,borderBottomWidth:1,flexDirection:'row'}}>
                <Text style={styles.titleStyle}>创建时期:</Text>
                <Text style={styles.descStyle}>  {content.created_at}</Text>
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
