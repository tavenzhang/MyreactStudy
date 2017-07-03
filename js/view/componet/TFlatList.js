import React,{PropTypes} from 'react';
import {
    View,
    Animated,
    RefreshControl,
    ActivityIndicator,
    FlatList,
} from 'react-native';
import {shouldComponentUpdate} from 'react-immutable-render-mixin';



const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default class TFlatList extends React.Component {
    static propTypes={
        dataList:PropTypes.any,
        renderRow:PropTypes.func,
        loadMore:PropTypes.func,
        renderHeader:PropTypes.func,
        getItemLayout:PropTypes.any,
        keyExtractor:PropTypes.any,
        pageSize:PropTypes.any,
        initialNumToRender:PropTypes.number,
        style:PropTypes.any
    }

    static defaultProps={
        pageSize:15,
        initialNumToRender:10,
        //style:{flex:1}
    }


    constructor(props) {
        super(props);
        this.state = {
            isRefreshing: false,
            showFootView: false
        }
        this.finishLoadData.bind(this);
        this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
    }

    _keyExtractor = (item, index) => index;

    _onRendRow=({item,index})=>{
        let {renderRow}=this.props;
        return renderRow(item,index)
    }

    // getItemLayout={(data, index) => (
    //     // 120 是被渲染 item 的高度 ITEM_HEIGHT。
    //     {length: 120, offset: 120 * index, index}
    // )}

    render() {
        let {dataList,renderHeader,getItemLayout,keyExtractor,initialNumToRender,style}=this.props;
        return (
                <FlatList
                    style={style}
                    getItemLayout={getItemLayout}
                    data={dataList}
                    renderItem={this._onRendRow}
                    keyExtractor={keyExtractor ? keyExtractor:this._keyExtractor}
                    ListHeaderComponent={renderHeader}
                    ListFooterComponent={this._renderFooter}
                    onEndReached={this._onFootFlush}
                    onEndReachedThreshold={0.1}
                    initialNumToRender={initialNumToRender}
                    onRefresh={this._onRefresh}
                    refreshing={this.state.isRefreshing}
                />
        );
    }


    _onFootFlush = ({distanceFromEnd}) => {
        let {dataList,loadMore,pageSize}=this.props;
        //TLog(`dataList= ${dataList.length}---FootFlushDic=${distanceFromEnd}----------pageSize=${pageSize}--------`,this.state)
        if(dataList.length >= pageSize) {
            //oldLength= dataList.length;
            if(!this.state.showFootView)
            {
                this.setState({showFootView: true}, () => {
                    if (loadMore != null&&!this.state.isRefreshing) {
                        loadMore(this.finishLoadData,false);
                    }
                    else {
                        this.finishLoadData();
                    }
                })
            }
        } else {
            this.setState({showFootView: false});
        }
    }

    _onRefresh = () => {
        let {loadMore}=this.props;
        loadMore ? loadMore(this.finishLoadData,true) :null
    }

    _renderFooter = () => {
        if (!this.state.showFootView) {
            return null;
        }
        TLog("_renderFooter------")
        return (
            <View style={{height: 50, justifyContent: "center", alignItems: "center"}}>
                <ActivityIndicator />
            </View>
        );
    }

    finishLoadData = () => {
        this.setState({isRefreshing: false, showFootView: false});
    }

}


