import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';
import TFlatList from "../../../../componet/TFlatList";
import {TAIco, TButton} from "../../../../componet/tcustom/button/TButton";

export default class TeamListView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: ''
        }
    }

    render() {
        const {dataList, curPage, totalPage,loadMore} = this.props;
        return (<View style={G_Style.appContentView}>
            {this.renderHeadView()}
            <TFlatList
                curPage={curPage}
                totalPage={totalPage}
                dataList={dataList}
                renderRow={this.rendeRow}
                loadMore={loadMore}
            />
        </View>)
    }

    renderHeadView = () => {
        return (<View style={[styles.row]}>
            <View style={[styles.containView]}>
                <Text style={styles.headText}>用户</Text>
            </View>
            <View style={styles.containView}>
                <Text style={styles.headText}>下级</Text>
            </View>
            <View style={[styles.containView]}>
                <Text stle={styles.headText}>奖金组</Text>
            </View>
            <View style={styles.containView}>
                <Text style={styles.headText}>净盈亏</Text>
            </View>
            <View style={styles.containView}>
                <Text style={styles.headText}>月投注</Text>
            </View>
            <View style={[styles.containView,{flex:1}]}>
                <Text style={styles.headText}>详情</Text>
            </View>
        </View>)
    }

    rendeRow = (data, section) => {
         let subNum = parseInt(data.sub_user_counts);
        return (<TouchableOpacity onPress={() => this.onPressItem(data)}>
            <View style={[styles.row]}>
                <View style={styles.containView}>
                    <Text style={[styles.contentText,]}>{data.username}</Text>
                </View>
                <View style={[styles.containView]}>
                    {
                        subNum >0 ?  <TButton containerStyle={{paddingVertical:5, paddingHorizontal:10}} btnName={data.sub_user_counts} onPress={()=>this.onClickChildAgent(data)}/>:
                             <Text style={[styles.contentText]}>{subNum}</Text>
                    }
                </View>
                <View style={[styles.containView]}>
                    <Text style={[styles.contentText]}>{data.prize_group}</Text>
                </View>
                <View style={styles.containView}>
                    <Text
                        style={[styles.contentText, {color: data.profit > 0 ? 'red' : 'green'}]}>{ G_DateUtil.formatMoney(data.profit)}</Text>
                </View>
                <View style={styles.containView}>
                    <Text style={[styles.contentText, {color: 'red'}]}>{ G_DateUtil.formatMoney(data.turnover)}</Text>
                </View>

                <View style={[styles.containView,{flex:1}]}>
                    <TAIco name={"angle-right"} style={{fontSize: 20, color: "gray"}}/>
                </View>

            </View></TouchableOpacity>)
    }

    onClickChildAgent=(data)=>{
        G_NavUtil.push(G_RoutConfig.TeamChildAgentView,{agentId:data.id},data.username+"-下级团队",true);
    }

    onPressItem = (data) => {
        G_NavUtil.push(G_RoutConfig.TeamDetailView,{data},"详情")
    }
}
const styles = StyleSheet.create({
    containView: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center"
    },
    row: {
        borderBottomWidth: 1,
        borderColor: '#ccc',
        flexDirection: "row",
        height: 40,
        justifyContent: "center",
        alignItems: "center"

    },
    textStyle: {
        justifyContent: "center",
        textAlign: 'center',
        width: 150,
        left: 10,
        fontSize: 14,
        height: G_Theme.textInpuntH,
    },
    headText: {
        fontWeight: "bold"
    },
    contentText: {
        fontSize: 12,
    },
    contentButton: {
        fontSize: 12,
        color: '#fff',
        textAlign: "center"
    }

})