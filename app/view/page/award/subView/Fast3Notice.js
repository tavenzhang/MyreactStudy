
import React from 'react';
import {
    View,
    Text
    , StyleSheet,
} from 'react-native';

import BaseView from "../../../componet/BaseView";

export default class Fast3Notice extends BaseView {

    renderBody() {
        // const {passData} = this.props;
        // console.log("BaseGameView----------------BaseGameView==", passData);
        return (
            <View style={GlobeStyle.appView}>
                <Text>玩法:</Text>
            </View>
        );
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }
}

const styles = StyleSheet.create({

});