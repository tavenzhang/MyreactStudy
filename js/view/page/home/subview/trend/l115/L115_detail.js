import React, {PropTypes}from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
} from 'react-native';
import BaseView from "../../../../../componet/BaseView";

export default class L115_detail extends React.Component {
    static propTypes={
        dataList:PropTypes.array
    }

    constructor(props) {
        super(props);
        this.headData={title: "期数", ballList: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10","11"],isHeader:true}
        this.state = {
            dataList: [],
        }
    }

    render() {
        let count = 0;
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
                <ScrollView style={{width:G_Theme.windowWidth}}>
                    {
                        dataList.map((item, key) => {
                            count++;
                            let backColor = count % 2 != 0 ? "white": "#ddd";
                            if(item.bgColor)
                            {
                                backColor=item.bgColor
                            }
                            return (<View style={{flexDirection: "row", backgroundColor: backColor}}  key={`dataList${key}`}>
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
                        })
                    }
                </ScrollView>
            </View>
        );
    }

    renderItem = (data, ballKey) => {
        let contentView = null;
        //{backgroundColor:"red", borderRadius:50}
        if(data instanceof  Array)
        {
            let array=data;
            if (array[0] == "0") {
                let num = parseInt(ballKey)+1;
                let numStr = num>=10 ? `${num}`: `0${num}`;
                let bgColor=parseInt(array[2])>1 ? "green":"red"
                contentView = <View style={[styles.textCp]}>
                    <View style={{flex:1, backgroundColor:bgColor,borderRadius:80,
                        margin:5,justifyContent:"center", alignItems:"center"}}>
                        <Text style={[styles.text]} numberOfLines={1} >{numStr}</Text>
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

    itemStyle: {
        // 尺寸
        width: 1000,
        height: 200
    },
});