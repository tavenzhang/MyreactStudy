import React from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';

import ModalDropdown from 'react-native-modal-dropdown';

export default class DropListComponet extends React.Component {

    constructor(props)
    {
        super(props)
    }

    render() {
        return (
            <ModalDropdown style={styles.dropdown}
                           options={this.props.dataList}
                           renderRow={this.rendDropRow}
                           onSelect={(idx, value) => {
                               this.props.onSelect(idx, value);
                           }}
            >
                <Text style={{textAlign: "center"}}> {this.props.itemName}</Text>
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