/**
 * Created by soga on 16/11/3.
 */
import React, {Component,PropTypes} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Animated,
    Easing
} from 'react-native';

import { CONFIG, WINDOW, STYLE } from '../../config';

class UserMount extends Component {

    constructor(props) {
        super(props);
        this.state = {
            carRight: new Animated.Value(-WINDOW.width),
            bounceValue: new Animated.Value(1),
            fadeOutOpacity: new Animated.Value(1),
        }
    }

    shouldComponentUpdate(nextProps, nextState){
        if(this.props.data !== nextProps.data) {
            this.startAnimation();
        }
        return this.props.data !== nextProps.data;
        //return false 则不更新组件
    }

    static propTypes = {
        data : PropTypes.any.isRequired,
    };

    static defaultProps = {
    };

    startAnimation(){
        this.state.bounceValue.setValue(1.2);     // 设置一个较大的初始值
        this.state.fadeOutOpacity.setValue(1);
        this.state.carRight.setValue(-50);

        Animated.sequence([
            Animated.timing(this.state.carRight, {
                toValue: 50,
                easing: Easing.in(Easing.quad),
            }),
            Animated.delay(1000),
            Animated.timing(this.state.bounceValue, {
                toValue: 1,
                easing: Easing.in(Easing.quad),
            }),
            Animated.delay(100),
            Animated.timing(this.state.fadeOutOpacity, {
                toValue: 0.5,
                duration: 1000,
                easing: Easing.linear, // 线性的渐变函数
            }),
            Animated.timing(this.state.carRight, {
                toValue: WINDOW.width,
                easing: Easing.out(Easing.quad),
            })
        ]).start();


    }

    render() {
        const { data } = this.props;
        //const driveIcon = <img className="userMount" src={ CONFIG.giftPath + data.car + ".png" } />
        //用户进入房间消息
        //let userEnter = <div className="user-entered">
        //    <span className="user-entered-lv">{driveIcon}</span>
        //    <span className="text">{data.name}开着坐骑登场</span>
        //</div>;
        const carIcon = `${CONFIG.giftPath}gift_material/${data.car}.png`;

        return (
            <Animated.View                         // 可选的基本组件类型: Image, Text, View(可以包裹任意子View)
                key="carAnimated"
                style={{
		          flex: 1,
		          flexDirection: 'row',
		          alignItems: 'center',
		          position: 'absolute',
		          top: WINDOW.width*3/4 + STYLE.swipHeaderHeight,
		          right:this.state.carRight,
		          transform: [  // scale, scaleX, scaleY, translateX, translateY, rotate, rotateX, rotateY, rotateZ
		            {scale: this.state.bounceValue},
		          ],
		          opacity: this.state.fadeOutOpacity, // 透明度
		        }}>
                <View style={styles.carBox}>
                    <View style={styles.carIconBox}>
                        <Image
                            source={{uri: carIcon}}
                            style={styles.carIcon}
                            />
                    </View>
                    <Text style={styles.name}>{data.name} 开着坐骑登场</Text>
                </View>
            </Animated.View>
        )
    }};

export default UserMount;

const styles = StyleSheet.create({
    carBox: {
        flexDirection: 'row',
        backgroundColor: 'rgba(0,0,0,.1)',
        justifyContent: 'center',
        height: 40,
        alignItems: 'center',
    },

    carIconBox: {
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: STYLE.second,
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: -20
    },

    name: {
        fontSize: 16,
        color: STYLE.second,
        marginLeft: 10,
        marginRight: 10,
    },

    carIcon: {
        width: 25,
        height: 25,
    },

});