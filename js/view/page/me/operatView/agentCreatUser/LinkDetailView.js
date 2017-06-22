import React, {PropTypes} from 'react';
import {
    View,
    Text, StyleSheet,
    ListView,
    Clipboard
} from 'react-native';


import Button from "react-native-button";
import BaseView from "../../../../componet/BaseView";

export default class LinkDetailView extends BaseView {


    constructor(props) {
        super(props);

    }

    renderBody() {
        let {content}=this.props.passProps;
        let validstr= content.valid_days ? `${content.valid_days}天`:"永久";
        TLog("content-----",content)
        return (<View style={G_Style.appContentView}>
            <Text style={styles.textStyle}> 是否管理员:  {content.is_admin}</Text>
            <Text style={styles.textStyle}> 是否代理:  {content.is_agent ? "是":"否"}</Text>
            <Text style={styles.textStyle}> 用户名:  {content.username}</Text>
            <Text style={styles.textStyle}> 有效期:  {validstr}</Text>
            <Text style={styles.textStyle}> 渠道:  {content.channel}</Text>
            <Text style={styles.textStyle}> 代理 qq:  {content.agent_qqs}</Text>
            <Text style={styles.textStyle}> 创建时期:  {content.created_at}</Text>
            <Text style={styles.textStyle}> 最后更新日期:  {content.created_at}</Text>
            <Text style={styles.textStyle}> 状态:  {content.status ? "可用":"不可用"}</Text>
            <Text style={styles.textStyle}> 代理链接:  <Text>{content.url}</Text></Text>
        </View>)
    }

}

const  styles = StyleSheet.create({
    textStyle: {
        paddingVertical:2
    },
})