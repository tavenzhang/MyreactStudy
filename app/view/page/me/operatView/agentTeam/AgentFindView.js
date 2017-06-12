import React,{PropTypes} from 'react';
import {
    View,
    Picker,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,

} from 'react-native';
import MyDatePicker from "../../../../componet/MyDatePicker";
import MyModalView from "../../../../componet/MyModalView";
export default class AgentFindView extends React.Component{
    static propTypes={
        visible:PropTypes.bool,
        hideViewHandle:PropTypes.func,
    }

    constructor(props)
    {
        super(props)
        this.state={
            modalVisible:true,
            userNameText: "",
            pickValue:null,
            startDate:null,
            endDate:null
        }
        this.dateValidList = [{name: "全部用户", value: 1}, {name: "玩家", value: 7}, {name: "代理", value: 30}]
    }

    render()
    {
        let {visible} =this.props;
        return (
            <MyModalView visible={visible} hideModal={this.onFindConfirm}>
                <View style={{flex:1,justifyContent: "center", backgroundColor:"rgba(50, 50, 50,0.2)"}}>
                    <View style={{ justifyContent: "center", alignItems: "center",backgroundColor: "white",
                    }}>
                        <View style={{flexDirection: "row", alignItems: "center"}}>
                            <View style={{flexDirection: "row", alignItems: "center"}}>
                                <Text>用户名:</Text>
                                <View style={{borderBottomWidth: 1, borderColor: "gray", marginRight: 20,}}>
                                    <TextInput
                                        style={styles.textStyle}
                                        onChangeText={(userNameText) => this.setState({userNameText: userNameText})}
                                        value={this.state.userNameText}
                                        placeholder={""}
                                        secureTextEntry={true}
                                        multiline={false}
                                        underlineColorAndroid={'transparent'}
                                    />
                                </View>
                            </View>
                            <Text>用户属性:</Text>
                            <View style={{width: 110}}>
                                <Picker
                                    itemStyle={{fontSize: 13, height: 120}}
                                    mode={'dropdown'}
                                    selectedValue={this.state.pickValue}
                                    onValueChange={(data) => {
                                        this.setState({pickValue: data})
                                    }}>
                                    {
                                        this.dateValidList.map((item, index) => {
                                            return (<Picker.Item label={item.name} value={item.value}
                                                                 key={index + "item"}/>)
                                        })
                                    }
                                </Picker>
                            </View>
                        </View>
                        <View style={{flexDirection: "row", alignItems: "center"}}>
                            <Text style={{marginRight: 5}}>注册时间:</Text>
                            <MyDatePicker onDateSelect={(startDate)=>{this.setState({startDate})}}/>
                            <Text style={{marginHorizontal: 10}}>至</Text>
                            <MyDatePicker  onDateSelect={(endDate)=>{this.setState({endDate})}}/>
                        </View>
                        <TouchableOpacity onPress={this.onFindConfirm}>
                        <View style={{
                            marginVertical: 20,
                            paddingHorizontal: 10,
                            paddingVertical: 6,
                            backgroundColor: "rgb(208,199,160)",
                            borderRadius: 5
                        }}>
                            <Text style={{color:"white"}}>查询</Text>
                        </View>
                    </TouchableOpacity>
                    </View>
                </View>
            </MyModalView>
        )
    }

    //查询提交操作
    onFindConfirm=()=>{
        let {hideViewHandle}=this.props
        if(hideViewHandle) {
            hideViewHandle({...this.state});
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
})