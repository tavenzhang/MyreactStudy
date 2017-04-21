import React from 'react';
import {
    View,
    Text
    , StyleSheet,
} from 'react-native';

import BaseGameView from "../BaseGameView";


export default class CQSSC extends BaseGameView {

    onRenderSubView(data) {
        TLog("CQSSC---------------", data);
        return <Text>{data.name}</Text>
    }
}