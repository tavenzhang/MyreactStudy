/**
 * 导航栏标题
 */
import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { STYLE } from '../config';

export default class Header extends React.Component {
    render() {
        let NavigationBar = [];

        // 左边图片按钮
        if (this.props.leftIcon != undefined) {
            NavigationBar.push(
                <TouchableOpacity
                    key={'leftIcon'}
                    activeOpacity={0.75}
                    style={styles.leftBox}
                    onPress={this.props.leftIconAction}
                >
                    <Icon name={this.props.leftIcon} style={styles.leftIcon} />
                </TouchableOpacity>
            )
        }

        // 右边图片按钮
        if (this.props.rightIcon != undefined) {
            NavigationBar.push(
                <TouchableOpacity
                    key={'rightIcon'}
                    activeOpacity={0.75}
                    style={styles.rightBox}
                    onPress={this.props.rightIconAction}
                    >
                    <Icon name={this.props.rightIcon} style={styles.rightIcon} />
                </TouchableOpacity>
            )
        }

        // 标题
        if (this.props.title != undefined) {
            NavigationBar.push(
                <View key={'title'} style={styles.titleWrap}>
                    <Text style={styles.title}>{this.props.title}</Text>
                </View>
            )
        }

        // 自定义标题View
        if (this.props.titleView != undefined) {
            let Component = this.props.titleView;
            NavigationBar.push(
                <Component key={'titleView'}/>
            )
        }

        // 右边文字按钮
        if (this.props.rightButton != undefined) {
            NavigationBar.push(
                <TouchableOpacity
                    key={'rightButton'}
                    activeOpacity={0.75}
                    style={styles.rightButton}
                    onPress={this.props.rightButtonAction}
                >
                    <Text style={styles.buttonTitleFont}>{this.props.rightButton}</Text>
                </TouchableOpacity>
            )
        }

        if (this.props.rightMenu != undefined) {
            NavigationBar.push(
                <TouchableOpacity
                    key={'rightMenu'}
                    activeOpacity={0.75}
                    style={styles.rightMenu}
                    onPress={this.props.rightMenuAction}
                >
                    <Text style={{color: 'gray', fontSize: 12}}>{this.props.rightMenu}</Text>
                    <Image source={{uri: 'ic_food_ordering'}} style={{width: 16, height: 16}}/>
                </TouchableOpacity>
            )
        }


        return (
            <View style={styles.navigationBarContainer}>
                {NavigationBar}
            </View>
        )
    }
}


const fontSize = 18;
const marginTop = 20;
const fontColor = '#fff';

const styles = StyleSheet.create({
    navigationBarContainer: {
        flexDirection: 'row',
        height: STYLE.headerBannerHeight,
        alignItems: 'center',
        //borderBottomColor: '#ddd',
        //borderBottomWidth: 0.5,
        //color:'white',
        backgroundColor: STYLE.primary,
        //shadowColor: "#555",
        //shadowOpacity: 0.5,
        //shadowOffset: {
        //    height: 1,
        //    width: 0
        //}
    },
    titleWrap: {
        flex:1,
        alignItems:'center',
        backgroundColor: STYLE.primary
    },
    title: {
        fontSize: fontSize,
        marginTop: marginTop,
        color: fontColor
    },

    leftBox: {
        position: 'absolute',
        left: 10,
        top: marginTop,
        zIndex: 10
    },
    leftIcon: {
        fontSize: fontSize,
        color: fontColor
    },
    rightBox: {
        position: 'absolute',
        right: 10,
        top: marginTop,
        zIndex: 10
    },
    rightIcon: {
        fontSize: fontSize,
        color: fontColor
    },


    rightButton: {
        position: 'absolute',
        right: 10,
        height: 44,
        justifyContent: 'center',
        flexDirection: 'row',
    },

    buttonTitleFont: {
        color: 'white',
        fontSize: 15,
    },
    rightMenu: {
        position: 'absolute',
        right: 10,
        height: 44,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
});