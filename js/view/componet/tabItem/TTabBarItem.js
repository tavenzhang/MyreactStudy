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
    static defaultProps={
        resizeMode:"center"
    }

    render (){
       let  {icoImg,icoSelectImg,selected,resizeMode}=this.props
        return (<View style={{flex:1,justifyContent:"center", marginTop:G_PLATFORM_IOS ? 15:0}}>
            {selected ? <Image resizeMode={resizeMode}  source={icoSelectImg} style={styles.icon}/>:<Image resizeMode={resizeMode} source={icoImg} style={styles.icon}/>}
        </View>)
    }

}
const styles = StyleSheet.create({
    icon: {
        // width:30,
        // height:30,
        // alignSelf:"center"
    },

});