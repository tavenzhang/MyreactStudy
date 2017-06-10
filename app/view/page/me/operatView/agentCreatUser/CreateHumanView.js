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
        isGentUser: PropTypes.any
    }

    constructor(props) {
        super(props)
        this.state = {
            value: 0,
            pickValue: null,
            pwdText:""
        };
    }

    render() {
        return (<View>
            <View style={styles.itemSp}>
                <Text style={{textAlign: "right"}}>设置账号信息</Text>
                <View>
                    <TextInput
                        style={styles.textStyle}
                        onChangeText={(pwdText) => this.setState({pwdText: pwdText})}
                        value={this.state.pwdText}
                        placeholder={"设置登录账户"}
                        multiline={false}
                        underlineColorAndroid={'transparent'}
                    />
                    <TextInput
                        style={[styles.textStyle, {marginTop: 10}]}
                        onChangeText={(pwdText) => this.setState({pwdText: pwdText})}
                        value={this.state.pwdText}
                        placeholder={"设置登录密码"}
                        secureTextEntry={true}
                        multiline={false}
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
                <Text style={{textAlign: "left"}}>1956 预计平均返点率 0.00%</Text>
            </View>

            <View style={{
                flexDirection: "row",
                marginTop: 10,
                alignItems: "center",
                justifyContent: "space-between"
            }}>
                <Slider
                    value={this.state.value}
                    step={10}
                    maximumValue={200}
                    minimumValue={0}
                    minimumTrackTintColor={"red"}
                    maximumTrackTintColor={"blue"}
                    thumbTintColor={"yellow"}
                    style={{height: 10, flex: 1,}}
                    onValueChange={(value) => {
                        this.setState({value: value})
                    }}/>
            </View>
            <View style={{flexDirection: "row", marginVertical: 15, justifyContent: "space-between"}}>
                <Text >1550</Text>
                <Text>1960</Text>
            </View>
            <Button
                containerStyle={{
                    padding: 5,
                    margin: 20,
                    overflow: 'hidden',
                    borderRadius: 3,
                    backgroundColor: '#d7213c'
                }}
                style={{fontSize: 14, color: "white"}}
                styleDisabled={{color: '#fff'}}
                onPress={this.clickLogin}>
                立即开户
            </Button>
        </View>)
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