import React from 'react';
import {
    View,
    Text, StyleSheet,
    TextInput,
    Alert
} from 'react-native';

import BaseView from "../../../../componet/BaseView";
import ModalDropdown from 'react-native-modal-dropdown';
import Button from "react-native-button";
import BankCityModel from "../../../../../redux/model/BankCityModel";
import {TButton} from "../../../../componet/tcustom/button/TButton";

export default class EditCardAddView extends BaseView {
    constructor(props) {
        super(props);
        this.state = {
            brunchName:"",
            countName: "",
            careNumText: "",
            careNumRepeat: "",
            bankData: null,
            provinceData: null,
            cityData: null,
            bankCityModel: null,
        }
    }

    renderBody() {

        let backList = this.state.bankCityModel ? this.state.bankCityModel.bankList : [];
        let princeList = this.state.bankCityModel ? this.state.bankCityModel.princeList : [];
        let cityList = [];
        if (this.state.bankCityModel && this.state.provinceData) {
            cityList = this.state.provinceData.children
        }
        return (
            <View style={G_Style.appContentView}>
                <View style={{height: G_Theme.windowHeight / 3, backgroundColor: "white", paddingLeft: 10}}>
                    <View style={{flex: 1, alignItems: "center", flexDirection: "row"}}>
                        <View style={{width: G_Theme.windowWidth * 1 / 3, alignItems: "flex-end"}}>
                            <Text >开户银行: </Text>
                        </View>
                        <ModalDropdown style={styles.dropdown_1}
                                       options={backList}
                                       renderRow={this.rendDropRow}
                                       onSelect={(idx, value) => {
                                           this.setState({bankData: value})
                                       }}
                        >
                            <Text
                                style={{textAlign: "center"}}>{this.state.bankData ? this.state.bankData.name : "请选择银行"}</Text>

                        </ModalDropdown>
                    </View>
                    <View style={{flex: 1, alignItems: "center", flexDirection: "row"}}>
                        <View style={{width: G_Theme.windowWidth * 1 / 3, alignItems: "flex-end"}}>
                            <Text >开户银行区域: </Text>
                        </View>
                        <ModalDropdown style={styles.dropdown_1}
                                       options={princeList}
                                       renderRow={this.rendDropRow}
                                       onSelect={(idx, value) => {
                                           this.setState({provinceData: value, cityData: null})
                                       }}
                        >
                            <Text
                                style={{textAlign: "center"}}>{this.state.provinceData ? this.state.provinceData.name : "请选择省份"}</Text>
                        </ModalDropdown>
                        <ModalDropdown style={styles.dropdown_2}
                                       options={cityList}
                                       renderRow={this.rendDropRow}
                                       onSelect={(idx, value) => {
                                           this.setState({cityData: value})
                                       }}
                                       adjustFrame={(style) => {
                                           style.left -= 40;
                                           return style;
                                       }}
                        >
                            <Text
                                style={{textAlign: "center"}}>{this.state.cityData ? this.state.cityData.name : "请选择城市"}</Text>
                        </ModalDropdown>
                    </View>
                    <View style={{flex: 1, alignItems: "center", flexDirection: "row"}}>
                        <View style={{width: G_Theme.windowWidth * 1 / 3, alignItems: "flex-end"}}>
                            <Text >支行名称: </Text>
                        </View>
                        <TextInput
                            style={styles.cardInput}
                            autoCapitalize="none"
                            placeholder={"请输入支行名称"}
                            autoFocus={true}
                            onChangeText={(brunchName) => this.setState({brunchName})}
                            value={this.state.brunchName}
                        />
                    </View>
                    <View style={{flex: 1, alignItems: "center", flexDirection: "row"}}>
                        <View style={{width: G_Theme.windowWidth * 1 / 3, alignItems: "flex-end"}}>
                            <Text >开户人姓名: </Text>
                        </View>
                        <TextInput
                            style={styles.cardInput}
                            autoCapitalize="none"
                            placeholder={"请输入开户人姓名"}
                            autoFocus={true}
                            onChangeText={(countName) => this.setState({countName: countName})}
                            value={this.state.countName}
                        />
                    </View>
                    <View style={{flex: 1, alignItems: "center", flexDirection: "row"}}>
                        <View style={{width: G_Theme.windowWidth * 1 / 3, alignItems: "flex-end"}}>
                            <Text >银行卡号: </Text>
                        </View>
                        <TextInput
                            style={styles.cardInput}
                            autoCapitalize="none"
                            placeholder={"请输入银行卡卡号"}
                            autoFocus={true}
                            onChangeText={(careNumText) => this.setState({careNumText: careNumText})}
                            value={this.state.careNumText}
                            keyboardType={'numeric'}
                        />
                    </View>
                    <View style={{flex: 1, alignItems: "center", flexDirection: "row"}}>
                        <View style={{width: G_Theme.windowWidth * 1 / 3, alignItems: "flex-end"}}>
                            <Text>确认银行卡号: </Text>
                        </View>
                        <TextInput
                            style={styles.cardInput}
                            autoCapitalize="none"
                            placeholder={"确认您的银行卡号"}
                            autoFocus={true}
                            onChangeText={(careNumRepeat) => this.setState({careNumRepeat})}
                            value={this.state.careNumRepeat}
                            secureTextEntry={true}
                            keyboardType={'numeric'}
                        />
                    </View>
                </View>
                <TButton viewStyle={{
                    margin: 25,
                }}
                         btnName={"更新"}
                         errMsg={this.onValid()}
                         onPress={this.clickNext}/>
            </View>
        );
    }

