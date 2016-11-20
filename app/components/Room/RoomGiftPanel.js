/**
 * Created by soga on 16/11/2.
 */
import React, {Component,PropTypes} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableHighlight,
    TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { CONFIG, STYLE, WINDOW } from '../../config';

class RoomGiftPanel extends Component {

    static propTypes = {
        data : PropTypes.any.isRequired,
        selectGift : PropTypes.func.isRequired,
        currentSeleGift : PropTypes.number
    };

    static defaultProps = {
    };

    render() {
        const { data, currentSeleGift } = this.props;
        //console.log(data)
        return (
            <View style={styles.container}>
                {data.map(( v, index ) => {
                    let giftStyle = [styles.giftItem];
                    const selected = currentSeleGift == v.gid ? 'selected' : '';
                    //选中礼物样式
                    if(currentSeleGift == v.gid) {
                        giftStyle.push(styles.giftItemSelect);
                    }
                    const giftSrc = `${CONFIG.giftPath}gift_material/${v.gid}.png`;

                    return (
                        <TouchableHighlight key={index} onPress={()=>this.props.selectGift(v.gid)} activeOpacity={1} underlayColor='#d3f1fc'>
                            <View style={giftStyle}>
                                <Image source={{uri: giftSrc}} style={styles.giftIcon} />
                                <Text style={styles.giftName}>{v.name}</Text>
                                <Text style={styles.price}>{v.price} <Icon name="diamond" color={STYLE.second} /></Text>
                            </View>
                        </TouchableHighlight>
                    )
                })}
            </View>
        )
    }};

export default RoomGiftPanel;

const styles = StyleSheet.create({
    container: {
        width: WINDOW.width,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems:'center',
        //justifyContent:'space-around',
    },
    giftItem: {
        alignItems:'center',
        padding: 5,
        borderWidth: 0.5,
        borderColor: '#f1f1f1',
        width: WINDOW.width/4
    },
    giftItemSelect: {
        //alignItems:'center',
        //padding: 5,
        //borderWidth: 0.5,
        //borderColor: '#f1f1f1',
        //borderColor: STYLE.second,
        backgroundColor: '#d3f1fc'
        //width: WINDOW.width/4
    },
    giftIcon: {
        height: 50,
        width: 50,
    },
    giftName: {
        fontSize:12,
        color:STYLE.primary,
        marginTop:5,
        marginBottom:3,
    },
    price: {
        fontSize:12,
    }
})