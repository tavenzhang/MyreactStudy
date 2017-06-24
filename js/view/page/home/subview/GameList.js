import React, {PropTypes}from 'react';
import {
    View,
     StyleSheet,
} from 'react-native';

import Swiper from 'react-native-swiper';
import GameDetail from './GameDetail';

let hlist=G_Theme.windowHeight-G_Theme.bannerHeight-G_Theme.TabBarH-G_Theme.navigatorHeadH

export  default class GameList extends React.Component {

    static propTypes={
        dataList:PropTypes.array,
        gameModel:PropTypes.any,
        playModel:PropTypes.any,
        userData:PropTypes.any
    }

    render() {
        let {dataList,gameModel,playModel,userData} = this.props;
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
                ref=""
                height={hlist}
                loop={true}
                dot={<View style={styles.customDot}/>}
                activeDot={<View style={styles.customActiveDot}/>}
                showsPagination={true}
                pagingEnabled={true}
                paginationStyle={{ bottom: 10}}
            >
                {newList.map((item, i) => {
                    return (
                        <GameDetail key={`game${i}detail`} dataList={item} userData={userData} gameModel={gameModel} playModel={playModel}/>
                    )
                })}
            </Swiper>
        }

        return (
            <View style={[G_Style.appContentView]}>
                {listView}
            </View>
        )
    }
}

const styles = StyleSheet.create({
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