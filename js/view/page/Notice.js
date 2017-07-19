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
import connect from "react-redux/src/components/connect";


const mapStateToProps = state => {
    return {
        noticeList: state.get("appState").get("noticeList").toJS(),
    }
}
@connect(mapStateToProps)
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
            dataList: []
        };
    }

    renderBody() {
        let {noticeList}=this.props
        return (
            <View style={G_Style.appContentView}>
                {noticeList&&noticeList.data ? <TFlatList curPage={noticeList.data.current_page} totalPage={noticeList.data.last_page} dataList={noticeList.data} renderRow={this._renderRow}/>:null}
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

    itemClick = (data) => {
        G_NavUtil.push(G_RoutConfig.NoticeDeailView,{...data, title: '公告详情'});
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
