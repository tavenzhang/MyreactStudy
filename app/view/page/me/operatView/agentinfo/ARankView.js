
import React ,{PropTypes} from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import BaseView from "../../../../componet/BaseView";
import MySegmentedControlTab from "../../../../componet/MySegmentedControlTab";

export  default  class ARankView extends  BaseView{

    static  propTypes={
        data:PropTypes.any
    }

    constructor(props)
    {
        super(props);
        this.state = {
            selectedTabIndex: 0,
        };
    }
    getNavigationBarProps () {
        return {title:"本月排名"}
    }
    renderBody() {

        return(<View>
                <MySegmentedControlTab selectedTabIndex={this.state.selectedTabIndex} valueList={['投注额', '开户数',"净盈亏"]} onTabChange={this.onTabChange}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    circleView: {
        width: 86,
        borderWidth: 5,
        height: 86,
        borderRadius: 86,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 10,
        backgroundColor: "transparent"
    },
    textPeople: {
        color: 'red',
        fontWeight: 'bold',
        marginTop: 5
    },
    infoMoney: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        marginVertical: 5
    },
    square: {
        width: 80,
        height: 80,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        margin: 10
    },
    group:{
        width: 86,
        height: 86,
        borderRadius: 86,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 10,
        backgroundColor: "gray"
    }
});

