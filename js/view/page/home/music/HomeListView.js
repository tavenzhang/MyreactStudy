import React,{PropTypes} from 'react';
import {
    View
    , StyleSheet,
    TouchableHighlight,
    TouchableOpacity,
   Image,
    Text
} from 'react-native'
import TFlatList from "../../../componet/TFlatList";
import TView from "../../../componet/TView";
import {TButtonImg} from "../../../componet/button/TButton";
import {ImgHome, ImgMusic} from "../../../../assets/index";

export default class HomeListView extends TView {
   static  propTypes={
        dataList:PropTypes.any,
       renderHeader:PropTypes.func
    }

    render() {
        let {dataList,renderHeader}=this.props
        return (
            <View style={[G_Style.appContentView]}>
                <TFlatList renderHeader={renderHeader} dataList={dataList}  renderRow={this._renderRow}/>
            </View>
        );
    }

    componentDidMount() {

    }

    _renderRow = (item,index) => {
       //{img:"http://img.zcool.cn/community/01ef25586f541da801219c77359c63.png",
        //people:111,heart:i*200,
        //    dec:"禅修冥想,禅修冥想,禅修冥想,禅修冥想,禅修冥想,禅修冥想,禅修冥想"}
        TLog("data--------",item)
        return (
            <View style={{alignItems:"center", justifyContent:"center"}} key={index}>

                    <View style={{marginHorizontal:40, marginVertical:10}}>
                        <Image source={item.img} style={{height:400, borderRadius: 5,width:G_Theme.windowWidth-100}}/>
                        <TButtonImg onPress={()=>{this.itemClick(item)}} img={ImgHome.player} style={{position:"absolute"}}/>
                        <View style={{position:"absolute", flexDirection: "row",
                            bottom:10,right:10, backgroundColor:"rgba(22,22,22,0.3)", borderRadius:
                        4, paddingHorizontal: 6, paddingVertical:
                        4, alignItems:
                        "center"}}>
                            <Image resizeMode={"center"}  style={{width:15, height:15}} source={ImgMusic.heart}/>
                            <Text style={{color:"white", left: 3,fontWeight:"bold"}}>1180</Text>
                        </View>
                    </View>
                <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"flex-start"}}>
                    <Text style={{width:200}}>{"听见雨水滴滴的响亮,听见雨水滴滴的响亮,听见雨水滴滴的响亮!"}</Text>
                    <TButtonImg style={{width:20, height:20}} resizeMode={"contain"} img={ImgMusic.shareBtn}/>
                </View>
                </View>
        );
    }

    itemClick = (data) => {
      TLog("itemClick-----",data);
      G_NavUtil.pushToView("PlayMusicView",{title:" "})
    }
}


const styles = StyleSheet.create({
    itemHeadStyle: {
        alignItems: "center",
        borderRightWidth: 1,
        justifyContent: "center",
        textAlign: "center"
    },
    itemContentStyle: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    textHeadStyle: {
        fontSize: 14,
        fontWeight: "bold",

    },
    textItemStyle: {
        fontSize: 12,
        color: "gray"
    },
    row: {
        flexDirection: 'row',
        height: 50,
        borderBottomWidth: 0.5,
        marginLeft: 10,
        borderColor: "gray",
        // borderWidth: 1,
    },

});
