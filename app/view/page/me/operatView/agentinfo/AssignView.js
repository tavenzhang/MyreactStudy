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
        let {data} = this.props
        return (<View>
                <Text>可用高点余额</Text>
                <View style={{flexDirection: "row", margin: 10, alignItems: "center", justifyContent: "center"}}>
                    <View style={[styles.group]}>
                        <Text>1955</Text>
                    </View>
                    <View style={[styles.group]}>
                        <Text>1955</Text>
                    </View>
                    <View style={[styles.group]}>
                        <Text>1955</Text>
                    </View>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
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
