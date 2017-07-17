import React,{PropTypes} from 'react';
import {
    View,
    Text, StyleSheet,
    ListView,
    TouchableOpacity
} from 'react-native';
import {ItemNameEnum} from "../../MyView";

import AIcon from 'react-native-vector-icons/FontAwesome';

export default class AcountListView extends React.Component {

    static propTypes = {
        dataList: PropTypes.any,
        userData: PropTypes.any
    }

    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2,
                sectionHeaderHasChanged: (r1, r2) => r1 !== r2
            }),
        };
    }

    render(){
        let {dataList} = this.props
        let ds = this.state.dataSource.cloneWithRowsAndSections(dataList);
        return (
            <View style={[G_Style.appContentView, {backgroundColor: "rgba(230,230,230,0.5)"}]}>
                <ListView
                    dataSource={ds}
                    renderRow={this._renderRow}
                />
            </View>
        );
    }


    itemClick = (data) => {
        let {userData} = this.props;
        if(data.name==ItemNameEnum.aboutSystem)
        {
            G_NavUtil.push(G_RoutConfig.SystemView,{title: data.name})
        }
        else {
            if (userData.isLogined) {
                switch (data.name) {
                    case ItemNameEnum.awardFind:
                        G_NavUtil.push(G_RoutConfig.RecordAwardView,{title: data.name})
                        break;
                    case ItemNameEnum.betRecord:
                        G_NavUtil.push(G_RoutConfig.RecordBetView,{title: data.name});
                        break;
                    case ItemNameEnum.chaseRecode:
                        G_NavUtil.push(G_RoutConfig.RecordChaseView,{title: data.name});
                        break;
                    case ItemNameEnum.myMoney:
                        G_NavUtil.push(G_RoutConfig.MoneyDetailView,{title: data.name});
                        break;
                    case ItemNameEnum.inMoney:
                        G_NavUtil.push(G_RoutConfig.MoneyInView,{title: data.name});
                        break;
                    case ItemNameEnum.outerMoney:
                        G_NavUtil.push(G_RoutConfig.MoneyOuterView,{
                            title: data.name,
                            money: parseInt(userData.data.available),
                            uid: userData.data.user_id,
                            name:userData.data.username
                        });
                        break;
                    case ItemNameEnum.pwdMange:
                        G_NavUtil.push(G_RoutConfig.PersonPwdView,{title: data.name,defaultIndex:0});
                        break;
                    case ItemNameEnum.cardMange:
                        if(userData.data.is_set_fund_password)
                        {
                            G_NavUtil.push(G_RoutConfig.MoneyCardView,{title: data.name});
                        }
                        else{
                            G_AlertUtil.showWithDestructive("", "请先设置资金密码", [
                                {text: '设置密码', onPress: this.gotoFoundPwd,style:"destructive"},
                                // {text: '取消',style:"cancel"},
                                {text: '取消',style:"default"}
                            ])
                        }
                        break;
                    case ItemNameEnum.msgNotice:
                        G_NavUtil.push(G_RoutConfig.PersonMailView,{title: data.name});
                        break;
                    case ItemNameEnum.moneyTransfer:
                        G_NavUtil.push(G_RoutConfig.MoneyTransferView({
                            title: data.name,
                            money: parseInt(userData.data.available),
                            uid: userData.data.user_id
                        }));
                        break;
                    case ItemNameEnum.agentProfit:
                        G_NavUtil.push(G_RoutConfig.AgentProfitView ,({title: data.name}));
                        break;
                    case ItemNameEnum.agentTeam:
                        G_NavUtil.push(G_RoutConfig.AgentTeamView,({title: data.name,userData:userData}));
                        break;
                    case ItemNameEnum.agentInfo:
                        G_NavUtil.push(G_RoutConfig.AgentInfoView,{title: data.name});
                        break;
                    case ItemNameEnum.agentAssignMoney:
                        G_NavUtil.push(G_RoutConfig.AgentAssignMoneyView)
                        break;
                    case ItemNameEnum.agentCreate:
                        G_NavUtil.push(G_RoutConfig.AgentCreateUserView,{title: data.name});
                        break;
                    case ItemNameEnum.recordBack:
                        G_NavUtil.push(G_RoutConfig.RecordBackView,{title: data.name})
                        break;
                    case ItemNameEnum.recordAssignProfit:
                        G_NavUtil.push(G_RoutConfig.RecordAssginView,{title: data.name})
                        break;
                    case ItemNameEnum.applyMoney:
                        G_NavUtil.push(G_RoutConfig.MoneyApply,{title: data.name})
                        break;
                    case ItemNameEnum.recordMoney:
                        G_NavUtil.push(G_RoutConfig.RecordMoneyView,{title: data.name})
                        break;
                }
            }
            else {
                G_AlertUtil.showWithDestructive("", "请先登陆", [
                    {text: '登陆', onPress: this.clickLogin,style:"destructive"},
                    {text: '取消'}
                ])
            }
        }

    }

    _renderRow = (rowData, section, row) => {
        //第一行 渲染 sectionHead
        let headView = row == 0 ? <View
            style={{
                height: 30,
                borderBottomWidth: 1,
                borderColor: "#ddd",
                backgroundColor: "#ddd",
                justifyContent: "center"
            }}>
            <Text style={{left: 20, fontSize: 15, color: 'gray'}}>{section}</Text>
        </View> : null;
        return (

                <View>
                    {headView}
                    <TouchableOpacity onPress={() => this.itemClick(rowData)}>
                    <View style={styles.row}>
                        <View style={{flexDirection: "row", alignItems: "center"}}>
                            <AIcon name={rowData.ico} style={rowData.name!=ItemNameEnum.aboutSystem ? styles.icoStyle1:styles.icoStyle2}/>
                            <Text style={{fontSize: 14, left: 20}}>{rowData.name}</Text>
                        </View>
                        <AIcon name={G_EnumFontNames.angleRight} style={styles.iconNormal}/>
                    </View>
                    </TouchableOpacity>
                </View>

        );
    }

    gotoFoundPwd=()=>{
        G_NavUtil.push(G_RoutConfig.PersonPwdView,{title:"密码管理",defaultIndex:1});
    }

    clickLogin = () => {
        G_NavUtil.push(G_RoutConfig.LoginView)
    }
}


const styles = StyleSheet.create({
    icoStyle1:{
        color: G_Theme.grayDeep,
        fontSize: 20,
        width: 25
    },
    icoStyle2:{
        color: G_Theme.grayDeep,
        fontSize: 18,
        width: 25,
        paddingLeft:10
    },
    headContent2: {
        margin: 10,
        height: 100,
        borderRadius: 10,
        borderColor: "#aaa",
        borderWidth: 1,
        justifyContent: "flex-start",
        shadowColor: "gray",
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.6,
    },
    headContent: {
        margin: 10,
        padding: 20,
        paddingBottom: 10,
        height: 100,
        borderRadius: 10,
        borderColor: "#aaa",
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        shadowColor: "gray",
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.6
    },
    titleSyle: {
        fontWeight: "bold",
    },
    textStyle: {
        color: G_Theme.gray,
    },
    iconNormal: {
        color: G_Theme.gray,
        fontSize: 25,
        right: 20
    },
    row: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        height: 38,
        borderBottomColor: "#ddd",
        borderBottomWidth: 1,
        marginLeft: 15
    },

});