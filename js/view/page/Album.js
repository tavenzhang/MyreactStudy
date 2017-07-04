import React from 'react';
import {
    View,
    Text
    , StyleSheet,
    ListView,
    Image, TouchableOpacity
} from 'react-native';

import {connect} from 'react-redux';
import AIcon from 'react-native-vector-icons/FontAwesome';
import TView from "../componet/TView";
import TTabBarItem from "../componet/tabItem/TTabBarItem";
import {ImgAblum, ImgTabbar} from "../../assets/index";
import HeaderSearchView from "./home/HeaderSearchView";
import TFlatList from "../componet/TFlatList";
import {TButtonView} from "../componet/button/TButton";

const mapStateToProps = state => {
    return {
        // noticeList: state.get("noticState").get("noticeList"),
        //  awardMondy: state.get("noticState").get("awardMondy")
    }
}

@connect(mapStateToProps)
export default class Album extends TView {
    static navigationOptions = {
        title: "",
        tabBarLabel: '',
        // Note: By default the icon is only shown on iOS. Search the showIcon option below.
        tabBarIcon: ({focused}) => {
            return <TTabBarItem selected={focused} icoImg={ImgTabbar.albumn_gray} icoSelectImg={ImgTabbar.albumn}/>
        },
        header: <HeaderSearchView/>
    }

    constructor(props) {
        super(props);
        this.state = {
            dataArray: [{
                name: "丛林夜曲",
                num: 8,
                musics: [{img: ImgAblum.demo1}, {img: ImgAblum.demo2}, {img: ImgAblum.demo1}, {img: ImgAblum.demo2}]
            }, {
                name: "雨中漫步",
                num: 11,
                musics: [{img: ImgAblum.demo1}, {img: ImgAblum.demo2}, {img: ImgAblum.demo1}, {img: ImgAblum.demo2}]
            },
                {
                    name: "侧耳听水",
                    num: 8,
                    musics: [{img: ImgAblum.demo1}, {img: ImgAblum.demo2}, {img: ImgAblum.demo1}, {img: ImgAblum.demo2}]
                }, {
                    name: "大海之声",
                    num: 8,
                    musics: [{img: ImgAblum.demo1}, {img: ImgAblum.demo2}, {img: ImgAblum.demo1}, {img: ImgAblum.demo2}]
                },]
        };
    }

    renderBody() {
        return (
            <View style={G_Style.appContentView}>
                <TFlatList
                    dataList={this.state.dataArray}
                    renderRow={this._renderRow}
                />
            </View>
        );
    }

    componentDidMount() {

    }


    _renderRow = (item) => {
        return (
            <View style={{marginHorizontal: 20, marginBottom: 20}}>
                <View style={{flexDirection: "row", justifyContent: "space-between", marginBottom: 10}}>
                    <Text style={{fontSize: 18, fontWeight: "bold", color: "#666"}}>{item.name}</Text>
                    <TButtonView onPress={() => this.onPreeAbulm(item)}>
                        <View style={{flexDirection: "row", alignItems: "center"}}>
                            <Text>{item.num}</Text>
                            <Image  resizeMode={"center"} style={{ marginLeft:2}} source={ImgAblum.ablumWave}/>
                        </View>
                    </TButtonView>
                </View>
                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                    {item.musics.map((item, index) => {
                        return <TouchableOpacity onPress={this.onPreeMusic} key={index} style={{flex: 1}}>
                            <Image source={item.img} style={{
                                width: 80, height: 160, borderRadius: (index == 0 || index == 3) ? 5 : 0
                            }}/></TouchableOpacity>
                    })}
                </View>
            </View>
        );
    }

    itemClick = (data) => {
        TLog("itemClick-----", data)
        switch (data.series_name) {
            case "SSC":
                G_NavUtil.pushToView(G_NavViews.SSC_History({...data}));
                break;
            case "11-5":
                G_NavUtil.pushToView(G_NavViews.G_11_5_History({...data}));
                break;
        }
    }

    onPreeAbulm = (data) => {
        G_NavUtil.pushToView("MusicView", data);
    }

    onPreeMusic = () => {
        G_NavUtil.pushToView("PlayMusicView", {title: " "})
    }
}


var styles = StyleSheet.create({
    row: {

        borderBottomColor: "#ddd",
        borderBottomWidth: 1,
        marginLeft: 10,

    },
    text: {
        flex: 1,
        marginTop: 5,
        fontWeight: 'bold'
    },
    iconNormal: {
        color: G_Theme.grayDeep,
        fontSize: 30,
        right: 20,
        alignSelf: "center",
    },

});