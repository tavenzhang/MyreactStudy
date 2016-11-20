
import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    InteractionManager,
    TextInput
} from 'react-native';


import {appAct,fetchData,appAN} from '../actions';

import { STYLE, REQURL } from '../config';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Header, VideoLists } from '../components';

export default class SearchPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchContent: ""
        }
    }

    setSearchContent(e) {
        this.state.searchContent = e.trim();
    }

    search() {
        //加载数据
        const {dispatch} = this.props;
        const nickname = this.state.searchContent;

        dispatch(fetchData({
            url : REQURL.search.url + "?nickname="+nickname+"&pageStart=1",
            requestType : REQURL.search.type,
            //requestData : {"nickname": nickname, "pageStart": 1},
            successAction : appAN.SEARCH_VIDEO
        }));
    }

    onRefresh() {
        this.search();
    }

    render() {
        const {videoLists} = this.props;

        return (
            <View style={{flex: 1}}>
                <Header
                    leftIcon='chevron-left'
                    leftIconAction={()=>this.props.navigator.pop()}
                    title='主播搜索'
                    />
                <View style={styles.searchBox}>
                    <TextInput
                        ref="search"
                        placeholder='请输入主播名称/主播id'
                        style={styles.searchInput}
                        onChangeText={(e)=>this.setSearchContent(e)}
                        returnKeyType='search'
                        onSubmitEditing={()=>this.search()}
                        />
                    <TouchableOpacity onPress={()=>this.search()}>
                        <Icon name="search" style={styles.searchIcon} />
                    </TouchableOpacity>
                </View>
                <VideoLists
                    data={videoLists}
                    action={(d)=>this.enterRoom(d)}
                    onRefresh={()=>this.onRefresh()} />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    searchBox: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: STYLE.primary,
        borderRadius: 50,
        height:40,
        margin:5,
        paddingLeft:15,
        paddingRight:10,
    },
    searchInput: {
        height: 40,
        flex: 1,
        fontSize: 16,
    },
    searchIcon: {
        backgroundColor: 'transparent',
        color: STYLE.primary,
        fontSize: 25,
        marginTop:5
    }
})
