import React from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import BaseView from "../../componet/BaseView";
import {connect} from 'react-redux';
import GameList from "./subview/GameList";
import MyBannerSwiper from "../../componet/MyBannerSwiper";
import AIcon from 'react-native-vector-icons/FontAwesome';
import {HeaderLeftDomain} from "../../componet/navBarMenu/HeaderMenu";
import ConfigView from "./subview/ConfigView";
import Button from "../../componet/Button";

const mapStateToProps = state => {
    return {
        bannerList: state.get("homeState").get("gameModel"),
        gameModel: state.get("appState").get("gameModel"),
        playModel: state.get("appState").get("playModel"),
        userData: state.get("appState").get("userData").toJS(),
    }
}

@connect(mapStateToProps)
export default class Home extends BaseView {

 static navigationOptions = ({navigation})=>{
        //TLog("navigationOptions--",navigation)
        return {
            headerLeft: <Button btnName="domain" onPress={()=>{
                let {onLeftPressed} = navigation.state.params;
                 onLeftPressed()
            }}/>
            ,
            headerRight: <Button btnName="headerRight" onPress={()=>{
            }}/>
        }
    }

    constructor(props) {
        super(props);
        this.state =
            {
                modalVisible: false,
                domain:""
        };
        // let {setParams}=this.props.navigation
        // TLog("setParams-----",setParams);
        // console.log("this.props.navigation---",this.props.navigation)
        // setParams({onLeftPressed:this.onLeftPressed,test: 'me' })

    }

    setModalVisible=(visible)=> {
        this.setState({modalVisible: visible});
    }

    getNavigationBarProps() {
        return {leftView: HeaderLeftDomain};
    }

    render() {


        let {bannerList, gameModel, playModel,userData} = this.props;
        let gameList = gameModel.gameInfoList;
        bannerList = [{
            url: `${G_SERVERADDR}/dist/i/home/home_activity_banner2.jpg`,
            name: "活动1",
            data: "http://www.baidu.com"
        }, {
            url: `${G_SERVERADDR}/dist/i/home/home_activity_banner2.jpg`,
            name: "活动2",
            data: "http://www.baidu.com"
        }, {
            url: `${G_SERVERADDR}/dist/i/home/home_activity_banner2.jpg`,
            name: "活动3",
            data: "http://www.google.com"
        }]
        return (
            <View style={[G_Style.appContentView]} >
                <ConfigView modalVisible={this.state.modalVisible} setModalVisible={this.setModalVisible}/>
                <MyBannerSwiper dataList={bannerList} {...this.props}/>
                <GameList dataList={gameList} gameModel={gameModel} playModel={playModel} userData={userData}/>
            </View>
        );
    }

    // componentWillUpdate(){
    //  TLog("home---componentWillUpdate")
    // }

    componentDidMount() {
        //console.log("navigate navination------44-----------",this.props.navigation)

        G_MyStorage.getItem(G_EnumStroeKeys.DO_MAIN, (data) => {
            if(data&&data!="")
            {
                G_SERVERADDR=data;
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
const styles = StyleSheet.create({
    textStyle: {
        color: G_Theme.gray,
    },
    selectedTextStyle: {
        color: G_Theme.selectColor,
    },
    iconPress: {
        color: G_Theme.selectColor,
        fontSize: 25
    },
    iconNormal: {
        color: G_Theme.gray,
        fontSize: 25
    },
});