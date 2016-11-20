/**
 * Created by soga on 16/10/11.
 */

import {Dimensions} from 'react-native';

export const WINDOW = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
};


//样式配置
export const STYLE = {
    primary:'#f464a2',
    second:'#448AFF',
    gray:'#999',
    black:'#222',
    fontSizeNormal:14,
    fontSizeSmall:12,
    fontSizeLarge:18,
    headerBannerHeight:45,//app顶部banner高
    menuBottomHeight:50,//底部菜单高
    swipHeaderHeight:50,//切换title的高度
}


//export const SERVERADDR = "http://www.newvf.com";
export const SERVERADDR = "http://www.o-front-test.com";
//export const SERVERADDR = "http://www.lgfxiu.com";

//接口配置
export const REQURL = {
    getVideoAll         : { url : SERVERADDR + "/videolistall.json", type : 'GET'},//大厅全部数据
    getVideoRec         : { url : SERVERADDR + "/videolistrec.json", type : 'GET'},//今日之星数据
    getVideoSls         : { url : SERVERADDR + "/videolistsls.json", type : 'GET'},//大秀场数据
    getVideoOrd         : { url : SERVERADDR + "/videolistord.json", type : 'GET'},//一对一数据
    getUserInfo         : { url : SERVERADDR + "/indexinfo", type : 'GET'},//用户数据
    getMyRecord         : { url : SERVERADDR + "/member/consumerd?type=json", type : 'GET'},//获取我的消费记录
    getMyMsg            : { url : SERVERADDR + "/member/msglist?type=json", type : 'GET'},//获取我的消息记录
    getMyMount          : { url : SERVERADDR + "/member/scene?type=json", type : 'GET'},//获取我的道具
    equipMount          : { url : SERVERADDR + "/member/scene", type : 'GET'},//装配坐骑
    cancelMount         : { url : SERVERADDR + "/member/cancelscene?type=json", type : 'GET'},//取消坐骑
    login               : { url : SERVERADDR + "/login", type : 'POST'},//登录
    logout              : { url : SERVERADDR + "/logout?type=json", type : 'POST'},//退出
    getShops            : { url : SERVERADDR + "/shop?type=json", type : 'GET'},//获取商品信息
    register            : { url : SERVERADDR + "/reg", type : 'POST'},//注册
    //getVData            : { url : SERVERADDR + "/videolist.json", type : 'GET'},//获取排行榜相关数据
    getActivity         : { url : SERVERADDR + "/act?type=json", type : 'GET'},//获取活动信息
    getActivityDetail   : { url : SERVERADDR + "/nac/", type : 'GET'},//获取活动详细信息
    getUid              : { url : SERVERADDR + "/getUid", type : 'GET'},//获取用户id
    payMount            : { url : SERVERADDR + "/member/pay", type : 'POST'},//购买坐骑
    getVIPMount         : { url : SERVERADDR + "/getvipmount", type : 'POST'},//领取VIP坐骑
    openVIP             : { url : SERVERADDR + "/openvip", type : 'GET'},//开通vip
    reSetPassword       : { url : SERVERADDR + "/member/password", type : 'POST'},//重置密码
    editUserInfo        : { url : SERVERADDR + "/member/edituserinfo", type : 'POST'},//编辑个人信息
    search              : { url : SERVERADDR + "/find", type : 'GET'},//编辑个人信息


    getVData            : { url : "http://v.lgfxiu.com/video_gs/rank/data_ajax", type : 'GET'},//获取排行榜相关数据
    getGifts            : { url : "http://v.lgfxiu.com/video_gs/conf", type : 'POST'},//获取礼物数据
    getSendGiftsLists   : { url : "http://v.lgfxiu.com/video_gs/rank/list_gift", type : 'GET', model : 'jsonp'},//获取礼物清单
    socketAddr          : { url : "http://v.o-front-test.com/video_gs/mobileServer", type : 'GET', model : 'jsonp'},//获取socket地址

};

//基本配置
export const CONFIG = {
    //imageServe : "http://138.68.15.251/",
    giftPath : "http://www.lgfxiu.com/flash/image/",
    imageServe : "http://138.68.15.251/"
    //imageServe : "http://p.lgfxiu.com/",
};


//socket配置
export const SOCKET = {
    host : "139.59.240.47",
    //host : "192.168.5.196",
    ports : {//一般请求：20036  聊天：20037  送礼：20038
        common : 20036,
        chat : 20037,
        gift : 20038
    },
    AES_IV : "0102030405060708",// AES密匙偏移量
    WS_SECTRITY : '35467ug$#6ighegw',//AES加密密匙,通用socket
    WSCHAT_SECTRITY : '985tj@48hgi95353',//AES加密密匙,聊天
    WSGIFT_SECTRITY : '58it^43(&#gig&*7jj'//AES加密密匙,礼物
};
