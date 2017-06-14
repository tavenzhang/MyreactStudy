import React, {PropTypes} from 'react';
import {
    View,
    Text, StyleSheet,
    TextInput,
    Slider,
    Picker
} from 'react-native';

import Button from "react-native-button";

export default class CreateLinkView extends React.Component {
    static propTypes = {
        isGentUser: PropTypes.any,
        groupDate: PropTypes.object
    }

    constructor(props) {
        super(props)
        this.state = {
            value: 0,
            textChannel: "",
            pickValue: 1,
            groundValue: 0,
            textQQ1: "",
            textQQ2: "",
            textQQ3: "",
        };
        this.dateValidList = [{name: "1天", value: 1}, {name: "7天", value: 7}, {name: "30天", value: 30}, {
            name: "90天",
            value: 90
        }, {name: "永久有效", value: 0}],
            this.curGroupValue = 0;
    }

    render() {
        let {isGentUser, groupDate} = this.props;
        let minGroup = 0;
        let maxGroup = 0;
        let percent = 0.0;
        if (groupDate) {
            minGroup = !isGentUser ? groupDate.iPlayerMinPrizeGroup : groupDate.iAgentMinPrizeGroup;
            maxGroup = !isGentUser ? groupDate.iPlayerMaxPrizeGroup : groupDate.iAgentMaxPrizeGroup;
            if (this.state.groundValue < minGroup) {
                this.curGroupValue = minGroup;
            }
            else if (this.state.groundValue > maxGroup) {
                this.curGroupValue = maxGroup;
            }
            else {
                this.curGroupValue = this.state.groundValue;
            }
            percent = ((groupDate.iCurrentUserPrizeGroup - this.curGroupValue) * 100 / 2000 ).toFixed(2);
        }


        return (<View>
            <View style={[styles.itemSp, {margin: 0}]}>
                <Text style={{textAlign: "right", alignSelf: "center"}}>链接有效期</Text>
                <View style={{width: 150, height: 100}}>
                    <Picker
                        itemStyle={{fontSize: 13, height: 100}}
                        mode={Picker.MODE_DROPDOWN}
                        selectedValue={this.state.pickValue}
                        onValueChange={(data) => {
                            this.setState({pickValue: data})
                        }}>
                        {
                            this.dateValidList.map((item, index) => {
                                return (<Picker.Item label={item.name} value={item.value} key={index + "item"}/>)
                            })
                        }
                    </Picker>
                </View>
            </View>
            <View style={styles.itemSp}>
                <Text style={{textAlign: "right", alignSelf: "center"}}>推广渠道</Text>
                <TextInput
                    style={[styles.textStyle]}
                    onChangeText={(textChannel) => this.setState({textChannel})}
                    value={this.state.textChannel}
                    placeholder={"如qq推广"}
                    multiline={false}
                    underlineColorAndroid={'transparent'}
                    autoCapitalize={"none"}
                />
            </View>
            <View style={styles.itemSp}>
                <Text style={{textAlign: "right"}}>客服QQ </Text>
                <View style={{alignItems: "center", justifyContent: "center"}}>
                    <TextInput
                        style={[styles.textStyle]}
                        onChangeText={(textQQ1) => this.setState({textQQ1})}
                        value={this.state.textQQ1}
                        placeholder={"qq1"}
                        multiline={false}
                        keyboardType={"numeric"}
                        underlineColorAndroid={'transparent'}
                    />
                    <TextInput
                        style={[styles.textStyle, {marginTop: 5}]}
                        onChangeText={(textQQ2) => this.setState({textQQ2})}
                        value={this.state.textQQ2}
                        placeholder={"qq2"}
                        multiline={false}
                        keyboardType={"numeric"}
                        underlineColorAndroid={'transparent'}
                    />
                    <TextInput
                        style={[styles.textStyle, {marginTop: 5}]}
                        onChangeText={(textQQ3) => this.setState({textQQ3})}
                        value={this.state.textQQ3}
                        placeholder={"qq3"}
                        keyboardType={"numeric"}
                        multiline={false}
                        underlineColorAndroid={'transparent'}
                    />
                    <Text style={{color: G_Theme.grayDeep, marginLeft: 5}}>(此QQ会显示在该链接开户页面)</Text>
                </View>
            </View>

            <View style={{
                flexDirection: "row",
                marginTop: 30,
                alignItems: "center",
                justifyContent: "space-between"
            }}>
                <Text style={{textAlign: "right"}}>设置奖金组</Text>
                <Text style={{textAlign: "center"}}><Text
                    style={{color: "red", fontWeight: "bold"}}>{`${parseInt(this.curGroupValue)} `}</Text>
                    预计平均返点率 {percent}%</Text>
            </View>

            <View style={{
                flexDirection: "row",
                marginTop: 10,
                alignItems: "center",
                justifyContent: "space-between"
            }}>
                <Slider
                    value={this.state.groundValue}
                    maximumValue={parseInt(maxGroup)}
                    minimumValue={parseInt(minGroup)}
                    minimumTrackTintColor={"red"}
                    maximumTrackTintColor={"gray"}
                    thumbTintColor={"yellow"}
                    style={{height: 10, flex: 1}}
                    disabled={groupDate == null}
                    onValueChange={(groundValue) => {
                        this.setState({groundValue})
                    }}/>
            </View>
            <View style={{flexDirection: "row", marginVertical: 15, justifyContent: "space-between"}}>
                <Text>{minGroup}</Text>
                <Text>{maxGroup}</Text>
            </View>
            <Button
                containerStyle={{
                    margin: 20,
                    overflow: 'hidden',
                    borderRadius: 3,
                    backgroundColor: '#d7213c'
                }}
                style={{fontSize: 14, color: "white", padding: 5}}
                styleDisabled={{color: '#fff', backgroundColor: "gray"}}
                onPress={this._onCreateLink} disabled={!this._onValidInput()}>
                生成链接
            </Button>
        </View>)
    }

