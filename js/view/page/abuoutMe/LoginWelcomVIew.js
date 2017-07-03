import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';
import TView from "../../componet/TView";
import {ImgAbuotMe} from "../../../assets/index";
import {TButton, TButtonFont} from "../../componet/button/TButton";
import NavHeaderBar from "../../componet/NavHeaderBar";

export  default class LoginWelcomVIew extends TView {
    static navigationOptions = ({navigation}) => ({
        // header:<View style={{position: "absolute", left:0, top:0,zIndex:3}}>
        //     <TButtonFont style={{fontSize:30, marginLeft:15,color:"white", marginTop:15, fontWeight:"bold"}} fontName={G_EnumFontNames.Header_Arrow} onPress={G_NavUtil.pop}/>
        //     </View>
        header:<NavHeaderBar navigation={navigation} rightBtnName={"登录"}/>
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