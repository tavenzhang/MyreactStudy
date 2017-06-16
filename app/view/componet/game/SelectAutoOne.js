/**
 * Created by soga on 2017/4/21.
 */

import React, {PropTypes} from 'react';
import {
    View,
    Text,
    Alert,
    StyleSheet,
    TouchableOpacity
} from 'react-native';


export default class SelectAutoOne extends React.Component {

    constructor(props) {
        super(props);

    }


    render() {

        const me = this;
        const {randomSelct} = this.props;

        return (
            <TouchableOpacity onPress={() => randomSelct()}>

                <View  style={styles.multipleBtnGrounps}>

                    <View style={styles.multipleTextBox}>
                        <Text>随机</Text>
                    </View>

                </View>
            </TouchableOpacity>
        )
    }
};

const borderRadius = 6;

const styles = StyleSheet.create({
    multipleBtnGrounps: {
        flexDirection: 'row',
    },

    multipleTextBox: {
        alignItems: "center",
        //width: 100,
        height: 30,
        paddingLeft: 5,
        paddingRight: 5,
        borderWidth: 1,
        borderColor: G_Theme.second,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

});