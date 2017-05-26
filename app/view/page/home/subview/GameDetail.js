import React,{PropTypes}from 'react';
import {
    Image,
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    ListView,
} from 'react-native';
import {home_game} from "../../../../assets/index";


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
                            {/*<Image style={styles.thumb} source={{uri: "Icon-App"}}/>*/}
                            <Image style={styles.thumb} source={home_game}/>
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
        T_Analysis("进入游戏",data)
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

const gridSize = Math.floor(G_Theme.windowWidth / 3)
var styles = StyleSheet.create({
    sp: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: "flex-start",
        height:gridSize*3,
        width:G_Theme.windowWidth,
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
