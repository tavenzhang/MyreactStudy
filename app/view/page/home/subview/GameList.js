/**
 * Created by zhangxinhua on 16/12/13.
 */
import React from 'react';
import {
    View,
     StyleSheet,
} from 'react-native';

import Swiper from 'react-native-swiper';

import GameView from './GameView';
export  default class GameList extends React.Component {

    render() {
        let {dataList,gameModel,playModel} = this.props;
        let newList = []
        let listView = null;
         //每9个为一页 分页处理
        if (dataList&&dataList.length > 0) {
            let tempArr = null;
            for(let i=0;i<dataList.length;i++)
            {
                if(i%9==0)
                {
                    tempArr=[];
                    newList.push(tempArr);
                }
                tempArr.push(dataList[i]);
            }
        }
        if (newList.length > 0) {
            listView = <Swiper
                height={468}
                loop={true}
                dot={<View style={styles.customDot}/>}
                activeDot={<View style={styles.customActiveDot}/>}
                showsPagination={true}
                paginationStyle={{
                    bottom: 20
                }}
                contentContainerStyle={styles.swiperDemo}
                style={{backgroundColor: '#eee'}}
                title="taven"
            >
                {newList.map((item, i) => {
                    return (
                        <GameView key={i + 100} dataList={item} gameModel={gameModel} playModel={playModel}/>
                    )
                })}
            </Swiper>
        }

        return (
            <View style={GlobeStyle.appContentView}>
                {listView}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    swiperDemo: {
        backgroundColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center'
    },
    customDot: {
        backgroundColor: '#ccc',
        height: 6,
        width: 6,
        marginLeft: 2,
        marginRight: 2,
        marginTop: 2,
        borderRadius: 3,
    },

    customActiveDot: {
        backgroundColor: 'yellow',
        height: 6,
        width: 6,
        marginLeft: 2,
        marginRight: 2,
        marginTop: 2,
        borderRadius: 3,
    },
})