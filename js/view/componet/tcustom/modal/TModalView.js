import React, { Component,PropTypes } from 'react'
import {
    TouchableWithoutFeedback,
    Modal
} from 'react-native';


export default class MyModalView extends Component {

    static propTypes = {
        defaultDate: PropTypes.any,
        visible: PropTypes.bool,
        hideModal: PropTypes.func,
    }

    constructor(props){
        super(props)
    }

    render(){
        let {visible,hideModal}=this.props
        return (
            <Modal
                animationType={"fade"}
                transparent={true}
                visible={visible}
                onRequestClose={hideModal ? hideModal:()=>{}}
                hardwareAccelerated={true}

            >
                <TouchableWithoutFeedback onPress={hideModal}>
                    {this.props.children}
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
}