import React,{PropTypes} from 'react';
import {
    View
    , StyleSheet,
    TouchableHighlight,
    TouchableOpacity,
   Image,
    Text
} from 'react-native'
import TFlatList from "../../componet/TFlatList";

export default class HomeListView extends React.PureComponent {
   static  propTypes={
        dataList:PropTypes.any,
       renderHeader:PropTypes.func
    }

    render() {
        let {dataList,renderHeader}=this.props
        return (
            <View style={G_Style.appContentView}>
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
                <TouchableOpacity onPress={() => this.itemClick(item)} underlayColor='rgba(10,10,10,0.2)'>
                    <View style={{marginHorizontal:40, marginVertical:10}}>
                        <Image source={{uri:item.img}} style={{height:300, borderRadius: 20,width:G_Theme.windowWidth-100}}/>
                    </View>
                </TouchableOpacity>
                <Text style={{width:200}}>{item.dec}</Text>
            </View>
        );
    }

    itemClick = (data) => {
      TLog("itemClick-----");
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
