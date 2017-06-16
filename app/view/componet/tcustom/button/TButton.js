/**
 * Created by soga on 2017/4/19.
 */
import React, {PropTypes} from 'react';
import {
    Text,
    StyleSheet,
} from 'react-native';

import AIcon from 'react-native-vector-icons/FontAwesome';
import Button from "react-native-button";

export class TButtonProxy extends React.PureComponent {

    static propTypes={
        btnName:PropTypes.any,
        onPress:PropTypes.func,
        disable:PropTypes.bool,
        containerStyle:PropTypes.any,
        textStyle:PropTypes.any,
        disabledStyle:PropTypes.any,
    }

    render() {
        const {containerStyle,onPress, btnName,textStyle,disabledStyle,disable} = this.props;
        return (
            <Button containerStyle={[{
                backgroundColor: disable ? "gray":G_Theme.bgPbg, borderRadius: 10,
                paddingVertical: 5,paddingHorizontal: 5,
            },containerStyle]}  style={[{fontSize: 14, color: "white"},textStyle]} disabled={disable}  styleDisabled={[{backgroundColor:"gray", color:"white"},disabledStyle]} onPress={onPress}>
                {btnName}
            </Button>)
    }
}


export class TButton extends React.Component {

    static propTypes={
        btnName:PropTypes.string,
        onPress:PropTypes.func,
        disable:PropTypes.bool,
        containerStyle:PropTypes.any,
        textStyle:PropTypes.any,
        disabledStyle:PropTypes.any,
    }

    render() {
        const {containerStyle,onPress, btnName,textStyle,disabledStyle,disable} = this.props;
        return (
            <Button containerStyle={[{
                backgroundColor: disable ? "gray":`#d7213c`, borderRadius: 5,
                paddingVertical: 5,paddingHorizontal: 5, alignItems:"center"
            },containerStyle]}  disabled={disable}  style={[{fontSize: 14, color: "white", textAlign:"center"},textStyle]} styleDisabled={[{backgroundColor:"gray", color:"white"},disabledStyle]} onPress={onPress}>
                {btnName}
            </Button>)
    }
}
