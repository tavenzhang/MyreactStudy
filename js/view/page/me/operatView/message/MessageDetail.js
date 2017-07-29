import React from 'react';
import {
    View,
    Text,
    StyleSheet, ScrollView
} from 'react-native';
import BaseView from "../../../../componet/BaseView";
import {TButton} from "../../../../componet/tcustom/button/TButton";
import {TTextInput} from "../../../../componet/tcustom/textInput/TTextInput";
import {TModalCenterView} from "../../../../componet/tcustom/modal/TModalView";

export  default class MessageDetail extends BaseView {

    constructor(props) {
        super(props)
        this.state = {
            data: {},
            isShowButton: false,
            isReadState: true,
            mailContent: ""
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


        return (this.state.data.id ? <View style={[G_Style.appContentView]}>
            <View style={{padding: 5}}>
                <Text style={{fontSize: 12, color: G_Theme.grayDeep}}> {this.state.data.updated_at}</Text>
                <Text style={{fontSize: 12, color: G_Theme.grayDeep}}>【{typeName}】 </Text>
            </View>
            <ScrollView style={{flex: 1}}>
                <View style={{
                    margin: 5, padding: 10,
                }}>
                    <Text style={{fontSize: 14, lineHeight: 30}}>{`      ${this.state.data.content}`}</Text>
                    <TButton onPress={this.onPressReplay}
                             visible={this.state.isShowButton && this.state.data.type_id == 2}
                             btnName="回复"
                             viewStyle={styles.btnView}/>
                </View>
            </ScrollView>
            <TModalCenterView visible={!this.state.isReadState}>
                    <View style={{backgroundColor: "white", marginHorizontal: 20, borderRadius: 10}}>
                        <View style={{padding: 5}}>
                            <Text style={styles.textWriteStyle}> 回复信息:</Text>
                        </View>
                        <TTextInput viewStyle={{alignSelf: "center"}}
                                    style={{width: 300, height: 300, borderRadius: 5,borderWidth: 1, borderColor: "gray"}}
                                    multiline={true}
                                    placeholder={"请输入详细内容！"}
                                    onChangeText={(mailContent) => this.setState({mailContent})}
                                    value={this.state.mailContent}/>
                        <View style={{flexDirection: "row", alignSelf: "center"}}>
                            <TButton onPress={this.onSentEmail }
                                     btnName="发送"
                                     containerStyle={{backgroundColor: "green"}}
                                     viewStyle={[styles.betSentView, {marginRight: 20}]}/>
                            <TButton onPress={this.onSentEmailCancenl}
                                     btnName="取消"
                                     viewStyle={styles.betSentView}/>
                        </View>
                    </View>
            </TModalCenterView>
        </View> : null);
    }

    componentDidMount() {
        let {id} = this.props.navigation.state.params
        HTTP_SERVER.LETTER_DETAIL.url = HTTP_SERVER.LETTER_DETAIL.formatUrl.replace(/#id/g, id);
        ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.LETTER_DETAIL, (result) => {
            if (result.data) {
                this.setState({data: result.data, isShowButton: true});
            }
        })
    }

    componentWillUnmount() {
        ActDispatch.FetchAct.canCelVoFetch(HTTP_SERVER.LETTER_DETAIL);
    }

    onPressReplay = () => {
        this.setState({isReadState: false});
    }

    onSentEmail = () => {
        this.setState({isReadState: true},()=>{
            let {id} = this.props.navigation.state.params;
            HTTP_SERVER.LETTER_REPLAY.body.msg_id = id;
            HTTP_SERVER.LETTER_REPLAY.body.content = this.state.mailContent;
            ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.LETTER_REPLAY)
        });
    }

    onSentEmailCancenl = () => {
        this.setState({isReadState: true});
    }
}

const styles = StyleSheet.create({
    textWriteStyle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "gray"
    },
    betSentView: {
        width: 120,
        marginVertical: 15
    },
    btnView: {
        width: 230,
        alignSelf: "center",
        marginVertical: 15
    }
});
