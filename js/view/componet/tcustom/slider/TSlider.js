import React, {PropTypes} from 'react';
import {
    View,
    Text,
    Slider
} from 'react-native';

export class TSlider extends React.PureComponent {

    static propTypes={
        minValue:PropTypes.any,
        maxValue:PropTypes.any,
        disable:PropTypes.bool,
        slideStyle:PropTypes.any,
        onValueChange:PropTypes.func,
        slideValue:PropTypes.any
    }
    static defaultProps={
        slideStyle:{height: 20, flex: 1},
        disable:false
    }

    render() {
        const {minValue,maxValue,onValueChange,slideValue,disable,slideStyle} = this.props;
        let myMinValue =  minValue ? minValue:0;
        let myMaxValue =  maxValue > myMinValue ? maxValue:myMinValue;
        return (
            <View >
                <View style={{flexDirection:"row"}}>
                <Slider
                        value={slideValue}
                        maximumValue={myMaxValue}
                        minimumValue={myMinValue}
                        minimumTrackTintColor={"green"}
                        maximumTrackTintColor={"gray"}
                        thumbTintColor={"yellow"}
                        style={slideStyle}
                        disabled={G_PLATFORM_IOS ? disable:false}
                        onValueChange={onValueChange}/>
                </View>
                <View style={{flexDirection: "row", marginTop: 10,justifyContent: "space-between"}}>
                    <Text>{myMinValue}</Text>
                    <Text>{myMaxValue}</Text>
                </View>
            </View>)
    }
}





