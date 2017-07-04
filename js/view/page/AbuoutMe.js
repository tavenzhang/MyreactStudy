import React from 'react';
import {
    View,
    Text
    , StyleSheet, Image,
} from 'react-native'
import TView from "../componet/TView";
import TTabBarItem from "../componet/tabItem/TTabBarItem";
import {ImgAbuotMe, ImgTabbar} from "../../assets/index";
import HeaderSearchView from "./home/HeaderSearchView";
import connect from "react-redux/src/components/connect";
import {TButtonSimpleText, TButtonView} from "../componet/button/TButton";
import LoginWelcomVIew from "./abuoutMe/LoginWelcomVIew";


const mapStateToProps = state => {
    return {
        userData: state.get("appState").get("userData").toJS(),
        moneyBalance: state.get("appState").get("moneyBalance"),
    }
}

@connect(mapStateToProps)
export default class AboutMe extends TView {
    static navigationOptions = {
        title: " ",
        tabBarLabel: ' ',
        // Note: By default the icon is only shown on iOS. Search the showIcon option below.
        tabBarIcon: ({focused}) => {
            return <TTabBarItem selected={focused} icoImg={ImgTabbar.me_gary} icoSelectImg={ImgTabbar.me}/>
        },
        header: <HeaderSearchView/>
    }

    constructor(props) {
        super(props);
        this.state = {
            dataList: []
        };
    }

    renderBody() {
        return (
            <View style={G_Style.appContentView}>
                <View style={{flexDirection: "row"}}>
                    <View style={{flex: 1, alignItems: "center"}}>
                        <Text style={{fontWeight: "bold", fontSize: 20}}>你好! 请</Text>
                        <View style={{marginTop: 10, flexDirection: "row", alignItems: "center"}}>
                            <TButtonSimpleText textStyle={{color: "green", fontSize: 16}} btnName={"登录"}
                                               onPress={this._onLogin}/>
                            <Text style={{fontSize: 16}}> 或 </Text>
                            <TButtonSimpleText textStyle={{color: "green", fontSize: 16}} btnName={"注册"}
                                               onPress={this._onRegView}/>
                        </View>

                    </View>
                    <View style={{flex: 1, alignItems: "center"}}>
                        <Image source={ImgAbuotMe.head_big} style={{width: 120, height: 120}}/>
                    </View>
                </View>
                <View style={{flexDirection: "row", marginTop: 20}}>
                    <View style={styles.btnMenuSp}>
                        <Text style={{fontWeight:"bold", fontSize:16}}>0</Text>
                        <Text style={styles.textMunu}>喜欢</Text>
                    </View>
                    <View style={styles.btnMenuSp}>
                        <Text style={{fontWeight:"bold",fontSize:16}}>0</Text>
                        <Text style={styles.textMunu}>下载</Text>
                    </View>
                    <TButtonView containerStyle={[styles.btnMenuSp]}>
                        <View style={{alignItems:"center"}}>
                            <Image  resizeMode={"center"}  source={ImgAbuotMe.config}/>
                            <Text style={styles.textMunu}>设置</Text>
                        </View>
                    </TButtonView>
                    <TButtonView containerStyle={[styles.btnMenuSp]}>
                        <View style={{alignItems:"center"}}>
                            <Image resizeMode={"center"} source={ImgAbuotMe.vip_gray} />
                            <Text style={styles.textMunu}>会员</Text>
                        </View>
                    </TButtonView>
                </View>
            </View>
        );
    }

    _onLogin = () => {
        const {navigation} = this.props;
         G_NavUtil.pushToView("LoginWelcomVIew",{title:"登录"});
    }

    _onRegView = () => {
        G_NavUtil.pushToView("LoginReginView",{title:"注册"});
    }
}


const styles = StyleSheet.create({
    btnMenuSp: {
        alignItems: "center",
        marginRight: 40,
        marginLeft: 15,
        justifyContent: "center",
        height:30,
    },
    textMunu: {
        marginTop: 10
    }

});
