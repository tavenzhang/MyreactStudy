import React from 'react';
import {
    View,
} from 'react-native';
import BaseView from "../componet/BaseView";
import {connect} from 'react-redux';
import GameList from "./home/subview/GameList";
import MyBannerSwiper from "../componet/MyBannerSwiper";
import AIcon from 'react-native-vector-icons/FontAwesome';
import {NavButtonText} from "../componet/navBarMenu/HeaderMenu";
import ConfigView from "./home/subview/ConfigView";

const mapStateToProps = state => {
    return {
        appModel:state.get("appState").get("appModel"),
        gameModel: state.get("appState").get("gameModel"),
        playModel: state.get("appState").get("playModel"),
        userData: state.get("appState").get("userData").toJS(),
    }
}

@connect(mapStateToProps)
export default class Home extends BaseView {

    static navigationOptions = ({navigation})=> ({
        title: "大厅",
        tabBarIcon: ({focused}) => {
            return <AIcon name='home' style={{ fontSize: 25, color:focused ? G_Theme.selectColor:G_Theme.gray}}/>
        },
        headerRight:<NavButtonText name={"客服"} navigation={navigation}/>,
    })

    constructor(props) {
        super(props);
        this.state = {
               showBanner:false,
          };
    }


    onRightPressed(){
        let {appModel}=this.props;
        G_NavUtil.pushToView(G_NavViews.TWebView({data:appModel.data.data.qs_link,title:"客服"}))
    }

    renderBody() {
        let {gameModel} = this.props;
        let gameList = gameModel.gameInfoList;
        gameList = gameList ? gameList :[];
        let bannerList = [{
            url: `${G_SERVERADDR}/i/home/home_activity_banne1r3.jpg`,
            name: "活动1",
            data: "http://www.baidu.com"
        }, {
            url: `${G_SERVERADDR}/i/home/home_activity_banner12.jpg`,
            name: "活动2",
            data: "http://www.baidu.com"
        }, {
            url: `${G_SERVERADDR}/i/home/home_activity_banne1r2.jpg`,
            name: "活动3",
            data: "http://www.google.com"
        }]
        return (
            <View style={[G_Style.appContentView,{backgroundColor:"#f1f1f1"}]}>
                {this.state.showBanner||G_PLATFORM_IOS ? <MyBannerSwiper dataList={bannerList} {...this.props} />:null}
                <GameList dataList={gameList} {...this.props} />
            </View>
        );
    }

    componentDidMount() {
        G_MyStorage.getItem(G_EnumStroeKeys.DO_MAIN, (data) => {
            if(data&&data!="") {
                G_SERVERADDR=data;
            }
            ActDispatch.FetchAct.fetchVoWithAction(HTTP_SERVER.GET_GAME_LIST_INFO, ActionType.AppType.GAMELIST_RESULT);
            ActDispatch.FetchAct.fetchVoWithAction(HTTP_SERVER.GET_PLAY_LIST_INFO, ActionType.AppType.PLAY_LIST_RESULT);
            ActDispatch.FetchAct.fetchVoWithAction(HTTP_SERVER.GET_DATA_DEATIL, ActionType.AppType.MOBILE_TYPES_RESULT);
        })
       !G_PLATFORM_IOS ? setTimeout(()=>{this.setState({showBanner:true})},1000):null;
        setTimeout (()=>G_MyStorage.getItem(G_EnumStroeKeys.USR_DATA, (data) => {
            if(data&&data!="")
            {
                let udata=JSON.parse(data)
                if(udata)
                {
                    ActDispatch.AppAct.setStorgeUser(udata.username,udata.srcPwd);
                }
            }
        }),2000)

        setTimeout(()=>{
            ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.notice_ALL_Lottery,(data)=>{
                if(data.isSuccess)
                {
                    ActDispatch.AppAct.setAwardList(data.data);
                }
            },true)
            ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.GET_LIST_SYSTEM, (result) => {
                if (result.data.data) {
                    ActDispatch.AppAct.setNoticeList(result.data.data);
                }
            },true);

        },1000)

    }
}
