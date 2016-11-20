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

class GiftEffect extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bounceValue: new Animated.Value(0),
            rotateValue: new Animated.Value(0),
            translateValue: new Animated.ValueXY({x:0, y:0}), // 二维坐标
            fadeOutOpacity: new Animated.Value(0),
            giftLeft: new Animated.Value(-WINDOW.width),
        }
    }

    componentDidMount() {
    }

    static propTypes = {
        data : PropTypes.any.isRequired,
    };

    static defaultProps = {
    };

    shouldComponentUpdate(nextProps, nextState){
        if(this.props.data !== nextProps.data) {
            this.startAnimation();
        }
        return this.props.data !== nextProps.data;
        //return false 则不更新组件
    }

    startAnimation(){
        this.state.bounceValue.setValue(1.5);     // 设置一个较大的初始值
        this.state.rotateValue.setValue(0);
        this.state.translateValue.setValue({x:0, y:0});
        this.state.fadeOutOpacity.setValue(1);
        this.state.giftLeft.setValue(-WINDOW.width/2);

        Animated.sequence([
            Animated.timing(this.state.giftLeft, {
                toValue: 10,
                easing: Easing.in(Easing.quad),
            }),
            Animated.delay(2000),
            //Animated.timing(this.state.giftLeft, {
            //    toValue: 0,
            //    easing: Easing.elastic(2),
            //}),
            //Animated.delay(100),
            //Animated.timing(this.state.giftLeft, {
            //    toValue: 50,
            //    easing: Easing.linear,
            //}),
            Animated.timing(this.state.giftLeft, {
                toValue: -WINDOW.width,
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
        const giftIcon = `${CONFIG.giftPath}gift_material/${data.gid}.png`;

        return (
            <Animated.View                         // 可选的基本组件类型: Image, Text, View(可以包裹任意子View)
                style={{
		          flex: 1,
		          flexDirection: 'row',
		          alignItems: 'center',
		          position: 'absolute',
		          top: WINDOW.width*3/4 + STYLE.swipHeaderHeight + 50,
		          left:this.state.giftLeft
		        }}>
                <View style={styles.giftBox}>
                    <Image
                        source={{uri: CONFIG.imageServe + data.headimg}}
                        style={styles.avatar}
                        />
                    <Text style={styles.name}>{data.sendName}</Text>
                    <Image
                        source={{uri: giftIcon}}
                        style={styles.giftIcon}
                        />
                </View>
                <View style={{backgroundColor:'transparent'}}>
                    <Text style={styles.giftNum}>x {data.gnum}</Text>
                </View>
            </Animated.View>
        )
    }};

export default GiftEffect;

const styles = StyleSheet.create({
    giftBox: {
        flexDirection: 'row',
        backgroundColor: 'rgba(0,0,0,.5)',
        justifyContent: 'center',
        height: 50,
        alignItems: 'center',
        borderRadius: 25,
    },

    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth:2,
        borderColor:'#fff'
    },

    name: {
        fontSize: 20,
        color: '#fff',
        marginLeft: 10,
        marginRight: 10,
    },

    giftIcon: {
        width: 45,
        height: 45,
        marginRight: 5,
    },

    giftNum: {
        fontSize: 30,
        marginLeft: 10,
        color: '#f71257'
    },

});