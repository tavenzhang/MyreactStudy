import React, { Component,PropTypes } from 'react'
import {
    View,
} from 'react-native';
import DatePicker from 'react-native-datepicker'

export default class MyDatePicker extends Component {

    static propTypes = {
        defaultDate: PropTypes.any,
        minDate: PropTypes.any,
        maxDate: PropTypes.any,
        onDateSelect:PropTypes.func
    }

    constructor(props){
        super(props);
        this.state = {
            date:props.defaultDate,
        }
    }

    render(){

        let {minDate,maxDate,onDateSelect}=this.props
        return (
        <View>
            <DatePicker
                style={{width: 90,}}
                date={this.state.date}
                mode="date"
                showIcon={false}
                placeholder="select date"
               // format="YYYY-MM-DD hh:mm:ss"
                format="YYYY-MM-DD"
                minDate={minDate}
                maxDate={maxDate}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                    // dateIcon: {
                    //     position: 'absolute',
                    //     left: 0,
                    //     top: 4,
                    //     marginLeft: 0
                    // },
                    dateInput: {
                        height:25
                    }
                    // ... You can check the source to find the other keys.
                }}
                is24Hour={true}
                onDateChange={(date) => {

                    this.setState({date: date},()=>{
                        TLog("onDateChange---",date);
                        if(onDateSelect)
                        {
                            TLog("onDateChange---fun");
                            onDateSelect(date);
                        }
                    })
                }}
            />
        </View>
        )
    }
}