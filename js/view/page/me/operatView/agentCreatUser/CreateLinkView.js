import React, {PropTypes} from 'react';
import {
    View,
    Text, StyleSheet,
    TextInput,
    Slider,
    Picker
} from 'react-native';
import {TPicker} from "../../../../componet/tcustom/picker/TPicker";
import {TTextInput} from "../../../../componet/tcustom/textInput/TTextInput";
import {TSlider} from "../../../../componet/tcustom/slider/TSlider";
import {TButton} from "../../../../componet/tcustom/button/TButton";

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
            groudBacValue: 0,
            textQQ1: "",
            textQQ2: "",
            textQQ3: "",
        };
        this.dateValidList = [{name: "1天", value: 1}, {name: "7天", value: 7}, {name: "30天", value: 30}, {
            name: "90天",
            value: 90
        }, {name: "永久有效", value: 0}],
            this.curGroupValue = 0;
        this.curBacGroupValue = 0;
    }

    render() {
        let {isGentUser, groupDate} = this.props;
        let minGroup = 0;
        let maxGroup = 0;
        let minBacGroup = 0.0;
        let maxBacGroup = 0.0;
        let percent = 0.0;
        if (groupDate) {
            minGroup = !isGentUser ? groupDate.iPlayerMinPrizeGroup : groupDate.iAgentMinPrizeGroup;
            maxGroup = !isGentUser ? groupDate.iPlayerMaxPrizeGroup : groupDate.iAgentMaxPrizeGroup;
            minGroup = parseInt(minGroup);
            maxGroup = parseInt(maxGroup);
            minBacGroup = parseFloat(groupDate.bac_commission_proporty_min);
            maxBacGroup = parseFloat(groupDate.bac_commission_proporty);
            if (this.state.groundValue < minGroup) {
                this.curGroupValue = minGroup;
            }
            else if (this.state.groundValue > maxGroup) {
                this.curGroupValue = maxGroup;
            }
            else {
                this.curGroupValue = parseInt(this.state.groundValue);
            }
            //百家乐奖金组调整
            if (this.state.groudBacValue < minBacGroup) {
                this.curBacGroupValue = minBacGroup;
            }
            else if (this.state.groudBacValue > maxBacGroup) {
                this.curBacGroupValue = maxBacGroup;
            }
            else {
                this.curBacGroupValue = this.state.groudBacValue;
            }
            this.curBacGroupValue = this.curBacGroupValue.toFixed(4);
            percent = ((groupDate.iCurrentUserPrizeGroup - this.curGroupValue) * 100 / 2000 ).toFixed(2);
        }


        return (<View>
                <View style={[styles.itemSp]}>
                    <Text style={{textAlign: "right", alignSelf: "center"}}>链接有效期</Text>
                    <TPicker pickValue={this.state.pickValue} viewStyle={{flex: 1, paddingLeft: 60}}
                             dataList={this.dateValidList} onValueChange={(data) => {
                        this.setState({pickValue: data})
                    } }/>
                </View>
                <View style={styles.itemSp}>
                    <Text style={{textAlign: "right", alignSelf: "center"}}>推广渠道</Text>
                    <TTextInput value={this.state.textChannel}
                                style={styles.textStyle}
                                placeholder={"如qq推广"}
                                onChangeText={(textChannel) => {
                                    this.setState({textChannel})
                                }}/>

                </View>
                <View style={styles.itemSp}>
                    <Text style={{textAlign: "right"}}>客服QQ </Text>
                    <View style={{alignItems: "center", justifyContent: "center"}}>
                        <TTextInput value={this.state.textQQ1}
                                    style={styles.textStyle}
                                    placeholder={"qq1"}
                                    onChangeText={(textQQ1) => {
                                        this.setState({textQQ1})
                                    }}
                                    keyboardType={"numeric"}
                        />
                        <TTextInput value={this.state.textQQ2}
                                    style={styles.textStyle}
                                    placeholder={"qq2"}
                                    onChangeText={(textQQ2) => {
                                        this.setState({textQQ2})
                                    }}
                                    keyboardType={"numeric"}
                        />
                        <TTextInput value={this.state.textQQ3}
                                    style={styles.textStyle}
                                    placeholder={"qq3"}
                                    onChangeText={(textQQ3) => {
                                        this.setState({textQQ3})
                                    }}
                                    keyboardType={"numeric"}
                        />
                        <Text style={{color: G_Theme.grayDeep, marginLeft: 5}}>(此QQ会显示在该链接开户页面)</Text>
                    </View>
                </View>

                <View style={{
                    width: G_Theme.windowWidth - 100,
                    flexDirection: "row",
                    marginTop: 5,
                    marginBottom: 10,
                    alignItems: "center",
                }}>
                    <Text style={{textAlign: "right"}}>设置奖金组</Text>
                    <Text style={{
                        color: "red",
                        fontWeight: "bold",
                        marginTop: 5,
                        marginHorizontal: 10
                    }}>{`${this.curGroupValue}`}</Text>
                    <Text>{` 预计平均返点率 ${percent}%`}</Text>
                </View>
                <TSlider slideValue={this.state.groundValue}
                         minValue={minGroup}
                         maxValue={maxGroup}
                         disable={minGroup == maxGroup}
                         onValueChange={(groundValue) => {
                             this.setState({groundValue})
                         }}/>
                <View style={{
                    flexDirection: "row",
                    marginBottom: 10,
                    alignItems: "center",
                }}>
                    <Text style={{textAlign: "right"}}>百家乐奖金组:</Text>
                    <Text style={{color: "red", fontWeight: "bold", left: 10}}>{` ${this.curBacGroupValue} `}</Text>
                </View>
                <TSlider slideValue={this.state.groudBacValue}
                         minValue={minBacGroup}
                         maxValue={maxBacGroup}
                         disable={minBacGroup == maxBacGroup}
                         onValueChange={(groudBacValue) => {
                             this.setState({groudBacValue})
                         }}/>
                <TButton
                    btnName="生成链接"
                    containerStyle={{
                        borderRadius: 3,
                        backgroundColor: '#d7213c'
                    }}
                    onPress={this._onCreateLink} errMsg={this._onValidInput()}/>
            </View>
        )
    }

    _onValidInput = () => {
        let errMsg = null;
        let {groupDate} = this.props
        if (this.state.textChannel == "") {
            errMsg = "请输入推广渠道名称"
        }
        else if (this.state.textQQ1 == "" && this.state.textQQ2 == "" && this.state.textQQ3 == "") {
            errMsg = "请至少输入一个联系qq"
        } else if (groupDate == null) {
            errMsg = "奖金组数据错误"
        }
        return errMsg
    }

    _onCreateLink = () => {
        HTTP_SERVER.AgentUserLinkList
        HTTP_SERVER.AgentUserLinkCreate.body.valid_days = this.state.pickValue;
        HTTP_SERVER.AgentUserLinkCreate.body.is_agent = this.props.isGentUser;
        HTTP_SERVER.AgentUserLinkCreate.body.prize_group = this.curGroupValue;
        HTTP_SERVER.AgentUserLinkCreate.body.channel = this.state.textChannel;
        HTTP_SERVER.AgentUserLinkCreate.body.agent_qqs = [this.state.textQQ1, this.state.textQQ2, this.state.textQQ3];
        HTTP_SERVER.AgentUserLinkCreate.body.bac_commission_proporty = this.curBacGroupValue;
        ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.AgentUserLinkCreate, (data) => {
            if (data.isSuccess) {
                ActDispatch.AppAct.showBox(`链接生成成功!`);
                G_NavUtil.push(G_RoutConfig.LinkListView);
            }
        })
    }

}

const styles = StyleSheet.create({
    textStyle: {
        width: 200,
        left: 10,
        fontSize: 14,
        height: G_PLATFORM_IOS ? 30 : 40,
        borderWidth: 1,
        borderRadius: 5,
        textAlign: "center",
        marginVertical: 1
    },
    itemSp: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 3
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