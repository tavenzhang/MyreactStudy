import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    LayoutAnimation
} from 'react-native';

import {shouldComponentUpdate} from 'react-immutable-render-mixin';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    }
});

//定义全局Dispatch 方便使用
export default class BaseView extends Component {

    constructor(props) {
        super(props);
        this.renderBody = this.renderBody.bind(this);
        this.onLeftPressed = this.onLeftPressed.bind(this);
        this.onRightPressed = this.onRightPressed.bind(this);
        this.onHeadPressed=this.onHeadPressed.bind(this);
        //this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
        this.initRegist=false;
        if(this.props.navigation) {
            G_Navigation = this.props.navigation
        }
    }

    renderNavigationBar() {
        return null
    }

    componentWillUpdate() {
        LayoutAnimation.configureNext(G_LayoutAnimationHelp.springNoDelete);
        if(!this.initRegist) {
            if(this.props.navigation) {
                this.initRegist=true;
                this.registProssHandle();
                //setTimeout(this.registProssHandle,1000)

            }
        }
    }

   registProssHandle=()=>{
       this.props.navigation.setParams({onLeftPressed:this.onLeftPressed,onRightPressed:this.onRightPressed,onHeadPressed:this.onHeadPressed})
   }


    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                {this.renderNavigationBar()}
                {this.renderBody()}
            </View>
        );
    }

    renderBody() {

    }

    onLeftPressed() {
        TLog('onLeftPressed');
    }

    onRightPressed() {
        TLog('onRightPressed');
    }

    onHeadPressed() {
        TLog('onHeadPressed');
    }


}