import {TabNavigator} from 'react-navigation';
import Home from "../view/page/Home";
import Album from "../view/page/Album";
import AbuoutMe from "../view/page/AbuoutMe";
import LoginWelcomVIew from "../view/page/abuoutMe/LoginWelcomVIew";
import LoginReginView from "../view/page/abuoutMe/LoginReginView";
import MusicView from "../view/page/home/MusicView";
import PlayMusicView from "../view/page/album/PlayMusicView";

let tabMyNavigator = TabNavigator({
        Home: {
            screen: Home,
        },
        Album: {
            screen: Album,
        },
        AbuoutMe: {
            screen: AbuoutMe,
        },
    },
    {
        initialRouteName: 'Home',
        animationEnabled: true, // 切换页面时不显示动画
        tabBarPosition: 'bottom', // 显示在底端，android 默认是显示在页面顶端的
        swipeEnabled: false, // 禁止左右滑动
        backBehavior: 'home', // 按 back 键是否跳转到第一个 Tab， none 为不跳转
        //lazy:true,
        tabBarOptions: {
            activeTintColor: 'red', // 文字和图片选中颜色
            inactiveTintColor: '#999', // 文字和图片默认颜色
            showIcon: true, // android 默认不显示 icon, 需要设置为 true 才会显示
            indicatorStyle: {height: 0}, // android 中TabBar下面会显示一条线，高度设为 0 后就不显示线了， 不知道还有没有其它方法隐藏？？？
            style: {
                backgroundColor: '#fff', // TabBar 背景色n
            },
            labelStyle: {
                fontSize: 12, // 文字大小
            },
        },
    });

let myNavigationOptions = ({navigation}) => {
    let {title, name} = navigation.state.params;
    title = title || name;
    if (!title) {
       // title = navigation.state.routeName
        title=' '
    }
    return {title}
}

const createNavScreen = (screen) => ({
    screen,
    navigationOptions: myNavigationOptions,
})

global.G_NavAppRoutConfig = {
    Main: {screen: tabMyNavigator},
    LoginWelcomVIew: createNavScreen(LoginWelcomVIew),
    LoginReginView: createNavScreen(LoginReginView),
    MusicView:createNavScreen(MusicView),
    PlayMusicView:createNavScreen(PlayMusicView),
}

global.G_NavAppOptionsConfig = {
    navigationOptions: {
        // headerBackTitle:null,
        headerTintColor: "white",
        showIcon: true,
        swipeEnabled: false,
        animationEnabled: true,
        //headerTitleStyle: {backgroundColor: 'red'},
        headerStyle: {backgroundColor: G_Theme.TGreen},
        headerBackTitle:null
    },
    mode: 'card',
    headerMode:"screen"
}


global.G_InitRegistApp = false;
global.G_Navigation = null;
global.G_NavState = null;
global.G_MusicNow={};
global.G_NavUtil = {
    pushToView: (componet: String, params) => {
        // TLog("G_Navigation--pushToView==="+componet,G_Navigation)
        if (G_NavState.routes[G_NavState.routes.length - 1].routeName != componet) {
            G_Navigation.navigate(componet, params);
        }
    },
    pop: () => {
        G_Navigation.goBack();
    },
}









