/**
 * Created by soga on 16/10/25.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    TouchableOpacity,
    InteractionManager,
    ScrollView
} from 'react-native';

import {Header} from '../components';

import {appAct,fetchData,appAN} from '../actions';

import { STYLE, WINDOW, REQURL, CONFIG } from '../config';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class MyRecordPage extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {
        //加载数据
        const {dispatch,myRecord} = this.props;

        if(!myRecord.length) {
            dispatch(fetchData({
                url : REQURL.getMyRecord.url,
                requestType : REQURL.getMyRecord.type,
                successAction : appAN.UPDATE_MYRECORD
            }));
        }
    }

    render(){

        const {myRecord} = this.props;
        return (
            <View style={styles.container}>
                <Header
                    title='消费记录'
                    leftIcon='chevron-left'
                    leftIconAction={()=>{
                        InteractionManager.runAfterInteractions(()=>{
                            this.props.navigator.pop();
                        })
                    }}
                    />

                <ScrollView
                    scrollEventThrottle={200}
                    style={{
                        height:  WINDOW.height - STYLE.headerBannerHeight
                    }}
                    >
                    {
                        myRecord.map((v,i) => {
                            const imgUrl = `${CONFIG.giftPath}gift_material/${v.gid}.png`;
                            console.log(imgUrl)
                            return (
                                <TouchableOpacity key={i}>
                                    <View style={styles.item}>
                                        <Image source={{uri:imgUrl}} style={styles.iconImg} />
                                        <View>
                                            <Text style={styles.header}>{v.name}</Text>
                                            <Text style={styles.desc}>数量：{v.gnum}</Text>
                                            <Text style={styles.desc}>价格：{v.points} <Icon color={STYLE.second} name="diamond" /></Text>
                                            <Text style={styles.desc}>消费日期：{v.cr_time}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>

            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    item: {
        flex:1,
        padding: 15,
        paddingLeft: 0,
        marginLeft: 15,
        borderBottomWidth: 0.5,
        borderBottomColor: '#dddddd',
        flexDirection: 'row',
        alignItems:'center'
    },

    iconImg: {
        width:60,
        height:60,
        resizeMode: 'contain',
        marginRight:25,
        marginLeft:10
    },

    header: {
        lineHeight:30,
        fontSize:16,
        marginBottom:5
    },

    desc: {
        fontSize:12,
        color:'#555',
        lineHeight:18
    }
});