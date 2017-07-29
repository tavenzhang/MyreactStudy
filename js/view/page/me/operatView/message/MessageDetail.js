import React from 'react';
import {
    View,
    Text,
    WebView, ScrollView
} from 'react-native';
import BaseView from "../../../../componet/BaseView";
import {TButton} from "../../../../componet/tcustom/button/TButton";

export  default class MessageDetail extends BaseView {

    constructor(props) {
        super(props)
        this.state = {
            data: {},
            isShowReplay:false
        }
    }

    renderBody() {
        let typeInfo=this.state.data.msg_type;
        let typeName="";
        for(let key in typeInfo)
        {
            if(`${this.state.data.type_id}`==key)
            {
                typeName = typeInfo[key];
            }
        }

        return (<View style={[G_Style.appView]}>
            <View style={{padding:5}}>
                <Text style={{fontSize:12,color:G_Theme.grayDeep}}> {this.state.data.updated_at}</Text>
                <Text style={{fontSize:12,color:G_Theme.grayDeep}}>【{typeName}】 </Text>
            </View>
            <ScrollView style={{flex:1}}>
              <View style={{
              margin:5,padding:10,
            }} >
                <Text style={{fontSize:14,lineHeight:30}}>{`      ${this.state.data.content}`}</Text>
                <TButton visible={this.state.isShowReplay} btnName="回复" viewStyle={{width: 200,alignSelf:"center",
                    marginTop:
                20}}/>
            </View>
            </ScrollView>

           {/*<WebView source={{html:this.state.data.content}}  style={{*/}
               {/*borderWidth:1,borderColor:G_Theme.gray,margin:5*/}
           {/*}} automaticallyAdjustContentInsets={false} />*/}
        </View>);
    }

    componentDidMount() {
        let {id} = this.props.navigation.state.params
        HTTP_SERVER.LETTER_DETAIL.url = HTTP_SERVER.LETTER_DETAIL.formatUrl.replace(/#id/g, id);
            ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.LETTER_DETAIL, (result) => {
                if (result.data) {
                    this.setState({data: result.data,isShowReplay:true});
                }
            })
        }
}