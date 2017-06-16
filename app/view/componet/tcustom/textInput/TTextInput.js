
import React, {PropTypes} from 'react';
import {
    View,
    StyleSheet,
    TextInput
} from 'react-native';

export class TTextInput extends React.Component {

    static propTypes = {
        value: PropTypes.any,
        onChangeText: PropTypes.func,
        placeholder: PropTypes.any,
        style: PropTypes.any,
        viewStyle:PropTypes.any,
        multiline:PropTypes.bool,
        keyboardType:PropTypes.string
    }

    render() {
        const {placeholder, style, viewStyle ,onChangeText,multiline,keyboardType,value} = this.props;
        return (
            <View style={viewStyle}>
                <TextInput
                    style={[styles.textStyle,style]}
                    onChangeText={onChangeText}
                    value={value}
                    placeholder={placeholder}
                    multiline={multiline ? multiline : false}
                    autoCapitalize={"none"}
                    keyboardType={keyboardType ? keyboardType :"default"}
                    underlineColorAndroid={'transparent'}
                />
            </View>)
    }
}

const styles = StyleSheet.create({
    textStyle: {
        width: 150,
        fontSize: 14,
        height:G_Theme.textInpuntH
    },

    loadingTitle: {
        marginTop: 10,
        fontSize: 14,
        color: 'white'
    }
})

