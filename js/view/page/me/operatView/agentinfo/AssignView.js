/**
 * Created by thomas on 2017/6/3.
 */
import React, {PropTypes} from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

export  default  class AssignView extends React.Component {

    static  propTypes = {
        data: PropTypes.any
    }

    render() {
        let {data} = this.props;
        let dataItemList = [];
        if (data && data.aOverLimits) {
            for (let key in data.aOverLimits) {
                dataItemList.push(data.aOverLimits[key])
            }
        }
        return (data ? <View>
                <Text>可用高点余额</Text>
                <View style={{alignItems:"center"}}>
                    <View style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        margin: 5,
                        alignItems: "center",
                    }}>
                        {dataItemList.map((item, index) => {

                            return (  <View style={[styles.group]} key={index + "uu"}>
                                <Text
                                    style={{color: "white", fontWeight: "bold", fontSize: 16}}>{item.prize_group}</Text>
                                <Text style={{
                                    marginTop: 3,
                                    color: "green",
                                    fontSize: 14
                                }}>{`${item.used_num}/${item.limit_num}`}</Text>
                            </View>)
                        })}
                    </View>
                </View>
            </View> : null
        );
    }
}


const styles = StyleSheet.create({
    group: {
        width: 86,
        height: 86,
        borderRadius: 86,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 10,
        backgroundColor: G_Theme.bgPbg,
        marginVertical:2
    }
});
