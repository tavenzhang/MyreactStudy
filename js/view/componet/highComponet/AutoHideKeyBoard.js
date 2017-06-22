import React from 'react';
import {
    View,
    Keyboard,
    TouchableWithoutFeedback
} from 'react-native';


export default AutoHideKeyBoard=(WrappedComponent) => class AutoHideKeyboard extends React.Component {
    render() {
        return (
            <TouchableWithoutFeedback style={{flex:1}} onPress={Keyboard.dismiss}>
                <View style={{flex:1}}>
                    <WrappedComponent {...this.props}/>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}


