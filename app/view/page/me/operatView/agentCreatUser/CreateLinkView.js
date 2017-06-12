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
        isGentUser: PropTypes.any
    }

    constructor(props) {
        super(props)
        this.state = {
            value: 0,
            pickValue: null
        };
        this.dateValidList = [{name: "1天", value: 1}, {name: "7天", value: 7}, {name: "30天", value: 30}, {
            name: "90天",
            value: 90
        }, {name: "永久有效", value: 99999}]
    }

    render() {
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
                    onChangeText={(pwdText) => this.setState({pwdText: pwdText})}
                    value={this.state.pwdText}
                    placeholder={"如qq推广"}
                    secureTextEntry={true}
                    multiline={false}
                    underlineColorAndroid={'transparent'}
                />
            </View>
            <View style={styles.itemSp}>
                <Text style={{textAlign: "right"}}>客服QQ</Text>
                <View style={{alignItems:"center", justifyContent:"center"}}>
                    <TextInput
                        style={[styles.textStyle]}
                        onChangeText={(pwdText) => this.setState({pwdText: pwdText})}
                        value={this.state.pwdText}
                        placeholder={"qq1"}
                        multiline={false}
                        underlineColorAndroid={'transparent'}
                    />
                    <TextInput
                        style={[styles.textStyle, {marginTop: 5}]}
                        onChangeText={(pwdText) => this.setState({pwdText: pwdText})}
                        value={this.state.pwdText}
                        placeholder={"qq2"}
                        multiline={false}
                        underlineColorAndroid={'transparent'}
                    />
                    <TextInput
                        style={[styles.textStyle, {marginTop: 5}]}
                        onChangeText={(pwdText) => this.setState({pwdText: pwdText})}
                        value={this.state.pwdText}
                        placeholder={"qq3"}
                        multiline={false}
                        underlineColorAndroid={'transparent'}
                    />
                    <Text style={{color: G_Theme.grayDeep, marginLeft:5}}>(此QQ会显示在该链接开户页面)</Text>
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
                生成链接
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