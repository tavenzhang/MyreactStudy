import React,{PropTypes}from 'react';
import {
    Image,
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    ListView,
} from 'react-native';
import {HOME_ICONS,SSC} from "../../../../assets/index";


export default class GameDetail extends React.Component {
    static propTypes={
        dataList:PropTypes.array,
        gameModel:PropTypes.any,
        playModel:PropTypes.any,
        userData:PropTypes.any
    }
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        }
    }

    render() {
        const {dataList} = this.props;
        return (
            <View style={styles.sp}>
                {dataList.map((rowData, index) => {
                    const splitIcon = index == 0 ? styles.itemRowBorder : null;
                    return (<TouchableHighlight key={index} onPress={() => this.itemClick(rowData)} underlayColor='rgba(0,0,0,0)'>
                        <View style={[styles.itemRow,splitIcon]}>
                            <Image style={styles.thumb} source={HOME_ICONS[rowData.series_id]}/>
                            <View>
                                <Text style={rowData.open == "1" ? styles.text : styles.textNoOpen}>
                                    {rowData.name}
                                </Text>
                                <Text style={styles.textDesc}>
                                    {rowData.open == "1" ? '火爆进行中' : '暂停销售'}
                                </Text>
                            </View>
                        </View>
                    </TouchableHighlight>)
                })}
            </View>
        )
    }

    itemClick = (data) => {
        T_Analysis("进入游戏",data)
        TLog("进入游戏1",data)
        const {gameModel, playModel,userData} = this.props
        //G_NavUtil.pushToView(G_NavViews.TrendView({title:`走势图`,lotteryId:data.id}))
        if(userData.isLogined)
        {
            if (data.open == "1") {
                switch (data.series_id+'')
                {
                    case "1":
                        G_NavUtil.pushToView(G_NavViews.SSCView({...data, gameModel: gameModel, playModel: playModel}));
                        break;
                    case "2":
                        G_NavUtil.pushToView(G_NavViews.L115View({...data, gameModel: gameModel, playModel: playModel}));
                        break;
                    case "3":
                        G_NavUtil.pushToView(G_NavViews.D3View({...data, gameModel: gameModel, playModel: playModel}));
                        break;
                    case "5":
                        G_NavUtil.pushToView(G_NavViews.K3View({...data, gameModel: gameModel, playModel: playModel}));
                        break;
                    case "8":
                        G_NavUtil.pushToView(G_NavViews.KL10View({...data, gameModel: gameModel, playModel: playModel}));
                        break;
                    case "4":
                        G_NavUtil.pushToView(G_NavViews.KENOView({...data, gameModel: gameModel, playModel: playModel}));
                        break;
                    case "7":
                        G_NavUtil.pushToView(G_NavViews.PK10View({...data, gameModel: gameModel, playModel: playModel}));
                        break;
                    case "6"://幸运28
                        TLog("幸运28---",data);
                        G_NavUtil.pushToView(G_NavViews.LUCKYView({...data, gameModel: gameModel, playModel: playModel}));
                        break;
                    default :
                        TLog('gameseries_id',data.series_id)
                }
            }
            else {
                G_AlertUtil.show("当前游戏还在筹备中", "敬请期待！");
            }
        }
        else{
            ActDispatch.AppAct.showErrorBox("请先登陆，再进入游戏！");
            G_NavUtil.pushToView(G_NavViews.LoginView());
         }
    }
}

const gridSize = Math.floor(G_Theme.windowWidth / 2)
var styles = StyleSheet.create({
    sp: {
        flexDirection: 'row',
        width:G_Theme.windowWidth,
        borderBottomWidth: 0.5,
        borderBottomColor: '#e5e5e5',
        paddingBottom: 10,
        paddingTop: 10,
    },
    itemRow: {
        flexDirection: 'row',
        width: gridSize,
        paddingLeft: 20,
        paddingRight: 10,
    },
    itemRowBorder: {
        borderRightWidth:0.5,
        borderRightColor: '#e5e5e5',
    },
    thumb: {
        width: 40,
        height: 40,
        marginRight: 8,
        borderRadius: 20,
    },
    text: {
        marginTop: 4,
        fontWeight: 'bold',
        color: '#222',
    },
    textDesc: {
        color: '#999',
        fontSize: 12,
        lineHeight: 20
    },
    textNoOpen: {
        color: "gray",
        marginTop: 5,
        fontWeight: 'bold'
    }
});