    rendDropRow = (rowData, rowID, highlighted) => {
        return (<View style={{
            margin: 10,
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        }}><Text>{rowData.name}</Text></View>)
    }

    componentDidMount() {
        let params = this.props.navigation.state.params
        HTTP_SERVER.BANK_CARD_MODIFY_STEP_1.url= HTTP_SERVER.BANK_CARD_MODIFY_STEP_1.formatUrl.replace("#id",params.id);
        ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.BANK_CARD_MODIFY_STEP_1, (result) => {
            this.setState({bankCityModel: new BankCityModel(result)})
            //ActDispatch.AppAct.showErrorBox(result.Msg);
        })
    }

    onValid=()=>{
        let msg=null;
        if (this.state.bankData ==null) {
            msg = "请选择一个开卡银行";
        }
        else if (this.state.provinceData==null) {
            msg = "请选择有效开卡省份";
        }
        else if (this.state.cityData ==null) {
            msg =  "请选择有效开卡城市"
        }
        else if (this.state.brunchName.length < 1) {
            msg ="支行名称不能为空"
        }
        else if (this.state.countName.length < 1) {
            msg ="开户名不能为空"
        }
        else if (this.state.careNumText.length < 1) {
            msg ="银行卡号不能为空"
        }
        else if (this.state.careNumText != this.state.careNumRepeat) {
            msg = "银行卡号确认不一致，请重新输入!"
        }
      return msg;
    }

    clickNext = () => {

            HTTP_SERVER.BANK_CARD_MODIFY_STEP_2.body.account_name=this.state.countName;
            HTTP_SERVER.BANK_CARD_MODIFY_STEP_2.body.account_confirmation=this.state.careNumRepeat;
            HTTP_SERVER.BANK_CARD_MODIFY_STEP_2.body.account=this.state.careNumText;
            HTTP_SERVER.BANK_CARD_MODIFY_STEP_2.body.bank_id=this.state.bankData.id;
            HTTP_SERVER.BANK_CARD_MODIFY_STEP_2.body.province_id=this.state.provinceData.id;
            HTTP_SERVER.BANK_CARD_MODIFY_STEP_2.body.city_id=this.state.cityData.id;
            HTTP_SERVER.BANK_CARD_MODIFY_STEP_2.body.branch=this.state.brunchName;
           let params = this.props.navigation.state.params
            HTTP_SERVER.BANK_CARD_MODIFY_STEP_2.url= HTTP_SERVER.BANK_CARD_MODIFY_STEP_2.formatUrl.replace("#id",params.id);
             ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.BANK_CARD_MODIFY_STEP_2, (result) => {
                 if(result.isSuccess)
                 {
                     if(params.isStep2)
                     {
                         G_NavUtil.popN(2);
                     }
                     else{
                         G_NavUtil.pop();
                     }
                     HTTP_SERVER.LIST_BANGK_CARDS.page=1;
                     ActDispatch.FetchAct.fetchVoWithAction(HTTP_SERVER.LIST_BANGK_CARDS, ActionType.AppType.CARD_LIST_GET);
                 }
                 else{
                     //ActDispatch.AppAct.showErrorBox(result.Msg);
                 }

            })
    }
}

const styles = StyleSheet.create({
    touchTabButton: {
        flex: 1, alignItems: "center", justifyContent: "center",
    },
    cardInput: {
        width: G_Theme.windowWidth * 2 / 3,
        marginLeft: 20,
        fontSize: 14,
        flex: 2,
    },
    dropdown_1: {
        flex: 1,
        top: 0,
        left: 8,
        borderColor: "gray",
        borderWidth: StyleSheet.hairlineWidth,
    },
    dropdown_2: {
        flex: 1,
        top: 0,
        left: 0,
        borderColor: "gray",
        borderWidth: StyleSheet.hairlineWidth,
    }

});
