/**
 * Created by soga on 16/10/15.
 */
import React, {PropTypes} from 'react';
import {
    Image,
    View,
    StyleSheet
} from 'react-native';

//const img = require({tt});
//主播等级icon
const EXP_ICON = [
    require('./../images/lv_icon/r1.png'),
    require('./../images/lv_icon/r2.png'),
    require('./../images/lv_icon/r3.png'),
    require('./../images/lv_icon/r4.png'),
    require('./../images/lv_icon/r5.png'),
    require('./../images/lv_icon/r6.png'),
    require('./../images/lv_icon/r7.png'),
    require('./../images/lv_icon/r8.png'),
    require('./../images/lv_icon/r9.png'),
    require('./../images/lv_icon/r10.png'),
    require('./../images/lv_icon/r11.png'),
    require('./../images/lv_icon/r12.png'),
    require('./../images/lv_icon/r13.png'),
    require('./../images/lv_icon/r14.png'),
    require('./../images/lv_icon/r15.png'),
    require('./../images/lv_icon/r16.png'),
    require('./../images/lv_icon/r17.png'),
    require('./../images/lv_icon/r18.png'),
    require('./../images/lv_icon/r19.png'),
];

//富豪等级icon
const RICH_ICON = [
    require('./../images/rlv_icon/1.png'),
    require('./../images/rlv_icon/2.png'),
    require('./../images/rlv_icon/3.png'),
    require('./../images/rlv_icon/4.png'),
    require('./../images/rlv_icon/5.png'),
    require('./../images/rlv_icon/6.png'),
    require('./../images/rlv_icon/7.png'),
    require('./../images/rlv_icon/8.png'),
    require('./../images/rlv_icon/9.png'),
    require('./../images/rlv_icon/10.png'),
    require('./../images/rlv_icon/11.png'),
    require('./../images/rlv_icon/12.png'),
    require('./../images/rlv_icon/13.png'),
    require('./../images/rlv_icon/14.png'),
    require('./../images/rlv_icon/15.png'),
    require('./../images/rlv_icon/16.png'),
    require('./../images/rlv_icon/17.png'),
    require('./../images/rlv_icon/18.png'),
    require('./../images/rlv_icon/19.png'),
    require('./../images/rlv_icon/20.png'),
    require('./../images/rlv_icon/21.png'),
    require('./../images/rlv_icon/22.png'),
    require('./../images/rlv_icon/23.png'),
    require('./../images/rlv_icon/24.png'),
    require('./../images/rlv_icon/25.png'),
    require('./../images/rlv_icon/26.png'),
    require('./../images/rlv_icon/27.png'),
    require('./../images/rlv_icon/28.png'),
    require('./../images/rlv_icon/29.png'),
    require('./../images/rlv_icon/30.png'),
    require('./../images/rlv_icon/31.png'),
];

//vip等级
const VIP_ICON = [
    require('./../images/noble/1101.gif'),
    require('./../images/noble/1102.gif'),
    require('./../images/noble/1103.gif'),
    require('./../images/noble/1104.gif'),
    require('./../images/noble/1105.gif'),
    require('./../images/noble/1106.gif'),
    require('./../images/noble/1107.gif'),
];

export default class LvIcon extends React.Component {
    static propTypes = {
        lv : PropTypes.any,
        type : PropTypes.any
    };

    static defaultProps = {
        type : 'rich'//默认客户等级
    };

    render() {
        const { lv, type} = this.props;
        let [lvIcon,style] = [null,styles.exp];

        //console.log(lvIcon)
        //console.log(lv)
        if((type == 'rich' && lv <= 1) || !lv || lv == "0") {
            return null;
        }
        else {
            //主播
            switch (type) {
                case 'exp':
                    lvIcon = EXP_ICON[lv-1];
                    break;

                case 'rich':
                    lvIcon = RICH_ICON[lv-1];
                    style = styles.rich;
                    break;

                case 'vip':
                    lvIcon = VIP_ICON[lv-1101];
                    style = styles.vip;
                    break;

                default:
                    lvIcon = null;
            }

            return (
                <Image
                    style={style}
                    source={lvIcon}
                    />
            )
        }
    }
}

const styles = StyleSheet.create({
    rich: {
        height:15,
        resizeMode:'contain'
    },
    exp: {
        height:20,
        resizeMode:'contain'
    },
    vip: {
        height:20,
        resizeMode:'contain'
    }
})
