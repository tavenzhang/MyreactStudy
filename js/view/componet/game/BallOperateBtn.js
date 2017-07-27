/**
 * Created by soga on 2017/4/20.
 */
import React, {PropTypes} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';


export default class BallOperateBtn extends React.Component {

    static propTypes = {
        text : PropTypes.any.isRequired
    };

    static defaultProps = {
        text : "",
        radius : 20
    };

    render() {
        const {text,onPress} = this.props;
        return (
            <TouchableOpacity
                style={[styles.btn]}
                onPress={()=>onPress()}
                >
                <Text style={[styles.btnText]}>{text}</Text>
            </TouchableOpacity>
        )
    }
};

const styles = StyleSheet.create({
    btnText: {
        color: '#555',
        fontWeight: 'bold',
        fontSize: 14
    },
    btn: {
        justifyContent:"center",
        alignItems:"center",
        //backgroundColor: '#f00',
        width: 30,
        height: 30,
    },
});