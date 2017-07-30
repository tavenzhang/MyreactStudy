/* eslint-disable global-require */
import React from 'react';
import {
  View,
  Animated,
  StyleSheet,
} from 'react-native';
import Animation from 'lottie-react-native';
import PlayerControls from './PlayerControls';
import ExamplePicker from './ExamplePicker';
import SplashScreen from "react-native-smart-splash-screen";

const makeExample = (name, getJson) => ({ name, getJson });
const EXAMPLES = [
  makeExample('Hamburger Arrow', () => require('./HamburgerArrow.json')),
  makeExample('Line Animation', () => require('./LineAnimation.json')),
  makeExample('Lottie Logo 1', () => require('./LottieLogo1.json')),
  makeExample('Lottie Logo 2', () => require('./LottieLogo2.json')),
  makeExample('Lottie Walkthrough', () => require('./LottieWalkthrough.json')),
  makeExample('Pin Jump', () => require('./PinJump.json')),
  makeExample('Twitter Heart', () => require('./TwitterHeart.json')),
  makeExample('Watermelon', () => require('./Watermelon.json')),
  makeExample('Motion Corpse', () => require('./MotionCorpse-Jrcanest.json')),
].reduce((acc, e) => {
  // eslint-disable-next-line no-param-reassign
  acc[e.name] = e;
  return acc;
}, {});

export default class LottieAnimatedExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      example: Object.keys(EXAMPLES)[0],
      progress: new Animated.Value(0),
      config: {
        duration: 3000,
        imperative: false,
      },
    };
      SplashScreen.close({
          animationType: SplashScreen.animationType.scale,
          duration: 850,
          delay: 800,
      })
    this.onValueChange = this.onValueChange.bind(this);
    this.onPlayPress = this.onPlayPress.bind(this);
    this.onResetPress = this.onResetPress.bind(this);
    this.setAnim = this.setAnim.bind(this);
  }

  onValueChange(value) {
    this.state.progress.setValue(value);
  }

  onPlayPress() {
    if (this.state.config.imperative) {
      this.anim.play();
    } else {
      this.state.progress.setValue(0);
      Animated.timing(this.state.progress, {
        toValue: 1,
        duration: this.state.config.duration,
      }).start(({ finished }) => {
        if (finished) this.forceUpdate();
      });
    }
  }

  onResetPress() {
    if (this.state.config.imperative) {
      this.anim.reset();
    } else {
      this.state.progress.setValue(1);
      Animated.timing(this.state.progress, {
        toValue: 0,
        duration: this.state.config.duration,
      }).start(({ finished }) => {
        if (finished) this.forceUpdate();
      });
    }
  }

  setAnim(anim) {
    this.anim = anim;
  }

  render() {
    const playerWindow = (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          borderColor: '#000',
          borderWidth: 1,
          backgroundColor: '#dedede',
          marginVertical: 10,
        }}
      >
        <View>
          <Animation
            ref={this.setAnim}
            style={{
              width: 200,
              height: 200,
            }}
            source={EXAMPLES[this.state.example].getJson()}
            progress={this.state.progress}
          />
        </View>
      </View>
    );

    return (
      <View style={StyleSheet.absoluteFill}>
        <ExamplePicker
          example={this.state.example}
          examples={EXAMPLES}
          onChange={(example) => this.setState({ example })}
        />
        {playerWindow}
        <PlayerControls
          progress={this.state.progress}
          config={this.state.config}
          onProgressChange={this.onValueChange}
          onConfigChange={config => this.setState({ config })}
          onPlayPress={this.onPlayPress}
          onResetPress={this.onResetPress}
        />
      </View>
    );
  }
}
