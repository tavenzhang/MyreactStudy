
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
        keyboardType:PropTypes.string,
        secureTextEntry:PropTypes.bool,
        autoFocus:PropTypes.bool,
        onfocus:PropTypes.func,
        maxLength:PropTypes.number
    }

    render() {
        const {placeholder, maxLength,onfocus,style, autoFocus, viewStyle,secureTextEntry,onChangeText,multiline,keyboardType,value} = this.props;
        return (
            <View style={viewStyle}>
                <TextInput
                    onfocus={onfocus}
                    style={[styles.textStyle,style]}
                    onChangeText={onChangeText}
                    value={value}
                    maxLength={maxLength ? maxLength:200}
                    placeholder={placeholder}
                    multiline={multiline ? multiline : false}
                    autoFocus={autoFocus ? autoFocus :false}
                    autoCapitalize={"none"}
                    keyboardType={keyboardType ? keyboardType :"default"}
                    underlineColorAndroid={'transparent'}
                    secureTextEntry={secureTextEntry ? secureTextEntry:false}
                />
            </View>)
    }
}

const styles = StyleSheet.create({
    textStyle: {
        width: 150,
        fontSize: 14,
        height:G_Theme.textInpuntH,
    },

})

