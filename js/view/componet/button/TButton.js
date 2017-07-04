import React, {PropTypes} from 'react';
import {
    Text,
    StyleSheet,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

import AIcon from 'react-native-vector-icons/FontAwesome';
import Button from "react-native-button";

export class TButtonProxy extends React.PureComponent {

    static propTypes={
        btnName:PropTypes.any,
        onPress:PropTypes.func,
        disable:PropTypes.bool,
        containerStyle:PropTypes.any,
        textStyle:PropTypes.any,
        disabledStyle:PropTypes.any,
    }

    render() {
        const {containerStyle,onPress, btnName,textStyle,disabledStyle,disable} = this.props;
        return (
            <Button containerStyle={[{
                backgroundColor: disable ? "gray":G_Theme.bgPbg, borderRadius: 10,
                paddingVertical: 5,paddingHorizontal: 5,
            },containerStyle]}  style={[{fontSize: 14, color: "white"},textStyle]} disabled={disable}  styleDisabled={[{backgroundColor:"gray", color:"white"},disabledStyle]} onPress={onPress}>
                {btnName}
            </Button>)
    }
}

export class TButtonView extends React.Component {

    static propTypes={
        onPress:PropTypes.func,
        disable:PropTypes.bool,
        containerStyle:PropTypes.any,
        textStyle:PropTypes.any,
        disabledStyle:PropTypes.any,
    }

    render() {
        const {containerStyle,onPress,textStyle,disabledStyle,disable} = this.props;
        return (
            <Button containerStyle={[containerStyle]}  disabled={disable}  style={[textStyle]} styleDisabled={[{backgroundColor:"gray", color:"white"},disabledStyle]} onPress={onPress}>
                {this.props.children}
            </Button>)
    }
}


export class TButton extends React.Component {

    static propTypes={
        btnName:PropTypes.string,
        onPress:PropTypes.func,
        disable:PropTypes.bool,
        containerStyle:PropTypes.any,
        textStyle:PropTypes.any,
        disabledStyle:PropTypes.any,
    }


    render() {
        const {containerStyle,onPress, btnName,textStyle,disabledStyle,disable} = this.props;
        return (
            <Button containerStyle={[{
                backgroundColor: disable ? "gray":`#d7213c`, borderRadius: 5,
                paddingVertical: 5,paddingHorizontal: 5, alignItems:"center"
            },containerStyle]}  disabled={disable}  style={[{fontSize: 14, color: "white", textAlign:"center"},textStyle]} styleDisabled={[{backgroundColor:"gray", color:"white"},disabledStyle]} onPress={onPress}>
                {btnName}
            </Button>)
    }
}

export class TButtonSimpleText extends React.Component {

    static propTypes={
        btnName:PropTypes.string,
        onPress:PropTypes.func,
        disable:PropTypes.bool,
        containerStyle:PropTypes.any,
        textStyle:PropTypes.any,
        disabledStyle:PropTypes.any,
    }

  static defaultProps ={
      containerStyle: {backgroundColor:"transparent"},
      textStyle:{backgroundColor:"transparent", color:"white"},
    }

    render() {
        const {containerStyle,onPress, btnName,textStyle,disabledStyle,disable} = this.props;
        return (
            <Button containerStyle={[containerStyle]}  disabled={disable}  style={[textStyle]} styleDisabled={[{backgroundColor:"gray", color:"white"},disabledStyle]} onPress={onPress}>
                {btnName}
            </Button>)
    }
}

export class TButtonImg extends React.PureComponent {
    static  propTypes={
        img:PropTypes.any,
        onPress:PropTypes.func,
        style:PropTypes.object,
        styleImg:PropTypes.object,
        text:PropTypes.string,
        resizeMode:PropTypes.string
    }

    static defaultProps={
        resizeMode:"center"
    }

    render()
    {
        let {img,onPress,text,style,resizeMode,styleImg}=this.props
       return  (<TouchableOpacity style={[style]} onPress={onPress}>
              <Image resizeMode={resizeMode}  source={img} style={styleImg}/>
           {text ? <Text>{text}</Text>:null}
        </TouchableOpacity>)
    }
}

export class TButtonFont extends React.PureComponent {
    static  propTypes={
        onPress:PropTypes.func,
        style:PropTypes.object,
        fontName:PropTypes.string
    }

    static defaultProps={
        style:{fontSize:20, color:"white", fontWeight:"bold"}
    }

    render()
    {
        let {onPress,style,fontName}=this.props
        return  (<TouchableOpacity style={{backgroundColor:"transparent"}} onPress={onPress}>
              <AIcon style={style} name={fontName} />
        </TouchableOpacity>)
    }

}

