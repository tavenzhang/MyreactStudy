import React, {Component,PropTypes} from 'react';
import {
    View,
    StyleSheet,
    Text
} from 'react-native';
import {TButtonFont, TButtonSimpleText} from "./button/TButton";

export default class NavHeaderBar extends Component {
    static propTypes={
        isAbsolute:PropTypes.bool,
        navigation:PropTypes.any,
        rightBtnName:PropTypes.any,
        onRightPressed:PropTypes.func,
        onLeftPress:PropTypes.func,
        onHeadPressed:PropTypes.func,
        renderLeftView:PropTypes.func,
        renderMiddleView:PropTypes.func,
        renderRightView:PropTypes.func,
    }

    render() {
        let {renderLeftView,renderMiddleView,renderRightView}=this.props;
        return (
            <View style={{height:64, flexDirection:"row", backgroundColor: "red",justifyContent:"space-between" , width:G_Theme.windowWidth ,backgroundColor:null,position: "absolute", left:0, top:0,zIndex:3}}>
                <View style={styles.viewSp}>
                {renderLeftView ? renderLeftView():this.renderLeftView()}
                </View>
                <View style={{flex:1,justifyContent:"center", alignItems:"center"}}>
                {renderMiddleView ? renderMiddleView():this.renderMiddleView()}
                </View>
                <View style={styles.viewSp}>
                {renderRightView ? renderRightView():this.renderRightView()}
                </View>
            </View>
        );
    }

    renderLeftView=()=>{
        return <TButtonFont style={{
            fontSize:32,
            color:"white",
            fontWeight:"bold",
            marginHorizontal:15
        }} fontName={G_EnumFontNames.Header_Arrow} onPress={G_NavUtil.pop}/>

    }

    renderMiddleView=()=>{
        return    <Text></Text>

    }

    renderRightView=()=>{
        let {rightBtnName}=this.props;
        let resultView= null;
        let {onRightPressed} = this.props.navigation.state.params;
        if(rightBtnName) {
            resultView= <TButtonSimpleText containerStyle={{marginHorizontal:15}} btnName={rightBtnName} onPress={onRightPressed}/>

        }
        return resultView;
    }
}

const styles = StyleSheet.create({
    leftView: {
        fontSize:30,
        color:"white",
        fontWeight:"bold",
    },
    viewSp:{
        justifyContent:"center",
        alignItems:"center",
    }
});