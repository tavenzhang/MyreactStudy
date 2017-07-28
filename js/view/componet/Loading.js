import React, {PropTypes}from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native';
import TModalView from "./tcustom/modal/TModalView";

import {LOADING} from "../../assets/index";

export default class Loading extends React.Component {
    static  propTypes = {
        visible: PropTypes.bool,
        isModal: PropTypes.bool
    }

    render() {
        let {visible, isModal} = this.props
        return ( !isModal ? (visible ?
                <View style={styles.loading}>
                    <Image
                        style={styles.loadingIcon}
                        source={LOADING}
                        />
                </View>:null
            ):(<TModalView visible={visible} hideModal={this.onCancelHideView} >
                <View style={{flex: 1, justifyContent: "center", backgroundColor: "rgba(50, 50, 50,0.5)"}}>
                    <View style={styles.loading}>
                        <Image
                            style={styles.loadingIcon}
                            source={LOADING}
                            />
                    </View>
                </View>
            </TModalView>)
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
        top: (G_Theme.windowHeight - 80) / 2,
        left: (G_Theme.windowWidth - 100) / 2,
    },
    loadingTitle: {
        marginTop: 10,
        fontSize: 14,
        color: 'white'
    }
})