import React from 'react';
import {
    View,
    Text, StyleSheet,
    TextInput,
    TouchableHighlight,
    LayoutAnimation,
    ListView
} from 'react-native';

import Button from "react-native-button";
import BaseView from "../../../../componet/BaseView";


export default class AssignDetilView extends BaseView{

    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2,
            }),
            dataList:[{money:1950,use:10,unuse:100,total:888},{money:1950,use:10,unuse:100,total:888},{money:1950,use:10,unuse:100,total:888},{money:1950,use:10,unuse:100,total:888}]
        }
    }

    renderBody() {
        let ds = this.state.dataSource.cloneWithRows(this.state.dataList)
        return (<View>
            <View style={{flexDirection:"row", alignItems:"center", margin:10,
                }}>
                <Text>用户名:</Text>
                <TextInput
                    style={styles.textStyle}
                    onChangeText={(pwdText) => this.setState({pwdText:pwdText})}
                    value={this.state.pwdText}
                    placeholder={""}
                    multiline={false}
                    underlineColorAndroid={'transparent'}
                />
                <Button containerStyle={{backgroundColor:G_Theme.bgPbg, paddingHorizontal:5,
                    paddingVertical: 5,borderRadius:5}} style={{fontSize:14}}>
                    查找
                </Button>
            </View>
            <ListView
                dataSource={ds}
                renderHeader={this.renderHeadView}
                renderRow={this.rendeRow}
            />
        </View>)
    }


    renderHeadView = () => {
        return (<View style={{flexDirection: "row"}}>
            <Text style={[styles.headText]}>下级代理</Text>
            <Text style={[styles.headText]}>永久奖金组</Text>
            <Text style={[styles.headText]}>临时奖金组</Text>
            <Text style={[styles.headText,{flex: 3}]}>管理下级配额</Text>
        </View>)
    }

    rendeRow=(data,section)=>{
        return (<View style={{flexDirection: "row"}}>
            <Text style={[styles.contentText]}>{data.money}</Text>
            <Text style={[styles.contentText]}>{data.use}</Text>
            <Text style={[styles.contentText]}>{data.unuse}</Text>
            <Text style={[styles.contentText,{flex: 3}]}>{data.total}</Text>
        </View>)
    }
}

const  styles = StyleSheet.create({
    textStyle: {
        width: 150,
        left: 10,
        fontSize: 14,
        height:G_Theme.textInpuntH,
        borderWidth:0.5,
        borderRadius: 5,
        marginRight:30,
        paddingLeft:5
    },
    headText: {
        padding: 10,
        backgroundColor: "rgb(241, 241, 241)",
        flex: 1,
        borderWidth: 1,
        borderColor: "gray",
        textAlign: "center",
        fontWeight:"bold"
    },
    contentText:{
        padding: 10,
        flex: 1,
        borderWidth: 1,
        borderColor: "gray",
        textAlign: "center"
    }
})