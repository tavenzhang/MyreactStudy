import React from 'react';
import {
    View,
    Modal,
    Text,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import BaseView from "../../componet/BaseView";
import {connect} from 'react-redux';
import GameList from "./subview/GameList";
import MyBannerSwiper from "../../componet/MyBannerSwiper";
import {HeaderLeftDomain} from "../../componet/navBarMenu/HeaderMenu";

const mapStateToProps = state => {
    return {
        bannerList: state.get("homeState").get("gameModel"),
        gameModel: state.get("appState").get("gameModel"),
        playModel: state.get("appState").get("playModel")
    }
}

@connect(mapStateToProps)
export default class Home extends BaseView {
    constructor(props) {
        super(props);
        this.state =
            {modalVisible: false,
                domain:""
        };
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    getNavigationBarProps() {
        return {leftView: HeaderLeftDomain};
    }

    renderBody() {
        let {bannerList, gameModel, playModel} = this.props;
        let gameList = gameModel.gameInfoList;
        bannerList = [{
            url: `${SERVERADDR}/dist/i/home/home_activity_banner2.jpg`,
            name: "活动1",
            data: "http://www.baidu.com"
        }, {
            url: `${SERVERADDR}/dist/i/home/home_activity_banner2.jpg`,
            name: "活动2",
            data: "http://www.baidu.com"
        }, {
            url: `${SERVERADDR}/dist/i/home/home_activity_banner2.jpg`,
            name: "活动3",
            data: "http://www.google.com"
        }]
        return (
            <View style={GlobeStyle.appContentView}>
                <Modal
                    animationType={"slide"}
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        alert("Modal has been closed.")
                    }}
                    hardwareAccelerated={true}
                    style={{backgroundColor: "blue", justifyContent: "center", alignItems: "center"}}
                >
                    <View style={[GlobeStyle.appContentView, {
                        justifyContent: "center", alignItems: "center",
                    }]}>
                        <View>
                            <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                                <Text>请输入新域名:</Text>
                                <TextInput
                                    style={{marginLeft: 10, paddingLeft: 5,width: 220, borderRadius: 5, borderWidth: 1, fontSize: 14, height: 30}}
                                    placeholder={"新域名(www.hao123.com 或使用Ip:port)"}
                                    autoCapitalize={"none"}
                                    onChangeText={(domain) => this.setState({domain})}
                                    value={this.state.domain}
                                />
                            </View>
                            <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center",
                                marginTop:
                            40}}>
                                <TouchableOpacity style={{alignSelf: "center", flex:1, alignItems:"center"}} onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible)
                                    MyStorage.setItem(EnumStroeKeys.DO_MAIN, "http://"+this.state.domain,()=>{
                                        TLog("this.state.domain-----",);
                                        ActDispatch.AppAct.showBox("域名更新成功，请重启app 生效！")
                                    });
                                }}>
                                    <Text style={{borderWidth:1, margin:15, padding:5, backgroundColor:"green"}}>确认修改</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{alignSelf: "center", flex:1,alignItems:"center"}} onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible)
                                }}>
                                    <Text style={{borderWidth:1, margin:15,padding:5,backgroundColor:"red"}}>取消</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                <MyBannerSwiper dataList={bannerList} {...this.props}/>
                <GameList dataList={gameList} gameModel={gameModel} playModel={playModel}/>
            </View>
        );
    }

    componentDidMount() {
        MyStorage.getItem(EnumStroeKeys.DO_MAIN, (data) => {
            if(data&&data!="")
            {
                SERVERADDR=data;
            }
            ActDispatch.FetchAct.fetchVoWithAction(HTTP_SERVER.GET_GAME_LIST_INFO, ActionType.AppType.GAMELIST_RESULT, false);
            ActDispatch.FetchAct.fetchVoWithAction(HTTP_SERVER.GET_PLAY_LIST_INFO, ActionType.AppType.PLAY_LIST_RESULT, false);
            ActDispatch.FetchAct.fetchVoWithAction(HTTP_SERVER.GET_DATA_DEATIL, ActionType.AppType.MOBILE_TYPES_RESULT, false);
            //ActDispatch.FetchAct.fetchVoWithAction(HTTP_SERVER.GET_BANG_CITY_INFO,ActionType.AppType.BANG_CITY_INFO,false);
        })
    }

    onLeftPressed() {
        this.setState({modalVisible: true});
    }


}
