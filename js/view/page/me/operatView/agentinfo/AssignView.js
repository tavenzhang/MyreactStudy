
import React, {PropTypes} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
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

                            return (  <TouchableOpacity onPress={()=>this._onPressAssingn(item)} key={index + "uu"}>
                                <View style={[styles.group]}>
                                <Text
                                    style={{color: "white", fontWeight: "bold", fontSize: 16}}>{item.prize_group}</Text>
                                <Text style={{
                                    marginTop: 3,
                                    color: "green",
                                    fontSize: 14
                                }}>{`${item.used_num}/${item.limit_num}`}</Text>
                            </View></TouchableOpacity>)
                        })}
                    </View>
                </View>
            </View> : null
        );
    }

    _onPressAssingn=(data)=>{
        G_NavUtil.push(G_RoutConfig.AssignDetilView,{
            userName: "",
            prize_group:data.prize_group
        })
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
