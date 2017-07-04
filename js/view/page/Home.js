import React from 'react';
import {
    View,
    StyleSheet,
    Image,
    Text
} from 'react-native';
import TView from "../componet/TView";
import {connect} from 'react-redux';
import TTabBarItem from "../componet/tabItem/TTabBarItem";
import {ImgTabbar, ImgHome} from "../../assets/index";
import {TButtonImg} from "../componet/button/TButton";

import TSwiper from "../componet/TSwiper";
import HeaderSearchView from "./home/HeaderSearchView";

const mapStateToProps = state => {
    return {
        bannerList: state.get("homeState").get("gameModel"),
        gameModel: state.get("appState").get("gameModel"),
        playModel: state.get("appState").get("playModel"),
        userData: state.get("appState").get("userData").toJS(),
    }
}


@connect(mapStateToProps)
export default class Home extends TView {
    static navigationOptions = (data) => ({
        title: " ",
        tabBarLabel: ' ',
        tabBarIcon: ({focused}) => {
            return <TTabBarItem selected={focused} icoImg={ImgTabbar.home_gray} icoSelectImg={ImgTabbar.home}/>
        },
         header:<HeaderSearchView/>
    })


    constructor(props) {
        super(props);
        this.state =
            {
                dataList: [],
                domain: "",
                showBanner: false
            };

        this.menuList = [{img: ImgHome.sleep, name: "深夜助眠"}, {img: ImgHome.awake, name: "清晨唤醒"}, {
            img: ImgHome.noon,
            name: "午睡小憩"
        },
            {img: ImgHome.think, name: "禅修冥想"}, {img: ImgHome.study, name: "学习工作"},
            {img: ImgHome.coffee, name: "静静发呆"},
        ]

        this.bannerList = [{
            url: ImgHome.banner,
            name: "大海之声",
            data: "http://www.baidu.com"
        }, {
            url: ImgHome.banner,
            name: "雨中漫步",
            data: "http://www.baidu.com"
        }, {
            url: ImgHome.banner,
            name: "休闲时刻",
            data: "http://www.google.com"
        }]
    }

    render() {
        return (
            <View style={[G_Style.appContentView]}>
                {this.state.showBanner || G_PLATFORM_IOS ? <TSwiper  onPress={this.onPressBanner} isResouce={true}
                                                                    dataList={this.bannerList} {...this.props} /> : null}
                {this.rendMenuBtnList()}
            </View>
        );
    }

    rendMenuBtnList = () => {
        return <View style={{flex:1}}>
                    <View style={{justifyContent: "center", alignItems: "center", marginTop:20}}>
                        <Image resizeMode={"center"} source={ImgHome.mirphohe}/>
                        <Text style={{marginTop: 10, fontSize: 12, color: "gra2y"}}>带上耳机,聆听自然的宁静</Text>
                    </View>
                   <View style={[G_Style.appContentCenterView]}>
                        <View style={{flexDirection: "row", flexWrap: "wrap"}}>
                            {
                                this.menuList.map((item, index) => {
                                    return (<TButtonImg style={{
                                        justifyContent: "center",
                                        alignItems: "center",
                                        width: G_Theme.windowWidth / 3,
                                        padding: 20,
                                        height:130
                                    }} resizeMode={"center"} img={item.img} text={item.name} key={index} onPress={()=>this.onPressMenuBtn(item)}/>)
                                })
                            }
                        </View>
                     </View>
                </View>
    }

    onPressMenuBtn=(data)=>{
        G_NavUtil.pushToView("MusicView",data);
    }

    componentDidMount() {
        !G_PLATFORM_IOS ? setTimeout(() => {
            this.setState({showBanner: true})
        }, 500) : null;
    }

    onPressBanner = (data) => {
        G_NavUtil.pushToView("MusicView",data);
    }
}
const styles = StyleSheet.create({
    textStyle: {
        color: G_Theme.gray,
    },
    selectedTextStyle: {
        color: G_Theme.selectColor,
    },
    iconPress: {
        color: G_Theme.selectColor,
        fontSize: 25
    },
    iconNormal: {
        color: G_Theme.gray,
        fontSize: 25
    },

})