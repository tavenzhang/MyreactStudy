/**
 * Created by soga on 16/11/2.
 */
import React, {Component,PropTypes} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native';

import {LvIcon} from '../';
import { STYLE, WINDOW, CONFIG } from '../../config';
import Icon from 'react-native-vector-icons/FontAwesome';


import {RankListPanel} from '../';

class GiftRank extends Component {

    static propTypes = {
        data : PropTypes.any.isRequired,
        type : PropTypes.string
    };

    static defaultProps = {
        type : "rich"
    };

    render() {
        const { data, type } = this.props;
        const top3 = data.slice(0,3);
        const others = data.slice(3);

        //没有排行榜数据
        if(top3.length == 0) {
            return (
                <View style={styles.noContent}><Text style={styles.noContentText}>暂无数据~</Text></View>
            )
        }
        else {
            //top3数组数据
            let top3p = [];

            top3.map((v,index) => {
                if(v && v.uid) {

                    let itmePosStyle = null;

                    if(index == 1) {
                        itmePosStyle = styles.topsItemTwo;
                    }
                    else if(index == 2) {
                        itmePosStyle = styles.topsItemThird;
                    }

                    //根据角色显示不同的颜色,等级
                    let [colorStyle,lvData] = [STYLE.second,v.lv_rich];
                    if(type == 'exp') {
                        colorStyle = STYLE.primary;
                        lvData = v.lv_exp;
                    }

                    //头像
                    const headimg = v.headimg ? {uri: CONFIG.imageServe + v.headimg} : require('../../images/avatar_default.png');

                    const temp = <View style={[styles.topsItem,itmePosStyle]}>
                        <View style={styles.topsAvatarBg}><Image source={headimg} style={styles.topsAvatar} /></View>
                        <Text style={[styles.topsItemName,{color:colorStyle}]}>{v.name}</Text>
                        <View style={styles.iconsTop}>
                            <Text>{v.score} </Text>
                            <Icon color={STYLE.second} name="diamond" />
                        </View>
                    </View>;
                    top3p.push(temp);
                }
            });

            let topsAlignStyle = styles.topsBox; //顶部3列排行
            if(top3p.length > 1) {
                topsAlignStyle = styles.topsAlignStyle;
            }

            return (
                <View style={styles.container}>
                    <View style={topsAlignStyle}>
                        {top3p[1]}
                        {top3p[0]}
                        {top3p[2]}
                        <Image source={require('../../images/rank_top3.png')} style={styles.topsBg} />
                    </View>
                    {others.map(( anchor, index ) => {
                        let num = index + 4;
                        if(num < 10) num = "0"+num;

                        //头像
                        const headimg = anchor.headimg ? {uri: CONFIG.imageServe + anchor.headimg} : require('../../images/avatar_default.png');

                        //根据角色显示不同的颜色,等级
                        let [colorStyle,lvData] = [STYLE.second,anchor.lv_rich];
                        if(type == 'exp') {
                            colorStyle = STYLE.primary;
                            lvData = anchor.lv_exp;
                        }

                        //等级
                        const lvIcon = <View style={styles.iconsList}>
                            <Text>{anchor.score} </Text>
                            <Icon color={STYLE.second} name="diamond" />
                        </View>


                        return (
                            <RankListPanel
                                key={num}
                                num={num}
                                headimg={headimg}
                                name={anchor.name}
                                rightIcon={lvIcon}
                                />
                        )
                    })}
                </View>
            )
        }
    }};

export default GiftRank;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    noContent: {
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        height:WINDOW.height/2
    },
    noContentText: {
        fontSize:20,
        color:STYLE.primary
    },

    topsBox: {
        flexDirection:'row',
        justifyContent: 'center',
        flex:1,
        width: WINDOW.width*0.94,
        marginTop:10,
        height: 240
    },
    iconsTop: {
        flexDirection:'row',
        alignItems: 'center'
    },
    iconsList: {
        flexDirection:'row',
        alignItems: 'center',
        justifyContent:'flex-end',
        width: 100,
    },
    topsAlignStyle: {
        flexDirection:'row',
        flex:1,
        width: WINDOW.width*0.94,
        marginTop:10,
        height: 240,
        alignItems:'flex-start',
    },

    topsBg: {
        position: 'absolute',
        left: 0,
        width: WINDOW.width*0.94,
        resizeMode: 'contain',
        marginTop:70
    },

    topsItem: {
        width: WINDOW.width*0.313333,
        flexDirection:'column',
        alignItems: 'center',
    },

    topsItemName: {
        marginTop:5,
        marginBottom:5,
    },


    topsAvatar: {
        width: 60,
        height: 60,
        borderRadius:30,
    },

    topsAvatarBg: {
        shadowColor: "#444",
        borderRadius:30,
        shadowOpacity: 0.5,
        shadowOffset: {
            height: 1,
            width: 0
        }
    },

    lvIcon: {
        position:'absolute',
        right :10
    },

    topsItemTwo: {
        marginTop: 20,
    },

    topsItemThird: {
        marginTop: 40,
    }
});