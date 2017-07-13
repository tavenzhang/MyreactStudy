import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableHighlight
} from 'react-native';
import TFlatList from "../../../../componet/TFlatList";


export default class TeamListView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: ''
        }
    }

    item(username) {
        const {userData}=this.props;
        G_NavUtil.pushToView(G_NavViews.MoneyTransferView({
            title: '转账',
            money: parseInt(userData.data.available),
            uid: userData.data.user_id,
            username:username
        }));

    }



    render() {
        const {dataList}=this.props;
        TLog("-------rowData---------", dataList);

        return (<View style={[styles.defaultStyle]}>
            <TFlatList
                pageSize={5}
                dataList={dataList}
                renderHeader={this.renderHeadView}
                renderRow={this.rendeRow}
            />
        </View>)
    }


    renderHeadView = () => {
        return (<View style={[styles.row]}>
            <Text style={[styles.headText,]}>用户</Text>
            <Text style={[styles.headText, {borderLeftWidth: 0}]}>奖金组</Text>
            <Text style={[styles.headText, {borderLeftWidth: 0}]}>下级</Text>
            <Text style={[styles.headText]}>净盈亏</Text>
            <Text style={[styles.headText]}>月投注</Text>
            <Text style={[styles.headText]}>操作</Text>
        </View>)
    }

    rendeRow = (data, section) => {
        return (<View style={[styles.row]} >
            {/*<TouchableHighlight key={data.id} onPress={() => this.item(data.username)} underlayColor='rgba(0,0,0,0)'>*/}
            <Text style={[styles.contentText,]}>{data.username}</Text>
            {/*</TouchableHighlight>*/}
            <Text style={[styles.contentText,{color:'#B8860B'}]}>{data.prize_group}</Text>
            <Text style={[styles.contentText]}>{data.sub_user_counts}</Text>
            <Text style={[styles.contentText,{color:data.profit>0?'red':'green'}]}>{ G_DateUtil.formatMoney(data.profit)}</Text>
            <Text style={[styles.contentText,{color:'red'}]}>{ G_DateUtil.formatMoney(data.turnover)}</Text>

            <TouchableHighlight style={{
                padding: 5,
                borderRadius: 5,
                marginRight: 10,
                backgroundColor: '#d7213c'}} onPress={() => this.item(data.username)} >
                <Text style={[styles.contentButton]}>转账</Text>
            </TouchableHighlight>

        </View>)
    }
}
const styles = StyleSheet.create({
    row:{
        borderBottomWidth:1,
        borderColor: '#ccc',
        flexDirection: "row",
        height:40,
        justifyContent: "center",
        alignItems:"center"

    },
    defaultStyle: {
        flexDirection: "row"
    },
    textStyle: {
        justifyContent: "center",
        textAlign:'center',
        width: 150,
        left: 10,
        fontSize: 14,
        height: G_Theme.textInpuntH,
    },
    headText: {
        lineHeight:40,
        flex: 1,
        borderColor: "#ccc",
        textAlign: "center",
        fontWeight: "bold"
    },
    contentText: {
        padding: 2,
        flex: 1,
        fontSize: 12,
        borderColor: '#ccc',
        textAlign: "center"
    },
    contentButton: {
        fontSize: 12,
        color:'#fff',
        textAlign: "center"
    }

})