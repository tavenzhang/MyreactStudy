/**
 * Created by soga on 16/10/24.
 */
'use strict';

import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    InteractionManager
} from 'react-native';

//组件
import { Header, ActivityPanel } from '../components';

//actions
import { appAct, appAN, fetchData } from '../actions';

//config
import { REQURL, CONFIG, STYLE, WINDOW } from '../config';


export default class ActivityPage extends Component {
    constructor(props) {
        super(props);
        
    }
    
    
    componentDidMount() {
        //交互管理器在任意交互/动画完成之后，允许安排长期的运行工作. 在所有交互都完成之后安排一个函数来运行。
        InteractionManager.runAfterInteractions(() => {
            //加载数据
            const {dispatch,activityList} = this.props;
            if(!activityList.length) {
                dispatch(fetchData({
                    url : REQURL.getActivity.url,
                    requestType : REQURL.getActivity.type,
                    successAction: appAN.UPDATE_ACTIVITY_LISTS
                }));
            }
        });

    }

    
    render() {
        let { activityList } = this.props;
        let actContent = null;

        if(activityList.length) {
            actContent = <View>
                        {activityList.map((item, index) => {
                            return (
                                <ActivityPanel
                                    key={index}
                                    img={{uri : CONFIG.imageServe + item.temp_name }}
                                    title={item.title}
                                    start_time={item.start_time}
                                    end_time={item.end_time}
                                    />
                            )
                        })}
                    </View>
        }
        return (
            <View style={{flex: 1}}>
                <Header
                    title='活动中心'
                    leftIcon='chevron-left'
                    leftIconAction={()=>{
                        InteractionManager.runAfterInteractions(()=>{
                            this.props.navigator.pop();
                        })
                    }}
                    />
                {actContent}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    noContent: {
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        height:WINDOW.height/2
    },
});