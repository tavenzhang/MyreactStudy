/**
 * Created by soga on 2017/4/17.
 */

import React, {Component, PropTypes} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import {connect} from 'react-redux';

import GameTraceKeyBorad from "./GameTraceKeyBorad";
import GameTracemMultipleKeyBorad from "./GameTracemMultipleKeyBorad";

const mapStateToProps = state => {
    return {
        isTrace: state.get("gameState").get("isTrace"),
        traceTimes: state.get("gameState").get("traceTimes"),
        traceMultiple: state.get("gameState").get("traceMultiple"),
        gameNumbers: state.get("gameState").get("gameNumbers"),
    }
}
@connect(mapStateToProps)

export default class GameTracePannel extends Component {
    constructor(props) {
        super(props);
        this.state =
            {
                multiple: 1,
                isShowKeyTrace: false,
                isShowKeyMultiple: false,
                trace: 1
            };
        this.inputMultiple = this.inputMultiple.bind(this);
        this.setMultiple = this.setMultiple.bind(this);
        this.setTrace = this.setTrace.bind(this);
        this.inputTrace = this.inputTrace.bind(this);
        this.setIsShowKeyMultiple = this.setIsShowKeyMultiple.bind(this);
        this.setIsShowKeyTrace = this.setIsShowKeyTrace.bind(this);
        this.serTraceInfo = this.serTraceInfo.bind(this);
    }


    btnAction() {
        const {btnEvent, btnDisable} = this.props;
        if (!btnDisable) {
            btnEvent();
        }
    }

    btnIconAction() {
        const {btnIconEvent, btnIconDisable} = this.props;
        if (!btnIconDisable) {
            btnIconEvent();
        }
    }


    serTraceInfo(data) {
        const {gameNumbers} = this.props;
        let traceInfo = [],
            i = 0,
            newGameNumbers = gameNumbers.toJS(),
            len = !data.traceTimes || data.traceTimes == 0 ? 1 : data.traceTimes;

        for (; i < len; i++) {
            traceInfo.push({traceNumber: newGameNumbers[i].number, traceMultiple: data.traceMultiple});
        }


        data.traceInfo = traceInfo;
        ActDispatch.GameAct.setTrace(data);
    }


    setTrace(num) {
        const {traceTimes, traceMultiple} = this.props;
        num = num ? Number(num) : '';
        if (num && num > 120) {
            num = 120;
        }

        this.serTraceInfo({isTrace: 1, traceTimes: num, traceMultiple: traceMultiple});
    }

    setMultiple(num) {
        const {traceTimes, traceMultiple} = this.props;
        num = num ? Number(num) : '';
        if (num && num > 120) {
            num = 120;
        }
        this.serTraceInfo({isTrace: 1, traceTimes: traceTimes, traceMultiple: num});
    }

    setIsShowKeyTrace(status) {
        this.setState({isShowKeyTrace: status});
        const {traceTimes, traceMultiple} = this.props;
        if (traceTimes == '' || traceTimes == 0) {
            this.setTrace(1);
        }
    }

    setIsShowKeyMultiple(status) {

        this.setState({isShowKeyMultiple: status});
        const {traceTimes, traceMultiple} = this.props;
        if (traceMultiple == '' || traceMultiple == 0) {
            this.setMultiple(1);
        }
    }

//输入最好期数
    inputTrace(num, type = 'add') {
        const {traceTimes} = this.props;
        if (type == 'add') {
            this.setTrace(traceTimes + '' + num);
        } else {
            // 删除
            let trace = traceTimes + '';
            TLog(traceTimes, trace.length);

            if (trace.length > 0) {
                this.setTrace(trace.substring(0, trace.length - 1));
            }
        }

    }

    //输入追号倍数
    inputMultiple(num, type = 'add') {
        const {traceTimes, traceMultiple} = this.props;
        if (type == 'add') {
            this.setMultiple(traceMultiple + '' + num);
        } else {
            // 删除
            let trace = traceMultiple + '';
            if (trace.length > 0) {
                this.setMultiple(trace.substring(0, trace.length - 1));
            }
        }
    }


    render() {
        const me = this;
        const {traceTimes, traceMultiple} = this.props;
        const {isShowKeyTrace, isShowKeyMultiple} = this.state;
        return (
            <View >
                <View style={styles.tracePanel}>
                    <View style={{flexDirection: 'row', flex: 1, borderRightWidth: 0.5}}>
                        <Text style={styles.lotterys}>追</Text>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={text => {
                                me.setTrace(text)
                            }}
                            onFocus={data => {
                                me.setIsShowKeyTrace(true);
                            }}
                            onBlur={data => {
                                me.setIsShowKeyTrace(false);
                            }}
                            defaultValue={traceTimes + ''}
                            underlineColorAndroid={'transparent'}
                        />
                        <Text style={styles.lotterys}>期</Text>
                    </View>
                    <View style={{flexDirection: 'row', flex: 1, paddingLeft: 20}}>
                        <Text style={styles.lotterys}>投注</Text>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={text => {
                                me.setMultiple(text)
                            }}
                            onFocus={data => {
                                me.setIsShowKeyMultiple(true);
                            }}
                            onBlur={data => {
                                me.setIsShowKeyMultiple(false);
                            }}
                            defaultValue={traceMultiple + ''}
                            underlineColorAndroid={'transparent'}
                        />
                        <Text style={styles.lotterys}>倍</Text>
                    </View>
                </View>
                {isShowKeyTrace ? <GameTraceKeyBorad
                    {...this.state}
                    inputTrace={me.inputTrace}
                    setTrace={me.setTrace}
                    OK={me.setIsShowKeyTrace}

                /> : null}
                {isShowKeyMultiple ? <GameTracemMultipleKeyBorad
                    {...this.state}
                    OK={me.setIsShowKeyMultiple}
                    inputMultiple={me.inputMultiple}
                    setMultiple={me.setMultiple}
                /> : null}
            </View>
        );
    }

}


const styles = StyleSheet.create({

    tracePanel: {
        flex: 1,
        flexDirection: 'row',
        position: 'absolute',
        bottom: 48,
        width: G_Theme.windowWidth,
        height: 40,
        borderTopWidth: 0.5,
        borderColor: G_Theme.grayDeep,
        backgroundColor: '#fff',
        padding: 10,
        // justifyContent: 'space-between'
    },
    traceKeyBoardPanel: {
        flex: 1,
        flexDirection: 'row',
        position: 'absolute',
        bottom: 100,
        width: G_Theme.windowWidth,
        height: 40,
        borderTopWidth: 0.5,
        borderColor: G_Theme.grayDeep,

        padding: 10,
        // justifyContent: 'space-between'
    },

    lotterys: {
        fontSize: 12,
        marginTop: 5,
    },
    textInput: {
        height: 25,
        borderRadius: 5,
        width: 70,
        textAlign: 'center',
        marginLeft: 10,
        marginRight: 10,
        borderWidth: 0.5,
        borderColor: G_Theme.grayDeep,

    }
});