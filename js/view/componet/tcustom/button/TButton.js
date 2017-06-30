/**
 * Created by soga on 2017/4/19.
 */
import React, {PropTypes} from 'react';
import {
    Text,
    StyleSheet,
    View
} from 'react-native';

import Button from "react-native-button";

export class TButtonProxy extends React.PureComponent {

    static propTypes = {
        btnName: PropTypes.any,
        onPress: PropTypes.func,
        disable: PropTypes.bool,
        containerStyle: PropTypes.any,
        textStyle: PropTypes.any,
        disabledStyle: PropTypes.any,
    }

    render() {
        const {containerStyle, onPress, btnName, textStyle, disabledStyle, disable} = this.props;
        return (
            <Button containerStyle={[{
                backgroundColor: disable ? "gray" : G_Theme.bgPbg, borderRadius: 10,
                paddingVertical: 5, paddingHorizontal: 5,
            }, containerStyle]} style={[{fontSize: 14, color: "white"}, textStyle]} disabled={disable}
                    styleDisabled={[{backgroundColor: "gray", color: "white"}, disabledStyle]} onPress={onPress}>
                {btnName}
            </Button>)
    }
}


export class TButton extends React.Component {

    static propTypes = {
        visible: PropTypes.bool,
        btnName: PropTypes.string,
        onPress: PropTypes.func,
        disable: PropTypes.bool,
        containerStyle: PropTypes.any,
        viewStyle: PropTypes.any,
        textStyle: PropTypes.any,
        disabledStyle: PropTypes.any,
        errMsg: PropTypes.any
    }

    static defaultProps = {
        disabledStyle: {backgroundColor: "gray", color: "white"},
        textStyle: {fontSize: 14, color: "white", textAlign: "center"},
        containerStyle: {
            backgroundColor: "#d7213c",
            borderRadius: 8,
            paddingVertical: 8,
            paddingHorizontal: 5,
            alignItems: "center",

        },
        visible: true
    }

    render() {
        const {visible, containerStyle, viewStyle, onPress, errMsg, btnName, textStyle, disabledStyle, disable} = this.props;
        let myDisable = disable;
        if (errMsg && errMsg != "") {
            myDisable = true;
        }
        TLog("containerStyle----" + btnName, containerStyle)
        return (visible ? <View style={[viewStyle]}>
                {errMsg ?
                    <Text style={{color: "red", alignSelf: "center", marginBottom: 5}}>{`(${errMsg})`}</Text> : null}
                <Button containerStyle={[{
                    backgroundColor: myDisable ? "gray" : "#d7213c", borderRadius: 10,
                    paddingVertical: 5, paddingHorizontal: 5,
                }, containerStyle]}
                        disabled={myDisable}
                        style={textStyle}
                        styleDisabled={[disabledStyle]} onPress={onPress}>
                    {btnName}
                </Button>
            </View> : null)
    }
}


export class TButtonView extends React.Component {
    static propTypes = {
        visible: PropTypes.bool,
        btnName: PropTypes.string,
        onPress: PropTypes.func,
        disable: PropTypes.bool,
        containerStyle: PropTypes.any,
        viewStyle: PropTypes.any,
        textStyle: PropTypes.any,
        disabledStyle: PropTypes.any,
    }

    static defaultProps = {
        disabledStyle: {backgroundColor: "gray", color: "white"},
        textStyle: {fontSize: 14, color: "white", textAlign: "center"},
        containerStyle: {
            backgroundColor: "#d7213c",
            borderRadius: 8,
            paddingVertical: 8,
            paddingHorizontal: 5,
            alignItems: "center"
        },
        visible: true
    }

    render() {
        const {visible, containerStyle, onPress, btnName, textStyle, disabledStyle, disable} = this.props;
        TLog("containerStyle----" + btnName, containerStyle)
        return (visible ?
            <Button containerStyle={[containerStyle,
                {backgroundColor: disable ? "gray" : null}]}
                    disabled={disable}
                    style={textStyle}
                    styleDisabled={[disabledStyle]} onPress={onPress}>
                {btnName!="" ? btnName:this.props.children}
            </Button> : null)

    }
}