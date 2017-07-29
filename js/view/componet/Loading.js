import React, {PropTypes}from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native';

import {LOADING} from "../../assets/index";

export default class Loading extends React.PureComponent {
    static  propTypes = {
        visible: PropTypes.bool,
        isModal: PropTypes.bool
    }

    render() {
        let {visible} = this.props
        return (
                <View style={[styles.loading,{opacity: visible ? 1:0}]}>
                    <Image style={{ resizeMode: 'contain',
                        width: G_Theme.windowWidth * 0.25,
                        height: G_Theme.windowWidth * 0.25}} source={LOADING}/>
                </View>
            )
    }
}

const styles = StyleSheet.create({
    loadingIcon: {
        resizeMode: 'contain',
        width: G_Theme.windowWidth * 0.25,
        height: G_Theme.windowWidth * 0.25,
    },
    loading: {
        backgroundColor: '#fff',
        width: G_Theme.windowWidth * 0.27,
        height: G_Theme.windowWidth * 0.27,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        zIndex:99,
        top: (G_Theme.windowHeight - 80) / 2,
        left: (G_Theme.windowWidth - 100) / 2,
    },
    loadingTitle: {
        marginTop: 10,
        fontSize: 14,
        color: 'white'
    }
})