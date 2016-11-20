/**
 * Created by soga on 16/11/1.
 */
import React, {Component,PropTypes} from 'react';
import {
    View,
} from 'react-native';
import {RankListPanel} from './../';

import {STYLE,CONFIG} from '../../config'

import {LvIcon} from '../';
import Icon from 'react-native-vector-icons/FontAwesome';

class AudienceList extends Component {

    static propTypes = {
        data : PropTypes.any.isRequired,
        type : PropTypes.string
    };

    static defaultProps = {
    };

    render() {
        const { data, type } = this.props;

        return (
            <View style={{ alignItems:'center'}}>
                {data.map(( anchor, index ) => {

                    //等级icon
                    let lvIcon = <LvIcon lv={anchor.richLv} />

                    //贵族
                    let vipIcon = <LvIcon lv={anchor.vip} type="vip" />

                    const lvIcons = <View style={{
                                                flexDirection:'row',
                                                alignItems: 'center',
                                                justifyContent:'flex-end',
                                                width: 100,
                                                }}>
                                        {vipIcon}
                                        {lvIcon}
                                    </View>

                    anchor.username = anchor.name;

                    //头像
                    const headimg = anchor.headimg ? {uri: CONFIG.imageServe + anchor.headimg} : require('../../images/avatar_default.png');

                    return (
                        <RankListPanel
                            key={index}
                            rightIcon={lvIcons}
                            headimg={headimg}
                            name={anchor.name}
                            num={<Icon name="user" size={25} color={ type=="audience" ? '#05e815' : STYLE.second } />}
                            />
                    )
                })}
            </View>
        )
    }};

export default AudienceList;