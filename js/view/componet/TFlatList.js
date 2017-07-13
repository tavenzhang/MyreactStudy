import React,{PropTypes} from 'react';
import {
    View,
    Animated,
    ActivityIndicator,
    FlatList,
} from 'react-native';
import {shouldComponentUpdate} from 'react-immutable-render-mixin';


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
        styleView:PropTypes.object
    }

    static defaultProps={
        pageSize:14,
        initialNumToRender:10
    }


    constructor(props) {
        super(props);
        this.state = {
            isRefreshing: false,
            showFootView: false
        }
        this.finishLoadData.bind(this);
        this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
        this.isStartScroll=false
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
        let {dataList,renderHeader,getItemLayout,keyExtractor,initialNumToRender,styleView}=this.props;
        return (
            <View style={[G_Style.appContentView,{backgroundColor:'white'},styleView]}>
                <FlatList
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
                    onScroll={this._onScroll}
                />
            </View>
        );
    }

    _onScroll=()=>{
        this.isStartScroll=true
    }

    _onFootFlush = ({distanceFromEnd}) => {
        let {dataList,loadMore,pageSize}=this.props;
        TLog("_onFootFlush---");
        //TLog(`dataList= ${dataList.length}---FootFlushDic=${distanceFromEnd}----------pageSize=${pageSize}--------`,this.state)
        if(this.isStartScroll&&dataList.length >= pageSize) {
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


