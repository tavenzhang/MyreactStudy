/**
 * Created by soga on 2017/4/19.
 */
import React, {PropTypes} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import AIcon from 'react-native-vector-icons/FontAwesome';

export  default  class Button extends React.Component {

    static propTypes = {
        btnName : PropTypes.any.isRequired,
        onPress : PropTypes.func.isRequired,
        leftIcon : PropTypes.string,
    };

    static defaultProps = {
        btnName : "",
    };

    render() {
        const {leftIcon,onPress,btnName} = this.props;

        const leftIconDom = leftIcon ? <AIcon name={leftIcon} style={styles.iconLeft} /> : null;

        return (
            <TouchableOpacity onPress={() => onPress()} style={[styles.btn]}>
                {leftIconDom}
                <Text style={styles.btnText}>{btnName}</Text>
            </TouchableOpacity>
        )
    }
};

const styles = StyleSheet.create({
    btn: {
        backgroundColor: global.G_Theme.primary,
        justifyContent:"center",
        flexDirection : 'row',
        alignItems:"center",
        padding:10,
        paddingLeft:20,
        paddingRight:20,
        margin:5,
        position:'relative'
    },

    iconLeft: {
        color: '#fff',
        fontSize: 14,
        marginRight: 5
    },

    btnDesc: {
        position:'absolute',
        top: -3,
        right: -3,
        backgroundColor: G_Theme.second,
        width: 18,
        height: 18,
        borderRadius: 9,
        justifyContent:"center",
        alignItems:"center",
    },

    btnDescText: {
        color: '#fff',
        fontSize: 10
    },

    btnDisable: {
        backgroundColor: global.G_Theme.gray,
    },

    btnText: {
        color: '#fff',
        fontSize: 14
    }
});