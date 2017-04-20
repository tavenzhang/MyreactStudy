import React from 'react';
import {
    Text
} from 'react-native';

import BaseGameView from "../BaseGameView";

export default class SD11Choose5 extends BaseGameView {

    onRenderSubView(data) {
        TLog("onRenderSubView--------BaseGameView-------", data);
        return <Text>{data.name}</Text>

    }
}