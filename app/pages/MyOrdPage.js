/**
 * Created by soga on 16/10/25.
 */
import React, {Component} from 'react';
import {
    View,
    InteractionManager
} from 'react-native';

import {Header,VideoLists} from '../components';
import { RoomContainer } from '../containers'


import { appAct, fetchData, appAN } from '../actions';
import { REQURL } from '../config';

export default class MyOrdPage extends Component {
    constructor(props){
        super(props);
        this.onRefresh = this.onRefresh.bind(this);
    }

    /**
     * 进房间
     * @param props
     * @returns {XML}
     * @private
     */
    enterRoom(d) {
        InteractionManager.runAfterInteractions(()=>{
            this.props.navigator.push({
                name: 'RoomContainer',
                component: RoomContainer,
                passProps: {
                    type: 'normal',
                    roomid: d,
                }
            })
        })
    }

    render(){
        const { myRes } = this.props;

        return (
            <View style={{flex:1}}>
                <Header
                    title='我的预约'
                    leftIcon='chevron-left'
                    leftIconAction={()=>{
                        InteractionManager.runAfterInteractions(()=>{
                            this.props.navigator.pop();
                        })
                    }}
                    />
                <VideoLists
                    data={myRes}
                    type="subPage"
                    action={(d)=>this.enterRoom(d)}
                    onRefresh={()=>this.onRefresh()} />
            </View>
        )
    }

    onRefresh() {
        const {dispatch} = this.props;
        dispatch(fetchData({
            url : REQURL.getUserInfo.url,
            requestType : REQURL.getUserInfo.type,
            successAction: appAN.UPDATE_USERINFO
        }));
    }
}