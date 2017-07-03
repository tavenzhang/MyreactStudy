import React from 'react';
import {
    View,
    Text
} from 'react-native';
import TView from "../../componet/TView";

export  default class LoginReginView extends TView {
    static navigationOptions = (data) => ({
        headerStyle: {backgroundColor: G_Theme.TGreen,shadowOffset:null,elevation:null}
    })
    render () {
        return (
            <View style={[G_Style.appContentView,{backgroundColor:G_Theme.TGreen, borderWidth:0}]}>
            </View>
        );
    }
}