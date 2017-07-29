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
        G_NavUtil.push(G_RoutConfig.TWebView,{data:appModel.data.data.qs_link,title:"客服"})
    }

    renderBody() {
        let {gameModel,appModel} = this.props;
        let bannerList = appModel.bannerList ? appModel.bannerList :[];
        let gameList = gameModel.gameInfoList; //bannerList
         gameList = gameList ? gameList :[];
        return (
            <View style={[G_Style.appContentView,{backgroundColor:"#f1f1f1"}]}>
                {this.state.showBanner||G_PLATFORM_IOS ? <MyBannerSwiper dataList={bannerList} {...this.props} />:null}
                <GameList onLoadMore={this.onLoadMore} dataList={gameList} {...this.props} />
            </View>
        );
    }

    onLoadMore=(callBack,flush)=>{
        if(flush){
           this.componentDidMount()
        }
    }

    componentDidMount() {
        G_MyStorage.getItem(G_EnumStroeKeys.DO_MAIN, (data) => {
           if(data&&data!="") {
               G_SERVERADDR=data;
            }
            ActDispatch.FetchAct.fetchVoWithAction(HTTP_SERVER.GET_GAME_LIST_INFO, ActionType.AppType.GAMELIST_RESULT);
            ActDispatch.FetchAct.fetchVoWithAction(HTTP_SERVER.GET_PLAY_LIST_INFO, ActionType.AppType.PLAY_LIST_RESULT,null,true);
            ActDispatch.FetchAct.fetchVoWithAction(HTTP_SERVER.GET_DATA_DEATIL, ActionType.AppType.MOBILE_TYPES_RESULT,null,true);
        })
       !G_PLATFORM_IOS ? setTimeout(()=>{this.setState({showBanner:true})},1000):null;
        setTimeout (()=>G_MyStorage.getItem(G_EnumStroeKeys.USR_DATA, (data) => {
            if(data&&data!="")
            {
                try {
                    let udata=JSON.parse(data)
                    if(udata) {
                        ActDispatch.AppAct.setStorgeUser(udata.username,udata.srcPwd);
                    }
                }
                catch (err) {
                    TLog(`callback error<----------${action.url}:`, err);
                }
            }
        }),1000)
    }
}
