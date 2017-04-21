/**
 * Created by soga on 2017/4/21.
 */

import React, {PropTypes} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight
} from 'react-native';


export default class MoneyUnit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            moneyUnits : [{title:'元',value:1},{title:'角',value:0.1},{title:'分',value:0.01}]
        }
    }

    static propTypes = {
        moneyMode : PropTypes.any.isRequired
    };

    static defaultProps = {
        moneyMode : 1
    };

    render() {

        return (
            <View>
                {this.state.moneyUnits.map((v,i) => {
                    return <View key={i}><Text>{v.title}</Text></View>
                })}
            </View>
        )
    }
};

const styles = StyleSheet.create({
    ballText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16
    },
    ball: {
        backgroundColor:global.GlobelTheme.gray,
        justifyContent:"center",
        alignItems:"center",
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 10,
    },

    ballSelected: {
        backgroundColor:global.GlobelTheme.primary,
    },

    ballSelectedText: {
        color: '#fff',
    }
});
