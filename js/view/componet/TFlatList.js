import React,{PropTypes} from 'react';
import {
    View,
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
        styleView:PropTypes.object,
        curPage:PropTypes.number,
        totalPage:PropTypes.number,
        dataS:PropTypes.any
    }

    static defaultProps={
        pageSize:14,
        initialNumToRender:10,
        curPage:1,
        totalPage:1,
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


    _onFootFlush = ({distanceFromEnd}) => {
        let {loadMore,curPage,totalPage}=this.props;
        TLog("_onFootFlush---curPage=="+curPage,totalPage);
        if(curPage<totalPage) {
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
        let {curPage,totalPage}=this.props;
        if (!this.state.showFootView||curPage>=totalPage) {
            return null;
        }
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


