/**
 * Created by thomas on 2017/6/3.
 */
import React ,{PropTypes} from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import Button from "react-native-button";


export  default  class TeamView extends  React.Component {

    static  propTypes={
        data:PropTypes.any
    }

    render() {

        return(<View>
                <View style={{flexDirection: "row", margin: 10}}>
                    <Text>我的团队</Text>
                    <Button style={{marginHorizontal: 5}}>今日</Button>
                    <Button style={{marginHorizontal: 5}}>本周</Button>
                    <Button style={{marginHorizontal: 5}}>本月</Button>
                </View>
                <View style={{flexDirection: "row", margin: 10,alignItems: "center",justifyContent: "center"}}>
                    <View style={{alignItems: "center", justifyContent: "center"}}>
                        <Text>团队投注用户</Text>
                        <View style={styles.square}>
                            <Text>2264</Text>
                            <Button style={{marginTop: 5}}>盈亏报表</Button>
                        </View>
                    </View>
                    <View style={{alignItems: "center"}}>
                        <Text>团队新增用户</Text>
                        <View style={styles.square}>
                            <Text>2264</Text>
                            <Button style={{marginTop: 5}}>团队管理</Button>
                        </View>
                    </View>
                    <View style={{alignItems: "center"}}>
                        <Text>新增直属玩家</Text>
                        <View style={styles.square}>
                            <Text>2264</Text>
                            <Button style={{marginTop: 5}}>新赠用户</Button>
                        </View>
                    </View>
                </View>
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

