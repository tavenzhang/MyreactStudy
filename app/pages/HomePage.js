
import React, {Component} from 'react';
import {
    StyleSheet,
    // TouchableOpacity,
    Text,
    View,
    InteractionManager,
} from 'react-native';

import { Header, TabViewAnimated, TabBarTop, VideoLists } from '../components';
import { RoomContainer } from '../containers'
//actions
import { appAct, appAN, fetchData } from '../actions';

//config
import { REQURL, CONFIG, STYLE } from '../config';
import { SearchContainer } from '../containers';

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            routes: [
                { key: '1', title: '今日精选' },
                { key: '2', title: '大厅' },
                { key: '3', title: '大秀场' },
                { key: '4', title: '一对一' },
            ],
        }

        this.onRefresh     = this.onRefresh.bind(this);
        this.loadVideosRec = this.loadVideosRec.bind(this);
        this.loadVideosAll = this.loadVideosAll.bind(this);
        this.loadVideosSls = this.loadVideosSls.bind(this);
        this.loadVideosOrd = this.loadVideosOrd.bind(this);
    }

    componentDidMount() {
        // 交互管理器在任意交互/动画完成之后，允许安排长期的运行工作. 在所有交互都完成之后安排一个函数来运行。
        InteractionManager.runAfterInteractions(() => {
            //加载数据
            this.loadVideosRec();
        });

    }

    //加载今日精选数据
    loadVideosRec() {
        const {dispatch} = this.props;
        dispatch(fetchData({
            url: REQURL.getVideoRec.url,
            requestType: REQURL.getVideoRec.type,
            successAction: appAN.UPDATE_VIDEO_LISTS_REC
        }));
    }

    //加载大厅数据
    loadVideosAll() {
        const {dispatch} = this.props;
        dispatch(fetchData({
            url: REQURL.getVideoAll.url,
            requestType: REQURL.getVideoAll.type,
            successAction: appAN.UPDATE_VIDEO_LISTS_ALL
        }));
    }

    //加载大秀场数据
    loadVideosSls() {
        const {dispatch} = this.props;
        dispatch(fetchData({
            url: REQURL.getVideoSls.url,
            requestType: REQURL.getVideoSls.type,
            successAction: appAN.UPDATE_VIDEO_LISTS_SLS
        }));
    }

    //加载一对一数据
    loadVideosOrd() {
        const {dispatch} = this.props;
        dispatch(fetchData({
            url: REQURL.getVideoOrd.url,
            requestType: REQURL.getVideoOrd.type,
            successAction: appAN.UPDATE_VIDEO_LISTS_ORD
        }));
    }

    _handleChangeTab = index => {
        this.setState({ index });
        const { videoListsAll, videoListsRec, videoListsSls, videoListsOrd } = this.props;

        InteractionManager.runAfterInteractions(() => {
            //设置当期选择的tab值
            //dispatch(appAct.setHomeTabIndex(e));
            //切换时当本地没有数据时，加载数据
            //加载数据
            if (index == 1) {//大厅
                if(!videoListsAll.length) {
                    this.loadVideosAll();
                }
            }
            else if (index == 2) {//大秀场
                if(!videoListsSls.length) {
                    this.loadVideosSls();
                }
            }
            else if (index == 3) {//一对一
                if(!videoListsOrd.length) {
                    this.loadVideosOrd();
                }
            }
            else {//今日精选
                if(!videoListsRec.length) {
                    this.loadVideosRec();
                }
            }
        })
    };

    /**
     * 进房间
     * @param props
     * @returns {XML}
     * @private
     */
    enterRoom(d) {
        InteractionManager.runAfterInteractions(()=>{
            this.props.navigator.push({
                name: 'RoomContainer',
                component: RoomContainer,
                passProps: {
                    type: 'normal',
                    roomid: d,
                }
            })
        })
    }

    _renderHeader = props => {
        return <TabBarTop
            {...props}
            //scrollEnabled
            indicatorStyle={styles.indicator}
            style={styles.tabbar}
            labelStyle={styles.label}
            />;
    };

    _renderScene = ({ route }) => {
        const { videoListsAll, videoListsRec, videoListsSls, videoListsOrd } = this.props;
        switch (route.key) {
            case '1':
                return <VideoLists
                    data={videoListsRec}
                    key={route}
                    onRefresh={()=>this.onRefresh(route)}
                    action={(d)=>this.enterRoom(d)}
                    />
            case '2':
                return <VideoLists
                    data={videoListsAll}
                    key={route}
                    onRefresh={()=>this.onRefresh(route)}
                    action={(d)=>this.enterRoom(d)}
                    />
            case '3':
                return <VideoLists
                    data={videoListsSls}
                    key={route}
                    onRefresh={()=>this.onRefresh(route)}
                    action={(d)=>this.enterRoom(d)}
                    />
            case '4':
                return <VideoLists
                    data={videoListsOrd}
                    key={route}
                    onRefresh={()=>this.onRefresh(route)}
                    action={(d)=>this.enterRoom(d)}
                    />
            default:
                return null;
        }
    };

    onRefresh(index) {

        if (index == 1) {//大厅
            this.loadVideosAll();
        }
        else if (index == 2) {//大秀场
            this.loadVideosSls();
        }
        else if (index == 3) {//一对一
            this.loadVideosOrd();
        }
        else {//今日精选
            this.loadVideosRec();
        }
    }

    render() {
        return (
            <View>
                <Header
                    title='大厅'
                    rightIcon='search'
                    rightIconAction={()=>{
                        InteractionManager.runAfterInteractions(()=>{
                            this.props.navigator.push({
                                name: 'SearchContainer',
                                component: SearchContainer,
                                passProps: {
                                    type: 'normal'
                                }
                            })
                        })
                    }}
                    />

                <TabViewAnimated
                    style={styles.container}
                    navigationState={this.state}
                    renderScene={this._renderScene.bind(this)}
                    renderHeader={this._renderHeader}
                    onRequestChangeTab={this._handleChangeTab.bind(this)}
                    />

            </View>
        )
    }
}

const styles = StyleSheet.create({
    tabbar: {
        backgroundColor: 'white',
    },

    indicator: {
        backgroundColor: STYLE.primary,
    },

    label: {
        color: STYLE.primary,
        fontWeight: '400',
    },
});