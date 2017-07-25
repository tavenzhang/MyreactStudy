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
        this.registOnForceFlush=this.registOnForceFlush.bind(this)
        //this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
        this.initRegist=false;
        if(this.props.navigation) {
            if(G_Navigation!=this.props.navigation)
            {
                G_Navigation = this.props.navigation
            }
        }
        this.name=null;
        this.state={
            myTest:1
        }
    }

    renderNavigationBar() {
        return null
    }

    componentWillUpdate() {

       G_PLATFORM_IOS ? LayoutAnimation.configureNext(G_LayoutAnimationHelp.springNoDelete):LayoutAnimation.configureNext(G_LayoutAnimationHelp.springNoCreate);
        if(!this.initRegist) {
            if(this.props.navigation) {
                this.initRegist=true;
                this.registPressHandle();
            }
        }
        G_LastView=this;
       // TLog("this.constructor.name--"+this.name,G_NavRouteState)
        if(G_NavRouteState&&G_NavRouteState.isFlush&&this.name==G_NavRouteState.mod)
        {
            ActDispatch.AppAct.app_route_state(false)
            if(this.onForcefunc) {
                TLog("------------------this.name--onForcefunc=",G_NavRouteState)
                this.onForcefunc(G_NavRouteState);
            }
        }
    }

    registPressHandle=()=>{
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

    registOnForceFlush(componet,onForcefunc){

        if(componet.name)
        {
            this.name =componet.name
        }else {
            this.name = name;
        }
        this.onForcefunc=onForcefunc;
    }

    componentDidMount(){
        if(!G_PLATFORM_IOS){//解决在andorid 平台 一些白屏问题
            setTimeout(()=>this.setState({myTest:2}),500)
        }
    }

}