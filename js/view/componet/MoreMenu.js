'use strict';
import React, {Component, PropTypes} from 'react'
import {
    TouchableHighlight,
    Text,
    View,
} from 'react-native'

import {Popover} from "./Popover";

export default class MoreMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            buttonRect: {},
        }
    }

    static propTypes = {
        contentStyle: View.propTypes.style,
        menus: PropTypes.array,
        anchorView:PropTypes.any,
        onMoreMenuSelect:PropTypes.func,
        buttonRect:PropTypes.any
    }

    open() {
        this.showPopover();
    }

    toggle(){
        if(this.state.isVisible)
        {
            this.closePopover()
        }
        else{
            this.showPopover()
        }
    }

    showPopover() {
        if (this.props.anchorView)
        {
            this.props.anchorView.measure((ox, oy, width, height, px, py) => {
                this.setState({
                    isVisible: true,
                    buttonRect: {x: px, y: py, width: width, height: height}
                });
            });
        }
        else if(this.props.buttonRect)
        {
            this.setState({
                isVisible: true,
                buttonRect: this.props.buttonRect
            });
        }
    }

    closePopover() {
        this.setState({
            isVisible: false,
        });
        if (this.props.onClose != null) {
            this.props.onClose();
        }
    }

    onMoreMenuSelect=(tab)=> {
        this.closePopover();
        if(this.props.onMoreMenuSelect)
        {
            this.props.onMoreMenuSelect(tab);
        }
    }

    renderMoreView=()=> {
        let view = <Popover
            isVisible={this.state.isVisible}
            fromRect={this.state.buttonRect}
            placement="bottom"
            onClose={() => this.closePopover()}
            contentStyle={{opacity: 0.82, backgroundColor: '#343434'}}
            contentMarginRight={20}
        >
            <View style={{alignItems: 'center',}}>
                {
                    this.props.menus.map((result, i) => {
                        return <TouchableHighlight key={i} onPress={() => this.onMoreMenuSelect(result)}
                                                   underlayColor='transparent'>
                            <Text
                                style={{fontSize: 18, color: 'white', padding: 8, fontWeight: '400'}}>
                                {result.name}
                            </Text>
                        </TouchableHighlight>
                    })
                }
            </View>
        </Popover>;
        return view;
    }

    render() {
        return (this.renderMoreView());
    }

}