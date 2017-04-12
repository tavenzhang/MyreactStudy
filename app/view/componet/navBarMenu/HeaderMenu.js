import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native'
import AIcon from 'react-native-vector-icons/FontAwesome';

export class HeaderPlusRightMenu extends React.Component {
    render() {
        return (<AIcon color="white" size={23} name={EnumFontNames.plus}/>)
    }
}

export class HeaderSD11Choose5 extends React.Component {
    render() {
        return (
                 <View style={[{flexDirection:"row"}]}>
                    <Text key={'title'} style={styles.title}>{this.props.title}</Text>
                    <AIcon color="white" style={{marginLeft:5}} size={16} name={EnumFontNames.list_arrow_desc}/>
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
        return (<View><Text style={{fontSize:14,color:"white", fontWeight:"bold"}}>切换域名</Text></View>)
    }
}

const styles = StyleSheet.create({
    navigationBarContainer: {
        flexDirection: 'row',
        height: GlobelTheme.NavigatorHeadH,
        alignItems: 'center',
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.5,
        backgroundColor: '#d7213c',
    },
    titleContain: {
        position: 'absolute',
        width: GlobelTheme.screenWidth,
        height: GlobelTheme.NavigatorHeadH,
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
})


