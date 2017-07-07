import React, {PropTypes}from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    TouchableWithoutFeedback,
} from 'react-native';
import TFlatList from "../../../../componet/TFlatList";
//游戏头部玩法列表
export default class HeadMenuListView extends React.Component {

    static propTypes = {
        rootStyle: View.propTypes.style,
        onHeadPressed: PropTypes.func,
        menuDataList: PropTypes.array,
        clickMenuItem: PropTypes.func,
        selectItem: PropTypes.any
    }

    constructor(props) {
        super(props);
    }

    render() {
        let {menuDataList, rootStyle} = this.props
        return (<View style={[rootStyle]}>
            <View style={{flex: 2}}>
                <TFlatList
                    dataList={menuDataList}
                    dataSource={menuDataList}
                    renderRow={this._renderRow}
                    style={{backgroundColor: "#ccc"}}
                />
            </View>
            <TouchableWithoutFeedback onPress={this.props.onHeadPressed}><View style={{
                flex: 1,
                backgroundColor: G_Theme.halfGrayAlpha
            }}/></TouchableWithoutFeedback>
        </View>)
    }

    _renderRow = (rowData) => {
        let {selectItem} =this.props
        return (
            <View style={styles.wayBar}>
                <View style={G_Style.appContentCenterView}>
                    <Text>{rowData.name}</Text>
                </View>
                <View style={styles.methodBar}>
                    {rowData.children.map((item, index) => {
                        let selectItemStyle = false
                        if (selectItem&&selectItem.id == item.id) {
                            selectItemStyle = true;
                        }
                        return (<TouchableHighlight key={index * 999} onPress={() => this.props.clickMenuItem({...item})}
                                                    underlayColor='rgba(10,10,10,0.2)'>
                            <View style={[styles.Item, selectItemStyle?styles.selectedItem:null]}><Text style={{textAlign:'center',color:selectItemStyle?'#fff':null,}}>{item.name}</Text>
                            </View>
                        </TouchableHighlight>)
                    })
                    }
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    wayBar:{
        flexDirection: "row", borderBottomWidth: 1,padding:10,
        borderColor:G_Theme.gray,
        // backgroundColor:'#ebebeb',


    },methodBar:{
        flex: 5,
        justifyContent: "flex-start",
        alignItems: 'flex-start',
        flexDirection: "row",
        flexWrap: "wrap"
    },

    selectedItem: {
        borderColor:G_Theme.primary,
        backgroundColor:G_Theme.primary,

    },
    Item:{
        backgroundColor:'#fff',
        width:120,
        padding: 5,
        marginHorizontal: 5,
        marginBottom: 2,
        borderWidth:1,
        borderColor:G_Theme.gray,
        borderRadius:10,
    }
})