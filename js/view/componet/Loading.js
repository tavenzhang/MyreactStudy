import React, {PropTypes}from 'react';
import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
} from 'react-native';
import MyModalView from "./tcustom/modal/TModalView";


export default class Loading extends React.Component {
    static  propTypes = {
        visible: PropTypes.bool,
        isModal: PropTypes.bool
    }

    render() {
        let {visible, isModal} = this.props

        return ( !isModal ? (visible ?
                <View style={styles.loading}>
                    <ActivityIndicator color="white"/>
                    <Text style={styles.loadingTitle}>loading……</Text>
                </View>:null
            ):(<MyModalView visible={visible} hideModal={this.onFindConfirm} >
                <View style={{flex: 1, justifyContent: "center", backgroundColor: "rgba(50, 50, 50,0.2)"}}>
                    <View style={styles.loading}>
                        <ActivityIndicator color="white"/>
                        <Text style={styles.loadingTitle}>loading……</Text>
                    </View>
                </View>
            </MyModalView>)
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
        top: (G_Theme.windowHeight - 80) / 2,
        left: (G_Theme.windowWidth - 100) / 2,
    },

    loadingTitle: {
        marginTop: 10,
        fontSize: 14,
        color: 'white'
    }
})