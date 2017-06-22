import React ,{PropTypes} from 'react';
import {
    View,
    StyleSheet,
    Modal,
    TextInput,
    Text,
    TouchableOpacity,
} from 'react-native';
import BaseView from "../../../componet/BaseView";

export default class ConfigView extends BaseView {

    static propTypes = {
        modalVisible:PropTypes.bool,
        setModalVisible:PropTypes.func
    }

    constructor(props) {
        super(props);
        this.state = {
                domain:"",
                bundleServer:""
            };
    }

    render() {
        return (
            <View>
                <Modal
                    animationType={"slide"}
                    transparent={false}
                    visible={this.props.modalVisible}
                    onRequestClose={() => {
                        alert("Modal has been closed.")
                    }}
                    hardwareAccelerated={true}
                    style={{backgroundColor: "blue", justifyContent: "center", alignItems: "center"}}
                >
                    <View style={[G_Style.appContentView, {
                        justifyContent: "center", alignItems: "center"}]}>
                            <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                                <Text>新域名:</Text>
                                <TextInput
                                    style={styles.textInputStyle}
                                    placeholder={"新域名(www.hao123.com)"}
                                    autoCapitalize={"none"}
                                    onChangeText={(domain) => this.setState({domain})}
                                    value={this.state.domain}
                                />
                            </View>
                            <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center",
                                marginTop:
                                    20}}>
                                <TouchableOpacity style={{alignSelf: "center", flex:1, alignItems:"center"}} onPress={this.onClickDomain}>
                                    <Text style={[styles.textStyle,{backgroundColor:"green"}]}>修改域名</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{alignSelf: "center", flex:1,alignItems:"center"}} onPress={this.toggleView}>
                                    <Text style={[styles.textStyle,{backgroundColor:"red"}]}>取消</Text>
                                </TouchableOpacity>
                            </View>
                    </View>
                    <View style={[G_Style.appContentView, {
                        justifyContent: "center", alignItems: "center",
                    }]}>
                            <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                                <Text>bundle新地址:</Text>
                                <TextInput
                                    style={styles.textInputStyle}
                                    placeholder={"输入新bundle配置地址"}
                                    autoCapitalize={"none"}
                                    onChangeText={(bundleServer) => this.setState({bundleServer:bundleServer})}
                                    value={this.state.bundleServer}
                                />
                            </View>
                            <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center",
                                marginTop: 20}}>
                                <TouchableOpacity style={{alignSelf: "center", flex:1, alignItems:"center"}} onPress={this.onClickBound}>
                                    <Text style={[styles.textStyle,{backgroundColor:"green"}]}>修改bundle</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{alignSelf: "center", flex:1,alignItems:"center"}} onPress={this.toggleView}>
                                    <Text style={[styles.textStyle,{backgroundColor:"red"}]}>取消</Text>
                                </TouchableOpacity>
                            </View>

                    </View>
                </Modal>
            </View>
        );
    }

    componentDidMount() {

    }

    onClickDomain=()=>{
        if(this.state.domain !="")
        {
            G_MyStorage.setItem(G_EnumStroeKeys.DO_MAIN, "http://"+this.state.domain,()=>{
                ActDispatch.AppAct.showBox("域名更新成功")
                T_JSReload();
            });
        }
        else{
            ActDispatch.AppAct.showBox("请输入有效的域名")
        }
    }

    onClickBound=()=>{
        if(this.state.bundleServer !="")
        {
            let codePush={};
            codePush.keyStr= G_PLATFORM_IOS ? "RcWB1BblFfzejm9MhYIIRMtAfa2V4ksvOXqog":"OESoJepwvYUVO5JLX51iJl3LHucn4ksvOXqog"; //Staging
            switch (this.state.bundleServer)
            {
                case "1":
                    codePush.server="http://192.168.0.110:3000";
                    G_MyStorage.setItem(G_EnumStroeKeys.CODE_PUSH,JSON.stringify(codePush),()=>{
                        this.restartApp();
                    });
                    break;
                case "2":
                    codePush.server="http://104.250.145.227:3000";
                    G_MyStorage.setItem(G_EnumStroeKeys.CODE_PUSH,JSON.stringify(codePush),()=>{
                        this.restartApp();
                    });
                    break;
                default:
                    ActDispatch.FetchAct.fetchWithResult("http://"+this.state.bundleServer,(data)=>{
                        codePush.keyStr= G_PLATFORM_IOS ? data.key_ios:data.key_android;
                        codePush.server=(data.server)
                        G_MyStorage.setItem(G_EnumStroeKeys.CODE_PUSH,JSON.stringify(codePush),()=>{
                            this.restartApp();
                        });
                    })
            }
        }
        else{
            ActDispatch.AppAct.showBox("请输入有效bundle地址")
        }
    }

    toggleView=()=>{
        this.props.setModalVisible(!this.props.modalVisible)
    }

    restartApp=()=>{
        if(G_PLATFORM_IOS)
        {
            T_AppReStart();
        }
        else{
            G_AlertUtil.showWithDestructive("修改成功！","应用程序重新启动后生效",[
                {text: '马上重启', onPress: () =>T_AppReStart()},
                {text: '稍后',onPress: () =>{this.toggleView()}}
            ])
        }
    }

}

const styles = StyleSheet.create({
    textStyle: {
        color: G_Theme.gray,
        borderWidth:1,
        margin:15,
        padding:5,
    },
   textInputStyle: {
       marginLeft:10,
       paddingLeft:5,
       width:220,
       borderRadius:5,
       borderWidth:1,
       fontSize:14,
       height:40
    },
    iconPress: {
        color: G_Theme.primary,
        fontSize: 25
    },
    iconNormal: {
        color: G_Theme.gray,
        fontSize: 25
    },
    webview_style: {
        //backgroundColor:'#00ff00',
    }

});