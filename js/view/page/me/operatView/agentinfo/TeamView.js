/**
 * Created by thomas on 2017/6/3.
 */
import React ,{PropTypes} from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import Button from "react-native-button";


export  default  class TeamView extends  React.Component {

    static  propTypes={
        data:PropTypes.any
    }

    constructor(props)
    {
        super(props);
        this.state={
            btnIndex:0,
            monthData:null,
        }
    }

    render() {

        let {data}= this.props;

        return( data&&this.state.monthData ?<View>
                <View style={{flexDirection: "row", margin: 5, alignItems:'center'}}>
                    <Text>我的团队</Text>
                    <Button style={styles.btnText} containerStyle={this.state.btnIndex == 0 ? styles.btnCpSelectStyle:styles.btnCpNormal} onPress={()=>this.onClickDateButton(0)}>今日</Button>
                    <Button style={styles.btnText}  containerStyle={this.state.btnIndex == 1 ? styles.btnCpSelectStyle:styles.btnCpNormal}  onPress={()=>this.onClickDateButton(1)}>本周</Button>
                    <Button style={styles.btnText}  containerStyle={this.state.btnIndex == 2 ? styles.btnCpSelectStyle:styles.btnCpNormal}   onPress={()=>this.onClickDateButton(2)}>本月</Button>
                </View>
                <View style={{flexDirection: "row", margin: 5,alignItems: "center",justifyContent: "center"}}>
                    <View style={{alignItems: "center", justifyContent: "center"}}>
                        <Text>团队投注用户</Text>
                        <View style={styles.square}>
                            <Text>{this.state.monthData.howmanypeoplebet}</Text>
                            <Button style={styles.btnLink} onPress={()=>this.onGoToView(0)}>盈亏报表</Button>
                        </View>
                    </View>
                    <View style={{alignItems: "center"}}>
                        <Text>团队新增用户</Text>
                        <View style={styles.square}>
                            <Text>{this.state.monthData.howmanynewaccount}</Text>
                            <Button style={styles.btnLink} onPress={()=>this.onGoToView(1)}>团队管理</Button>
                        </View>
                    </View>
                    <View style={{alignItems: "center"}}>
                        <Text>新增直属玩家</Text>
                        <View style={styles.square}>
                            <Text>{this.state.monthData.howmanynewplayer}</Text>
                            <Button style={styles.btnLink} onPress={()=>this.onGoToView(2)}>新赠用户</Button>
                        </View>
                    </View>
                </View>
            </View>:null
        );
    }

    onClickDateButton=(btnIndex)=>{
        this.setState({btnIndex});
        let timeList=["today","week","month"]
        HTTP_SERVER.AgentInfoTeamData.url=  HTTP_SERVER.AgentInfoTeamData.formatUrl.replace("#time",timeList[btnIndex]);
        ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.AgentInfoTeamData,(data)=>{
            this.setState({monthData:data})
        },true)
    }

    onGoToView=(data)=>{
        switch (data)
        {
            case 0:
                G_NavUtil.pushToView(G_NavViews.AgentProfitView());
                break;
            case 1:
                G_NavUtil.pushToView(G_NavViews.AgentTeamView());
                break;
            case 2:
                G_NavUtil.pushToView(G_NavViews.AgentCreateUserView());
                break

        }
    }

    componentDidMount() {
       this.onClickDateButton(0);

    }
}

const styles = StyleSheet.create({
    btnText:{
        fontSize:14,
    },
    btnCpNormal:{
        padding: 5,
        marginHorizontal:5,
    },
    btnCpSelectStyle:{
        padding: 5,
        marginHorizontal: 5,
        backgroundColor: G_Theme.bgPbg,
        borderRadius:5
    },
    square: {
        width: 80,
        height: 80,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        margin: 10
    },
    group:{
        width: 86,
        height: 86,
        borderRadius: 86,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 10,
        backgroundColor: "gray"
    },
    btnLink:{
        marginTop:15,
        fontSize:14
    }


});

