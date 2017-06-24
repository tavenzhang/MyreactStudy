import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native'
import AIcon from 'react-native-vector-icons/FontAwesome';

export class HeaderPlusRightMenu extends React.Component {
    render() {
        return (<AIcon color="white" size={23} name={G_EnumFontNames.plus}/>)
    }
}

export class HeaderMenuTitleView extends React.Component {
    render() {
        return (
                 <View style={[{flexDirection:"row"}]}>
                    <Text key={'title'} style={styles.title}>{this.props.title}</Text>
                    <AIcon color="white" style={{marginLeft:5}} size={16} name={G_EnumFontNames.list_arrow_desc}/>
                </View>
        )
    }
}

export class HeaderRightLoginOut extends React.Component {
    render() {
        return (<View><Text style={{fontSize:16,color:"white", fontWeight:"bold"}}>注销</Text></View>)
    }
}

export class HeaderLeftDomain extends React.Component {
    render() {
        return (<View><Text style={{fontSize:14,color:"white", fontWeight:"bold"}}>设置</Text></View>)
    }
}

export class GAME_DERAIL extends React.Component {
    render() {
        return  <AIcon name={G_EnumFontNames.bars} style={styles.barRightIcon} />
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


