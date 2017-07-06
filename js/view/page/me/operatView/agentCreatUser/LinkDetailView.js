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
        let {content} = this.props.navigation.state.params;
        let validstr = content.valid_days ? `${content.valid_days}天` : "永久";
        //"aStatus":{"0":"正常","1":"关闭","2":"过期","3":"永久有效"}
        let stateStr = ""
        switch (`${content.status}`)
        {
            case "0":
                stateStr = "正常"
                break;
            case "1":
                stateStr = "关闭"
                break;
            case "2":
                stateStr = "过期"
                break;
            case "3":
                stateStr = "永久有效"
                break;
        }
            TLog("content-----", content)
            return (<View style={G_Style.appContentView}>
                <Text style={styles.textStyle}> 是否管理员: {content.is_admin}</Text>
                <Text style={styles.textStyle}> 是否代理: {content.is_agent ? "是" : "否"}</Text>
                <Text style={styles.textStyle}> 用户名: {content.username}</Text>
                <Text style={styles.textStyle}> 有效期: {validstr}</Text>
                <Text style={styles.textStyle}> 渠道: {content.channel}</Text>
                <Text style={styles.textStyle}> 代理 qq: {content.agent_qqs}</Text>
                <Text style={styles.textStyle}> 创建时期: {content.created_at}</Text>
                <Text style={styles.textStyle}> 最后更新日期: {content.created_at}</Text>
                <Text style={styles.textStyle}>失效时间: {content.expired_at}</Text>
                <Text style={styles.textStyle}> 状态: {stateStr}</Text>
                <Text style={styles.textStyle}> 代理链接: <Text>{content.url}</Text></Text>
            </View>)
        }

    }

    const styles = StyleSheet.create({
        textStyle: {
            paddingVertical: 2
        },
    })