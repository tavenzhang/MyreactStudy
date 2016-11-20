/**
 * Created by soga on 16/10/25.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {MyOrdPage} from '../pages';

class MyOrdContainer extends Component {
    render() {
        return (
            <MyOrdPage {...this.props} />
        )
    }
}

export default connect((state) => {
    return {
        myRes: state.appState.myRes
    }
})(MyOrdContainer);