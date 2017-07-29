import React, { Component,PropTypes } from 'react'
import {
    TouchableWithoutFeedback,
    Modal,
    View
} from 'react-native';


export default class TModalView extends Component {

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

export  class TModalCenterView extends React.Component {

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
                    {this.onRendChildeView()}
                </TouchableWithoutFeedback>: this.onRendChildeView()}
            </Modal>
        )
    }

    onRendChildeView=()=>{
        return  (<View style={{flex: 1, justifyContent: "center", backgroundColor: "rgba(50, 50, 50,0.2)"}}>
              {this.props.children}
             </View>)
    }
}