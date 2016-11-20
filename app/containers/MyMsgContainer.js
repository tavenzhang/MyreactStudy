/**
 * Created by soga on 16/10/25.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {MyMsgPage} from '../pages';

class MyMsgContainer extends Component {
    render() {
        return (
            <MyMsgPage {...this.props} />
        )
    }
}

export default connect((state) => {
    return {
        myMsg : state.appState.myMsg,//消息
    }
})(MyMsgContainer);