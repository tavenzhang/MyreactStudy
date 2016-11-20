/**
 * Created by soga on 16/9/28.
 */
import React, {Component,PropTypes} from 'react';
import { CONFIG } from '../../config';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { WINDOW, STYLE } from '../../config';

class VideoItem extends Component {

    static propTypes = {
        //imgSrc : PropTypes.string,
        //name : PropTypes.string.isRequired,
        //nums : PropTypes.any.isRequired,
        //isLive : PropTypes.any.isRequired,
        //onClick : PropTypes.func,
    };

    static defaultProps = {
        //imgSrc : './images/videoBg_default.jpg',
        //name : '主播名称',
        //nums : 0,
        //isLive : false
    };

    render() {
        const {imgSrc,name,nums,isLive,onPress} = this.props;

        let [numsDom,liveIcon] = [null,null];

        //显示人数
        if(isLive && nums > 0) {
            numsDom = <Text style={styles.text}><Icon name='user' style={styles.Iuser} />{nums}</Text>;
        }

        ////显示直播状态
        if(isLive) {
            liveIcon = <View style={styles.liveBox}><Text style={styles.liveBoxText}>直播</Text></View>;
        }

        const headImg = imgSrc ? { uri : CONFIG.imageServe + imgSrc + "?w=356&h=266" } : require("../../images/videoBg_default.jpg");

        return (
            <TouchableOpacity onPress={()=>onPress()}>
                <View style={styles.imgItem}>
                    <Image source={headImg} style={styles.headerImage}/>
                    <View style={styles.banner}>
                        <Text style={styles.text}>{name}</Text>
                        {numsDom}
                    </View>
                    {liveIcon}
                </View>
            </TouchableOpacity>
        )
    }};

export default VideoItem;

const boxWidth = WINDOW.width*0.495;
const boxHeight = boxWidth/1.34;

const styles = StyleSheet.create({
    imgItem: {
        width: boxWidth,
        height: boxHeight,
        marginBottom: 4,
        position:'relative'
    },
    headerImage: {
        width: boxWidth,
        height: boxHeight,
        resizeMode: 'stretch'
    },
    banner: {
        position:'absolute',
        left:0,
        height:30,
        bottom:0,
        backgroundColor:'rgba(0,0,0,.5)',
        zIndex:1,
        width:boxWidth,
        padding: 5,
        flexDirection: 'row',
        justifyContent:'space-between',

    },
    text: {
        color:'#fff',
        fontSize:STYLE.fontSizeNormal,
    },
    Iuser: {
        color: STYLE.primary
    },
    liveBox: {
        borderColor : STYLE.primary,
        borderRadius: 2,
        borderWidth: 1,
        borderStyle: 'solid',
        flexDirection: 'row',
        justifyContent: 'center',
        width: 40,
        backgroundColor: 'rgba(255,255,255,.4)',
        position:'absolute',
        right: 5,
        top: 5
    },
    liveBoxText: {
        color: STYLE.primary,
        fontSize: STYLE.fontSizeSmall,
    }
});