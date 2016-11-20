/**
 * Created by soga on 16/11/2.
 */
import React, {Component,PropTypes} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    TextInput,
    TouchableOpacity,
    TouchableHighlight,
    Modal,
} from 'react-native';

import {STYLE,CONFIG,WINDOW} from '../../config'
import { TabViewAnimated, TabBarTop, RoomGiftPanel } from '../';
import Icon from 'react-native-vector-icons/FontAwesome';



class GiftPanel extends Component {

    constructor(props) {
        super(props);

        let giftRouters = [];
        props.data.map((v,i) => {
            giftRouters.push({ key: i+'', title: v.name });
        });

        this.state = {
            index: 0,
            giftNum:"1",
            routes: giftRouters,
        }
    }

    static propTypes = {
        data : PropTypes.any.isRequired
    };

    static defaultProps = {
    };

    _handleChangeTab = index => {
        this.setState({ index });
    };

    _renderHeader = props => {
        return <TabBarTop
            {...props}
            //scrollEnabled
            indicatorStyle={styles.indicator}
            style={styles.tabbar}
            labelStyle={styles.label}
            />;
    };


    _renderScene = ({ route }) => {
        const { data, currentSeleGift, setCurrentSelectGift } = this.props;
        let content = null;
        switch (route.key) {
            case '0':
                content = <RoomGiftPanel
                            key={0}
                            data={data[0]['items']}
                            selectGift={e=>setCurrentSelectGift(e)}
                            currentSeleGift={currentSeleGift}
                        />
                break;

            case '1':
                content = <RoomGiftPanel
                    key={1}
                    data={data[1]['items']}
                    selectGift={e=>setCurrentSelectGift(e)}
                    currentSeleGift={currentSeleGift}
                    />
                break;

            case '2':
                content = <RoomGiftPanel
                    key={2}
                    data={data[2]['items']}
                    selectGift={e=>setCurrentSelectGift(e)}
                    currentSeleGift={currentSeleGift}
                    />
                break;

            case '3':
                content = <RoomGiftPanel
                    key={3}
                    data={data[3]['items']}
                    selectGift={e=>setCurrentSelectGift(e)}
                    currentSeleGift={currentSeleGift}
                    />
                break;

            case '4':
                content = <RoomGiftPanel
                    key={4}
                    data={data[4]['items']}
                    selectGift={e=>setCurrentSelectGift(e)}
                    currentSeleGift={currentSeleGift}
                    />
                break;

            case '5':
                content = <RoomGiftPanel
                    key={5}
                    data={data[5]['items']}
                    selectGift={e=>setCurrentSelectGift(e)}
                    currentSeleGift={currentSeleGift}
                    />
                break;

            default:
                content = null;
        }

        return <ScrollView
            scrollEventThrottle={200}
            key={route.key}
            style={{
                height: WINDOW.height - WINDOW.width*3/4 - 85,
            }}
contentContainerStyle={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent:'center',
            }}
            >
            {content}
        </ScrollView>
    }

    changeGiftNums(e) {
        this.setState({
            giftNum : e.trim()
        })
    }

    render() {
        const { data, show, close, money, sendGift } = this.props;
        return (
            <Modal
                style={styles.giftsModel}
                animationType={"slide"}
                transparent={true}
                visible={show}
                //onRequestClose={() => close() }
                >
                <TouchableOpacity onPress={() => close()}>
                    <View style={styles.closePanel}></View>
                </TouchableOpacity>
                <View style={styles.giftsModel}>
                    <TabViewAnimated
                        style={styles.giftTabs}
                        navigationState={this.state}
                        renderScene={this._renderScene.bind(this)}
                        renderHeader={this._renderHeader}
                        onRequestChangeTab={this._handleChangeTab.bind(this)}
                        />
                </View>
                <View style={styles.sendGiftOperate}>
                    <View style={styles.sendBox}>
                        <TouchableOpacity onPress={()=>{}} style={{backgroundColor:'transparent'}}>
                            <Text style={styles.rechargeBtn}>充值</Text>
                        </TouchableOpacity>
                        <Text> 余额：{money} <Icon name="diamond" color={STYLE.second} /></Text>
                    </View>
                    <View style={styles.sendBox}>
                        <Text>数量：</Text>
                        <TextInput
                            ref="giftNum"
                            keyboardType="numeric"
                            value={this.state.giftNum}
                            style={styles.giftNumInput}
                            onChangeText={(e)=>this.changeGiftNums(e)}
                            />

                        <TouchableOpacity onPress={()=>sendGift(this.state.giftNum)} style={{backgroundColor:'transparent'}}>
                            <Text style={styles.sendBtn}>赠送</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }};

export default GiftPanel;

const styles = StyleSheet.create({
    tabbar: {
        backgroundColor: 'white',
    },

    indicator: {
        backgroundColor: STYLE.second,
    },

    label: {
        color: STYLE.second,
        fontWeight: '400',
    },
    closePanel: {
        height: WINDOW.width*3/4,
        width: WINDOW.width,
        backgroundColor: 'transparent'
    },
    giftsModel: {
        position: 'relative',
        height: WINDOW.height - WINDOW.width*3/4,
        width: WINDOW.width,
        backgroundColor: '#fff'
    },
    sendGiftOperate: {
        height: 40,
        position: 'absolute',
        bottom: 0,
        left: 0,
        paddingLeft:10,
        paddingRight:10,
        width: WINDOW.width,
        backgroundColor: '#f1f1f1',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    sendBox: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    rechargeBtn: {
        backgroundColor: STYLE.primary,
        color: '#fff',
        fontSize: 14,
        paddingTop:5,
        paddingBottom:5,
        paddingLeft:10,
        paddingRight:10,
        marginRight:5,
        borderRadius:2
    },

    sendBtn: {
        backgroundColor: STYLE.second,
        color: '#fff',
        fontSize: 14,
        paddingTop:8,
        paddingBottom:8,
        paddingLeft:15,
        paddingRight:15,
        marginRight:5,
        borderRadius:2,
        marginLeft:10
    },

    giftNumInput: {
        backgroundColor: '#fff',
        width: 50,
        height: 30,
        borderRadius:3,
        paddingLeft:10,
        paddingRight:10,
    }
})