import React from 'react';
import {
    View,
    WebView,
    StyleSheet,
    Text
} from 'react-native';
import BaseView from "../../../componet/BaseView";

export  default class NoticeDeailView extends BaseView {

    static navigationOptions = ({navigation}) => {
        let {titleName, created_at} = navigation.state.params
        let title=titleName.length> 12 ? titleName.substr(0,10)+"...":titleName
        return {
            headerTitle:  titleName&&created_at ? <View style={styles.titleBar}>
                     <Text style={{fontSize:16,color:"white", fontWeight:"bold"}}>{title} </Text>
                      <Text style={{fontSize:12,color:"#ddd"}}>发布时间:{created_at} </Text>
                    </View>:null
        }
    }

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
        return (
            <View style={[G_Style.appContentView,{backgroundColor:G_Theme.gray}]}>
                <WebView style={{backgroundColor:"white"}} source={{html: data.content}} automaticallyAdjustContentInsets={false}/>
            </View>
        );
    }

    componentDidMount() {
        let {id} = this.props.navigation.state.params
        HTTP_SERVER.GET_SYSTEM_DETAIL.url = HTTP_SERVER.GET_SYSTEM_DETAIL.formatUrl.replace(/#id/g, id);
            ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.GET_SYSTEM_DETAIL, (result) => {
                if (result.data) {
                    this.setState({data: result.data});
                    this.props.navigation.setParams({titleName:result.data.title,created_at:result.data.created_at})
                }
            })
    }

    componentWillUnmount(){
        ActDispatch.FetchAct.canCelVoFetch( HTTP_SERVER.GET_SYSTEM_DETAIL)
    }
}

const styles = StyleSheet.create({
    titleBar: {
        alignItems:'center',
        justifyContent: "center",
        alignSelf:"center"
    },

})
