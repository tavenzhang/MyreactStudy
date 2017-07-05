
import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    LayoutAnimation
} from 'react-native';

import TView from "../../componet/TView";
import TSegmentedControlTab from "../../componet/button/TSegmentedControlTab";
import {ImgMusic, ImgHome,ImgAblum} from "../../../assets/index";
import HomeListView from "./music/HomeListView";
import {TButtonImg} from "../../componet/button/TButton";



export default class MusicView extends TView{

    static navigationOptions = {
        headerStyle:{backgroundColor:"white",shadowOffset:null,elevation:null},
        headerTitleStyle:{color:G_Theme.grayDeep},
        headerTintColor:G_Theme.grayDeep,
        headerRight:<TButtonImg styleImg={{height:25, width:40, marginRight:20}}  img={ImgHome.wave}/>
    }

    constructor(props)
    {
        super(props);
      this.state={
          tabIndex:0,
      }
      this.tabList=["推荐","最新"]
        let src=ImgAblum.demo1;
        let src2=ImgAblum.demo2
        this.homeList=[{img:src,dec:"哈哈哈"},{img:src,dec:"哈哈哈"},{img:src,dec:"哈哈哈"},{img:src,dec:"哈哈哈"},
            {img:src,dec:"哈哈哈"},{img:src,dec:"哈哈哈"}]

        this.homeList2=[{img:src2,dec:"哈哈哈"},{img:src2,dec:"哈哈哈"},{img:src2,dec:"哈哈哈"},{img:src2,dec:"哈哈哈"},
            {img:src2,dec:"哈哈哈"},{img:src2,dec:"哈哈哈"}]
    }


    render() {
        return (
            <View style={[G_Style.appContentView]}>
                <View style={{marginHorizontal:20}}>
                    <TSegmentedControlTab tabStyle={{paddingVertical:20}}
                                          selectedTabIndex={this.state.tabIndex}
                                          valueList={this.tabList}
                     onTabChange={this.onTabChange}/>
                </View>
                {
                    this.state.tabIndex ==0 ?    <HomeListView renderHeader={this.onRenderHeader} dataList={this.homeList}/>:null
                }
                {
                    this.state.tabIndex ==1 ?    <HomeListView renderHeader={this.onRenderHeader} dataList={this.homeList2}/>:null
                }

            </View>
        );
    }

    onRenderHeader=()=>{
        return <Image  resizeMode={"center"}  source={ImgMusic.musicHint} style={{alignSelf:"center"}} />
    }

    onTabChange=(data,tabIndex)=>{
        TLog("onTabChange---",tabIndex)
        this.setState({tabIndex})
    }
    componentDidMount() {

    }

    componentWillUnmount() {

    }
}

const styles = StyleSheet.create({
    textStyle: {
        color: G_Theme.gray,
    },
    selectedTextStyle: {
        color: G_Theme.primary,
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