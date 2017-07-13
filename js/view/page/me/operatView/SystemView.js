import React from 'react';
import {
    View
    , StyleSheet,
    Text
} from 'react-native';

import BaseView from "../../../componet/BaseView";
import connect from "react-redux/src/components/connect";

const mapStateToProps = state => {
    return {
        storageUser:state.get("appState").get("storageUser").toJS(),
    }
}

@connect(mapStateToProps)
export default class SystemView extends BaseView {


    render(){
        return(<View style={G_Style.appContentView}>
            <Text style={{color:"red", marginTop:20, marginLeft:30}}>当前版本:  {G_APPVERSION}</Text>
        </View>)
    }

}