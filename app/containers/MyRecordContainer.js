/**
 * Created by soga on 16/10/25.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {MyRecordPage} from '../pages';

class MyRecordContainer extends Component {
    render() {
        return (
            <MyRecordPage {...this.props} />
        )
    }
}

export default connect((state) => {
    return {
        myRecord : state.appState.myRecord,//消费记录
    }
})(MyRecordContainer);