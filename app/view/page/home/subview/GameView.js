/**
 * Created by zhangxinhua on 16/12/13.
 */
import React from 'react';
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
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            dataSource:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        }
    }

    render() {
        const {dataList}= this.props
        let ds=this.state.dataSource.cloneWithRows(dataList);
        return (
                <ListView contentContainerStyle={styles.list}
                          dataSource={ds}
                          renderRow={this._renderRow}
                  />
        )
    }

    _renderRow = (rowData) => {
        var imgSource = {
            uri: rowData.img,
        };
        return (
            <TouchableHighlight onPress={() => this.itemClick(rowData)} underlayColor='rgba(0,0,0,0)'>
                <View>
                    <View style={styles.itemRow}>
                        <Image style={styles.thumb} source={imgSource}/>
                        <Text style={rowData.open=="1" ?  styles.text:styles.textNoOpen}>
                            {rowData.name}
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }

    itemClick=(data)=> {
        data.title=data.name;
        const {gameModel,playModel}= this.props
       // TLog("rowData.openrowData.openrowData.open==",rowData.open=="1")
        if(data.open=="1")
        {
            NavUtil.pushToView(NavViews.SD11Choose5({...data,gameModel:gameModel, playModel:playModel}));
        }
        else{
            Alert.alert("当前游戏还在筹备中","敬请期待！",[])
        }

    }
}

const gridSize=100;
const gridMargin=10;
const listWidth = Math.floor(GlobelTheme.screenWidth/(gridSize+gridMargin*2))*(gridSize+gridMargin*2);
var styles = StyleSheet.create({
    list: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems:'flex-start',
        width: listWidth,
        alignSelf:"center",
        marginTop:31
    },
    itemRow: {
        justifyContent: 'center',
        padding: 5,
        margin:gridMargin,
        marginTop:gridMargin*2,
        width: gridSize,
        height: gridSize,
        // backgroundColor: '#F6F6F6',
        alignItems: 'center',
        // borderWidth: 1,
        // borderRadius: 5,
        // borderColor: '#CCC'
    },
    thumb: {
        width: 60,
        height: 60,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#CCC'
    },
    text: {
        flex: 1,
        marginTop: 5,
        fontWeight: 'bold',
        color:"green",
    },
    textNoOpen:{
        color:"gray",
        flex: 1,
        marginTop: 5,
        fontWeight: 'bold'
    }
});
