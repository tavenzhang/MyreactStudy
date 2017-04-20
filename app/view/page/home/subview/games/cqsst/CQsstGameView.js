import React from 'react';
import {
    View,
    Text
    , StyleSheet,
} from 'react-native';

import BaseGameView from "../BaseGameView";

export default class CQsstGameView extends BaseGameView {

    onRenderSubView(data) {
        TLog("CQsstGameView---------------", data);
        return <Text>{data.name}</Text>
    }
}