    _onValidInput = () => {
        let {groupDate} = this.props
        let result = false
        if (this.state.textChannel == "") {
            result = false
        }
        else if (this.state.textQQ1 == "" && this.state.textQQ2 == "" && this.state.textQQ3 == "") {
            result = false;
        } else if (groupDate == null) {
            result = false;
        }
        else {
            result = true;
        }
        return result
    }

    _onCreateLink = () => {
        HTTP_SERVER.AgentUserLinkList
        HTTP_SERVER.AgentUserLinkCreate.body.valid_days = this.state.pickValue;
        HTTP_SERVER.AgentUserLinkCreate.body.is_agent = this.props.isGentUser;
        HTTP_SERVER.AgentUserLinkCreate.body.prize_group = parseInt(this.curGroupValue);
        HTTP_SERVER.AgentUserLinkCreate.body.channel = this.state.textChannel;
        HTTP_SERVER.AgentUserLinkCreate.body.agent_qqs = [this.state.textQQ1, this.state.textQQ2, this.state.textQQ3];
        HTTP_SERVER.AgentUserLinkCreate.body.bac_commission_proporty = this.props.groupDate.bac_commission_proporty;
        ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.AgentUserLinkCreate, (data) => {
            if (data.isSuccess) {
                ActDispatch.AppAct.showBox(`链接生成成功!`);
                G_NavUtil.pushToView(G_NavViews.LinkListView())
            }
        })
    }

}

const styles = StyleSheet.create({
    textStyle: {
        width: 200,
        left: 10,
        fontSize: 14,
        height: 30,
        borderWidth: 1,
        borderRadius: 5,
        textAlign: "center"
    },
    itemSp: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 5
    },
    icoPwd: {
        color: G_Theme.grayDeep,
        fontSize: 20,
    },
    inputContain: {
        paddingBottom: 5,
        marginTop: 15,
        paddingLeft: 5,
        flexDirection: "row",
        height: 40,
        justifyContent: "flex-start",
        alignItems: "center",
        borderColor: 'gray',
        borderBottomWidth: 0.5,
    }
});