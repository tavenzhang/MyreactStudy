/**
 * Created by soga on 16/10/24.
 */
'use strict';

import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    InteractionManager
} from 'react-native';

//组件
import { Header, TabViewAnimated, TabBarTop, RankDetailPanel } from '../components';

//actions
import { appAct, appAN, fetchData } from '../actions';

//config
import { REQURL, CONFIG, STYLE } from '../config';


export default class RankRich extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            routes: [
                { key: '1', title: '日榜' },
                { key: '2', title: '周榜' },
                { key: '3', title: '月榜' },
                { key: '4', title: '总榜' },
            ],
        }

        this._handleChangeTab    = this._handleChangeTab.bind(this);
        this._renderScene        = this._renderScene.bind(this);

    }


    componentDidMount() {

        //加载数据
    }

    _handleChangeTab = index => {
        this.setState({index});
    }

    _renderHeader = props => {
        return <TabBarTop
            {...props}
            indicatorStyle={styles.indicator}
            style={styles.tabbar}
            labelStyle={styles.label}
            />;
    };

    _renderScene = ({ route }) => {
        const { richLists } = this.props;

        switch (route.key) {
            case '1':
                return <RankDetailPanel key={1} data={richLists.day} />;
            case '2':
                return <RankDetailPanel key={2} data={richLists.week} />;
            case '3':
                return <RankDetailPanel key={3} data={richLists.month} />;
            case '4':
                return <RankDetailPanel key={4} data={richLists.total} />;
            default:
                return null;
        }
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <Header
                    title='富豪排行'
                    leftIcon='chevron-left'
                    leftIconAction={()=>{
                        InteractionManager.runAfterInteractions(()=>{
                            this.props.navigator.pop();
                        })
                    }}
                    />

                <TabViewAnimated
                    style={styles.container}
                    navigationState={this.state}
                    renderScene={this._renderScene}
                    renderHeader={this._renderHeader}
                    onRequestChangeTab={this._handleChangeTab}
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

    page: {

    }
});