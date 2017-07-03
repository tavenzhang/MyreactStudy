import React,{PropTypes}from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
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
                    backTint={"rgb(200,200,200)"}
                    selectedTint= {'black'}
                    tint= {'white'}
                    options={ valueList }
                    onSelection={onTabChange}
                    selectedOption={valueList[selectedTabIndex]}
                    containerStyle={[styles.defaltContainStyle,tabsContainerStyle]}
                    optionStyle={{fontSize:14, fontWeight:"bold", color:"red"}}
                    optionContainerStyle={[{flex: 1},tabStyle]}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    defaltContainStyle:{
        marginLeft: 40,
        marginRight: 40,
        alignSelf: "center",
        margin: 5,
        borderColor: "gray",
        borderWidth: G_PLATFORM_IOS ? 1:1,
    },
    defaultActiveTabStyle:{
        backgroundColor: "#a52a2a",
        borderWidth: 2
    }

})

