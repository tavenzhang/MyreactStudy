import React  from 'react';
import {
    Image,
    Animated,
    Easing,
} from 'react-native';
import {startImg} from "../assets/index";
import SplashScreen from 'react-native-smart-splash-screen'

export default class GuidView extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            fadeInOpacity:new Animated.Value(0.8),
        }
    }

    render() {
        return (
            <Animated.View style={{flex: 1,opacity:this.state.fadeInOpacity}}>
                <Image
                    style={{flex: 1, width: G_Theme.windowWidth, height:G_Theme.windowHeight}}
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
        // NetInfo.isConnected.fetch().done((isConnected) => {
        //     console.log('First, is ' + (isConnected ? 'online' : 'offline'));
        // })
        SplashScreen.close({
            animationType: SplashScreen.animationType.scale,
            duration: 850,
            delay: 500,
        })
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    toApp=()=>{
        this.timer = setTimeout(() => {
            G_NavUtil.resetToView(G_NavViews.TabbarView());
        }, 1500)

    }
}
