import React, { Component,PropTypes } from 'react'
import {
    TouchableWithoutFeedback,
    Modal
} from 'react-native';


export default class MyModalView extends Component {

    static propTypes = {
        defaultDate: PropTypes.any,
        visible: PropTypes.bool,
        hideModal:PropTypes.func,
        onPressModal:PropTypes.func,
        isAutoHide:PropTypes.bool,
    }

    static defaultProps={
        hideModal:()=>{},
        isAutoHide:false
    }
    constructor(props){
        super(props)
    }

    render(){
        let {visible,hideModal,onPressModal,isAutoHide}=this.props
        return (
            <Modal
                animationType={"fade"}
                transparent={true}
                visible={visible}
                onRequestClose={hideModal}
                hardwareAccelerated={true}
            >
                {isAutoHide ? <TouchableWithoutFeedback onPress={onPressModal}>
                    {this.props.children}
                </TouchableWithoutFeedback>:this.props.children}
            </Modal>
        )
    }
}