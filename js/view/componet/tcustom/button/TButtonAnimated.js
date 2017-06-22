import React, {Component,PropTypes} from 'react';
import {StyleSheet, Text, View, TouchableWithoutFeedback, Animated} from 'react-native';

export default class TButtonAnimated extends Component {
   static  propTypes={
       btnName:PropTypes.string
   }

    componentWillMount() {
        this.animatedValue = new Animated.Value(1);
        // const marginLeft = this.animatedValue.interpolate({
        //     inputRange: [0, 1],
        //     outputRange: [0, 300]
        // })
    }

    handlePressIn=()=> {
        Animated.spring(this.animatedValue, {
            toValue: .5
        }).start()
    }

    handlePressOut=()=> {
        Animated.spring(this.animatedValue, {
            toValue: 1,
            friction: 3,
            tension: 40
        }).start()
    }

    render() {
        let {btnName} = this.props
        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback
                    onPressIn={this.handlePressIn}
                    onPressOut={this.handlePressOut}
                >
                    <Animated.View style={[styles.button, { transform: [{scale: this.animatedValue}]}]}>
                        <Text style={styles.text}>{btnName}</Text>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: "#333",
        width: 100,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: "#FFF"
    }
});