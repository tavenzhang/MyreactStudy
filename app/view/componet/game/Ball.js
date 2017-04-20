/**
 * Created by soga on 2017/4/17.
 */
import React, {PropTypes} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight
} from 'react-native';


export  default  class Ball extends React.Component {

    static propTypes = {
        text : PropTypes.any.isRequired
    };

    static defaultProps = {
        text : "",
        radius : 20
    };

    render() {
        const {text,radius,color,row,value,onPress,status} = this.props;
        const sb  = status > 0 ? styles.ballSelected : null;
        const sbt = status > 0 ? styles.ballSelectedText : null;
        const ballChangeStatus = status > 0 ? -1 : 1;
        return (
            <TouchableHighlight
                style={[{borderRadius:radius,width:radius*2,height:radius*2},styles.ball,sb]}
                onPress={()=>onPress(value,row,ballChangeStatus)}
                underlayColor={global.GlobelTheme.primary}
                >
                <Text style={[styles.ballText,sbt]}>{text}</Text>
            </TouchableHighlight>
        )
    }
};

const styles = StyleSheet.create({
    ballText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16
    },
    ball: {
        backgroundColor:global.GlobelTheme.gray,
        justifyContent:"center",
        alignItems:"center",
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 10,
    },

    ballSelected: {
        backgroundColor:global.GlobelTheme.primary,
    },

    ballSelectedText: {
        color: '#fff',
    }
});