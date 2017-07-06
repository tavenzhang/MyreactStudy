import React from 'react';
import {
    View,
    WebView,
    StyleSheet,
    Text
} from 'react-native';
import BaseView from "../../../componet/BaseView";


export  default class NoticeDeailView extends BaseView {

    constructor(props) {
        super(props)
        this.state = {
            data: {}
        }
    }

    renderBody() {
        let typeInfo = this.state.data.msg_type;
        const {data} = this.state;
        let typeName = "";
        for (let key in typeInfo) {
            if (this.state.data.type_id == key) {
                typeName = typeInfo[key];
            }
        }
        TLog('typeName', typeName);
        return (
            <View style={[G_Style.appContentView,{backgroundColor:G_Theme.gray}]}>
                <View style={styles.titleBar}>
                    <Text style={{fontSize:16,}}>{data.title} </Text>
                    <Text style={{fontSize:12,color:G_Theme.grayDeep}}>发布时间:{data.created_at} </Text>
                </View>
                <WebView style={{backgroundColor:G_Theme.primary}} source={{html: data.content}} automaticallyAdjustContentInsets={false}/>
            </View>
        );
    }

    componentDidMount() {
        let {id} = this.props.navigation.state.params
        HTTP_SERVER.GET_SYSTEM_DETAIL.url = HTTP_SERVER.GET_SYSTEM_DETAIL.formatUrl.replace(/#id/g, id);
        G_RunAfterInteractions(() => {
            ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.GET_SYSTEM_DETAIL, (result) => {
                if (result.data) {
                    this.setState({data: result.data})
                }
            })
        })
    }
}

const styles = StyleSheet.create({
    titleBar: {
        padding:10,
        borderBottomWidth: 1,
        alignItems:'center',
        backgroundColor:'#fff',
        justifyContent: "center",
        height:50,
        borderColor:G_Theme.gray,
    },

})
