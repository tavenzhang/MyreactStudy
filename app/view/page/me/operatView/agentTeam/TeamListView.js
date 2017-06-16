import React from 'react';
import {
    View,
    ListView,
    StyleSheet,
    Text,
    InteractionManager,
    TouchableHighlight
} from 'react-native';


export default class TeamListView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2,
            }),
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

        let ds = this.state.dataSource.cloneWithRows(dataList)
        return (<View style={[styles.defaultStyle]}>
            <ListView
                dataSource={ds}
                renderHeader={this.renderHeadView}
                renderRow={this.rendeRow}
                enableEmptySections
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
            <Text style={[styles.contentText]}>{data.prize_group}</Text>
            <Text style={[styles.contentText]}>{data.sub_user_counts}</Text>
            <Text style={[styles.contentText]}>{data.profit}</Text>
            <Text style={[styles.contentText]}>{data.turnover}</Text>

            <TouchableHighlight style={{padding: 2,marginRight:5,marginLeft:5 , flex: 1,
                overflow: 'hidden',
                borderRadius: 10,
                backgroundColor: '#d7213c'}} onPress={() => this.item(data.username)} underlayColor='rgba(0,0,0,0)'>
                <Text style={[styles.contentButton]}>转账</Text>
            </TouchableHighlight>

        </View>)
    }
}
const styles = StyleSheet.create({
    row:{
        borderBottomWidth:0.5,
        borderColor: '#ccc',
        flexDirection: "row",
        height:40,
        paddingTop:5,
        paddingBottom:5,

    },
    defaultStyle: {
        flexDirection: "row"
    },
    textStyle: {
        width: 150,
        left: 10,
        fontSize: 14,
        height: G_Theme.textInpuntH,
        marginRight: 15,
        paddingLeft: 5
    },
    headText: {
        padding: 2,
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
        padding:5,
        flex: 1,
        fontSize: 12,
        color:'#fff',
        textAlign: "center"
    }

})