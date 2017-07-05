import React,{PropTypes} from 'react';
import {
    View
    , StyleSheet,
    Image,
} from 'react-native'

import {ImgHome} from "../../../assets/index";
import {TButtonImg} from "../../componet/button/TButton";
import {TTextInput} from "../../componet/textInput/TTextInput";

export default class HeaderSearchView extends React.PureComponent {
    static  propTypes={
        navigation:PropTypes.any
    }

    render() {
        let {navigation}=this.props
        return (
            <View style={{flexDirection: "row", paddingHorizontal: 10,alignItems:"center", paddingTop: 25, paddingBottom: 15,backgroundColor:"white"}}>
                <TButtonImg  img={ImgHome.mail} />
                <View style={{flexDirection: "row", flex: 1, marginHorizontal:20}}>
                    <TTextInput placeholder={""} viewStyle={{
                        borderRadius: 5, flex: 1,
                        marginHorizontal: 10, backgroundColor: "#ddd"
                    }} style={{paddingLeft: 20}}/>
                    <Image resizeMode={"center"}  source={ImgHome.find}
                            style={{alignSelf: "center", left: 10, position: "absolute"}}/>
                </View>
                <TButtonImg img={ImgHome.wave}/>
            </View>
        );
    }

    componentDidMount() {

    }


}


const styles = StyleSheet.create({
    itemHeadStyle: {
        alignItems: "center",
        borderRightWidth: 1,
        justifyContent: "center",
        textAlign: "center"
    },
    itemContentStyle: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    textHeadStyle: {
        fontSize: 14,
        fontWeight: "bold",

    },
    textItemStyle: {
        fontSize: 12,
        color: "gray"
    },
    row: {
        flexDirection: 'row',
        height: 50,
        borderBottomWidth: 0.5,
        marginLeft: 10,
        borderColor: "gray",
        // borderWidth: 1,
    },

});
