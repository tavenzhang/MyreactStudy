/**
 * Created by soga on 16/10/25.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    InteractionManager,
} from 'react-native';

import {Header} from '../components';

import {appAct,fetchData,appAN} from '../actions';

import { STYLE, WINDOW, REQURL } from '../config';

export default class MyMsgPage extends Component {
    constructor(props){
        super(props);
    }


    render(){

        return (
            <View style={styles.container}>
                <Header
                    title='设置'
                    leftIcon='chevron-left'
                    leftIconAction={()=>{
                        InteractionManager.runAfterInteractions(()=>{
                            this.props.navigator.pop();
                        })
                    }}
                    />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
});