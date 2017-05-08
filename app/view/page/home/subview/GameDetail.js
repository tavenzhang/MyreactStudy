import React,{PropTypes}from 'react';
import {
    Image,
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    ListView,
    Alert
} from 'react-native';

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
        const {dataList} = this.props
        return (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <View style={styles.sp}>
                {dataList.map((rowData, index) => {
                    return (<TouchableHighlight key={index} onPress={() => this.itemClick(rowData)} underlayColor='rgba(0,0,0,0)'>
                        <View style={styles.itemRow}>
                            <Image style={styles.thumb} source={{uri: rowData.img}}/>
                            <Text style={rowData.open == "1" ? styles.text : styles.textNoOpen}>
                                {rowData.name}
                            </Text>
                        </View>
                    </TouchableHighlight>)
                })}
                </View>
            </View>
        )
    }

    itemClick = (data) => {
        data.title = data.name;
        const {gameModel, playModel,userData} = this.props
        TLog("gameDeail----",gameModel);
        TLog("playModel----",playModel);
        //NavUtil.pushToView(NavViews.TrendView({title:`走势图`,lotteryId:data.id}))
        if(userData.isLogined)
        {
            if (data.open == "1") {
                switch (data.id+'')
                {
                    case "1":
                    case "25":
                    case "6":
                    case "7":
                    case "32":
                    case "65":
                    case "66":
                    case "67":
                        NavUtil.pushToView(NavViews.SSCView({...data, gameModel: gameModel, playModel: playModel}));
                        break;
                    case "2":
                    case "8":
                    case "9":
                    case "10":
                    case "26":
                    case "27":
                    case "28":
                    case "29":
                    case "30":
                    case "33":
                    case "34":
                    case "35":
                    case "36":
                    case "37":
                    case "38":
                    case "39":
                    case "40":
                    case "41":
                    case "42":
                    case "43":
                    case "44":
                    case "45":
                    case "46":
                    case "47":
                    case "48":
                    case "49":
                    case "50":
                    case "51":
                    case "63":
                    case "64":
                        NavUtil.pushToView(NavViews.L115View({...data, gameModel: gameModel, playModel: playModel}));
                        break;
                    default :
                        TLog('gameid',data.id)
                }
            }
            else {
                Alert.alert("当前游戏还在筹备中", "敬请期待！", [])
            }
        }
        else{
            ActDispatch.AppAct.showErrorBox("请先登陆，再进入游戏！");
            NavUtil.pushToView(NavViews.LoginView());
         }
    }
}

const gridSize = Math.floor(GlobelTheme.screenWidth / 3)
var styles = StyleSheet.create({
    sp: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: "flex-start",
        height:gridSize*3,
        width:GlobelTheme.screenWidth,
    },
    itemRow: {
        justifyContent: 'center',
        width: gridSize,
        height: gridSize,
        alignItems: 'center',
    },
    thumb: {
        width: 60,
        height: 60,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#CCC'
    },
    text: {
        marginTop: 5,
        fontWeight: 'bold',
        color: "green",
    },
    textNoOpen: {
        color: "gray",
        marginTop: 5,
        fontWeight: 'bold'
    }
});
