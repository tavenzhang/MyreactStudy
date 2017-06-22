import React from 'react';
import {
    Keyboard,
    TouchableWithoutFeedback
} from 'react-native';


export default class AutoHideKeyBoardView extends React.PureComponent {

    render() {
        return (
            <TouchableWithoutFeedback style={{flex:1}} onPress={Keyboard.dismiss}>
                {this.props.children}
            </TouchableWithoutFeedback>
        )
    }
}


