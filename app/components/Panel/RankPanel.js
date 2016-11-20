/**
 * Created by soga on 16/10/14.
 */
import React, {Component,PropTypes} from 'react';
import { CONFIG } from '../../config';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';

import {LvIcon} from '../';
import { STYLE } from '../../config';

class RankPanel extends Component {

    static propTypes = {
        iconSrc : PropTypes.any.isRequired,
        data : PropTypes.any.isRequired,
        type : PropTypes.string,
    };

    static defaultProps = {
        type : 'rich'
    };

    render() {
        const { data, type,  onPress} = this.props;

        return (
            <TouchableOpacity onPress={onPress}>
                <View style={styles.listItem}>
                    <Image
                        style={styles.listImage}
                        source={this.props.iconSrc}
                        />
                    <View style={styles.productRight}>
                        {data.map((v,index) => {

                            //等级icon
                            let [lvData,styleColor] = [v.lv_rich,STYLE.second];
                            if(type == 'exp') {
                                lvData = v.lv_exp;
                                styleColor = STYLE.primary;
                            }

                            lvIcon = <LvIcon
                                type={type}
                                lv={lvData}
                                />

                            //用户头像
                            let headImg = v.headimg ? { uri: CONFIG.imageServe + v.headimg } : require('../../images/avatar_default.png');

                            return (
                                <View key={index} style={styles.line}>
                                    <View style={[styles.number,{backgroundColor:styleColor}]}>
                                        <Text style={{color:'#fff'}}>{index+1}</Text>
                                    </View>
                                    <Image
                                        style={styles.avatar}
                                        source={headImg}
                                        />
                                    <Text style={[styles.text,{color:styleColor}]}>{v.username}</Text>
                                    <View style={styles.lvIcon}>{lvIcon}</View>
                                </View>
                            )
                        })}
                    </View>
                </View>
            </TouchableOpacity>
        )
    }};

export default RankPanel;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    listItem: {
        height: 110,
        flexDirection:'row',
        padding: 10,
        marginBottom: 1,
        backgroundColor:'#f1f1f1',
    },

    listImage: {
        width: 90,
        height: 90,
        marginRight: 10,
    },

    line:{
        alignItems: 'center',
        flexDirection: 'row',
    },

    text: {
        fontSize:18,
    },

    productRight: {
        flex: 1
    },

    avatar: {
        width: 24,
        height: 24,
        margin: 3,
        resizeMode: 'contain',
        borderRadius: 12
    },

    number: {
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5,
        borderRadius: 5
    },

    lvIcon: {
        position:'absolute',
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        right :0,
        top: 5
    }
});