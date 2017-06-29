import React, {PropTypes}from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    TouchableWithoutFeedback,
} from 'react-native';
import TFlatList from "../../../../componet/TFlatList";

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
        return (<View style={rootStyle}>
            <View style={{flex: 2}}>
                <TFlatList
                    dataList={menuDataList}
                    dataSource={menuDataList}
                    renderRow={this._renderRow}
                    style={{backgroundColor: "white"}}
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
            <View
                style={{flexDirection: "row", margin: 5, borderBottomWidth: 1}}>
                <View style={G_Style.appContentCenterView}>
                    <Text>{rowData.name}</Text>
                </View>
                <View style={{
                    flex: 5,
                    justifyContent: "flex-start",
                    alignItems: 'flex-start',
                    flexDirection: "row",
                    flexWrap: "wrap"
                }}>
                    {rowData.children.map((item, index) => {
                        let selectItemStyle = null
                        if (selectItem&&selectItem.id == item.id) {
                            selectItemStyle = {borderWidth: 1, backgroundColor: "yellow"};
                        }
                        return (<TouchableHighlight key={index * 999} onPress={() => this.props.clickMenuItem({...item})}
                                                    underlayColor='rgba(10,10,10,0.2)'>
                            <View style={[{
                                padding: 5,
                                marginHorizontal: 5,
                                marginBottom: 1
                            }, selectItemStyle]}><Text>{item.name}</Text>
                            </View>
                        </TouchableHighlight>)
                    })
                    }
                </View>
            </View>
        );
    }
}
