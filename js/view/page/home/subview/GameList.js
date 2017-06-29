import React, {PropTypes}from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    Image,
    LayoutAnimation
} from 'react-native';

import GameDetail from './GameDetail';
import TFlatList from "../../../componet/TFlatList";
import {HOME_ICONS} from "../../../../assets/index";

export  default class GameList extends React.Component {

    static propTypes = {
        dataList: PropTypes.array,
    }

    constructor(props) {
        super(props)
        this.state = {
            selectGameSid: 1
        }
    }

    componentWillUpdate() {
        LayoutAnimation.configureNext(G_LayoutAnimationHelp.springSmallDelete);
    }

    render() {
        let {dataList} = this.props;
        let seriesList = [];
        for (let item of dataList) {
            let isAreadySeris = false;
            for (let sItem of seriesList) {

                if (sItem.sid == item.series_id) {
                    sItem.dataList.push(item);
                    isAreadySeris = true;
                    break;
                }
            }
            if (!isAreadySeris) {
                seriesList.push({sid: item.series_id, dataList: [item], name: this.getSerialName(item.series_id)})
            }
        }

        return (
            <View style={[G_Style.appContentView, styles.gameListBox]}>
                <TFlatList dataList={this._handDataList(seriesList)} renderRow={this._rendRowSeries}/>
            </View>
        )
    }

    //每2个为一行 分页处理
    _handDataList = (srcList) => {
        let newList = []
        if (srcList.length > 0) {
            let tempArr = null;
            for (let i = 0; i < srcList.length; i++) {

                if (i % 2 == 0) {
                    tempArr = [];
                    newList.push(tempArr);
                }
                tempArr.push(srcList[i]);
            }
        }
        return newList
    }

     _rendRowGameDetail=(data)=>{
        return  <GameDetail {...this.props} dataList={data}/>
     }

    _rendRowSeries = (itemData) => {
        let subView = null;
        if (this.state.selectGameSid) {
            for (let item of itemData) {
                if (item.sid == this.state.selectGameSid) {
                    subView = <TFlatList dataList={this._handDataList(item.dataList)} renderRow={this._rendRowGameDetail}/>
                }
            }
        }

        return <View>
            <View style={styles.sp}>
                {itemData.map((rowData, index) => {
                    const splitIcon = index == 0 ? styles.itemRowBorder : null;
                    return (
                    <View key={index} >
                        <TouchableOpacity onPress={() => this.onClikSeries(rowData.sid) }>
                        <View style={[styles.itemRow, splitIcon]}>
                            <Image style={styles.thumb} source={HOME_ICONS[rowData.sid]}/>
                            <View>
                                <Text style={this.state.selectGameSid==rowData.sid ? styles.text : styles.textNoOpen}>
                                    {rowData.name + (rowData.dataList.length > 1 ? "系列" : "")}
                                </Text>
                                <Text style={[styles.textDesc,{color:this.state.selectGameSid==rowData.sid ? "red":null}]}>
                                    {'火爆开奖'}
                                </Text>
                            </View>
                        </View>
                        </TouchableOpacity>
                        {
                            rowData.sid == this.state.selectGameSid ?  <View style={[G_Theme.triangle,{alignSelf:"center"}]}/>:null
                        }
                        </View>)
                })}

            </View>
            {subView}
        </View>
    }

    onClikSeries=(sid)=>{
         this.setState({selectGameSid:this.state.selectGameSid == sid ? null:sid })
    }


    getSerialName = (sid) => {
        let result = "";
        switch (sid) {
            case 1:
                result = "时时彩"
                break
            case 2:
                result = "11选5"
                break
            case 3:
                result = "福彩3d"
                break
            case 5:
                result = "快3"
                break;
            case 8:
                result = "快乐10"
                break;
            case 4:
                result = "快乐8"
                break;
            case 7:
                result = "PK10"
                break;
            case 6:
                result = "幸运28"
                break;
            default:
                result = "新游戏"
        }
        return result;
    }

}

const styles = StyleSheet.create({
    gameListBox: {
        backgroundColor: '#fff',
        marginTop: 8,
    },
    sp: {
        flexDirection: 'row',
        width: G_Theme.windowWidth,
        borderBottomWidth: 0.5,
        borderBottomColor: '#e5e5e5',
    },
    itemRow: {
        flexDirection: 'row',
        width: Math.floor(G_Theme.windowWidth / 2),
        paddingLeft: 20,
        paddingRight: 10,
        paddingVertical:10
    },
    itemRowBorder: {
        borderRightWidth: 0.5,
        borderRightColor: '#e5e5e5',
    },
    thumb: {
        width: 40,
        height: 40,
        marginRight: 8,
        borderRadius: 20,
    },
    text: {
        marginTop: 4,
        fontWeight: 'bold',
        color: 'red',
    },
    textDesc: {
        color: '#999',
        fontSize: 12,
        lineHeight: 20
    },
    textNoOpen: {
        color: "#222",
        marginTop: 5,
        fontWeight: 'bold'
    },

})