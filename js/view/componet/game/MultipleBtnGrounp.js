/**
 * Created by soga on 2017/4/21.
 */

import React, {PropTypes} from 'react';
import {
    View,
    Text,
    Alert,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from 'react-native';


export default class MultipleBtnGrounp extends React.Component {

    constructor(props) {
        super(props);

        this.setMultiple = this.setMultiple.bind(this);
    }

    static propTypes = {
        moneyMode : PropTypes.any.isRequired
    };

    static defaultProps = {
        moneyMode : 1
    };

    setMultiple(value) {
        const { multiple, maxMultiple,checkBallIsComplete } = this.props;
        let newMultiple = parseInt(value) || multiple;

        if(maxMultiple && value > maxMultiple) {
            newMultiple = maxMultiple;
            Alert.alert(
                '',
                `当前游戏的最大倍数为${maxMultiple}倍`,
                [
                    {text: '知道了'},
                ]
            )
        }

        ActDispatch.GameAct.setMultiple(newMultiple);

        this.setState({multipleValue:newMultiple})
        checkBallIsComplete(newMultiple);

    }

    render() {

        const me = this;
        const { multiple } = this.props;

        return (
            <View style={styles.multipleBtnGrounps}>
                <TouchableOpacity onPress={() => me.setMultiple(multiple-1)} >
                    <View style={[styles.multipleBtn,styles.borderRadiusLeft]}>
                        <Text style={[styles.multipleBtnText]}> - </Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.multipleTextBox}>
                    <Text>投</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={text => {
                            me.setMultiple(text)
                        }}
                        defaultValue={multiple.toString()}
                        keyboardType='numeric'
                        underlineColorAndroid={'transparent'}
                        />
                    <Text>倍</Text>
                </View>
                <TouchableOpacity onPress={() => me.setMultiple(multiple+1)} >
                    <View  style={[styles.multipleBtn,styles.borderRadiusRight]}>
                        <Text style={[styles.multipleBtnText]}> + </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
};

const borderRadius = 6;

const styles = StyleSheet.create({
    multipleBtnGrounps: {
        flexDirection : 'row',
    },
    multipleBtn: {
        backgroundColor:G_Theme.second,
        justifyContent:"center",
        alignItems:"center",
        width: 30,
        height: 30,
        borderWidth:1,
        borderColor: G_Theme.second,
    },

    borderRadiusLeft: {
        borderTopLeftRadius: borderRadius,
        borderBottomLeftRadius: borderRadius,
    },

    borderRadiusRight: {
        borderTopRightRadius: borderRadius,
        borderBottomRightRadius: borderRadius,
    },


    multipleBtnText: {
        fontWeight: 'bold',
        fontSize: 18,
        color : '#fff'
    },

    multipleTextBox: {
        alignItems:"center",
        //width: 100,
        height: 30,
        paddingLeft: 5,
        paddingRight: 5,
        borderWidth:1,
        borderColor: G_Theme.second,
        flexDirection : 'row',
        justifyContent: 'space-between'
    },

    textInput: {
        height: G_Theme.textInpuntH,
        width: 70,
        textAlign: 'center',
        marginLeft: 5,
        marginRight: 5,
    }
});