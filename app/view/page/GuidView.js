import React  from 'react';
import {
    Image,
    Animated,
    Easing,
} from 'react-native';
import {startImg} from "../../assets/index";
import NetInfo from "react-native/Libraries/Network/NetInfo";

export default class GuidView extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            fadeInOpacity:new Animated.Value(0.3),
        }
    }

    render() {
        return (
            <Animated.View style={{flex: 1,opacity:this.state.fadeInOpacity}}>
                <Image
                    style={{flex: 1, width: GlobelTheme.screenWidth.width, height:GlobelTheme.screenHeight.height}}
                    source={startImg}
                />
            </Animated.View>
        );
    }

    componentDidMount() {
        Animated.timing(this.state.fadeInOpacity,{
            toValue:1,
            duration:1000,
            easing:Easing.linear()
        }).start(this.toApp());
        NetInfo.isConnected.fetch().done((isConnected) => {
            console.log('First, is ' + (isConnected ? 'online' : 'offline'));
        })
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    toApp=()=>{
        this.timer = setTimeout(() => {
            NavUtil.resetToView(NavViews.TabbarView());
        }, 2000)

    }
}
