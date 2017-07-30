import React, {PropTypes} from 'react';
import {
    View,
    StyleSheet,
    Text,
} from 'react-native';
import MyDatePicker from "../../../../componet/tcustom/date/TDatePicker";
import TModalView from "../../../../componet/tcustom/modal/TModalView";
import {TButton} from "../../../../componet/tcustom/button/TButton";
import {TPicker} from "../../../../componet/tcustom/picker/TPicker";
import {TTextInput} from "../../../../componet/tcustom/textInput/TTextInput";
export default class MoneySearchView extends React.Component {
    static propTypes = {
        visible: PropTypes.bool,
        hideViewHandle: PropTypes.func,
        onFindPress: PropTypes.func,
        isInMoney: PropTypes.bool
    }

    constructor(props) {
        super(props)
        let {userData} = this.props
        this.userTypeList = userData.isAgent ? G_UserTypeList : [{name: "自己", value: 1}]
        this.state = {
            deposit_mode: "",
            userName: "",
            date_from: "",
            date_to: "",
            dataNumer: "",
            pickValue: '',
            userPicker: this.userTypeList[0].value
        }
        this.payList = [{name: "全部方式", value: ""}, {name: "银行卡充值", value: "1"}, {name: "第三方充值", value: "2"}]
    }

    render() {
        let {visible, hideViewHandle, appModel, isInMoney} = this.props;
        let stateList = isInMoney ? appModel.getADeposit : appModel.getADrawDateList;
        return (
            <TModalView visible={visible} onPressModal={hideViewHandle}>
                <View style={{flex: 1, justifyContent: "center", backgroundColor: "rgba(50, 50, 50,0.2)"}}>
                    <View style={{
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 5,
                        marginHorizontal: 10,
                        backgroundColor: "white",
                    }}>
                        <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
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
                                <Text>状态:</Text>
                                <TPicker
                                    viewStyle={{flex: 1}}
                                    itemStyle={{width: 125, fontSize: 15, height: 150}}
                                    dataList={stateList}
                                    pickValue={this.state.pickValue}
                                    onValueChange={(data) => {
                                        this.setState({pickValue: data})
                                    }}/>
                            </View>
                        </View>
                        <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                            {
                                isInMoney ? <View style={styles.pickView}>
                                    <Text>充值方式:</Text>
                                    <TPicker
                                        viewStyle={{flex: 1}}
                                        itemStyle={{width: 100, fontSize: 15, height: 100}}
                                        dataList={this.payList}
                                        pickValue={this.state.deposit_mode}
                                        onValueChange={(data) => {
                                            this.setState({deposit_mode: data})
                                        }}/>
                                </View> : null
                            }
                            <View style={{flexDirection: isInMoney ? "column" : "row"}}>
                                <View style={{flexDirection: "row", alignItems: "center"}}>
                                    <View style={{flexDirection: "row", alignItems: "center"}}>
                                        <Text style={{width: 50, textAlign: "right"}}>编号:</Text>
                                        <View style={{borderBottomWidth: 1, borderColor: "gray", marginRight: 20}}>
                                            <TTextInput
                                                style={styles.textStyle}
                                                onChangeText={(dataNumer) => this.setState({dataNumer})}
                                                value={this.state.dataNumer}
                                                placeholder={""}
                                            />
                                        </View>
                                    </View>
                                </View>
                                <View style={{flexDirection: "row", alignItems: "center"}}>
                                    <Text style={{width: 50, textAlign: "right", marginHorizontal: 5}}>用户名:</Text>
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
                        </View>
                        <View style={{flexDirection: "row", alignItems: "center", marginTop: 15}}>
                            <Text style={{marginRight: 5}}>时间:</Text>
                            <MyDatePicker defaultDate={this.state.date_from} onDateSelect={(date_from) => {
                                this.setState({date_from: date_from})
                            }}/>
                            <Text style={{marginHorizontal: 10}}>至</Text>
                            <MyDatePicker defaultDate={this.state.date_to} onDateSelect={(date_to) => {
                                this.setState({date_to: date_to})
                            }}/>
                        </View>
                        <View style={{flexDirection: "row"}}>
                            <TButton containerStyle={{
                                marginVertical: 20,
                                paddingHorizontal: 10,
                                paddingVertical: 6,
                                backgroundColor: "rgb(208,199,160)",
                                borderRadius: 5
                            }} btnName={"查询"} onPress={this.onFindConfirm}/>
                            <TButton viewStyle={{marginLeft: 20}} containerStyle={{
                                marginVertical: 20,
                                paddingHorizontal: 10,
                                paddingVertical: 6,
                                backgroundColor: "red",
                                borderRadius: 5
                            }} btnName={"取消"} onPress={hideViewHandle}/>
                        </View>
                    </View>
                </View>
            </TModalView>
        )
    }

    //查询提交操作
    onFindConfirm = () => {
        let {hideViewHandle, onFindPress} = this.props
        if (onFindPress) {
            onFindPress(this.state);
        }
        if (hideViewHandle) {
            hideViewHandle()
        }
    }
}

const styles = StyleSheet.create({
    textStyle: {
        width: 100,
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
        flex: 1
    }
})