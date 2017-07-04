import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image
} from 'react-native';

import TView from "../../componet/TView";
import {ImgMusic, ImgHome, SoundMusic} from "../../../assets/index";

import {TButtonImg} from "../../componet/button/TButton";
import Swiper from 'react-native-swiper';
import PlayerView from "./playerView/PlayerView";


export default class PlayMusicView extends TView {

    static navigationOptions = {
        headerStyle: {
            backgroundColor: "transparent",
            shadowOffset: null,
            position: "absolute",
            left: 0,
            top: 0,
            width: G_Theme.windowWidth
        },
        headerTitleStyle: {color: G_Theme.grayDeep},
        headerRight: <TButtonImg img={ImgHome.wave} styleImg={{width:40, height:30, marginRight:20}}/>,
        headerTintColor: "white",
    }

    constructor(props) {
        super(props);
        this.state = {
            tabIndex: 0,
        }
        this.tabList = ["推荐", "最新"]
    }

    renderBody() {
        return (<Swiper
                loop={false}
                dot={<View style={[styles.customDot]}/>}
                activeDot={<View style={[styles.customActiveDot]}/>}
                showsPagination={true}
                paginationStyle={{bottom: G_Theme.windowHeight-30}}
            >
                <PlayerView/>
                <View style={[G_Style.appContentView]}>
                    <Image source={ImgMusic.playBg_2} style={{
                        width: G_Theme.windowWidth, height: G_Theme.windowHeight,
                        position: "absolute"
                    }}/>
                    <View style={{backgroundColor: "transparent", marginTop: 80, marginHorizontal: 20}}>
                        <View style={styles.textSp}>
                            <Text style={{color: "white"}}>这是测试解释字段</Text>
                        </View>
                        <View style={styles.textSp}>
                            <Text style={{color: "white"}}>这是测试解释字段</Text>
                        </View>
                    </View>
                </View>
            </Swiper>
        );
    }


    componentDidMount() {
        TLog("musicView-componentDidMount")
    }

    componentWillUnmount() {
        TLog("musicView-componentWillUnMount")
    }
}

const styles = StyleSheet.create({
    swiper: {
        backgroundColor: '#77cc32',
    },
    bannerImage: {
        height: G_Theme.bannerHeight,
        width: G_Theme.windowWidth,
    },

    customDot: {
        backgroundColor: 'gray',
        height: 8,
        width: 8,
        borderRadius: 4,
        marginHorizontal: 4,
       // marginTop: -G_Theme.windowHeight * 2 + 130
       // marginTop:G_Theme.windowHeight  +180
    },

    customActiveDot: {
        backgroundColor: 'white',
        height: 8,
        width: 8,
        borderRadius: 4,
        marginHorizontal: 4,
        //marginTop: -G_Theme.windowHeight * 2 + 130
    },
    textSp: {
        marginVertical: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        alignSelf: "flex-start",
        backgroundColor: "rgba(10,10,10,0.5)",
        borderRadius: 10

    }
})