import React from 'react';
import {
    View,
    Text
    , StyleSheet,
    TouchableHighlight
} from 'react-native'
import AIcon from 'react-native-vector-icons/FontAwesome';
import BaseView from "../componet/BaseView";
import TFlatList from "../componet/TFlatList";

export default class Notice extends BaseView {

    static navigationOptions = ({navigation}) => ({
        title: '通知',
        tabBarIcon: ({focused}) => {
            return <AIcon name='reorder' style={{fontSize: 25, color: focused ? G_Theme.selectColor : G_Theme.gray}}/>
        },
    })

    constructor(props) {
        super(props);
        this.state = {
            dataList: [],
            current_page:1,
            last_page:1
        };
    }

    renderBody() {
        return (
            <View style={G_Style.appContentView}>
                <TFlatList  loadMore={this.onLoaderMore}  curPage={this.state.current_page} totalPage={this.state.last_page} dataList={this.state.dataList} renderRow={this._renderRow}/>
            </View>
        );
    }

    _renderRow = (data) => {
        return (
            <View>
                <TouchableHighlight onPress={() => this.itemClick(data)} underlayColor='rgba(10,10,10,0.2)'>
                    <View style={styles.row}>
                        <View style={[styles.itemContentStyle, {flex: 3,justifyContent:'center' }]}>
                            <Text style={styles.textHeadStyle}>{data.title}</Text>
                            <Text style={styles.textTime}>发布时间：{G_DateUtil.formatymdDateString(data.created_at)}</Text>
                        </View>
                        <View style={styles.itemContentStyle}>
                            <AIcon name={G_EnumFontNames.angleRight}
                                   style={{fontSize: 25, alignSelf: "center", color: "gray"}}/>
                        </View>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }

    componentDidMount(){
        this.onLoaderMore(null,1)
    }

    itemClick = (data) => {
        G_NavUtil.push(G_RoutConfig.NoticeDeailView,{...data, title: '公告详情'});
    }

    onLoaderMore=(callBack,isFlush)=>{
        if(isFlush) {
            HTTP_SERVER.GET_LIST_SYSTEM.body.page =1
        }else{
            HTTP_SERVER.GET_LIST_SYSTEM.body.page +=1
        }
        HTTP_SERVER.GET_LIST_SYSTEM.url = HTTP_SERVER.GET_LIST_SYSTEM.formatUrl.replace("#id", HTTP_SERVER.GET_LIST_SYSTEM.body.page)
        ActDispatch.FetchAct.fetchVoWithResult(HTTP_SERVER.GET_LIST_SYSTEM, (result) => {
            if (result.data.data) {
                this.setState({
                    dataList: G_ArrayUtils.addComapreCopy(this.state.dataList,result.data.data),
                    current_page:result.data.current_page,
                    last_page:result.data.last_page
                })
            }
            if(callBack){
                callBack();
            }
        });
    }

}


const styles = StyleSheet.create({
    itemHeadStyle: {
        alignItems: "center",
        borderRightWidth: 1,
        justifyContent: "center",
        textAlign: "center"
    },
    itemContentStyle: {
        flex: 1,
        justifyContent: "center"
    },
    textHeadStyle: {
        fontSize: 14,
        color:"black"
    },
    textItemStyle: {
        fontSize: 12,
        color: "gray"
    },
    textTime: {
        marginTop: 5,
        fontSize: 12,
        color: G_Theme.grayDeep,
    },
    row: {
        flexDirection: 'row',
        height: 60,
        borderBottomWidth: 1,
        paddingLeft: 20,
        borderColor: G_Theme.gray,
        // borderWidth: 1,
    },

});
