import React, {PropTypes}from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import BaseView from "../../../../../componet/BaseView";
import TFlatList from "../../../../../componet/TFlatList"


export default class Game_SSC_TREND extends BaseView {
    static propTypes={
        dataList:PropTypes.array
    }

    constructor(props) {
        super(props);
        this.headData={title: "期数", ballList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],isHeader:true}
        this.state = {
            dataList: [],
        }
        this.count = 0;
    }

    render() {

        let {dataList} =this.props
        return (
            <View style={G_Style.appContentView}>
                <View style={{width:G_Theme.windowWidth, height: 30,flexDirection: "row", backgroundColor: "#aaa"}}>
                    <View style={{flex: 2, justifyContent:"center", alignItems:"center"}}>
                        <Text style={[styles.text,{color:"white", fontWeight:"bold"}]} >{this.headData.title}</Text>
                    </View>
                    {
                        this.headData.ballList.map((item2, ballKey2) => {
                            return (
                                <View style={{flex:1,justifyContent:"center", alignItems:"center"}} key={`head----${ballKey2}`}>
                                   <Text style={[styles.text,{color:"white", fontWeight:"bold"}]}>{item2}</Text>
                                </View>
                            )
                        })
                    }

                </View>
                <TFlatList getItemLayout={this.getItemLayout} initialNumToRender={20} dataList={dataList} renderRow={this.rendRowBall}/>
            </View>
        );
    }

    getItemLayout=(data, index) => (
        // 120 是被渲染 item 的高度 ITEM_HEIGHT。
        {length: 30, offset: 0 * index, index}
    )

    rendRowBall=(item)=>{
        this.count++;
        let backColor =  this.count % 2 != 0 ? "white": "#ddd";
        if(item.bgColor)
        {
            backColor=item.bgColor
        }
        return (<View style={{flexDirection: "row", backgroundColor: backColor}} >
                <View style={[styles.textCp, {flex: 2, justifyContent:"center", alignItems:"center"}]}>
                    <Text style={[styles.text]} numberOfLines={2}>{item.title}</Text>
                </View>
                {
                    item.ballList.map((ballItem, ballKey) => {
                        return (
                            <View style={[G_Style.appContentView,{backgroundColor: backColor}]} key={`ballItem${ballKey}`}>
                                {this.renderItem(ballItem, ballKey)}
                            </View>)
                    })
                }
            </View>
        )
    }

    renderItem = (data, ballKey) => {
        let contentView = null;
        //{backgroundColor:"red", borderRadius:50}
        if(data instanceof  Array)
        {
            let array=data;
            if (array[0] == "0") {
                let bgColor=parseInt(array[2])>1 ? "green":"red"
                contentView = <View style={[styles.textCp]}>
                    <View style={{flex:1, backgroundColor:bgColor,borderRadius:40,
                        margin:5,justifyContent:"center", alignItems:"center"}}>
                        <Text style={[styles.text]} >{ballKey}</Text>
                    </View>
                </View>
            }
            else {
                contentView = <View style={[styles.textCp]}>
                    <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
                        <Text style={styles.text} >{array[0]}</Text>
                    </View>
                </View>
            }
        }
        else{
            contentView = <View style={[styles.textCp]}>
                <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
                    <Text style={styles.text} >{data}</Text>
                </View>
            </View>

        }


        return contentView;

    }

    componentDidMount() {

    }


}

// 样式
var styles = StyleSheet.create({
    scrollViewStyle: {
        // 背景色
        backgroundColor: 'red'
    },
    textCp: {
        flex: 1,
        borderRightWidth: 1,
        borderColor: "gray",
    },
    text: {
        color: "black",
        textAlign:"center",
    },

});