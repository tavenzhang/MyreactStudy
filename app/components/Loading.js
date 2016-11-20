import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
} from 'react-native';

import { WINDOW } from '../config';

export default class Loading extends React.Component {
    render() {
        return (
            <View style={styles.loading}>
                <ActivityIndicator color="white"/>
                <Text style={styles.loadingTitle}>加载中……</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    loading: {
        backgroundColor: 'gray',
        height: 80,
        width: 100,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: (WINDOW.height-80)/2,
        left: (WINDOW.width-100)/2,
    },

    loadingTitle: {
        marginTop: 10,
        fontSize: 14,
        color: 'white'
    }
})