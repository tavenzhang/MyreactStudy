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
        radius : 4,
        width:50,
        height:30,

    };

    render() {
        const {text,radius,color,row,value,onPress,status,ballStyle,width,height,textStyle,desctext} = this.props;
        const sb  = status > 0 ? styles.ballSelected : null;
        const sbt = status > 0 ? styles.ballSelectedText : null;
        //const sbtDesc = status > 0 ? styles.ballSelectedTextDesc : null;
        const ballChangeStatus = status > 0 ? -1 : 1;
        return (
            <TouchableHighlight
                style={[{borderRadius:radius,width:width,height:height},styles.ball,sb,ballStyle]}
                onPress={()=>onPress(value,row,ballChangeStatus)}
                underlayColor={G_Theme.third}
            >
                <View style={styles.ballContent}>
                    <Text style={[styles.ballText,sbt,textStyle]}>{text}</Text>
                    <Text style={[styles.ballTextdesc,sbt,textStyle]}>{desctext}</Text>
                </View>

            </TouchableHighlight>
        )
    }
};

const styles = StyleSheet.create({
    ballText: {
        color: G_Theme.primary,
        fontWeight: 'bold',
        fontSize: 16
    },
    ballTextdesc: {
        color: G_Theme.black,
        fontSize: 10,
        alignItems:"center",

    },
    ballContent: {
        paddingTop:5,
        paddingBottom:5,
        justifyContent:"center",
        alignItems:"center",
    },
    ball: {
        backgroundColor:'#f1f1f1',
        justifyContent:"center",
        alignItems:"center",
        //marginLeft: 5,
        //marginRight: 5,
        //marginBottom: 5,
        //shadowOffset:{
        //    width: 0,
        //    height: 3,
        //},
        //shadowColor: '#c5c5c5',
        //shadowOpacity: 1,
    },

    ballSelected: {
        backgroundColor:G_Theme.primary,
    },

    ballSelectedTextDesc: {
        color: G_Theme.second
    },

    ballSelectedText: {
        color: '#fff',
    }
});