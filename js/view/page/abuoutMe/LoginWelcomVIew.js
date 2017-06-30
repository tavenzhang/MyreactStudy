import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';
import TView from "../../componet/TView";
import {ImgAbuotMe} from "../../../assets/index";
import {TButton} from "../../componet/button/TButton";

export  default class LoginWelcomVIew extends TView {
    static navigationOptions = (data) => ({
        header:<View style={{position: "absolute"}}><Text>2222</Text></View>
    })
    render () {
        return (
            <View style={[G_Style.appContentView,{backgroundColor:G_Theme.TGreen}]}>
                <Image source={ImgAbuotMe.welcome} style={{width:G_Theme.windowWidth, height:G_Theme.windowHeight}}/>
                <View style={ [G_Style.appCenterView, {position: "absolute"}]}>
                   <TButton textStyle={styles.text} containerStyle={styles.btn} btnName={"使用微信登录"}/>
                    <TButton containerStyle={[styles.btn,{marginTop:20, backgroundColor:G_Theme.TGreen}]}  btnName={"注册新账号"}/>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
   btn:{
       width:G_Theme.windowWidth*3/4,
       height: 35,
       backgroundColor:"white",
       borderWidth: 1,
       borderRadius:15,
       borderColor:"white",
       paddingVertical:7
   },
    text:{
        color:G_Theme.TGreen
    }

})