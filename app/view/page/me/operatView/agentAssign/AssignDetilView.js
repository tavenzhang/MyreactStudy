import React from 'react';
import {
    View,
    Text, StyleSheet,
    TextInput,
    TouchableHighlight,
    LayoutAnimation,
    ListView
} from 'react-native';

import Button from "react-native-button";
import BaseView from "../../../../componet/BaseView";


export default class AssignDetilView extends BaseView {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2,
            }),
            dataObj: null
        }
    }

    renderBody() {

        let dataList = this.state.dataObj ? this.state.dataObj.dataList : []
        let ds = this.state.dataSource.cloneWithRows(dataList);
        return (this.state.dataObj ? <View style={G_Style.appContentView}>
            <View style={{
                flexDirection: "row", alignItems: "center", margin: 10,
            }}>
                <Text>用户名:</Text>
                <TextInput
                    style={styles.textStyle}
                    onChangeText={(pwdText) => this.setState({pwdText: pwdText})}
                    value={this.state.pwdText}
                    placeholder={""}
                    multiline={false}
                    underlineColorAndroid={'transparent'}
                />
                <Button containerStyle={{
                    backgroundColor: G_Theme.bgPbg, paddingHorizontal: 5,
                    paddingVertical: 5, borderRadius: 5
                }} style={{fontSize: 14, color: "white"}}>
                    搜索
                </Button>
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
                            <Text style={styles.headText}>{item}</Text>
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
                <Text style={[styles.contentText,{fontSize:12}]}>{`临时:${data.info.prize_group}`}</Text>
                <Text style={[styles.contentText,{fontSize:12}]}>{`永久:${data.info.forever_prize_group}`}</Text>
            </View>
            {
                data.groupList.map((item, index) => {
                    return (<View style={[styles.contentView]} key={index}>
                        {item.editable ? <Button containerStyle={{
                            backgroundColor: G_Theme.bgPbg, paddingHorizontal: 10,
                            paddingVertical: 3, borderRadius: 5
                        }} style={{fontSize: 14, color: "white"}} onPress={() => {
                            this._onClikGroupBtn(data)
                        }}>{item.value}</Button> : <Text style={styles.contentText}>{item.value}</Text> }
                    </View>)
                })
            }
        </View>)
    }


    componentDidMount() {
        // TLog("Assign---", this.props.passProps);
        HTTP_SERVER.AgentAssinList.body.prize_group = this.props.passProps.prize_group
        ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.AgentAssinList, (data) => {
            let dataObj = {}
            let headList = [];
            obj = data.data.quotas;
            for (let index in obj) {
                let temp = `${obj[index].prize_group}`;
                headList.push(temp);
            }
            dataObj.headList = headList;

            let dataList = [];
            let groupList = [];
            let obj = data.data.aSubUsers;
            for (let key in obj) {
                let temp = obj[key];
                obj[key].groupList = []
                let quotas = temp.quotas
                for (let qindex in quotas) {
                    for (let item of headList) {
                        if (item == qindex) {
                            temp.groupList.push(quotas[qindex])
                        }
                    }
                }
                dataList.push(temp);
            }
            dataObj.dataList = dataList;
            this.setState({dataObj})
        })
    }

    _onClikGroupBtn = (data) => {

    }
}

const styles = StyleSheet.create({
    textStyle: {
        width: 150,
        left: 10,
        fontSize: 14,
        height: G_Theme.textInpuntH,
        borderWidth: 0.5,
        borderRadius: 5,
        marginRight: 30,
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
        borderRightWidth: 0
    },
    contentView: {
        paddingVertical: 5,
        paddingHorizontal: 1,
        flex: 1,
        borderWidth: 1,
        borderColor: "gray",
        justifyContent: "center",
        alignItems: "center",
        borderRightWidth: 0
        //textAlign: "center"
    },
    contentText: {
        fontSize: 13
    }
})