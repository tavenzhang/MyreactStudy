import React ,{PropTypes} from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

export  default  class MoneyView extends React.Component {

    static  propTypes={
        data:PropTypes.any
    }

    render() {
         let {data}=this.props
        return(<View>
                <View style={{flexDirection: "row", justifyContent: "center", margin: 10}}>
                    <View style={[styles.circleView, {borderColor: "green"}]}>
                        <Text>当前在线</Text>
                        <Text style={styles.textPeople}>111</Text>
                    </View>
                    <View style={[styles.circleView, {borderColor: "red"}]}>
                        <Text>代理</Text>
                        <Text style={styles.textPeople}>111</Text>
                    </View>
                    <View style={[styles.circleView, {borderColor: "blue"}]}>
                        <Text>玩家</Text>
                        <Text style={styles.textPeople}>11111111</Text>
                    </View>
                </View>
                <View style={{backgroundColor: "#ddd", justifyContent: "center", margin: 10, padding: 10}}>
                    <View style={styles.infoMoney}>
                        <Text>团队总投注额：<Text style={styles.textPeople}>80</Text> 元</Text>
                        <Text>可用余额：<Text style={styles.textPeople}>80</Text> 元</Text>
                    </View>
                    <View style={styles.infoMoney}>
                        <Text>团队净盈亏：<Text style={styles.textPeople}>8</Text> 元</Text>
                        <Text>本月收入：<Text style={styles.textPeople}>808</Text> 元</Text>
                    </View>
                    <View style={styles.infoMoney}>
                        <Text>返点收入：<Text style={styles.textPeople}>8088</Text>元</Text>
                        <Text>预计分红：<Text style={styles.textPeople}>804</Text> 元</Text>
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
});
