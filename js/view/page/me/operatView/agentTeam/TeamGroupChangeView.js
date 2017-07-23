import React from 'react';
import {
    View,
    StyleSheet,
    Text,
} from 'react-native';

import connect from "react-redux/src/components/connect";
import {TTextInput} from "../../../../componet/tcustom/textInput/TTextInput";
import {TPicker} from "../../../../componet/tcustom/picker/TPicker";
import {TButton} from "../../../../componet/tcustom/button/TButton";
import BaseView from "../../../../componet/BaseView";
const mapStateToProps = state => {
    return {
        userData: state.get("appState").get("userData").toJS(),
    }
}

@connect(mapStateToProps)
export  default class TeamGroupChangeView extends BaseView {
    constructor(props){
        super(props);
        this.state= {
            userData:null,
            teamData:null,
            hashOverLimitsList:[],
            aPrizeGroups:[],
            pickValue:"",
            configGroupValue:"",
            isValid:true
        }
    }

    render() {
       // TLog("TeamGroupChangeView-----data=",data);
        let minGroup= this.state.teamData ? this.state.teamData.iMinPrizeGroup:0;
        let maxGroup=this.state.teamData ? this.state.teamData.iMaxPrizeGroup:0;
        return ( this.state.teamData ? <View style={[G_Style.appContentView]}>
            <View style={styles.profitRow}>
                <Text style={styles.title}>用户名:</Text>
                <Text
                    style={[styles.text, styles.winStatus]}>{this.state.userData.username}</Text>
            </View>
            <View style={styles.profitRow}>
                <Text style={styles.title}>用户类型:</Text>
                <Text style={[styles.text, styles.winStatus]}>{this.state.userData.is_agent ? "代理":"玩家"}</Text>
            </View>
            <View style={styles.profitRow}>
                <Text style={styles.title}>奖金组:</Text>
                <Text style={[styles.text, styles.winStatus]}>{this.state.userData.prize_group}</Text>
            </View>
            <View style={styles.profitRow}>
                <Text style={styles.title}>下级人数:</Text>
                <Text style={[styles.text, styles.winStatus]}>{this.state.userData.directChildren}</Text>
            </View>
            <View style={styles.profitRow}>
                <Text style={styles.title}>在线状态:</Text>
                <Text style={[styles.text, styles.winNumber]}>{this.state.teamData.isOnline}</Text>
            </View>
            <View style={styles.profitRow}>
                <Text style={styles.title}>最近登录时间:</Text>
                <Text style={[styles.text, styles.winNumber]}>{this.state.userData.signin_at}</Text>
            </View>
            <View style={styles.profitRow}>
                <Text style={styles.title}>设置奖金组:</Text>
                <TTextInput keyboardType={"numeric"} onChangeText={(value)=>{this.setState({configGroupValue:value})}} value={this.state.configGroupValue} viewStyle={{borderBottomWidth:1, borderBottomColor:"gray"}}/>
            </View>
            <View style={[styles.profitRow,{padding:0, margin:0,paddingTop:0}]}>
                <Text style={styles.title}></Text>
                    <Text style={{width:200}} >奖金组设置范围 {minGroup}～{maxGroup} 平均返点率   <Text style={{fontWeight:"bold",color:"red"}}>{G_GroupBackRate(this.state.configGroupValue,this.state.userData.prize_group)} %</Text>
                    </Text>
            </View>
            <View style={styles.profitRow}>
                <Text style={styles.title}>设置高点配额奖金组:</Text>
                <TPicker itemStyle={{fontSize: 14, height: 130, width:210}} pickValue={this.state.pickValue} dataList={this.state.hashOverLimitsList}
                         onValueChange={(pickValue)=>this.setState({pickValue})} />
            </View>
            <Text style={{color:"red", marginHorizontal:30, marginTop:30}}>当同时设置了奖金组和高点配额奖金组,默认以高点配额奖金组为准!</Text>
            <View style={{flexDirection:"row", alignSelf:"center", marginTop:20}}>
                <TButton onPress={this.onSaveGrop} errMsg={this.validGroup()} containerStyle={{backgroundColor:"green", width:120}} btnName="保存"/>
                <TButton containerStyle={{marginLeft:20,width:120}} onPress={this.onPressBack} btnName="取消"/>
            </View>
        </View>:null);
    }

    componentDidMount() {
        let {data} = this.props.navigation.state.params;
        if(!this.state.teamData)
        {
            HTTP_SERVER.GROUP_PRIZE_INFO.url=   HTTP_SERVER.GROUP_PRIZE_INFO.formatUrl.replace("#id",data.id);
            ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.GROUP_PRIZE_INFO, (result) => {
                if(result.isSuccess){
                    let assigList=[{name:"选择高点配额(可不选)",value:""}]
                    for(let key in result.data.hashOverLimits){
                        if(parseInt(result.data.hashOverLimits[key])>1){
                            assigList.push({name:key,value:key})
                        }
                    }
                    this.setState({teamData:result.data,userData:result.data.oUser,hashOverLimitsList:assigList,
                        configGroupValue:result.data.oUser.prize_group,aPrizeGroups:result.data.aPrizeGroups});
                }
            })
        }
    }

    validGroup=()=>{
        let error=null;
        if(this.state.pickValue=="")
        {
            let minGroup= this.state.teamData ? parseInt(this.state.teamData.iMinPrizeGroup):0;
            let maxGroup=this.state.teamData ? parseInt(this.state.teamData.iMaxPrizeGroup):0;
            let configGroup=parseInt(this.state.configGroupValue)
            if(this.state.aPrizeGroups.indexOf(`${configGroup}`)==-1 ||(configGroup<minGroup)||(configGroup>maxGroup)){
                error ="当前设置的奖金组无效"
            }
        }
        return error;
    }

    componentWillUnmount() {
        ActDispatch.FetchAct.canCelVoFetch(HTTP_SERVER.GROUP_PRIZE_INFO)
    }

    onPressBack=()=>{
        G_NavUtil.pop();
    }

    onSaveGrop=()=>{
        let {data} = this.props.navigation.state.params;
        HTTP_SERVER.GROUP_PRIZE_SET.url=   HTTP_SERVER.GROUP_PRIZE_SET.formatUrl.replace("#id",data.id);
        HTTP_SERVER.GROUP_PRIZE_SET.body.prize_group= this.state.pickValue !="" ? this.state.pickValue:this.state.configGroupValue
        ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.GROUP_PRIZE_SET, (result) => {
            if(result.isSuccess){
                G_NavUtil.pop(G_RoutConfig.AgentTeamView,{id:data.id,prize_group:HTTP_SERVER.GROUP_PRIZE_SET.body.prize_group});
            }
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
