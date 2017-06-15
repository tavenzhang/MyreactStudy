import React, {PropTypes}from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
} from 'react-native';

import GameDetail from './GameDetail';

let hlist = G_Theme.windowHeight - G_Theme.bannerHeight - G_Theme.TabBarH - G_Theme.navigatorHeadH

export  default class GameList extends React.Component {

    static propTypes = {
        dataList: PropTypes.array,
        gameModel: PropTypes.any,
        playModel: PropTypes.any,
        userData: PropTypes.any
    }

    render() {
        let {dataList, gameModel, playModel, userData} = this.props;
        let newList = []
        let listView = null;
        //每9个为一页 分页处理
        if (dataList && dataList.length > 0) {
            let tempArr = null;
            for (let i = 0; i < dataList.length; i++) {

                    if (i % 2 == 0) {
                        tempArr = [];
                        newList.push(tempArr);
                    }
                    tempArr.push(dataList[i]);
            }
        }

        return (
            <View style={[G_Style.appContentView, styles.gameListBox]}>
                <ScrollView >
                    {newList.map((item, i) => {
                        return (
                            <GameDetail key={`game${i}detail`} dataList={item} userData={userData} gameModel={gameModel}
                                        playModel={playModel}/>
                        )
                    })}
                </ScrollView>
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

    gameListBox: {
        backgroundColor: '#fff',
        marginTop: 8,
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