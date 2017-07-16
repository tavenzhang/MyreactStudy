import React, {PropTypes} from 'react';
import {
    View,
    Picker,
} from 'react-native';

export class TPicker extends React.PureComponent {

    static propTypes={
        pickValue:PropTypes.any,
        onValueChange:PropTypes.func,
        disable:PropTypes.bool,
        itemStyle:PropTypes.any,
        dataList:PropTypes.array,
        onRenderRow:PropTypes.func,
        viewStyle:PropTypes.any
    }
    static  defaultProps={
        viewStyle:{flex:1},
        itemStyle:{fontSize: 13, height: 80, width:100}
    }

    render() {
        const {dataList,itemStyle,onValueChange,pickValue,onRenderRow,viewStyle} = this.props;
        return(<View style={[viewStyle]}>
                <Picker
                    itemStyle={itemStyle}
                    mode={Picker.MODE_DROPDOWN}
                    selectedValue={pickValue}
                    onValueChange={(data) => {
                        onValueChange(data);
                    }}>
                    {
                        onRenderRow ? onRenderRow(): dataList.map((item, index) => {
                            return (<Picker.Item label={item.name} value={item.value} key={index + "item"}/>)
                        })
                    }
                </Picker>
            </View>)
    }
}





