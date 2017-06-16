import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Platform,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
export const Header_Arrow = "angle-left";

export default class NavigationBar extends React.Component {

    render() {
        let leftView = null;
        let titleView = null;
        let rightView = null;
        if (this.props.leftView != undefined) {
            let Component = this.props.leftView;
            leftView = (
                <TouchableOpacity
                    key={'leftIconView'}
                    activeOpacity={0.75}
                    style={styles.leftMenu}
                    onPress={this.props.onLeftPressed}
                >
                    <Component key={'leftMenuView'}  {...this.props}/>
                </TouchableOpacity>
            )
        }

        if (this.props.isShowBack || (Navgator && Navgator.getCurrentRoutes().length > 1)) {
            leftView = <TouchableOpacity
                key={'leftMenu'}
                activeOpacity={0.75}
                style={styles.leftMenu}
                onPress={this.props.onLeftPressed}
            >
                <Icon color="white" size={30} name={Header_Arrow}/>
                <Text key={'leftIcotitle'} style={styles.leftBackName}>返回</Text>
            </TouchableOpacity>
        }
        // 自定义标题View
        if (this.props.titleView != undefined) {
            let Component = this.props.titleView;
            titleView = (
                <TouchableOpacity
                    key={'title'}
                    activeOpacity={0.75}
                    style={styles.titleContain}
                    onPress={this.props.onHeadPressed}
                >
                    <Component key={'titleView'} {...this.props}/>
                </TouchableOpacity>
            )
        }
        else {
            // 标题
            titleView = (
                <TouchableOpacity
                    key={'title'}
                    activeOpacity={0.75}
                    style={styles.titleContain}
                    onPress={this.props.onHeadPressed}
                >
                    <Text key={'title'} style={styles.title} numberOfLines={2}>{this.props.title || this.props.name}</Text>
                </TouchableOpacity>
            )
        }

        if (this.props.rightView != undefined) {
            let Component = this.props.rightView;
            rightView = (
                <TouchableOpacity
                    key={'rightMenu'}
                    activeOpacity={0.75}
                    style={styles.rightMenu}
                    onPress={this.props.onRightPressed}
                >
                    <Component key={'rightView'}  {...this.props}/>
                </TouchableOpacity>
            )
        }

        return (
            <View style={styles.navigationBarContainer}>
                <View style={styles.subView}>{leftView}</View>
                <View style={[styles.subView,{flex:2}]}>{titleView}</View>
                <View style={styles.subView}>{rightView}</View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    navigationBarContainer: {
        flexDirection: 'row',
        height: G_Theme.navigatorHeadH,
        alignItems: 'center',
        //borderBottomColor: '#ccc',
        //borderBottomWidth: 0.5,
        backgroundColor: '#d7213c',
    },
    subView:{
        flex: 1,
        marginTop:G_Theme.StatusBarH
    },
    titleContain: {
        flex: 1,
        alignItems:"center",
        justifyContent:"center",
    },
    title: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "900",
        textAlign: 'center',
    },
    leftBackName: {
        fontSize: 15,
        color: "#fff",
        fontWeight: 'bold',
        left: 5,
        top: 2
    },
    leftMenu: {
        flexDirection: 'row',
        alignItems: "center",
        flex: 1,
        left:15
    },
    rightMenu: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        right:15

    },
})