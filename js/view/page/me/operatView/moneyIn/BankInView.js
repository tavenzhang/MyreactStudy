import React ,{PropTypes} from 'react';
import {
    View,
    StyleSheet,

} from 'react-native';



export default class BankInView extends React.Component {
    static propTypes = {
        visible:PropTypes.bool,
        platList: PropTypes.any
    }
    render(){
        let {visible} =this.props;
        return (visible ? <View/>:null)
    }
}