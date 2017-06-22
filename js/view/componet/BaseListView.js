import React from 'react';
import {
    View,
    ListView,
    RefreshControl,
    ActivityIndicator,
    LayoutAnimation
} from 'react-native';
import {shouldComponentUpdate} from 'react-immutable-render-mixin';

let canLoadMore = false;
let oldLength=0;
export default class BaseListView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isRefreshing: false,
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2,
            }),
            canLoadMore: false
        }
        this.finishLoadData.bind(this);
        this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
    }

    // shouldComponentUpdate() {
    //
    // }

    render() {
        let dataList=this.props.dataList;
        dataList = dataList ? dataList:[];
        let ds = this.state.dataSource.cloneWithRows(dataList);
        return (
            <View style={G_Style.appContentView}>
                <ListView
                    dataSource={ds}
                    renderRow={this.props.renderRow}
                    onEndReached={this._onFootFlush}
                    onEndReachedThreshold={20}
                    renderFooter={this._renderFooter}
                   // onScroll={this._onScroll}
                    enableEmptySections={true}
                    pageSize={15}
                    initialListSize={10}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this._onRefresh}
                            colors={['#ff0000', '#00ff00', '#0000ff', '#3ad564']}
                            progressBackgroundColor="#ffffff"
                        />
                    }
                />
            </View>
        );
    }
    // _renderRow = (rowData,section, row) => {
    //
    // }
    // componentWillUpdate() {
    //     LayoutAnimation.configureNext(G_LayoutAnimationHelp.defaultSpring);
    // }

    componentDidMount() {

    }

    _onFootFlush = () => {
       // TLog("_onFootFlush---data---------", this.state.canLoadMore);
       //  if(oldLength==this.props.dataList.length)
       //  {
       //      return;
       //  }
        if(this.props.dataList.length >= 15) {
            oldLength= this.props.dataList.length;
          //  TLog("this.state.canLoadMore----", this.state.canLoadMore)
            if(!this.state.canLoadMore)
           {
                this.setState({canLoadMore: true}, () => {
                    if (this.props.loadMore != null) {
                        this.props.loadMore(this.finishLoadData);
                    }
                    else {
                        this.finishLoadData();
                    }
                })
           }
        } else {
            this.setState({canLoadMore: false});
        }
    }

    _onRefresh = () => {
        this.setState({isRefreshing: true, canLoadMore: false});
        // canLoadMore=false;
        if (this.props.loadMore != null) {
            this.props.loadMore(this.finishLoadData);
        }
        else {
            this.finishLoadData();
        }
    }

    // _onScroll = (event: Object) => {
    //     // TLog("_onScroll-----event",event.nativeEvent);
    //     // if(event.nativeEvent.layoutMeasurement.height>(event.nativeEvent.contentSize.height+50))
    //     // {
    //     //
    //     // }
    //     // else{
    //     //     if (!canLoadMore) canLoadMore = true;
    //     // }
    // }

    _renderFooter = () => {
        //if (!canLoadMore) {
        if (!this.state.canLoadMore) {
            return null;
        }
        return (
            <View style={{height: 50, justifyContent: "center", alignItems: "center"}}>
                <ActivityIndicator />
            </View>
        );
    }

    finishLoadData = () => {
        this.setState({isRefreshing: false, canLoadMore: false});
    }

}


