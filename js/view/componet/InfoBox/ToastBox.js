import React, {Component, PropTypes} from 'react';
import {
    Text,
    View,
    StyleSheet
} from 'react-native';


export default class ToastBoxView extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        visible: PropTypes.bool,
        msg: PropTypes.string,
        onClose: PropTypes.func,
        isError: PropTypes.any
    };

    render() {
        let {msg,isError}=this.props
        return (<View style={styles.viewStyle} pointerEvents={"none"}>
            <View style={[styles.textSp,{}]}>
                 <Text style={{color: isError ? "red":"yellow"}} numberOfLines={3}>{msg}</Text>
            </View>
        </View>)
    }

    componentDidMount() {
        this.time = setTimeout(this.hideView, G_PLATFORM_IOS ? 3000:4000)
    }

    componentWillUnMount() {
        clearTimeout(this.time)
    }

    hideView = () => {
      ActDispatch.AppAct.hideBox()
    }
}


const styles = StyleSheet.create({
    viewStyle: {
        position: "absolute",
        zIndex: 111,
        width: G_Theme.windowWidth,
        height: G_Theme.windowHeight,
        justifyContent: "center",
        alignItems: "center"
    },
    textSp:{
        paddingVertical: 10,
        paddingHorizontal: 25,
        backgroundColor:"rgba(100,100,100,0.8)",
        borderRadius:10
    },
})

