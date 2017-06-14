import React, {PropTypes} from 'react';
import {
    View,
    Text, StyleSheet,
    TextInput,
    Slider,
} from 'react-native';

import Button from "react-native-button";

export default class CreateHumanView extends React.Component {
    static propTypes = {
        isGentUser: PropTypes.any,
        groupDate:PropTypes.object
    }

    constructor(props) {
        super(props)
        this.state = {
            groundValue: 0,
            pwdText: "",
            userNameText: "",
        };
        this.curGroupValue = 0;
    }

    render() {
        let {isGentUser,groupDate} = this.props;
        let minGroup = 0;
        let maxGroup = 0;
        let  percent=0.0;
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
            percent = ((groupDate.iCurrentUserPrizeGroup - this.curGroupValue)*100/2000 ).toFixed(2);
        }

        return (<View>
            <View style={styles.itemSp}>
                <Text style={{textAlign: "right"}}>设置账号信息</Text>
                <View>
                    <TextInput
                        style={styles.textStyle}
                        onChangeText={(userNameText) => this.setState({userNameText})}
                        value={this.state.userNameText}
                        placeholder={"设置登录账户"}
                        multiline={false}
                        underlineColorAndroid={'transparent'}
                        autoCapitalize={"none"}
                    />
                    <TextInput
                        style={[styles.textStyle, {marginTop: 10}]}
                        onChangeText={(pwdText) => this.setState({pwdText})}
                        value={this.state.pwdText}
                        placeholder={"设置登录密码"}
                        secureTextEntry={true}
                        multiline={false}
                        autoCapitalize={"none"}
                        underlineColorAndroid={'transparent'}
                    />
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
                style={{fontSize: 14, color: "white",  padding: 5}}
                styleDisabled={{ backgroundColor:"gray"}}
                onPress={this._onCreateRequest} disabled={!this._onValidInput()} >
                立即开户
            </Button>
        </View>)
    }

    _onValidInput=()=> {
        let {groupDate} = this.props
        let result = false
        if (this.state.userNameText == "") {
            result = false
        }
        else
            if (this.state.pwdText == "") {
                result = false;
            } else if (groupDate == null) {
                result = false;
            }
            else {
                result = true;
            }
            return result
        }


    _onCreateRequest = () => {
            HTTP_SERVER.AgentUserCreate.body.username = this.state.userNameText;
            HTTP_SERVER.AgentUserCreate.body.password = this.state.pwdText;
            HTTP_SERVER.AgentUserCreate.body.is_agent = this.props.isGentUser;
            HTTP_SERVER.AgentUserCreate.body.prize_group =  parseInt(this.curGroupValue);
            HTTP_SERVER.AgentUserCreate.body._random =this.props.groupDate._random;
            HTTP_SERVER.AgentUserCreate.body.bac_commission_proporty=this.props.groupDate.bac_commission_proporty;
            ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.AgentUserCreate, (data) => {
                if(data.isSuccess)
                {
                    ActDispatch.AppAct.showBox(`${this.state.userNameText} 开户成功!`);
                    this.setState({userNameText:"",pwdText:""});
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