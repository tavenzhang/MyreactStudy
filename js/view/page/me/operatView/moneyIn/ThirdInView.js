import React, {PropTypes}from 'react';
import {
    View,
    Image,
    Text,
    TouchableWithoutFeedback,
    CameraRoll
} from 'react-native';

import {RadioButtons} from 'react-native-radio-buttons'
import {TTextInput} from "../../../../componet/tcustom/textInput/TTextInput";
import {TButton} from "../../../../componet/tcustom/button/TButton";
import RNFetchBlob from 'react-native-fetch-blob'
import AIcon from 'react-native-vector-icons/FontAwesome';

export default class ThirdInView extends React.Component {

    static propTypes = {
        visible: PropTypes.bool,
        platList: PropTypes.any
    }

    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null,
            pay_typeList: [],
            paySelectItem: null,
            textMoney: "",
            imgBase64: null,
            bankList: [],
            bankSelectItem: null,
        }
        this.baseFomat = "data:image/png;base64,#content"
        this.defaultSelect = false;
    }

    renderPlatItem = (item, selected, onSelect, index) => {
        let style = selected ? {fontWeight: 'bold'} : {};
        return (
            <TouchableWithoutFeedback onPress={onSelect} key={index}>
                <View>
                    <Text style={[style, {marginHorizontal: 5}]}>{item.third_party_name}</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }

    renderTypeItem = (item, selected, onSelect, index) => {
        let style = selected ? {fontWeight: 'bold', color: "red"} : {};
        return (
            <TouchableWithoutFeedback onPress={onSelect} key={index}>
                <View style={{flexDirection: "row", alignItems: "center"}}>
                    <View style={{marginHorizontal: 2, width: 30}}>
                        {selected ? <AIcon name="money" style={{
                            color: "red",
                            fontSize: 20,
                        }}/> : null}
                    </View>
                    <Text style={[style, {marginVertical: 5, fontWeight: "bold"}]}>{item.name}</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }


    renderBankItem = (item, selected, onSelect, index) => {
        let style = selected ? {fontWeight: 'bold', color: "green"} : {};
        return (
            <TouchableWithoutFeedback onPress={onSelect} key={index}>
                <View style={{flexDirection: "row", alignItems: "center", marginVertical: 7, marginHorizontal: 8}}>
                    <Text style={[style, {fontWeight: "bold"}]}>{item.name}</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }

    renderBankContainer = (optionNodes) => {
        return <View style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center"
        }}>{optionNodes}</View>;
    }


    renderContainer = (optionNodes) => {
        return <View style={{flexDirection: "row", flexWrap: "wrap"}}>{optionNodes}</View>;
    }

    onSelcetPlatChange = (selectedOption) => {
        this.setState({selectedOption}, () => {
            this.onGetPlatDeatil(selectedOption);
        })
    }

    componentWillUpdate(nextProps, nextState) {
        let {platList} = nextProps;
        if (!this.defaultSelect && (platList.length > 0)) {
            this.onSetSecectPlatFrom(platList)
        }
    }

    render() {
        let {platList, visible} = this.props;
        let bankView = null;
        if (this.isBankAdd()) {
            bankView = <RadioButtons
                options={this.state.bankList}
                onSelection={(bankSelectItem) => {
                    this.setState({bankSelectItem})
                }}
                selectedOption={this.state.bankSelectItem}
                renderOption={ this.renderBankItem}
                renderContainer={ this.renderBankContainer}
            />
        }
        return ( visible ?
            <View style={{margin: 20}}>
                <View style={{flexDirection: "row"}}>
                    <Text style={{marginRight: 20}}>平台列表:</Text>
                    <RadioButtons
                        options={platList}
                        onSelection={this.onSelcetPlatChange}
                        selectedOption={this.state.selectedOption}
                        renderOption={ this.renderPlatItem }
                        renderContainer={ this.renderContainer}
                    />
                </View>
                <View style={{alignItems: "center", marginVertical: 20}}>
                    <RadioButtons
                        options={this.state.pay_typeList}
                        onSelection={(paySelectItem) => {
                            this.setState({paySelectItem})
                        }}
                        selectedOption={this.state.paySelectItem}
                        renderOption={ this.renderTypeItem }/>
                </View>
                {bankView}
                <View style={{flexDirection: "row", alignItems: "center", marginTop: 20}}>
                    <Text style={{marginRight: 20}}>充值金额:</Text>
                    <TTextInput style={{textAlign:"center"}}  viewStyle={{borderWidth: 1, borderRadius: 5, paddingLeft: 10, borderColor: "gray"}}
                                value={this.state.textMoney} onChangeText={(textMoney) => {
                        this.setState({textMoney})
                    }}
                                placeholder={"充值金额"} keyboardType={"numeric"}/>
                    <Text> 元</Text>

                </View>
                <View style={{alignItems: "center", justifyContent: "center", marginVertical: 50}}>
                    <TButton containerStyle={{width: 200}} errMsg={this.onValid()} btnName={"下一步"}
                             onPress={this.onNextStep}/>
                </View>

                <View style={{width: 150, height: 200, alignSelf: "center"}}>
                    {this.state.imgBase64 ? <Image
                        style={{flex: 1}}
                        source={{uri: this.state.imgBase64}}
                    /> : null}
                </View>
            </View> : null);
    }

    onValid = () => {
        let result = null;
        if (this.state.textMoney == "") {
            result = "请输入有效的充值金额!"
        } else if (this.isBankAdd()) {
            if (!this.state.bankSelectItem) {
                result = "请选择有效的充值银行!"
            }
        }
        return result;
    }

    isBankAdd = () => {
        return this.state.paySelectItem && this.state.paySelectItem.name.indexOf("银行支付") > -1
    }

    onSetSecectPlatFrom = (platList) => {
        this.defaultSelect = true
        if (!this.state.selectedOption) {
            this.onSelcetPlatChange(platList[0]);
        }
    }

    onGetPlatDeatil = (data) => {
        G_RunAfterInteractions(() => {
            HTTP_SERVER.MoneyBankPlatDetail.url = HTTP_SERVER.MoneyBankPlatDetail.formatUrl.replace("#platId", data.merchant_id);
            ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.MoneyBankPlatDetail, (data) => {
                let pay_type = data.data.pay_type;
                let pay_typeList = [];
                for (let index in pay_type) {
                    let item = {};
                    item.id = index;
                    item.name = pay_type[index];
                    pay_typeList.push(item);
                }
                let bankList = [];
                let bankData = data.data.bank_list
                for (let key in bankData) {
                    if (bankData[key]) {
                        bankList.push(bankData[key]);
                    }
                }
                this.setState({
                    pay_typeList: pay_typeList, paySelectItem: pay_typeList[0],
                    bankList: bankList, bankSelectItem: bankList.length > 0 ? bankList[0] : null
                })
            }, true)
        })
    }

    onNextStep = () => {
        let isBackAdd = this.isBankAdd();
        G_RunAfterInteractions(() => {
            HTTP_SERVER.MoneyBankPlatAdd.body.amount = this.state.textMoney;
            HTTP_SERVER.MoneyBankPlatAdd.body.merchant_id = this.state.selectedOption.merchant_id;
            HTTP_SERVER.MoneyBankPlatAdd.body.pay_type = this.state.paySelectItem.id;
            HTTP_SERVER.MoneyBankPlatAdd.body.platform_id = this.state.selectedOption.id;
            HTTP_SERVER.MoneyBankPlatAdd.body.bankid = isBackAdd ? this.state.bankSelectItem.id : "";
            ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.MoneyBankPlatAdd, (data) => {
                if (data.isSuccess) {
                    if (isBackAdd) {
                        G_NavUtil.push(G_RoutConfig.TWebView,{webData:data.data.form},"银行充值");
                    }
                    else {
                        let result = this.baseFomat.replace("#content", data.data.qr);
                        //TLog("result------------", this.state.paySelectItem);
                        this.setState({imgBase64: result});
                        if (G_PLATFORM_IOS) {
                            this.onSaveCameraRoll(result)
                        }
                        else {

                            let PATH_TO_FILE = RNFetchBlob.fs.dirs.PictureDir + "/myPay.png";
                            // TLog("RNFetchBlob--start",PATH_TO_FILE)
                            RNFetchBlob.fs.writeFile(
                                PATH_TO_FILE,
                                data.data.qr,
                                "base64"
                            ).then(res => {
                                this.onSaveCameraRoll(PATH_TO_FILE);
                            }).catch((err) => {
                                TLog("save--err" + err)
                            })
                        }
                    }
                }

            }, false, false)
        })

    }

    onSaveCameraRoll = (data) => {
        CameraRoll.saveToCameraRoll(data, "photo").then((reuslt) => {
                TLog("CameraRoll.saveToCameraRoll------", reuslt)
                if (this.state.paySelectItem.name.indexOf("支付宝") > -1) {
                    G_AlertUtil.showWithDestructive("二维码订单成功保存到相册", '请尽快使用支付宝 扫一扫 相册支付！', [
                        {
                            text: '前往支付宝', onPress: () => {
                            G_Link.openUrl('alipay://', "请先安装支付包app")
                            G_NavUtil.pop();
                            this.setState({imgBase64: null});
                        }
                        },
                        {
                            text: '取消', onPress: () => {
                            this.setState({imgBase64: null});
                        }
                        }
                    ]);

                }
                else {
                    G_AlertUtil.showWithDestructive("二维码订单成功保存到相册", '请尽快使用微信 扫一扫 相册支付！', [
                        {
                            text: '前往微信', onPress: () => {
                            G_Link.openUrl('weixin://', "请先安装微信app")
                            G_NavUtil.pop();
                            this.setState({imgBase64: null});
                        }
                        },
                        {
                            text: '取消', onPress: () => {
                            this.setState({imgBase64: null});
                        }
                        }
                    ]);
                }
            }
        ).catch(function (error) {
            G_AlertUtil.show("", '保存失败！\n' + error);
        })
    }
}