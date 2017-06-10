/**
 * Created by soga on 2017/4/17.
 */
import React, {PropTypes} from 'react';
import {
    Text,
    StyleSheet,
    TouchableHighlight,
    View
} from 'react-native';


export  default  class BallSquare extends React.Component {

    static propTypes = {
        text : PropTypes.any.isRequired
    };

    static defaultProps = {
        text : "",
        radius : 5,
        width:50,
        height:30,

    };

    render() {
        const {text,radius,color,row,value,onPress,status,ballStyle,width,height,textStyle,desctext} = this.props;
        const sb  = status > 0 ? styles.ballSelected : null;
        const sbt = status > 0 ? styles.ballSelectedText : null;
        const ballChangeStatus = status > 0 ? -1 : 1;
        return (
            <TouchableHighlight
                style={[{borderRadius:radius,width:width,height:height},styles.ball,sb,ballStyle]}
                onPress={()=>onPress(value,row,ballChangeStatus)}
                underlayColor={G_Theme.primary}
            >
                <View>
                <Text style={[styles.ballText,sbt,textStyle]}>{text}</Text>
                <Text style={[styles.ballTextdesc,sbt,textStyle]}>{desctext}</Text>
                </View>

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
    ballTextdesc: {
        color: '#757575',
        fontSize: 16,
        alignItems:"center",

    },
    ball: {
        backgroundColor:G_Theme.gray,
        justifyContent:"center",
        alignItems:"center",
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 10,
    },

    ballSelected: {
        backgroundColor:G_Theme.primary,
    },

    ballSelectedText: {
        color: '#fff',
    }
});