import React from 'react';
import {
    View,
    Text,
    StyleSheet, ScrollView
} from 'react-native';
import BaseView from "../../../../componet/BaseView";
import {TButton} from "../../../../componet/tcustom/button/TButton";
import {TTextInput} from "../../../../componet/tcustom/textInput/TTextInput";

export  default class MessageDetail extends BaseView {

    constructor(props) {
        super(props)
        this.state = {
            data: {},
            isShowButton:false,
            isReadState:true,
            mailContent:""
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
        let contentView = null;
        TLog("this.state.isShowButto==="+this.state.isShowButton+"---type_id"+ this.state.data.type_id,this.state.data.type_id==2)
        if(this.state.data.id){
            if(this.state.isReadState)
            {
                contentView = <View style={[G_Style.appContentView]}>
                    <View style={{padding:5}}>
                        <Text style={{fontSize:12,color:G_Theme.grayDeep}}> {this.state.data.updated_at}</Text>
                        <Text style={{fontSize:12,color:G_Theme.grayDeep}}>【{typeName}】 </Text>
                    </View>
                    <ScrollView style={{flex:1}}>
                        <View style={{
                            margin:5,padding:10,
                        }} >
                            <Text style={{fontSize:14,lineHeight:30}}>{`      ${this.state.data.content}`}</Text>
                            <TButton onPress={this.onPressReplay} visible={this.state.isShowButton&&this.state.data.type_id==2} btnName="回复" viewStyle={styles.viewStyle}/>
                        </View>
                    </ScrollView>
                </View>
            }
            else{
                contentView = <View  style={[G_Style.appContentView]}>
                    <View style={{padding:5}}>
                        <Text style={styles.textWriteStyle}> "回复信息"</Text>
                    </View>
                    <TTextInput viewStyle={{marginHorizontal:20, height: 250,borderWidth:1, borderColor:"gray"}}
                                multiline={true}
                                placeholder={"请输入详细内容！"}
                                onChangeText={(mailContent)=>this.setState({mailContent})}
                                value={this.state.mailContent}/>
                    <TButton onPress={this.onPressReplay}
                             visible={this.state.isShowButton&&this.state.data.type_id==2}
                             btnName="发送" containerStyle={{backgroundColor:"green"}} viewStyle={styles.viewStyle}/>
                </View>
            }

         }

        return (<View style={[G_Style.appContentView]}>
                 {contentView}
                </View>);
    }

    componentDidMount() {
        let {id} = this.props.navigation.state.params
        HTTP_SERVER.LETTER_DETAIL.url = HTTP_SERVER.LETTER_DETAIL.formatUrl.replace(/#id/g, id);
            ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.LETTER_DETAIL, (result) => {
                if (result.data) {
                    this.setState({data: result.data,isShowButton:true});
                }
            })
        }

      onPressReplay=()=>{
          this.setState({isReadState:false});
        }
}

const styles = StyleSheet.create({
    textWriteStyle: {
        fontSize:20,
        fontWeight:"bold",
        alignSelf:"center",
        color:"gray"
    },
    btnView:{
        width: 200,alignSelf:"center",
        marginTop: 30
    }
});
