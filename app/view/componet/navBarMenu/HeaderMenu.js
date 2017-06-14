import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native'
import AIcon from 'react-native-vector-icons/FontAwesome';

export class NavRightButton extends React.PureComponent {

    render() {
        let {name} = this.props
        return (<View><Text style={{fontSize: 16, color: "white", fontWeight: "bold"}}>{name}</Text></View>)
    }
}

export class HeaderPlusRightMenu extends React.PureComponent{
    render() {
        return (<AIcon color="white" size={23} name={G_EnumFontNames.plus}/>)
    }
}



export class HeaderRightLoginOut extends React.PureComponent {
    render() {
        return (<View><Text style={{fontSize: 16, color: "white", fontWeight: "bold"}}>注销</Text></View>)
    }
}

export class HeaderLeftDomain extends React.PureComponent {
    render() {
        return (<View><Text style={{fontSize: 14, color: "white", fontWeight: "bold"}}>设置</Text></View>)
    }
}

export class GAME_DERAIL extends React.PureComponent {
    render() {
        return <AIcon name={G_EnumFontNames.bars} style={styles.barRightIcon}/>
    }
}


export class NavRightRank extends React.PureComponent {
    render() {
        return <NavRightButton name={"本月排名"}/>
    }
}
export class NavRightLink extends React.PureComponent {
    render() {
        return <NavRightButton name={"查看链接"}/>
    }
}

const styles = StyleSheet.create({
    navigationBarContainer: {
        flexDirection: 'row',
        height: G_Theme.navigatorHeadH,
        alignItems: 'center',
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.5,
        backgroundColor: '#d7213c',
    },
    titleContain: {
        position: 'absolute',
        width: G_Theme.windowWidth,
        height: G_Theme.navigatorHeadH,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 17,
        color: "#fff",
        fontWeight: "900",
        textAlign: 'center',
    },
    leftMenu: {
        position: 'absolute',
        left: 10,
        bottom: 10,
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center"
    },
    rightMenu: {
        position: 'absolute',
        right: 10,
        bottom: 10,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',

    },
    barRightIcon: {
        color: '#fff',
        fontSize: 20
    }
})


