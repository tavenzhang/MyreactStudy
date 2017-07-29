/**
 * Created by soga on 2017/4/18.
 */
import React, {PropTypes} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import AIcon from 'react-native-vector-icons/FontAwesome';

export default class OrderItem extends React.Component {

    static propTypes = {
        data : PropTypes.any.isRequired
    };

    static defaultProps = {
        data : {}
    };

    render() {
        const { data, btnLeftPress } = this.props;
        return (
            <View style={styles.item}>
                <View style={styles.btnBox}>
                    <TouchableOpacity onPress={() => btnLeftPress()}>
                        <AIcon name="minus-circle" style={styles.iconDelete} />
                    </TouchableOpacity>
                </View>
                <View style={{flex:1}}>
                    <Text style={styles.itemTitle}>[{data.gameName}] <Text style={styles.lotteryNumber}>{data.viewBalls}</Text></Text>
                    <Text style={styles.desc}>{data.num}注x{data.multiple}倍x{data.onePrice * data.moneyunit}元={G_moneyFormat(data.amount)}元</Text>
                </View>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    item: {
        flex: 1,
        flexDirection : 'row',
        padding : 8,
        marginBottom: 2,

        borderBottomWidth: G_Theme.lineBase,
        borderColor: G_Theme.gray
    },
    btnBox: {
        width: 40,
        flexDirection : 'row',
        justifyContent:"center",
        alignItems:"center",
    },
    iconDelete: {
        color: '#f24336',
        fontWeight: 'bold',
        fontSize: 24
    },
    lotteryNumber: {
        color: G_Theme.primary,
        lineHeight: 22,
        fontSize: 14,
        fontWeight: "500",
        letterSpacing: 1
    },
    desc: {
        color: G_Theme.second,
        fontSize: 12
    },
    itemTitle: {
        color: G_Theme.black,
        //fontSize: 12
    }
});