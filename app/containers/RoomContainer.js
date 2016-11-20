/**
 * Created by soga on 16/10/30.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import RoomPage from '../pages/RoomPage';

class RoomContainer extends Component {
    render() {
        return (
            <RoomPage {...this.props} />
        )
    }
}

const mapStateToProps = state => {
    return {
        isLogin : state.appState.isLogin,
        uid : state.appState.userInfo.uid || 0,
        money : state.appState.userInfo.points || 0,
        slideIndex : state.appState.videoSlideIndex,
        audiences : state.wsState.audiences,
        messages : state.wsState.messages,
        roomMsg : state.wsState.roomMsg,
        historyGifts : state.wsState.historyGifts,//历史贡献
        todayGifts : state.wsState.todayGifts,//当日贡献
        gifts : state.wsState.gifts,//礼物列表
        openGiftDialog : state.wsState.openGiftDialog,//是否弹出礼物列表
        slideGiftIndex : state.wsState.slideGiftIndex,//礼物选择tab
        videoUrls : state.wsState.videoUrls,//下播地址
        seleVideoSrc : state.wsState.seleVideoSrc,//当前选中的下播地址
        admins : state.wsState.admins,//管理员
        currentSeleGift : state.wsState.currentSeleGift,//当前选中的礼物值
        hosterName : state.wsState.hoster.name,//房间主播名字
        alertDialog : state.wsState.alertDialog,//弹出框信息
        socketConnect : state.wsState.socketConnect,//socket链接状态
        userMount : state.wsState.userMount,//坐骑用户进入房间
        sendGifts : state.wsState.sendGifts,//用户送的礼物
        showVideo : state.wsState.showVideo,//显示视频
        moneyTotal : state.wsState.moneyTotal,//本日总砖石数
    }
}

export default connect(mapStateToProps)(RoomContainer);