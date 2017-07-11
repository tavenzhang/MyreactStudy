/**
 * Created by thomas on 2017/3/10.
 */
import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
} from 'react-native';
import BaseView from "../../../../componet/BaseView";
import {HOME_ICONS} from "../../../../../assets/index";
import {TButton} from "../../../../componet/tcustom/button/TButton";


export  default class BetDetailView extends BaseView {

    constructor(props) {
        super(props)
        this.state = {
            data: {}
        }
    }

    renderBody() {
        let {gameModel, appModel} = this.props.navigation.state.params

        const {data} = this.state;
        let gameName = gameModel.getGameNameById(data.lottery_id)
        let series_id = gameModel.getSeriesIdById(data.lottery_id)
        let coefficient = appModel.getACoefficients(data.coefficient);
        let isWin = data.status == 3 ? true : false;
        return (<View style={[G_Style.appContentView]}>
            <View style={styles.gameHead}>
                <View style={{flexDirection: "row"}}>
                    <Image style={styles.thumb} source={HOME_ICONS[series_id]}/>
                    <Text style={styles.textgameName}> {gameName}</Text>
                    <Text style={styles.textissueNum}> {data.issue}期</Text>
                </View>

                <View style={{flexDirection: "row", marginTop: 10}}>
                    <Text style={[styles.text, {flex: 3, textAlign: 'center'}]}>订单金额</Text>
                    <Text style={[styles.text, {flex: 3, textAlign: 'center'}]}>中奖奖金</Text>
                    <Text style={[styles.text, {flex: 3, textAlign: 'center'}]}>投注模式</Text>
                </View>
                <View style={{flexDirection: "row", marginTop: 5}}>
                    <Text style={[styles.text,styles.gameHeadText,styles.winNumber]}> {G_DateUtil.formatMoney(data.amount)}元</Text>
                    <Text style={[styles.text, styles.gameHeadText,styles.winNumber]}> {data.prize ? G_DateUtil.formatMoney(data.prize) : 0}元</Text>
                    <Text style={[styles.text,styles.gameHeadText,{
                        color: G_Theme.grayDeep,}]}> {coefficient}</Text>
                </View>

            </View>

            <View style={styles.profitRow}>
                <Text style={styles.title}>订单状态:</Text>
                <Text
                    style={[styles.text, styles.winStatus, {color: isWin ? G_Theme.primary : G_Theme.grayDeep}]}>{appModel.getAProjectStatus(data.status)}</Text>
            </View>
            <View style={styles.profitRow}>
                <Text style={styles.title}>开奖号码:</Text>
                <Text style={[styles.text, styles.winNumber]}>{data.winning_number}</Text>
            </View>

            <View style={[styles.profitRow,{borderColor: G_Theme.gray,backgroundColor: '#fff',}]}>
                <Text style={styles.title}>投注号码:</Text>
                <Text style={[styles.text,{color:G_Theme.grayDeep}]}>{data.title}  <Text style={{color:G_Theme.grayDeep}}>{data.multiple}倍</Text></Text>
            </View>
            <View style={[styles.profitRow,{borderColor: G_Theme.gray,borderWidth:1, backgroundColor: '#fff',}]}>
                <Text style={[styles.text, styles.betNumber]}>{data.bet_number} </Text>
            </View>

            <View style={{flexDirection: "row", marginTop:20}}>
                <Text style={[styles.text, styles.gameHeadText,{flex:2}]}>订单编号:</Text>
                <Text style={[styles.text, styles.gameHeadText,{flex:8,textAlign:'left'}]}>{data.serial_number}</Text>
            </View>

            <View style={{flexDirection: "row", marginTop: 5}}>
                <Text style={[styles.text, styles.gameHeadText,{flex:2}]}>订单时间:</Text>
                <Text style={[styles.text, styles.gameHeadText,{flex:8,textAlign:'left'}]}>{data.bought_at}</Text>
            </View>
            {
                data.allow_cancel&&data.status==0 ? <TButton onPress={this.onCanCelBet} containerStyle={{marginHorizontal: 40, marginTop:20}} btnName={"撤销投注"}/>:null
            }
        </View>);
    }

    componentDidMount() {
        let {id} = this.props.navigation.state.params;
        HTTP_SERVER.BET_DETAIL.url = HTTP_SERVER.BET_DETAIL.formatUrl.replace(/#id/g, id);
            ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.BET_DETAIL, (result) => {
                if (result.data) {
                    // let arr = this.state.dataList.concat(result.data.data);
                    this.setState({data: result.data})
                }
            })
        }

    onCanCelBet=()=>{
        let {id} = this.props.navigation.state.params;
        HTTP_SERVER.BET_CanCel.url = HTTP_SERVER.BET_CanCel.formatUrl.replace(/#id/g, id);
        ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.BET_CanCel, (result) => {
            if (result.isSuccess) {
                // let arr = this.state.dataList.concat(result.data.data);
              G_NavUtil.pop();
            }
        })
    }

}
const styles = StyleSheet.create({
    profitRow: {
        width: G_Theme.windowWidth,
        paddingTop: 5,
        paddingBottom: 5,
        flexDirection: "row",
        // borderBottomWidth: 1,
        borderColor: '#ccc',

    },
    title: {
        paddingHorizontal: 10,
        // textAlign: 'right',
        flex: 2
    },
    textgameName: {
        lineHeight: 30,
        fontSize: 16,
        paddingHorizontal: 5,

    },
    gameHeadText:{
        flex: 3,
        color: G_Theme.grayDeep,
        fontSize: 12,
        textAlign: 'center'
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
