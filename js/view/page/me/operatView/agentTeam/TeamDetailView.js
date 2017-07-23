import React from 'react';
import {
    View,
    StyleSheet,
    Text,
} from 'react-native';
import {TButton} from "../../../../componet/tcustom/button/TButton";
import connect from "react-redux/src/components/connect";
const mapStateToProps = state => {
    return {
        userData: state.get("appState").get("userData").toJS(),
    }
}

@connect(mapStateToProps)
export  default class TeamDetailView extends React.Component {

    render() {
        let {data} = this.props.navigation.state.params
        let {userData}=this.props
        TLog("userData.user_id===+"+userData.data.user_id,data.parent_id)
        return (<View style={[G_Style.appContentView]}>
            <View style={styles.profitRow}>
                <Text style={styles.title}>用户名:</Text>
                <Text
                    style={[styles.text, styles.winStatus]}>{data.username}</Text>
            </View>
            <View style={styles.profitRow}>
                <Text style={styles.title}>用户属性:</Text>
                <Text
                    style={[styles.text, styles.winStatus]}>{data.is_agent ? "代理":"玩家"}</Text>
            </View>
            <View style={styles.profitRow}>
                <Text style={styles.title}>奖金组:</Text>
                <Text style={[styles.text, styles.winStatus]}>{data.prize_group}</Text>
            </View>
            {/*<View style={styles.profitRow}>*/}
                {/*<Text style={styles.title}>永久奖金组:</Text>*/}
                {/*<Text style={[styles.text, styles.winStatus]}>{data.forever_prize_group}</Text>*/}
            {/*</View>*/}
            {/*<View style={styles.profitRow}>*/}
                {/*<Text style={styles.title}>临时奖金组:</Text>*/}
                {/*<Text style={[styles.text, styles.winStatus]}>{data.tmp_prize_group}</Text>*/}
            {/*</View>*/}
            <View style={styles.profitRow}>
                <Text style={styles.title}>下级人数:</Text>
                <Text style={[styles.text, styles.winStatus]}>{data.sub_user_counts}</Text>
            </View>
            <View style={styles.profitRow}>
                <Text style={styles.title}>注册时间:</Text>
                <Text style={[styles.text, styles.winNumber]}>{data.register_at}</Text>
            </View>
            <View style={styles.profitRow}>
                <Text style={styles.title}>登陆时间:</Text>
                <Text style={[styles.text, styles.winNumber]}>{data.signin_at}</Text>
            </View>
            <View style={styles.profitRow}>
                <Text style={styles.title}>本月投注总额:</Text>
                <Text style={[styles.text, styles.winNumber]}>{G_DateUtil.formatMoney(data.turnover)}</Text>
            </View>
            <View style={[styles.profitRow,{borderColor: G_Theme.gray,backgroundColor: '#fff',}]}>
                <Text style={styles.title}>净盈亏:</Text>
                <Text style={[styles.text, styles.winNumber]}>{G_DateUtil.formatMoney(data.profit)}</Text>
            </View>
            <View style={[styles.profitRow,{borderColor: G_Theme.gray,backgroundColor: '#fff',}]}>
                <Text style={styles.title}>团队余额:</Text>
                <Text style={[styles.text, styles.winNumber]}>{data.group_balance_sum}</Text>
            </View>
            <View style={[styles.profitRow,{borderColor: G_Theme.gray,backgroundColor: '#fff',}]}>
                <Text style={styles.title}>在线:</Text>
                <Text style={[styles.text,{color:G_Theme.grayDeep}]}>{data.online ? "在线":"离线"}</Text>
            </View>
            <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center", marginTop:30}}>
                {data.hasOverlimit ? <TButton containerStyle={{marginHorizontal: 5,backgroundColor:"blue",width:140, borderRadius:5}}  onPress={this._onPressAssingn} btnName={"高点配额"}/>:null}
                {userData.data.user_id == data.parent_id  ?<TButton  containerStyle={{marginHorizontal: 5,backgroundColor:"green", width:140, borderRadius:5}} onPress={this._onPressTrans} btnName={"转账"}/>
                    : <TButton containerStyle={{width:200}} onPress={this._onPressMoneyHistory} btnName={"账变列表"}/>
                }
            </View>

        </View>);
    }
    _onPressMoneyHistory=()=>{
        let {data} = this.props.navigation.state.params;
        G_NavUtil.push(G_RoutConfig.RecordMoneyView, {
            username:data.username
        });
    }

    _onPressTrans=()=>{
        let {data} = this.props.navigation.state.params;
            G_NavUtil.push(G_RoutConfig.MoneyTransferView, {
                username: data.username
            });
        }

    _onPressAssingn=()=>{
        let {data} = this.props.navigation.state.params;
        G_NavUtil.push(G_RoutConfig.AssignDetilView,{
            userName: data.username,
            prize_group:data.prize_group
        })
    }
}
const styles = StyleSheet.create({
    profitRow: {
        //width: G_Theme.windowWidth,
        justifyContent: "flex-start",
        paddingTop: 5,
        paddingBottom: 5,
        alignItems: "center",
        flexDirection: "row",
        // borderBottomWidth: 1,
        borderColor: '#ccc',

    },
    title: {
        paddingHorizontal: 10,
        // textAlign: 'right',
        width:120
    },

    gameHead: {
        // height: 120,
        padding: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: G_Theme.gray,
    },
    textissueNum: {
        lineHeight: 30,
        fontSize: 12,
    },
    btnStyle:{

    },
    text: {
        paddingHorizontal: 10,
        marginRight:5,
        flex: 8
    },
    winStatus: {
        fontSize: 16,
        fontWeight: "bold"
    },
    betNumber: {
        padding:5,

        fontSize: 14,
        // borderWidth: 1,
        borderColor: G_Theme.gray,
        color: G_Theme.grayDeep,

    },
    winNumber: {
        fontSize: 16,
        fontWeight: "bold",
        color: G_Theme.primary,
    },
    thumb: {
        width: 30,
        height: 30,
        marginLeft: 4,
        borderRadius: 15,
    },

})
