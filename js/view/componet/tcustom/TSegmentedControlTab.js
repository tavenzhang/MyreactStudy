import React,{PropTypes}from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import SegmentedControlTab from "react-native-segmented-control-tab";
import { SegmentedControls } from 'react-native-radio-buttons'

export default class MySegmentedControlTab extends React.Component {
    static propTypes={
        valueList:PropTypes.array,
        selectedTabIndex:PropTypes.any,
        onTabChange:PropTypes.func,
        tabsContainerStyle:PropTypes.any,
        tabStyle:PropTypes.any,
        activeTabStyle:PropTypes.any
    }

    constructor(props){
        super(props);
        this.state={
            selectedTabIndex:props.defaultIndex ? props.defaultIndex:0
        }
    }
    render() {
        let {valueList,onTabChange,tabsContainerStyle,tabStyle,activeTabStyle,selectedTabIndex}=this.props
        return (
            <View >
                <SegmentedControls
                    //backTint={'yellow'}
                    selectedTint= {'white'}
                    tint= {'#a52a2a'}
                    options={ valueList }
                    onSelection={onTabChange}
                    selectedOption={valueList[selectedTabIndex]}
                    containerStyle={[styles.defaltContainStyle,tabsContainerStyle]}
                    optionStyle={{fontSize:14, fontWeight:"bold"}}
                    optionContainerStyle={[{flex: 1},tabStyle]}
                />

                {/*<SegmentedControlTab*/}
                    {/*values={valueList}*/}
                    {/*onTabPress={onTabChange}*/}
                    {/*tabsContainerStyle={[styles.defaltContainStyle,tabsContainerStyle]}*/}
                    {/*tabStyle={[styles.defaultTabStyle,tabStyle]}*/}
                    {/*selectedIndex={selectedTabIndex}*/}
                    {/*activeTabStyle={[styles.defaultActiveTabStyle,activeTabStyle]}*/}
                    {/*borderRadius={10}*/}
                {/*/>*/}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    defaltContainStyle:{
        marginLeft: 40,
        marginRight: 40,
        alignSelf: "center",
        margin: 5
    },
    defaultTabStyle:{
        borderColor: "#a52a2a",
        borderWidth: G_PLATFORM_IOS ? StyleSheet.hairlineWidth:1,
        borderStyle: G_PLATFORM_IOS ? "dashed":"solid",
    },
    defaultActiveTabStyle:{
        backgroundColor: "#a52a2a",
        borderWidth: 2
    }

})

