import React, {PropTypes} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import AIcon from 'react-native-vector-icons/FontAwesome';

export class NavButtonView extends React.PureComponent {
    static propTypes = {
        navigation: PropTypes.any,
        isRightButton:PropTypes.bool
    }

    onPress = () => {
        let  {navigation,isRightButton}=this.props;
        let {onRightPressed,onLeftPressed} = navigation.state.params;
        if(isRightButton) {
            onRightPressed()
        }
        else{
            onLeftPressed()
        }
    }
    render() {
        let {isRightButton} = this.props
        let custStyle={
            marginLeft:isRightButton ? 0:15,
            marginRight:isRightButton ? 15:0
        }
        return (<TouchableOpacity  onPress={this.onPress}>
            <View style={custStyle}>
                {this.props.children}
            </View>
        </TouchableOpacity>)
    }
}




export class NavComomButton extends React.PureComponent {
    static propTypes = {
        name: PropTypes.string,
        navigation: PropTypes.any,
        isRightButton:PropTypes.bool
    }
    render() {

        let {name} = this.props
        return (<NavButtonView {...this.props}>
                  <Text style={[{fontSize: 16, color: "white", fontWeight: "bold" }]}>
                      {name}
                      </Text>
                </NavButtonView>)
    }
}


export class NavAIcoButton extends React.PureComponent {
    static propTypes = {
        name: PropTypes.string,
        navigation: PropTypes.any,
        isRightButton:PropTypes.bool,
        icoName:PropTypes.string
    }

    render() {
        let {icoName}=this.props
        return  (<NavButtonView {...this.props}>
                    <AIcon color="white" size={23} name={icoName}/>
                </NavButtonView>)
    }
}




export class HeaderPlusRightMenu extends React.PureComponent {
    render() {
        return (<AIcon color="white" size={23} name={G_EnumFontNames.plus}/>)
    }
}




export class GAME_DERAIL extends React.PureComponent {
    render() {
        return <AIcon name={G_EnumFontNames.bars} style={styles.barRightIcon}/>
    }
}


export class NavRightRank extends React.PureComponent {
    render() {
        return <NavComomButton name={"本月排名"}/>
    }
}
export class NavRightLink extends React.PureComponent {
    render() {
        return <NavComomButton name={"查看链接"}/>
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


