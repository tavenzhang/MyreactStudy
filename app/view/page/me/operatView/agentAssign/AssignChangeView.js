import React from 'react';
import {
    View,
    Text, StyleSheet,
    TextInput,
    Picker,
    ListView
} from 'react-native';

import BaseView from "../../../../componet/BaseView";
import {TButtonProxy} from "../../../../componet/tcustom/button/TButton";

export default class AssignChangeView extends BaseView {

    constructor(props) {
        super(props);
        let {groupData} = this.props.passProps;
        let dim = parseInt(groupData.group.limit_num - groupData.group.used_num);
        let total = groupData.value + dim;
        this.dataList = [];
        for (let i = 0; i <= total; i++) {
            this.dataList.push({name: `${i}`, value: i})
        }
        this.state = {
            dataObj: null,
            pickValue: groupData.value,
            reasionText: "",
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2,
            }),
            dataList: [],
            isChange: false
        }
    }

    renderBody() {
        TLog("AssignChangeView----", this.props.passProps);
        let {groupData, data} = this.props.passProps;
        let ds = this.state.dataSource.cloneWithRows(this.state.dataList);
        return (<View style={G_Style.appContentView}>
            <View style={styles.gridRow}>
                <View style={styles.gridRowLeft}>
                    <Text>用户名:</Text>
                </View>
                <View style={styles.gridRowRight}>
                    <Text> {data.info.username}</Text>
                </View>
            </View>
            <View style={styles.gridRow}>
                <View style={styles.gridRowLeft}>
                    <Text>当前奖金组:</Text>
                </View>
                <View style={styles.gridRowRight}>
                    <Text> { groupData.curGroup}</Text>
                </View>
            </View>

            <View style={styles.gridRow}>
                <View style={styles.gridRowLeft}>
                    <Text>目前配额:</Text>
                </View>
                <View style={[styles.gridRowRight]}>
                    <Text style={{color: "red", fontWeight: "bold"}}>{groupData.value}</Text>
                </View>
            </View>

            <View style={styles.gridRow}>
                <View style={styles.gridRowLeft}>
                    <Text>调整配额为:</Text>
                </View>
                <View style={styles.gridRowRight}>
                    <Picker
                        itemStyle={{fontSize: 13, width: 150, height: 120}}
                        mode={'dropdown'}
                        selectedValue={this.state.pickValue}
                        onValueChange={(pickValue) => {
                            this.setState({pickValue, isChange: groupData.value != pickValue})
                        }}>
                        {
                            this.dataList.map((item, index) => {
                                return (<Picker.Item label={item.name} value={item.value}
                                                     key={index + "item"}/>)
                            })
                        }
                    </Picker>
                </View>
            </View>
            <View>
                <Text>调整理由:</Text>
                <TextInput
                    style={styles.textStyle}
                    onChangeText={(reasionText) => this.setState({reasionText})}
                    value={this.state.reasionText}
                    placeholder={"请输入调整理由"}
                    multiline={true}
                    autoCapitalize={"none"}
                    underlineColorAndroid={'transparent'}
                />
            </View>
            <TButtonProxy disable={!this.state.isChange}
                          containerStyle={{width: G_Theme.windowWidth * 2 / 3, alignSelf: "center", marginBottom: 10}}
                          onPress={this._onClickChange} btnName={"确认修改"}/>

            <ListView
                dataSource={ds}
                renderHeader={this._renderHeadView}
                renderRow={this._rendeRow}
                enableEmptySections
            />
        </View>)
    }


    componentDidMount() {
        let {groupData, data} = this.props.passProps;
        G_RunAfterInteractions(() => {
            HTTP_SERVER.AgentAssinPerson.body.prize_group = groupData.curGroup;
            HTTP_SERVER.AgentAssinPerson.body.user_id = data.object.id;
            ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.AgentAssinPerson, (data) => {
                let dataList = data.data.history;
                dataList = dataList.reverse()
                this.setState({dataList})
            },true)
        })
    }


    _renderHeadView = () => {
        return (
            <View style={{flexDirection: "row", borderWidth: 1, paddingVertical: 5}}>
                <Text style={{flex: 2, textAlign: "center"}}>历史变化</Text>
                <Text style={{flex: 1, textAlign: "center"}}>新增</Text>
                <Text style={{flex: 1, textAlign: "center"}}>减少</Text>
                <Text style={{flex: 2, textAlign: "center"}}>时间</Text>
                <Text style={{flex: 3, textAlign: "center"}}>理由</Text>
            </View>
        )
    }

    _rendeRow = (data) => {
        return (
            <View style={{flexDirection: "row", borderBottomWidth: 1}}>
                <Text style={{flex: 2, textAlign: "center"}}>{data.prize_group}</Text>
                <Text style={{flex: 1, textAlign: "center"}}>{data.plus_num}</Text>
                <Text style={{flex: 1, textAlign: "center"}}>{data.subtract_num}</Text>
                <Text style={{flex: 2, textAlign: "center"}}>{data.created_at}</Text>
                <Text style={{flex: 3, textAlign: "center"}}>{data.note}</Text>
            </View>
        )
    }

    _onClickChange = () => {
        let {groupData, data} = this.props.passProps;
        let dim = this.state.pickValue - groupData.value
        HTTP_SERVER.AgentAssinChange.body.prize_group = groupData.curGroup;
        HTTP_SERVER.AgentAssinChange.body.user_id = data.object.id;
        HTTP_SERVER.AgentAssinChange.body.username = data.info.username;
        HTTP_SERVER.AgentAssinChange.body.plus_num = dim > 0 ? dim : 0;
        HTTP_SERVER.AgentAssinChange.body.subtract_num = dim < 0 ? Math.abs(dim) : 0;
        HTTP_SERVER.AgentAssinChange.body.note = this.state.reasionText;
        ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.AgentAssinChange, () => {
            G_MyStorage.setItem(G_EnumStroeKeys.FORCE_FLUSH_PROXY_MEONY,"true",()=>{
                G_NavUtil.pop();
            })
        })
    }
}


const styles = StyleSheet.create({
    textStyle: {
        width: G_Theme.windowWidth - 20,
        marginHorizontal: 10,
        fontSize: 14,
        height: 80,
        borderWidth: 0.5,
        borderRadius: 5,
        marginRight: 30,
        paddingLeft: 5,
        marginVertical: 10
    },
    gridRow: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 5
    },
    gridRowLeft: {
        flex: 1,
        alignItems: "flex-end"
    },
    gridRowRight: {
        flex: 2,
        marginLeft: 20
    },

})