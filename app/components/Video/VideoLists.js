/**
 * Created by soga on 16/9/28.
 */
import React, {Component,PropTypes} from 'react';
import { VideoItem } from './../';
import {
    ScrollView,
    View,
    RefreshControl,
    Text
} from 'react-native';

import { WINDOW, STYLE } from '../../config';


class VideoLists extends Component {

    static propTypes = {
        data : PropTypes.any.isRequired,
        type : PropTypes.string
    };

    static defaultProps = {
        type : 'home'
    };

    constructor(props) {
        super(props);
        //this.state = {
        //    refreshing: false
        //}

        this._onRefresh     = this._onRefresh.bind(this);
    }

    _onRefresh(){
        //this.setState({isRefreshing: true});
        this.props.onRefresh();
    }

    render() {
        const { type, data, action } = this.props;

        let viewHeight = WINDOW.height - STYLE.headerBannerHeight - STYLE.menuBottomHeight - STYLE.swipHeaderHeight;

        if(type == 'subPage') {
            viewHeight = WINDOW.height - STYLE.headerBannerHeight;
        }

        if(data) {
            return (
                <ScrollView
                    //onScroll={() => { console.log('onScroll!'); }}
                    scrollEventThrottle={200}
                    style={{
                        height: viewHeight
                    }}
                    contentContainerStyle={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        alignItems:'flex-start',
                        justifyContent:'space-between',
                    }}
                    refreshControl={
                        <RefreshControl
                            refreshing={false}
                            onRefresh={this._onRefresh}
                            tintColor={STYLE.primary}
                            title="Loading..."
                            titleColor="#999"
                            colors={[STYLE.primary, '#999', '#fff']}
                            progressBackgroundColor="#fff"
                        />
                    }
                    >
                    {
                        data.map((d,i)=>{
                            return (
                                <VideoItem
                                    key={i}
                                    name={d.username}
                                    imgSrc={d.headimg}
                                    nums={d.total}
                                    isLive={d.live_status}
                                    onPress={()=>action(d.uid)}
                                    />
                            )
                        })
                    }
                </ScrollView>
            )
        }
        else {
            return (
                <View></View>
            )
        }
    }};

export default VideoLists;
