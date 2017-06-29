/**
 * Created by soga on 2017/4/17.
 */

import React, {Component, PropTypes} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';


export default class GameTraceKeyBorad extends Component {


    btnAction(num) {
        const {inputTrace} = this.props;
        inputTrace(num);
    }

    btnIconAction(num) {
        const {setTrace} = this.props;
            setTrace(num);

    }
    btnOK() {
        const {OK} = this.props;
        OK(false);
    }
    render() {
        const me = this;
        const {inputTrace,setTrace} = this.props;

        return (
            <View style={styles.traceKeyBoardPanel}>
                <View style={styles.keyRow}>
                    <TouchableOpacity style={styles.keyPanel} onPress={() => me.btnIconAction(10)}>
                        <Text style={styles.key}>追10期</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.keyPanel} onPress={() => me.btnIconAction(20)}>
                        <Text style={styles.key}>追20期</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.keyPanel} onPress={() => me.btnIconAction(120)}>
                        <Text style={styles.key}>追120期</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.keyRow}>
                    <TouchableOpacity style={styles.keyPanel} onPress={() => inputTrace(1)}>
                        <Text style={styles.key}>1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.keyPanel} onPress={() => inputTrace(2)}>
                        <Text style={styles.key}>2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.keyPanel} onPress={() => inputTrace(3)}>
                        <Text style={styles.key}>3</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.keyRow}>
                    <TouchableOpacity style={styles.keyPanel} onPress={() => inputTrace(4)}>
                        <Text style={styles.key}>4</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.keyPanel} onPress={() => inputTrace(5)}>
                        <Text style={styles.key}>5</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.keyPanel} onPress={() => inputTrace(6)}>
                        <Text style={styles.key}>6</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.keyRow}>
                    <TouchableOpacity style={styles.keyPanel} onPress={() => inputTrace(7)}>
                        <Text style={styles.key}>7</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.keyPanel} onPress={() => inputTrace(8)}>
                        <Text style={styles.key}>8</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.keyPanel} onPress={() => inputTrace(9)}>
                        <Text style={styles.key}>9</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.keyRow}>
                    <TouchableOpacity style={styles.keyPanelOK} onPress={() => me.btnOK()}>
                        <Text style={styles.keyOK} value='4'>确定</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.keyPanel} onPress={() => inputTrace(0)}>
                        <Text style={styles.key} value='5'>0</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.keyPanelCanncel} onPress={() => inputTrace(0,'sub')} >
                        <Text style={styles.key} value='6'>--</Text>
                    </TouchableOpacity>
                </View>


            </View>

        );
    }

}


const styles = StyleSheet.create({

    traceKeyBoardPanel: {
        backgroundColor:'#fff',
        flex: 1,
        position: 'absolute',
        bottom: 88,
        width: G_Theme.windowWidth,
        borderTopWidth: 0.5,
        borderColor: G_Theme.grayDeep,
        justifyContent: 'space-between'
    },
    keyRow: {
        height: 40,
        flexDirection: 'row',
        flex: 1,
        // borderWidth: 0.5,
        borderColor: G_Theme.grayDeep,

    },
    keyPanelCanncel:{
        borderRightWidth: 0.5,
        borderBottomWidth: 0.5,
        borderColor: G_Theme.grayDeep,
        backgroundColor: G_Theme.grayDeep,
        flex: 1,
    },
    keyPanelOK:{
        // borderRightWidth: 0.5,
        // borderBottomWidth: 0.5,
        borderColor: G_Theme.grayDeep,
        backgroundColor: G_Theme.primary,
        flex: 1,
    },

    keyPanel: {
        borderRightWidth: 0.5,
        borderBottomWidth: 0.5,
        borderColor: G_Theme.grayDeep,
        flex: 1,
    },
    key: {
        padding:10,
        textAlign: 'center',
        fontSize: 14,
    },
    keyOK: {
        padding:10,
        textAlign: 'center',
        fontSize: 16,
        color: '#fff',
    }


});