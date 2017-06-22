import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    LayoutAnimation
} from 'react-native';
import NavigationBar from './NavigationBar';

import {shouldComponentUpdate} from 'react-immutable-render-mixin';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    }
});

export default class BaseView extends Component {
    constructor(props) {
        super(props);
        this.getNavigationBarProps = this.getNavigationBarProps.bind(this);
        this.renderNavigationBar = this.renderNavigationBar.bind(this);
        this.renderBody = this.renderBody.bind(this);
        this.onLeftPressed = this.onLeftPressed.bind(this);
        this.onRightPressed = this.onRightPressed.bind(this);
        this.onHeadPressed=this.onHeadPressed.bind(this);
        //this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
    }

    getNavigationBarProps () {
        return {
        };
    }

    componentWillMount() {

    }

    renderNavigationBar() {
        let navigationBarProps = this.getNavigationBarProps();
        if(navigationBarProps != null)
        {
            return (
                <NavigationBar
                    {...this.props.passProps}
                    {...navigationBarProps}
                    onLeftPressed={this.onLeftPressed}
                    onRightPressed={this.onRightPressed}
                    onHeadPressed={this.onHeadPressed}
                />
            );
        }
        else{
            return {}
        }
    }

    componentWillUpdate() {
        LayoutAnimation.configureNext(G_LayoutAnimationHelp.springNoDelete);
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
         G_NavUtil.pop();
    }

    onRightPressed() {
        TLog('onRightPressed');
    }

    onHeadPressed() {
        TLog('onHeadPressed');
    }


}