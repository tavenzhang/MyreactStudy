import React ,{PropTypes} from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';

import ModalDropdown from 'react-native-modal-dropdown';

export default class TDropListComponet extends React.Component {
    static propTypes={
        itemName:PropTypes.string,
        dataList:PropTypes.array,
        rendDropRow:PropTypes.func,
        style:PropTypes.object
    }

    constructor(props)
    {
        super(props)
    }

    render() {
        let {itemName,dataList,rendDropRow,style}=this.props
        return (
            <ModalDropdown style={[styles.dropdown,style]}
                           options={dataList}
                           renderRow={rendDropRow ? rendDropRow:this.rendDropRow}
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
        marginLeft: 5,
        borderColor: "gray",
        paddingVertical: 2,
        borderWidth: StyleSheet.hairlineWidth,
    }
})