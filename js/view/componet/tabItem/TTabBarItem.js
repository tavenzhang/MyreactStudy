import React, { Component,PropTypes } from 'react'
import {
    View,
    Image,
    StyleSheet
} from 'react-native';

export default class TTabBarItem extends Component {
    static propTypes={
        icoImg:PropTypes.any,
        icoSelectImg:PropTypes.any,
        selected:PropTypes.bool
    }

    render (){
       let  {icoImg,icoSelectImg,selected}=this.props
        return (<View style={{flex:1, justifyContent:"center", alignItems:'center', paddingTop:15}}>
            {selected ? <Image resizeMode={"center"}  source={icoSelectImg} style={styles.icon}/>:<Image resizeMode={"center"} source={icoImg} style={styles.icon}/>}
        </View>)
    }

}
const styles = StyleSheet.create({
    icon: {

    },

});