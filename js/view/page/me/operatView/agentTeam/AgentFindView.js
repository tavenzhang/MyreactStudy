import React,{PropTypes} from 'react';
import {
    View,
    Picker,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,

} from 'react-native';
import MyDatePicker from "../../../../componet/tcustom/date/TDatePicker";
import MyModalView from "../../../../componet/tcustom/modal/TModalView";
import {TButton} from "../../../../componet/tcustom/button/TButton";
export default class AgentFindView extends React.Component{
    static propTypes={
        visible:PropTypes.bool,
        hideViewHandle:PropTypes.func,
        onFindPress:PropTypes.func
    }

    constructor(props)
    {
        super(props)
        this.state={
            modalVisible:true,
            username: "",
            is_agent: null,
            date_from:null,
            date_to:null
        }
        this.dateValidList = [{name: "所有类型", value: ''}, {name: "玩家", value: 0}, {name: "代理", value: 1}]
    }

    render()
    {
        let {visible,onFindPress} =this.props;
        return (
            <TModalView visible={visible} hideModal={this.onFindConfirm} onPressModal={this.onFindConfirm}>
                <View style={{flex:1,justifyContent: "center", backgroundColor:"rgba(50, 50, 50,0.2)"}}>
                    <View style={{ justifyContent: "center", alignItems: "center",backgroundColor: "white",
                    }}>
                        <View style={{flexDirection: "row", alignItems: "center"}}>
                            <View style={{flexDirection: "row", alignItems: "center"}}>
                                <Text>用户名:</Text>
                                <View style={{borderBottomWidth: 1, borderColor: "gray", marginRight: 20,}}>
                                    <TextInput
                                        style={styles.textStyle}
                                        onChangeText={(username) => this.setState({username: username})}
                                        value={this.state.username}
                                        placeholder={""}
                                        multiline={false}
                                        underlineColorAndroid={'transparent'}
                                        autoCapitalize={"none"}
                                    />
                                </View>
                            </View>
                            <Text>用户属性:</Text>
                            <View style={{width: 110}}>
                                <Picker
                                    itemStyle={{fontSize: 13, height: 120}}
                                    mode={'dropdown'}
                                    selectedValue={this.state.is_agent}
                                    onValueChange={(data) => {
                                        this.setState({is_agent: data})
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
                            <MyDatePicker defaultDate={this.state.date_from} onDateSelect={(date_from)=>{this.setState({date_from:date_from})}}/>
                            <Text style={{marginHorizontal: 10}}>至</Text>
                            <MyDatePicker defaultDate={this.state.date_to}  onDateSelect={(date_to)=>{this.setState({date_to:date_to})}}/>
                        </View>
                        <View style={{flexDirection:"row"}}>
                            <TButton containerStyle={{
                                marginVertical: 20,
                                paddingHorizontal: 10,
                                paddingVertical: 6,
                                backgroundColor: "rgb(208,199,160)",
                                borderRadius: 5
                            }} btnName={"查询"} onPress={() => onFindPress(this.state)}/>
                            <TButton viewStyle={{marginLeft:20}} containerStyle={{
                                marginVertical: 20,
                                paddingHorizontal: 10,
                                paddingVertical: 6,
                                backgroundColor: "red",
                                borderRadius: 5
                            }} btnName={"取消"} onPress={this.onFindConfirm}/>
                        </View>
                    </View>
                </View>
            </TModalView>
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