import React, {PropTypes} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import AIcon from 'react-native-vector-icons/FontAwesome';

export class NavCommonView extends React.PureComponent {
    static propTypes = {
        navigation: PropTypes.any,
        isRightButton:PropTypes.bool,
        style:PropTypes.object,
        visible:PropTypes.bool,
        isHeadView:PropTypes.bool,
    }
    static defaultProps={
        isRightButton:true,
        visible:true,
        isHeadView:false
    }

    onPress = () => {
        let  {navigation,onHeadPressed,isRightButton,isHeadView}=this.props;
        let {onRightPressed,onLeftPressed} = navigation.state.params;
        if(isHeadView)
        {
            onHeadPressed()
        }else{
            if(isRightButton) {
                onRightPressed()
            }
            else{
                onLeftPressed()
            }
        }

    }
    render() {
        let {isRightButton,style,visible} = this.props
        let custStyle={
            marginLeft:isRightButton ? 0:15,
            marginRight:isRightButton ? 15:0
        }
        return (visible ? <TouchableOpacity  onPress={this.onPress}>
            <View style={[custStyle,style]}>
                {this.props.children}
            </View>
        </TouchableOpacity> :null)
    }
}


export class NavButtonText extends React.PureComponent {
    static propTypes = {
        name: PropTypes.string,
        navigation: PropTypes.any,
        isRightButton:PropTypes.bool,
        style:PropTypes.object,
        visible:PropTypes.bool,
        textStyle:PropTypes.bool,
        isHeadView:PropTypes.bool,
    }
    render() {

        let {name,textStyle} = this.props
        return (<NavCommonView {...this.props}>
            <Text style={[{fontSize: 16, color: "white", fontWeight: "bold" },textStyle]}>
                {name}
            </Text>
        </NavCommonView>)
    }
}

export class NavButtonAIco extends React.PureComponent {
    static propTypes = {
        navigation: PropTypes.any,
        isRightButton:PropTypes.bool,
        icoName:PropTypes.string,
        style:PropTypes.object,
        visible:PropTypes.bool,
        fontStyle:PropTypes.bool,
        isHeadView:PropTypes.bool,
    }

    render() {
        let {icoName,fontStyle}=this.props
        return  (<NavCommonView {...this.props}>
            <AIcon style={[{fontSize:25, color:"white"},fontStyle]} name={icoName}/>
        </NavCommonView>)
    }
}



const styles = StyleSheet.create({

})


