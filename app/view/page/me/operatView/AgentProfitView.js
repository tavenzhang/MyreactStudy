/**
 * Created by thomas on 2017/6/2.
 */
/**
 * Created by thomas on 2017/6/2.
 */
import React from 'react';
import {
    View,
    Text, StyleSheet,
    TouchableHighlight,
    LayoutAnimation,
    InteractionManager
} from 'react-native';

import {connect} from 'react-redux';
import BaseView from "../../../componet/BaseView";
import AwardListView from "../../../componet/BaseListView";


const mapStateToProps = state => {
    return {
        // gameModel:state.get("appState").get("gameModel"),
    }
}

@connect(mapStateToProps)
export default class AgentProfitView extends BaseView {

    renderBody(){
        return (<View/>)
    }

}