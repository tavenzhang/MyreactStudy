import React, {PropTypes}from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import BaseView from "../../../../componet/BaseView";
import TFlatList from "../../../../componet/TFlatList"


export default class TRendDetailView extends BaseView {
    static propTypes = {
        dataList: PropTypes.array,
        headData:PropTypes.any,
        is11_5:PropTypes.bool,
        isStartZero:PropTypes.bool
    }

    static defaultProps={
        is11_5:false,
        isStartZero:false
    }

    constructor(props) {
        super(props);
        this.count = 0;
    }

    render() {
        let {dataList,headData} = this.props
        return (
            <View style={G_Style.appContentView}>
                {headData ?<View style={{width: G_Theme.windowWidth, height: 30, flexDirection: "row", backgroundColor: "#aaa"}}>
                    <View style={styles.headTitle}>
                        <Text style={[styles.text, {color: "white", fontWeight: "bold"}]}>{headData.title}</Text>
                    </View>
                    {
                         headData.ballList.map((item, ballKey) => {
                            return (
                                <View style={styles.textHeadView} key={ballKey}>
                                    <Text style={[styles.text, {color: "white",fontWeight: "bold"}]}>{item}</Text>
                                </View>
                            )
                        })
                    }
                </View>:null}
                <TFlatList initialNumToRender={20} dataList={dataList} renderRow={this.rendRow}/>
            </View>
        );
    }

    // getItemLayout=(data, index) => (
    //     // 120 是被渲染 item 的高度 ITEM_HEIGHT。
    //     {length: 30, offset: 0 * index, index}
    // )

    rendRow = (item) => {
        this.count++;
        let backColor = this.count % 2 != 0 ? "white" : "#ddd";
        if (item.bgColor) {
            backColor = item.bgColor
        }
        return (<View style={{flexDirection: "row", backgroundColor: backColor, width: G_Theme.windowWidth}}>
                <View style={styles.headTitle}>
                    <Text style={styles.text}>{item.title}</Text>
                </View>
                {
                    item.ballList.map((ballItem, ballKey) => {
                        return (
                            <View style={styles.textHeadView} key={`ballItem${ballKey}`}>
                                {this.renderItem(ballItem, ballKey)}
                            </View>)
                    })
                }
            </View>
        )
    }

    renderItem = (data, ballKey) => {
        let contentView = null;
        let {is11_5,isStartZero}=this.props
        //{backgroundColor:"red", borderRadius:50}
        if (data instanceof Array) {
            let array = data;
            let itemStr=ballKey;
            if(!isStartZero)
            {
                let index=parseInt(ballKey)+1;
                if(is11_5)
                {
                    itemStr=index>9 ? index:`0${index}`;
                }else{
                    itemStr= index;
                }

            }
            if (array[0] == "0") {//第一位0 表示命中
                let bgColor = parseInt(array[2]) > 1 ? "green" : "red"
                contentView = <View style={{justifyContent: "center", alignItems: "center", paddingHorizontal:is11_5? 1:3,
                    paddingVertical: is11_5 ?1:3,backgroundColor: bgColor,borderRadius:10, borderWidth:1, borderColor:bgColor}}>
                                <Text style={[styles.text]}>{itemStr}</Text>
                            </View>
            }
            else {
                contentView = <Text style={styles.text}>{array[0]}</Text>
            }
        }
        else {
            contentView = <Text style={styles.text}>{data}</Text>

        }

        return contentView;

    }

}

// 样式
var styles = StyleSheet.create({

    textCp: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        color: "black",
        textAlign:"center",
    },
    textHeadView: {
        flex: 1,
        padding: 3,
        borderRightWidth: 0.5,
        borderLeftWidth: 0.5,
        //borderRightWidth: 1,
        borderColor: "gray",
        justifyContent: "center",
        alignItems: "center",
    },
    headTitle:{
        flex:2,
        borderRightWidth: 0.5,
        borderLeftWidth: 0.5,
        //borderRightWidth: 1,
        borderColor: "gray",
        justifyContent: "center",
        alignItems: "center",
        width:100
    }

});