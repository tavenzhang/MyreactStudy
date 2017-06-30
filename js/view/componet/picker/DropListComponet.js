import React,{PropTypes} from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';

import ModalDropdown from 'react-native-modal-dropdown';

export default class TDropListComponet extends React.Component {

    static propTypes={
        itemName:PropTypes.string
    }


    render() {
        let {itemName} =this.props
        return (
            <ModalDropdown style={styles.dropdown}
                           options={this.props.dataList}
                           renderRow={this.rendDropRow}
                           onSelect={(idx, value) => {
                               this.props.onSelect(idx, value);
                           }}
            >
                <Text style={{textAlign: "center"}}> {itemName}</Text>
            </ModalDropdown>
        )
    }

    rendDropRow = (rowData, rowID, highlighted) => {
        return (
            <View style={{
                margin: 10,
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            }}><Text>{rowData.name}</Text>
        </View>)
    }
}

const styles = StyleSheet.create({
    dropdown: {
        flex: 1,
        top: 0,
        left: 8,
        borderColor: "gray",
        borderWidth: StyleSheet.hairlineWidth,
    }
})