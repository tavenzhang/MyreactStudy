import React, {PropTypes} from 'react';
import {
    View,
    Picker,
    StyleSheet,
    Text,
    TextInput,

} from 'react-native';

import MyModalView from "../../../../componet/tcustom/modal/TModalView";
import {TButton} from "../../../../componet/tcustom/button/TButton";
import {TTextInput} from "../../../../componet/tcustom/textInput/TTextInput";
import {TPicker} from "../../../../componet/tcustom/picker/TPicker";
export default class RecordMoneySearchView extends React.Component {
    static propTypes = {
        visible: PropTypes.bool,
        onHideHandle: PropTypes.func,
        onConfirmPress: PropTypes.func
    }

    constructor(props) {
        super(props)
        let {userData}=this.props
        this.userTypeList = userData.isLogined&&userData.data.user_type>0 ? G_UserTypeList:[{name: "自己", value: 1}]
        this.state = {
            modalVisible: true,
            serialNumer: "",
            userName: this.props.username ? this.props.username : "",
            pickValue: "",
            userPicker:  this.userTypeList[0].value,
        }

    }

    render() {
        let {visible, appModel} = this.props;
        return (
            <MyModalView visible={visible} hideModal={this.onCancelHideView} onPressModal={this.onCancelHideView}>
                <View style={{flex: 1, justifyContent: "center", backgroundColor: "rgba(50, 50, 50,0.2)"}}>
                    <View style={{backgroundColor: "white",
                        borderRadius: 10, marginHorizontal: 10,
                        padding: 5
                    }}>
                        <View style={{flexDirection: "row"}}>
                            <View style={styles.pickView}>
                                <Text>用户类型:</Text>
                                <TPicker
                                    viewStyle={{flex: 1}}
                                    itemStyle={{width: 100, fontSize: 15, height: 150}}
                                    dataList={this.userTypeList}
                                    pickValue={this.state.userPicker}
                                    onValueChange={(data) => {
                                        this.setState({userPicker: data})
                                    }}/>
                            </View>
                            <View style={styles.pickView}>
                                <Text>账变类型:</Text>
                                <TPicker
                                    viewStyle={{flex: 1}}
                                    itemStyle={{width: 100, fontSize: 15, height: 150}}
                                    dataList={appModel.getATransactionTypeList}
                                    pickValue={this.state.pickValue}
                                    onValueChange={(data) => {
                                        this.setState({pickValue: data})
                                    }}/>
                            </View>
                        </View>
                        <View style={{flexDirection: "row", alignItems: "center", justifyContent:"center"}}>
                                <View style={{flexDirection: "row", alignItems: "center"}}>
                                    <View style={{flexDirection: "row", alignItems: "center"}}>
                                        <Text style={{width: 70, textAlign: "right"}}>账变编号:</Text>
                                        <View style={{borderBottomWidth: 1, borderColor: "gray", marginRight: 20,}}>
                                            <TTextInput
                                                style={styles.textStyle}
                                                onChangeText={(serialNumer) => this.setState({serialNumer})}
                                                value={this.state.serialNumer}
                                                placeholder={""}
                                            />
                                        </View>
                                    </View>
                                </View>
                                <View style={{flexDirection: "row", alignItems: "center"}}>
                                    <Text style={{width: 70, textAlign: "right", marginHorizontal: 5}}>用户名:</Text>
                                    <View style={{borderBottomWidth: 1, borderColor: "gray", marginRight: 20,}}>
                                        <TTextInput
                                            style={styles.textStyle}
                                            onChangeText={(userName) => this.setState({userName})}
                                            value={this.state.userName}
                                            placeholder={""}
                                        />
                                    </View>
                                </View>
                        </View>
                        <View style={{flexDirection: "row", alignSelf:"center"}}>
                            <TButton containerStyle={{
                                marginVertical: 20,
                                paddingHorizontal: 10,
                                paddingVertical: 6,
                                backgroundColor: "rgb(208,199,160)",
                                borderRadius: 5
                            }} btnName={"查询"} onPress={this.onConfirmPress}/>
                            <TButton viewStyle={{marginLeft: 20}} containerStyle={{
                                marginVertical: 20,
                                paddingHorizontal: 10,
                                paddingVertical: 6,
                                backgroundColor: "red",
                                borderRadius: 5
                            }} btnName={"取消"} onPress={this.onCancelHideView}/>
                        </View>
                    </View>
                </View>
            </MyModalView>
        )
    }

    onConfirmPress = () => {
        let {onConfirmPress, onHideHandle} = this.props
        if (onConfirmPress) {
            onConfirmPress(this.state);
        }
        if (onHideHandle) {
            onHideHandle();
        }
    }
    //查询提交操作
    onCancelHideView = () => {
        let {onHideHandle} = this.props
        if (onHideHandle) {
            onHideHandle();
        }
    }
}

const styles = StyleSheet.create({
    textStyle: {
        width: 80,
        left: 10,
        fontSize: 14,
        height: G_PLATFORM_IOS ? 30 : 40,
        // height:G_Theme.textInpuntH,
        paddingLeft: 5,
    },
    pickView: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flex:1
    }
})