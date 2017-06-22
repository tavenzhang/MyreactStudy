import React from 'react';
import {
    View,
    WebView
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
        let typeName = "";
        for (let key in typeInfo) {
            if (`${this.state.data.type_id}` == key) {
                typeName = typeInfo[key];
            }
        }
        return (
            <View style={[G_Style.appContentView]}>
                <WebView source={{html: this.state.data.content}} automaticallyAdjustContentInsets={false}/>
            </View>
        );
    }

    componentDidMount() {
        let {id} = this.props.passProps
        HTTP_SERVER.GET_SYSTEM_DETAIL.url = HTTP_SERVER.GET_SYSTEM_DETAIL.formatUrl.replace(/#id/g, id);
        G_RunAfterInteractions(()=>{
            ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.GET_SYSTEM_DETAIL, (result) => {
                if (result.data) {
                    this.setState({data: result.data})
                }
            })
        })
    }
}